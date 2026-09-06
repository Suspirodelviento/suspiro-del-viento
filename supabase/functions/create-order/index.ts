import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type OrderItem = {
  product_id: string;
  quantity: number;
  is_box: boolean;
};

type OrderPayload = {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  province: string;
  postal_code: string;
  items: OrderItem[];
};

const textValue = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Método no permitido" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = (await req.json()) as Partial<OrderPayload>;
    const customerName = textValue(body.customer_name, 120);
    const customerEmail = textValue(body.customer_email, 180).toLowerCase();
    const customerPhone = textValue(body.customer_phone, 40);
    const shippingAddress = textValue(body.shipping_address, 240);
    const city = textValue(body.city, 100);
    const province = textValue(body.province, 100);
    const postalCode = textValue(body.postal_code, 20);
    const items = Array.isArray(body.items) ? body.items.slice(0, 30) : [];

    if (
      customerName.length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail) ||
      customerPhone.length < 8 ||
      shippingAddress.length < 5 ||
      city.length < 2 ||
      province.length < 2 ||
      postalCode.length < 3 ||
      items.length === 0 ||
      items.some(
        (item) =>
          !item ||
          typeof item.product_id !== "string" ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1 ||
          item.quantity > 100 ||
          typeof item.is_box !== "boolean",
      )
    ) {
      return new Response(JSON.stringify({ error: "Los datos del pedido no son válidos" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );

    const { data, error } = await supabase.rpc("create_order", {
      p_customer_name: customerName,
      p_customer_email: customerEmail,
      p_customer_phone: customerPhone,
      p_shipping_address: shippingAddress,
      p_city: city,
      p_province: province,
      p_postal_code: postalCode,
      p_items: items,
    });

    if (error) {
      console.error("[create-order] No se pudo registrar la orden", { error: error.message });
      return new Response(JSON.stringify({ error: "No pudimos registrar el pedido. Revisá el stock e intentá nuevamente." }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("[create-order] Orden creada", { orderId: data, itemCount: items.length });
    return new Response(JSON.stringify({ order_id: data }), {
      status: 201,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[create-order] Error inesperado", {
      error: error instanceof Error ? error.message : "unknown",
    });
    return new Response(JSON.stringify({ error: "Solicitud inválida" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
