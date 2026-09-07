import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { Resend } from "npm:resend";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const transferInstructions = `
  <p><strong>Banco:</strong> Santander</p>
  <p><strong>Tipo de cuenta:</strong> Caja de Ahorro en Pesos</p>
  <p><strong>Número de cuenta:</strong> 546-352079/0</p>
  <p><strong>CBU:</strong> 0720546088000035207904</p>
  <p><strong>Alias:</strong> JULIANRADOSAVAC</p>
  <p><strong>Titular:</strong> JULIAN RADOSAVAC ANDRADE</p>
  <p><strong>CUIT:</strong> 23-39238645-9</p>
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order_id } = await req.json();
    if (!order_id) throw new Error("Falta el ID del pedido");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { data: order, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", order_id)
      .single();

    if (error || !order) throw new Error("Pedido no encontrado");

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    // Email al cliente
    await resend.emails.send({
      from: "Suspiro del Viento <juli.suspirodelviento@gmail.com>",
      to: [order.customer_email],
      subject: `Confirmación de tu pedido #${order.id.substring(0, 8)}`,
      html: `
        <h1>¡Gracias por tu compra, ${order.customer_name}!</h1>
        <p>Hemos recibido tu pedido y está pendiente de pago. Será confirmado una vez que se acredite la transferencia.</p>
        <h2>Resumen del Pedido</h2>
        <ul>
          ${order.order_items.map(item => `<li>${item.quantity}x ${item.product_name} - $${item.subtotal.toLocaleString('es-AR')}</li>`).join('')}
        </ul>
        <p><strong>Subtotal:</strong> $${(order.total - order.shipping_cost).toLocaleString('es-AR')}</p>
        <p><strong>Envío:</strong> $${order.shipping_cost.toLocaleString('es-AR')}</p>
        <p><strong>Total:</strong> $${order.total.toLocaleString('es-AR')}</p>
        <h2>Instrucciones de Pago</h2>
        ${transferInstructions}
      `,
    });

    // Email a los admins
    await resend.emails.send({
      from: "Notificación de Pedido <noreply@suspirodelviento.com>", // Asumiendo que el dominio está verificado en Resend
      to: ["juli.suspirodelviento@gmail.com", "emi.suspirodelviento@gmail.com"],
      subject: `Nuevo Pedido Recibido #${order.id.substring(0, 8)}`,
      html: `
        <h1>Nuevo Pedido</h1>
        <p><strong>Cliente:</strong> ${order.customer_name}</p>
        <p><strong>Email:</strong> ${order.customer_email}</p>
        <p><strong>Teléfono:</strong> ${order.customer_phone}</p>
        <p><strong>Dirección:</strong> ${order.shipping_address}, ${order.city}, ${order.province}</p>
        <h2>Detalles</h2>
        <ul>
          ${order.order_items.map(item => `<li>${item.quantity}x ${item.product_name} - $${item.subtotal.toLocaleString('es-AR')}</li>`).join('')}
        </ul>
        <p><strong>Total:</strong> $${order.total.toLocaleString('es-AR')}</p>
        <p><strong>Método de Pago:</strong> ${order.payment_method}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
