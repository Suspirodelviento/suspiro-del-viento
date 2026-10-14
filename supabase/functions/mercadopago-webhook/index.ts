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
  if (Math.abs(Date.now() - time) > 10 * 60 * 1000) return false;
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
    const url = new URL(req.url);
    const ids = url.searchParams.getAll("data.id");
    if (ids.length !== 1 || !/^\d+$/.test(ids[0]) || !await authentic(req, ids[0], secret)) return reply(401);
    const notification = await req.json();
    if (String(notification.data?.id) !== ids[0]) return reply(400);
    // Checkout Pro uses Payments notifications. Other topics never change local state.
    if (notification.type !== "payment") return reply(200);
    const payment = await mpGet(`/v1/payments/${ids[0]}`, token);
    if (String(payment.id) !== ids[0] || payment.live_mode !== false || payment.currency_id !== "ARS") return reply(400);
    const orderId = payment.external_reference;
    if (typeof orderId !== "string" || !/^[0-9a-f-]{36}$/i.test(orderId) || !/^\d+$/.test(String(payment.order?.id))) return reply(400);
    const merchant = await mpGet(`/merchant_orders/${payment.order.id}`, token);
    if (merchant.external_reference !== orderId || merchant.collector?.id !== payment.collector_id || !merchant.payments?.some((entry: { id: number }) => String(entry.id) === ids[0])) return reply(400);
    if (!["approved", "pending", "in_process", "authorized", "rejected", "cancelled", "refunded", "charged_back", "in_mediation"].includes(payment.status)) return reply(400);
    if (!Number.isFinite(Date.parse(payment.date_last_updated))) return reply(400);
    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
    const { data: order, error: readError } = await db.from("orders").select("total,mp_preference_id").eq("id", orderId).single();
    if (readError || !order) throw new Error("Order lookup failed");
    if (order.mp_preference_id !== merchant.preference_id || Math.round(Number(merchant.total_amount) * 100) !== Math.round(Number(order.total) * 100)) return reply(400);
    const { error } = await db.rpc("apply_mp_payment", {
      p_order_id: orderId,
      p_payment_id: ids[0],
      p_mp_order_id: String(payment.order.id),
      p_status: payment.status,
      p_updated_at: payment.date_last_updated,
      p_amount: payment.transaction_amount,
      p_preference_id: merchant.preference_id,
    });
    if (error) throw new Error("Payment application failed");
    console.info("[mercadopago-webhook] Verified notification processed", { orderId, paymentId: ids[0], status: payment.status });
    return reply(200);
  } catch {
    console.error("[mercadopago-webhook] Verification or persistence failed; notification can be retried");
    return reply(503);
  }
});
