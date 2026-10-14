import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" } });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return reply({ error: "Método no permitido" }, 405);
  try {
    const { order_id, idempotency_key } = await req.json();
    if (typeof order_id !== "string" || !/^[0-9a-f-]{36}$/i.test(order_id) || typeof idempotency_key !== "string" || !/^[0-9a-f-]{36}:mp$/i.test(idempotency_key)) return reply({ error: "Pedido no disponible" }, 404);
    // Guest access uses the high-entropy checkout attempt as a capability, never the browser's return status.
    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
    const { data, error } = await db.from("orders").select("id,total,status,mp_order_id,mp_order_status,mp_order_status_detail,mp_payment_status,mp_checkout_url,mp_checkout_state,mp_order_request,payment_confirmed_at,shipping_cost,shipping_zone,shipping_time_estimate,shipping_address,city,province,postal_code,order_items(product_name,quantity,subtotal)")
      .eq("id", order_id).eq("idempotency_key", idempotency_key).eq("payment_method", "mercadopago").single();
    if (error || !data) return reply({ error: "Pedido no disponible en esta sesión" }, 404);
    const { mp_order_request, ...details } = data;
    return reply({ ...details, can_resume_checkout: !!mp_order_request && !data.mp_checkout_url && ["pending", "pending_payment"].includes(data.status) });
  } catch {
    console.error("[mercadopago-status] Failed to retrieve order status");
    return reply({ error: "No pudimos consultar el pedido" }, 503);
  }
});
