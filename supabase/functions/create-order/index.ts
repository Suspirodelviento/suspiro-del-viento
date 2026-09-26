import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItemInput {
  product_id: string;
  quantity: number;
  is_box: boolean;
}

const isRequiredText = (value: unknown, min: number, max: number) =>
  typeof value === "string" && value.trim().length >= min && value.trim().length <= max;

const isEmail = (value: unknown) =>
  isRequiredText(value, 5, 180) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value as string).trim());

const isOrderItem = (value: unknown): value is OrderItemInput => {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.product_id === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(item.product_id) &&
    Number.isInteger(item.quantity) &&
    Number(item.quantity) >= 1 &&
    Number(item.quantity) <= 100 &&
    typeof item.is_box === "boolean"
  );
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Método no permitido" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405,
    });
  }

  try {
    const body = await req.json();
    const {
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      city,
      province,
      postal_code,
      items,
      payment_method,
      idempotency_key,
    } = body;

    if (!isRequiredText(customer_name, 2, 120)) throw new Error("Ingresá un nombre válido.");
    if (!isEmail(customer_email)) throw new Error("Ingresá un email válido.");
    if (!isRequiredText(customer_phone, 8, 40)) throw new Error("Ingresá un teléfono válido.");
    if (!isRequiredText(shipping_address, 5, 240)) throw new Error("Ingresá una dirección válida.");
    if (!isRequiredText(city, 2, 100)) throw new Error("Ingresá una ciudad válida.");
    if (!isRequiredText(province, 2, 100)) throw new Error("Ingresá una provincia válida.");
    if (!isRequiredText(postal_code, 3, 20)) throw new Error("Ingresá un código postal válido.");
    if (payment_method !== "transfer") throw new Error("El método de pago seleccionado no está disponible.");
    if (!isRequiredText(idempotency_key, 20, 200)) throw new Error("No pudimos identificar este intento de compra.");
    if (!Array.isArray(items) || items.length === 0 || items.length > 100 || !items.every(isOrderItem)) {
      throw new Error("El carrito contiene productos o cantidades inválidas.");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) throw new Error("El servicio de pedidos no está configurado.");

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const { data: orderId, error: orderError } = await supabase.rpc("create_order", {
      p_customer_name: customer_name.trim(),
      p_customer_email: customer_email.trim().toLowerCase(),
      p_customer_phone: customer_phone.trim(),
      p_shipping_address: shipping_address.trim(),
      p_city: city.trim(),
      p_province: province.trim(),
      p_postal_code: postal_code.trim(),
      p_items: items,
      p_payment_method: payment_method,
      p_idempotency_key: idempotency_key.trim(),
    });

    if (orderError) throw orderError;

    const { data: order, error: readError } = await supabase
      .from("orders")
      .select("id, total, status, shipping_zone, shipping_cost, shipping_time_estimate")
      .eq("id", orderId)
      .single();

    if (readError || !order) throw readError ?? new Error("No se pudo recuperar el pedido creado.");

    console.info("[create-order] Pedido creado o recuperado de forma idempotente", { orderId: order.id });

    return new Response(JSON.stringify({
      order_id: order.id,
      total: Number(order.total),
      status: order.status,
      shipping_zone: order.shipping_zone,
      shipping_cost: Number(order.shipping_cost),
      shipping_time_estimate: order.shipping_time_estimate,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No pudimos registrar el pedido.";
    console.error("[create-order] No se pudo procesar el pedido", { message });
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
