import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

export function mpConfig() {
  const token = Deno.env.get("MP_ACCESS_TOKEN");
  const secret = Deno.env.get("MP_WEBHOOK_SECRET");
  const site = Deno.env.get("PUBLIC_SITE_URL");
  if (!token?.startsWith("TEST-")) throw new Error("Mercado Pago requiere credenciales TEST. No se permiten pagos de producción.");
  if (!secret || !site) throw new Error("Falta configurar MP_WEBHOOK_SECRET o PUBLIC_SITE_URL para Mercado Pago. Podés elegir transferencia bancaria.");
  const url = new URL(site);
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("PUBLIC_SITE_URL debe ser el origen HTTPS verificado de la tienda.");
  }
  return { token, secret, site: url.origin };
}

async function mpResponse(response: Response) {
  if (response.ok) return await response.json();
  const body = await response.json().catch(() => null);
  const codes = [body?.error, body?.code, ...(Array.isArray(body?.errors) ? body.errors.map((error: { code?: string }) => error.code) : [])];
  if (codes.includes("invalid_credentials")) {
    throw new Error("Mercado Pago rechazó las credenciales TEST para Orders API (invalid_credentials). Su referencia indica que algunos entornos requieren una cuenta vendedora de prueba. No se habilitarán credenciales productivas automáticamente.");
  }
  if (codes.includes("invalid_email_for_sandbox")) throw new Error("Mercado Pago requiere el email de la cuenta compradora de prueba (@testuser.com).");
  if (response.status === 409 || response.status === 423) throw new Error("El mismo intento de pago está en proceso o requiere conciliación. No generes otra compra; reintentá este pedido o consultanos.");
  throw new Error(`Mercado Pago no pudo completar la operación de prueba (HTTP ${response.status}). Conservamos el mismo intento de pago.`);
}

export async function mpGet(path: string, token: string) {
  return await mpResponse(await fetch(`https://api.mercadopago.com${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(12000),
  }));
}

export interface MpLocalOrder {
  id: string;
  total: number;
  status: string;
  payment_method: string;
  mp_preference_id: string | null;
  mp_order_id: string | null;
  mp_checkout_url: string | null;
  mp_checkout_state: string | null;
  mp_order_request: Record<string, unknown> | null;
}

export const mpOrderFields = "id,total,status,payment_method,mp_preference_id,mp_order_id,mp_checkout_url,mp_checkout_state,mp_order_request";

function testCheckoutUrl(value: unknown) {
  if (typeof value !== "string") throw new Error("Mercado Pago no devolvió checkout_url.");
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || !["www.mercadopago.com.ar", "sandbox.mercadopago.com.ar"].includes(url.hostname) || !url.pathname.startsWith("/checkout/")) {
    throw new Error("Mercado Pago no devolvió una URL de checkout válida para Argentina.");
  }
  return url.href;
}

export async function createMpCheckout(db: SupabaseClient, order: MpLocalOrder) {
  const { token, site } = mpConfig();
  if (order.payment_method !== "mercadopago") throw new Error("El pedido tiene otro método de pago.");
  if (!["pending", "pending_payment"].includes(order.status)) throw new Error("Este pedido ya fue confirmado o cancelado. Consultá su estado antes de pagar.");
  if (order.mp_checkout_url) return testCheckoutUrl(order.mp_checkout_url);
  if (order.mp_preference_id || (order.mp_checkout_state && !order.mp_order_request)) {
    throw new Error("Este pedido tiene un inicio de pago anterior a Orders API. Requiere conciliación; no se creará otra operación.");
  }

  let payload = order.mp_order_request;
  if (!payload) {
    const { data: items, error: itemsError } = await db.from("order_items").select("product_name,quantity,unit_price").eq("order_id", order.id);
    const { data: snapshot, error: snapshotError } = await db.from("orders").select("total,shipping_cost,customer_email").eq("id", order.id).single();
    if (itemsError || snapshotError || !snapshot || !items?.length) throw new Error("No se pudo recuperar el importe del pedido.");
    if (!/^[^\s@]+@testuser[.]com$/i.test(snapshot.customer_email)) throw new Error("Usá el email de la cuenta compradora TEST de Mercado Pago (@testuser.com).");
    const checkoutItems = items.map((item) => ({ title: item.product_name, quantity: item.quantity, unit_price: Number(item.unit_price).toFixed(2) }));
    if (Number(snapshot.shipping_cost) > 0) checkoutItems.push({ title: "Envío", quantity: 1, unit_price: Number(snapshot.shipping_cost).toFixed(2) });
    const cents = checkoutItems.reduce((sum, item) => sum + Math.round(Number(item.unit_price) * 100) * item.quantity, 0);
    if (cents !== Math.round(Number(snapshot.total) * 100) || cents <= 0) throw new Error("El importe del pedido no coincide.");
    const back = (result: string) => {
      const url = new URL("/checkout/mercadopago", site);
      // Mercado Pago appends its own order_id; keep the local ID in a distinct parameter.
      url.searchParams.set("local_order_id", order.id);
      url.searchParams.set("result", result);
      return url.href;
    };
    payload = {
      type: "online", processing_mode: "manual", capture_mode: "automatic",
      total_amount: Number(snapshot.total).toFixed(2), external_reference: order.id,
      payer: { email: snapshot.customer_email }, items: checkoutItems,
      config: { online: { success_url: back("success"), pending_url: back("pending"), failure_url: back("failure"), auto_return: "approved" } },
    };
    // Persist the exact request once. Concurrent/retried calls use this snapshot and the same UUID.
    const { error: claimError } = await db.from("orders")
      .update({ mp_checkout_state: "creating", mp_order_request: payload })
      .eq("id", order.id).is("mp_checkout_state", null).is("mp_preference_id", null).is("mp_order_request", null);
    if (claimError) throw new Error("No se pudo guardar el intento de pago.");
    // Even the first request reads the JSONB snapshot, preserving its serialization order on retries.
    const { data: existing, error } = await db.from("orders").select(mpOrderFields).eq("id", order.id).single();
    if (error || !existing) throw new Error("No se pudo recuperar el intento de pago.");
    if (!["pending", "pending_payment"].includes(existing.status)) throw new Error("El pedido ya fue confirmado o cancelado. Consultá su estado antes de pagar.");
    if (existing.mp_checkout_url) return testCheckoutUrl(existing.mp_checkout_url);
    if (!existing.mp_order_request) throw new Error("El pedido requiere conciliación antes de iniciar otro pago.");
    payload = existing.mp_order_request;
  }

  try {
    const remote = await mpResponse(await fetch("https://api.mercadopago.com/v1/orders", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "X-Idempotency-Key": order.id },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    }));
    if (typeof remote.id !== "string" || !/^ORDTST[A-Z0-9]+$/.test(remote.id) || remote.live_mode === true || remote.type !== "online" || remote.processing_mode !== "manual" || remote.currency !== "ARS" || remote.country_code !== "ARG" || remote.external_reference !== order.id || Math.round(Number(remote.total_amount) * 100) !== Math.round(Number(order.total) * 100)) {
      throw new Error("Mercado Pago no devolvió una orden TEST válida que coincida con el pedido. No se habilitará el checkout.");
    }
    const checkoutUrl = testCheckoutUrl(remote.checkout_url);
    const { data: saved, error } = await db.from("orders").update({ mp_order_id: remote.id, mp_order_status: remote.status, mp_order_status_detail: remote.status_detail, mp_checkout_url: checkoutUrl, mp_checkout_state: "ready" })
      .eq("id", order.id).is("mp_order_id", null).select("id").maybeSingle();
    if (error) throw new Error("No pudimos guardar la operación. Reintentá el mismo pedido, sin crear otra compra.");
    if (!saved) {
      const { data: existing, error: readError } = await db.from("orders").select(mpOrderFields).eq("id", order.id).single();
      if (readError || !existing || existing.mp_order_id !== remote.id || !existing.mp_checkout_url) throw new Error("La operación requiere conciliación. No se creará otra orden.");
      if (!["pending", "pending_payment"].includes(existing.status)) throw new Error("El pedido ya fue confirmado o cancelado. Consultá su estado antes de pagar.");
      return testCheckoutUrl(existing.mp_checkout_url);
    }
    // Creation is NOT payment confirmation. Only a verified order webhook writes payment state.
    return checkoutUrl;
  } catch (error) {
    await db.from("orders").update({ mp_checkout_state: "review_required" }).eq("id", order.id).is("mp_checkout_url", null);
    if (error instanceof Error && !["TimeoutError", "AbortError", "TypeError"].includes(error.name)) throw error;
    throw new Error("No pudimos confirmar el inicio del pago. Reintentá este mismo pedido: se conserva su clave de idempotencia y no se generará otra orden local.");
  }
}
