import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Clock3, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useWineStore } from "@/store/wineStore";

interface PaymentOrder {
  id: string;
  status: string;
  total: number;
  mp_payment_status: string | null;
  mp_checkout_url: string | null;
  payment_confirmed_at: string | null;
  shipping_cost: number;
  shipping_zone: string;
  shipping_time_estimate: string;
  shipping_address: string;
  city: string;
  province: string;
  postal_code: string;
  order_items: { product_name: string; quantity: number; subtotal: number }[];
}

const money = (value: number) => `$${Number(value).toLocaleString("es-AR")}`;

export default function MercadoPagoReturnPage() {
  const [params] = useSearchParams();
  const orderId = params.get("order_id") ?? "";
  const returnHint = params.get("result");
  const receipt = useMemo(() => {
    try {
      const value = JSON.parse(window.sessionStorage.getItem(`suspiro-mp-${orderId}`) ?? "null");
      return typeof value?.key === "string" ? value as { key: string; cart: string } : null;
    } catch { return null; }
  }, [orderId]);
  const [order, setOrder] = useState<PaymentOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let attempts = 0;
    setOrder(null);
    setError(null);
    if (!receipt || !/^[0-9a-f-]{36}$/i.test(orderId)) {
      setChecking(false);
      setError("No podemos consultar los detalles sin la sesión original de compra. Conservá el número de pedido y contactanos. La redirección no confirma el pago.");
      return;
    }
    const check = async () => {
      setChecking(true);
      const { data, error: requestError } = await supabase.functions.invoke("mercadopago-status", { body: { order_id: orderId, idempotency_key: receipt.key } });
      if (cancelled) return;
      setChecking(false);
      if (requestError || !data?.id) {
        setError("No pudimos consultar el estado. Tu pedido se conserva; intentá actualizarlo.");
        return;
      }
      setOrder(data);
      setError(null);
      const confirmed = !!data.payment_confirmed_at && data.status !== "cancelled" && data.mp_payment_status === "approved";
      if (confirmed) {
        const state = useWineStore.getState();
        if (JSON.stringify(state.cart.map((item) => [item.id, item.quantity, item.isBox])) === receipt.cart) state.clearCart();
      }
      if (confirmed || data.status === "cancelled") {
        if (`${window.sessionStorage.getItem("suspiro-checkout-attempt")}:mp` === receipt.key) window.sessionStorage.removeItem("suspiro-checkout-attempt");
        if (window.sessionStorage.getItem("suspiro-mp-active") === orderId) window.sessionStorage.removeItem("suspiro-mp-active");
      }
      if (!confirmed && data.status !== "cancelled" && !["rejected", "cancelled", "refunded", "charged_back"].includes(data.mp_payment_status) && ++attempts < 12) {
        timer = setTimeout(check, 5000);
      }
    };
    void check();
    return () => { cancelled = true; clearTimeout(timer); };
  }, [orderId, receipt, refresh]);

  const confirmed = !!order?.payment_confirmed_at && order.status !== "cancelled" && order.mp_payment_status === "approved";
  const failed = order?.status === "cancelled" || ["rejected", "cancelled", "refunded", "charged_back"].includes(order?.mp_payment_status ?? "");
  const Icon = confirmed ? CheckCircle2 : failed ? AlertCircle : Clock3;
  const title = confirmed ? "Pago confirmado" : failed ? "Pago no confirmado o cancelado" : "Pedido pendiente de pago";
  const retryUrl = useMemo(() => {
    try {
      const url = new URL(order?.mp_checkout_url ?? "");
      return url.protocol === "https:" && url.hostname === "sandbox.mercadopago.com.ar" ? url.href : null;
    } catch { return null; }
  }, [order?.mp_checkout_url]);

  return (
    <section className="min-h-[70vh] px-5 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Icon className="mx-auto h-11 w-11 text-primary" strokeWidth={1.4} />
        <h1 className="mt-4 font-serif text-4xl md:text-5xl">{title}</h1>
        <p className="mt-5 leading-7 text-muted-foreground">
          {confirmed ? "El servidor verificó tu pago con Mercado Pago. Gracias por tu compra." : failed ? "No continuaremos con la preparación de un pedido sin pago confirmado. Si hubo un débito, consultanos antes de volver a pagar." : "Recibimos tu pedido. La confirmación depende de la notificación de Mercado Pago verificada por nuestro servidor."}
        </p>
        {!confirmed && !failed && returnHint === "failure" && <p className="mt-3 text-sm text-muted-foreground">Volviste desde un pago interrumpido o rechazado. Estamos consultando el estado real; no se confirma por la redirección.</p>}
        <p className="mt-5 text-sm">Nro. de pedido: {orderId.substring(0, 8) || "No disponible"}</p>
        {checking && <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Consultando estado verificado...</p>}
        {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
        {order && (
          <div className="mt-8 rounded-2xl border bg-secondary/30 p-6 text-left">
            <h2 className="font-serif text-2xl">Detalle del pedido</h2>
            <ul className="mt-4 space-y-3 text-sm">{order.order_items.map((item, index) => <li key={index} className="flex justify-between gap-4"><span>{item.quantity} × {item.product_name}</span><span className="shrink-0">{money(item.subtotal)}</span></li>)}</ul>
            <div className="mt-5 space-y-2 border-t pt-4 text-sm">
              <p className="flex justify-between"><span>Envío — {order.shipping_zone}</span><span>{money(order.shipping_cost)}</span></p>
              <p className="flex justify-between font-semibold"><span>Total validado</span><span>{money(order.total)}</span></p>
              <p className="pt-3">{order.shipping_address}, {order.city}, {order.province} · CP {order.postal_code}</p>
              <p className="text-muted-foreground">Plazo estimado: {order.shipping_time_estimate}. El despacho se informará cuando se registre.</p>
            </div>
          </div>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {!confirmed && receipt && <Button onClick={() => setRefresh((value) => value + 1)} disabled={checking} variant="outline" className="rounded-full">Actualizar estado</Button>}
          {!confirmed && order?.status !== "cancelled" && [null, "rejected", "cancelled"].includes(order?.mp_payment_status ?? null) && retryUrl && <Button asChild className="rounded-full"><a href={retryUrl}>Continuar el mismo pago de prueba</a></Button>}
          <Button asChild variant="outline" className="rounded-full"><Link to="/tienda">Volver a la tienda</Link></Button>
          <Button asChild variant="outline" className="rounded-full"><Link to="/contacto">Consultar por mi pedido</Link></Button>
        </div>
      </div>
    </section>
  );
}
