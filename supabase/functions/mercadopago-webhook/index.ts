import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { mpConfig, mpGet } from "../_shared/mercadopago.ts";

const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-signature, x-request-id" };
const reply = (status: number) => new Response(JSON.stringify({ received: status === 200 }), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

async function authentic(req: Request, id: string, secret: string) {
  const requestId = req.headers.get("x-request-id");
  const signature = req.headers.get("x-signature");
  if (!requestId || !signature) return false;
  const parts = signature.split(",").map((part) => part.trim().split("="));
  const tsValues = parts.filter(([key]) => key === "ts");
  const hashValues = parts.filter(([key]) => key === "v1");
  if (tsValues.length !== 1 || hashValues.length !== 1) return false;
  const ts = tsValues[0][1];
  const hash = hashValues[0][1];
  if (!/^\d{10,13}$/.test(ts ?? "") || !/^[0-9a-f]{64}$/i.test(hash ?? "")) return false;
  const time = ts.length === 13 ? Number(ts) : Number(ts) * 1000;
  // Provider retries can arrive days later. Replays are safe because we re-fetch current state and deduplicate it.
  if (time > Date.now() + 10 * 60 * 1000) return false;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
  const bytes = new Uint8Array(hash.match(/.{2}/g)!.map((hex) => parseInt(hex, 16)));
  return await crypto.subtle.verify("HMAC", key, bytes, encoder.encode(`id:${id.toLowerCase()};request-id:${requestId};ts:${ts};`));
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return reply(405);
  try {
    const { token, secret } = mpConfig();
    const ids = new URL(req.url).searchParams.getAll("data.id");
    if (ids.length !== 1 || !/^(?:ORDTST[A-Z0-9]+|\d+)$/i.test(ids[0]) || !await authentic(req, ids[0], secret)) return reply(401);
    const notification = await req.json();
    if (String(notification.data?.id).toLowerCase() !== ids[0].toLowerCase() || notification.live_mode === true) return reply(400);
    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });

    if (["order", "orders_v2"].includes(notification.type)) {
      const mpId = ids[0].toUpperCase();
      if (!/^ORDTST[A-Z0-9]+$/.test(mpId)) return reply(400);
      const remote = await mpGet(`/v1/orders/${encodeURIComponent(mpId)}`, token);
      if (remote.id !== mpId || remote.live_mode === true || remote.type !== "online" || remote.processing_mode !== "manual" || remote.currency !== "ARS" || remote.country_code !== "ARG") return reply(400);
      if (typeof remote.external_reference !== "string" || !/^[0-9a-f-]{36}$/i.test(remote.external_reference) || typeof remote.status !== "string" || typeof remote.status_detail !== "string" || !Number.isFinite(Date.parse(remote.last_updated_date))) return reply(400);
      if (!/^\d+(?:[.]\d{1,2})?$/.test(String(remote.total_amount)) || !/^\d+(?:[.]\d{1,2})?$/.test(String(remote.total_paid_amount))) return reply(400);
      const { data: order, error: readError } = await db.from("orders").select("id,mp_order_id,mp_preference_id,payment_method").eq("id", remote.external_reference).single();
      if (readError || !order) throw new Error("Order lookup failed");
      // A creation webhook may precede local persistence. Retry instead of discarding that event.
      if (!order.mp_order_id) throw new Error("Orders API binding has not been persisted yet");
      if (order.mp_order_id !== mpId || order.mp_preference_id || order.payment_method !== "mercadopago") return reply(400);
      const { error } = await db.rpc("apply_mp_order", {
        p_order_id: order.id, p_mp_order_id: mpId,
        p_status: remote.status, p_detail: remote.status_detail,
        p_updated_at: remote.last_updated_date, p_total: remote.total_amount, p_paid: remote.total_paid_amount,
      });
      if (error) throw new Error("Verified Orders state could not be applied");
      console.info("[mercadopago-webhook] Verified Orders notification processed", { orderId: order.id, mpOrderId: mpId, status: remote.status });
      return reply(200);
    }

    // Preserve payment notifications for existing preference-based orders; never apply them to Orders API orders.
    if (notification.type !== "payment") return reply(200);
    if (!/^\d+$/.test(ids[0])) return reply(400);
    const payment = await mpGet(`/v1/payments/${ids[0]}`, token);
    if (String(payment.id) !== ids[0] || payment.live_mode !== false || payment.currency_id !== "ARS") return reply(400);
    const orderId = payment.external_reference;
    if (typeof orderId !== "string" || !/^[0-9a-f-]{36}$/i.test(orderId) || !/^\d+$/.test(String(payment.order?.id))) return reply(400);
    const merchant = await mpGet(`/merchant_orders/${payment.order.id}`, token);
    if (merchant.external_reference !== orderId || merchant.collector?.id !== payment.collector_id || !merchant.payments?.some((entry: { id: number }) => String(entry.id) === ids[0])) return reply(400);
    if (!["approved", "pending", "in_process", "authorized", "rejected", "cancelled", "refunded", "charged_back", "in_mediation"].includes(payment.status)) return reply(400);
    if (!Number.isFinite(Date.parse(payment.date_last_updated))) return reply(400);
    const { data: order, error: readError } = await db.from("orders").select("total,mp_preference_id").eq("id", orderId).single();
    if (readError || !order) throw new Error("Order lookup failed");
    if (!order.mp_preference_id || order.mp_preference_id !== merchant.preference_id || Math.round(Number(merchant.total_amount) * 100) !== Math.round(Number(order.total) * 100)) return reply(400);
    const { error } = await db.rpc("apply_mp_payment", {
      p_order_id: orderId, p_payment_id: ids[0], p_mp_order_id: String(payment.order.id),
      p_status: payment.status, p_updated_at: payment.date_last_updated,
      p_amount: payment.transaction_amount, p_preference_id: merchant.preference_id,
    });
    if (error) throw new Error("Legacy payment application failed");
    console.info("[mercadopago-webhook] Verified legacy payment notification processed", { orderId, paymentId: ids[0], status: payment.status });
    return reply(200);
  } catch {
    console.error("[mercadopago-webhook] Verification or persistence failed; notification can be retried");
    return reply(503);
  }
});
