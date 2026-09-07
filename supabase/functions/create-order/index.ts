import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { 
      customer_name, customer_email, customer_phone, 
      shipping_address, city, province, postal_code, 
      items, payment_method, shipping_zone, shipping_cost, shipping_time_estimate 
    } = body;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { data, error } = await supabase.rpc("create_order", {
      p_customer_name: customer_name,
      p_customer_email: customer_email,
      p_customer_phone: customer_phone,
      p_shipping_address: shipping_address,
      p_city: city,
      p_province: province,
      p_postal_code: postal_code,
      p_items: items,
      p_payment_method: payment_method,
      p_shipping_zone: shipping_zone,
      p_shipping_cost: shipping_cost,
      p_shipping_time_estimate: shipping_time_estimate,
    });

    if (error) throw error;

    return new Response(JSON.stringify({ order_id: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 201,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
