import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

export function mpConfig() {
  const token = Deno.env.get("MP_ACCESS_TOKEN");
  const secret = Deno.env.get("MP_WEBHOOK_SECRET");
  const site = Deno.env.get("PUBLIC_SITE_URL");
  if (!token?.startsWith("TEST-") || !secret || !site) {
    throw new Error("Mercado Pago de prueba no está configurado. Podés elegir transferencia bancaria.");
  }
  const url = new URL(site);
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("PUBLIC_SITE_URL debe ser el origen HTTPS verificado de la tienda.");
  }
  return { token, secret, site: url.origin };
}

export async function mpGet(path: string, token: string) {
  const response = await fetch(`https://api.mercadopago.com${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error("No se pudo verificar la operación con Mercado Pago.");
  return await response.json();
}

export async function createMpCheckout(db: SupabaseClient, order: { id: string; total: number; status: string; payment_method: string; mp_checkout_url: string | null; mp_checkout_state: string | null }) {
  const { token, site } = mpConfig();
  if (order.payment_method !== "mercadopago") throw new Error("El pedido tiene otro método de pago.");
  if (!["pending", "pending_payment"].includes(order.status)) throw new Error("Este pedido ya fue confirmado o cancelado. Consultá su estado antes de pagar.");
  if (order.mp_checkout_url) return order.mp_checkout_url;

  // A durable claim prevents concurrent requests and ambiguous network retries from creating another preference.
  const { data: claim, error: claimError } = await db.from("orders")
    .update({ mp_checkout_state: "creating" }).eq("id", order.id).is("mp_checkout_state", null).select("id").maybeSingle();
  if (claimError) throw new Error("No se pudo iniciar el pago.");
  if (!claim) {
    const { data: existing } = await db.from("orders").select("mp_checkout_url").eq("id", order.id).single();
    if (existing?.mp_checkout_url) return existing.mp_checkout_url;
    throw new Error("Este pedido ya tiene un inicio de pago en curso o pendiente de revisión. No se creará otro cobro. Consultanos con el número de pedido.");
  }

  try {
    const { data: items, error: itemsError } = await db.from("order_items")
      .select("product_name,quantity,unit_price,subtotal").eq("order_id", order.id);
    const { data: snapshot, error: snapshotError } = await db.from("orders").select("total,shipping_cost").eq("id", order.id).single();
    if (itemsError || snapshotError || !snapshot || !items?.length) throw new Error("No se pudo recuperar el importe del pedido.");
    const checkoutItems = items.map((item) => ({ title: item.product_name, quantity: item.quantity, currency_id: "ARS", unit_price: Number(item.unit_price) }));
    if (Number(snapshot.shipping_cost) > 0) checkoutItems.push({ title: "Envío", quantity: 1, currency_id: "ARS", unit_price: Number(snapshot.shipping_cost) });
    const cents = checkoutItems.reduce((sum, item) => sum + Math.round(item.unit_price * 100) * item.quantity, 0);
    if (cents !== Math.round(Number(snapshot.total) * 100) || cents <= 0) throw new Error("El importe del pedido no coincide.");
    const backUrl = new URL("/checkout/mercadopago", site);
    backUrl.searchParams.set("order_id", order.id);
    const back = (result: string) => { const url = new URL(backUrl); url.searchParams.set("result", result); return url.href; };
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "X-Idempotency-Key": order.id },
      body: JSON.stringify({
        items: checkoutItems,
        external_reference: order.id,
        back_urls: { success: back("success"), pending: back("pending"), failure: back("failure") },
        notification_url: "https://nbgfbugsgjnuokfmraey.supabase.co/functions/v1/mercadopago-webhook",
        auto_return: "approved",
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) throw new Error("Mercado Pago no pudo iniciar el checkout de prueba.");
    const preference = await response.json();
    const checkout = new URL(preference.sandbox_init_point);
    if (!preference.id || checkout.protocol !== "https:" || checkout.hostname !== "sandbox.mercadopago.com.ar") {
      throw new Error("Mercado Pago no devolvió un checkout de prueba válido.");
    }
    const { error } = await db.from("orders").update({ mp_preference_id: String(preference.id), mp_checkout_url: checkout.href, mp_checkout_state: "ready" }).eq("id", order.id);
    if (error) throw new Error("El pago requiere revisión antes de reintentar.");
    return checkout.href;
  } catch {
    await db.from("orders").update({ mp_checkout_state: "review_required" }).eq("id", order.id).is("mp_preference_id", null);
    throw new Error(`No pudimos completar el inicio de pago del pedido ${order.id.substring(0, 8)}. Conservamos el pedido; consultanos antes de volver a comprar para evitar duplicados.`);
  }
}
