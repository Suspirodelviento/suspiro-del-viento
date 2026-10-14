import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { createMpCheckout, mpOrderFields } from "../_shared/mercadopago.ts";

const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" } });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return reply({ error: "Método no permitido" }, 405);
  try {
    const { order_id, idempotency_key } = await req.json();
    if (typeof order_id !== "string" || !/^[0-9a-f-]{36}$/i.test(order_id) || typeof idempotency_key !== "string" || !/^[0-9a-f-]{36}:mp$/i.test(idempotency_key)) return reply({ error: "Pedido no disponible" }, 404);
    // The original guest capability authorizes only resuming its own server-priced order, not changing payment state.
    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
    const { data: order, error } = await db.from("orders").select(mpOrderFields)
      .eq("id", order_id).eq("idempotency_key", idempotency_key).eq("payment_method", "mercadopago").single();
    if (error || !order) return reply({ error: "Pedido no disponible en esta sesión" }, 404);
    const checkoutUrl = await createMpCheckout(db, order);
    console.info("[mercadopago-resume] Existing checkout resumed", { orderId: order.id });
    return reply({ order_id: order.id, checkout_url: checkoutUrl });
  } catch (error) {
    console.error("[mercadopago-resume] Could not resume existing checkout");
    const message = error instanceof Error ? error.message : "No pudimos reintentar este pago. Consultanos sin crear otra compra.";
    return reply({ error: message }, 400);
  }
});
