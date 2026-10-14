import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useWineStore } from "@/store/wineStore";
import { supabase } from "@/integrations/supabase/client";
import { useDebounce } from "@/hooks/use-debounce";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { mercadoPagoCheckoutUrl } from "@/lib/mercadopago";

const formSchema = z.object({
  customer_name: z.string().trim().min(2, "Ingresá tu nombre completo").max(120, "El nombre es demasiado largo"),
  customer_email: z.string().trim().email("Ingresá un email válido").max(180, "El email es demasiado largo"),
  customer_phone: z.string().trim().min(8, "Ingresá un teléfono válido").max(40, "El teléfono es demasiado largo"),
  shipping_address: z.string().trim().min(5, "Ingresá la dirección de entrega").max(240, "La dirección es demasiado larga"),
  city: z.string().trim().min(2, "Ingresá la ciudad").max(100, "La ciudad es demasiado larga"),
  province: z.string().trim().min(2, "Ingresá la provincia").max(100, "La provincia es demasiado larga"),
  postal_code: z.string().trim().min(3, "Ingresá el código postal").max(20, "El código postal es demasiado largo"),
});

interface ShippingInfo {
  zone: string;
  cost: number;
  timeEstimate: string;
  minBottles?: number;
}

const IDEMPOTENCY_STORAGE_KEY = "suspiro-checkout-attempt";
const MP_ACTIVE_STORAGE_KEY = "suspiro-mp-active";

const transferData = {
  bank: "Santander",
  accountType: "Caja de Ahorro en Pesos",
  accountNumber: "546-352079/0",
  cbu: "0720546088000035207904",
  alias: "JULIANRADOSAVAC",
  holder: "JULIAN RADOSAVAC ANDRADE",
  cuit: "23-39238645-9",
};

const CheckoutPage = () => {
  const { cart, clearCart } = useWineStore();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [mpPendingOrder, setMpPendingOrder] = useState<string | null>(() => {
    const active = window.sessionStorage.getItem(MP_ACTIVE_STORAGE_KEY);
    return active && active !== "pending" ? active : null;
  });
  const [mpAttemptLocked, setMpAttemptLocked] = useState(() => !!window.sessionStorage.getItem(MP_ACTIVE_STORAGE_KEY));
  const submittingRef = useRef(false);
  const [confirmedTotal, setConfirmedTotal] = useState<number | null>(null);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [shippingError, setShippingError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState(() => window.sessionStorage.getItem(MP_ACTIVE_STORAGE_KEY) ? "mercadopago" : "transfer");
  const [idempotencyKey] = useState(() => {
    const storedKey = window.sessionStorage.getItem(IDEMPOTENCY_STORAGE_KEY);
    if (storedKey) return storedKey;
    const newKey = crypto.randomUUID();
    window.sessionStorage.setItem(IDEMPOTENCY_STORAGE_KEY, newKey);
    return newKey;
  });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity * (item.isBox ? 6 : 1), 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity * (item.isBox ? 6 * 0.9 : 1), 0);
  const total = subtotal + (shippingInfo?.cost ?? 0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      shipping_address: "",
      city: "",
      province: "Mendoza",
      postal_code: "",
    },
  });

  const cityValue = form.watch("city");
  const provinceValue = form.watch("province");
  const debouncedCity = useDebounce(cityValue, 500);
  const debouncedProvince = useDebounce(provinceValue, 500);

  useEffect(() => {
    const calculateShipping = async () => {
      if (debouncedCity && debouncedProvince) {
        setShippingError(null);
        try {
          const { data, error } = await supabase.functions.invoke("calculate-shipping", {
            body: { city: debouncedCity, province: debouncedProvince },
          });
          if (error) throw error;
          setShippingInfo(data);
        } catch (e) {
          setShippingError("No se pudo calcular el envío. Intente de nuevo.");
        }
      }
    };
    calculateShipping();
  }, [debouncedCity, debouncedProvince]);

  const shippingValidation = useMemo(() => {
    if (cart.length === 0) return "Tu carrito está vacío.";
    if (totalItems < 6) return "La compra mínima es de 6 botellas.";
    if (!shippingInfo) return "Ingresá una ciudad y provincia para calcular el envío.";
    return null;
  }, [cart.length, shippingInfo, totalItems]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (submittingRef.current || mpPendingOrder) return;
    if (shippingValidation) {
      setSubmitError(shippingValidation);
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setSubmitError(null);
    if (paymentMethod === "mercadopago") {
      setMpAttemptLocked(true);
      window.sessionStorage.setItem(MP_ACTIVE_STORAGE_KEY, "pending");
    }

    try {
      const { data, error } = await supabase.functions.invoke("create-order", {
        body: {
          ...values,
          items: cart.map((item) => ({ product_id: item.id, quantity: item.quantity, is_box: item.isBox })),
          payment_method: paymentMethod,
          idempotency_key: paymentMethod === "mercadopago" ? `${idempotencyKey}:mp` : idempotencyKey,
        },
      });

      if (error || !data?.order_id) {
        const details = error?.context instanceof Response ? await error.context.clone().json().catch(() => null) : null;
        if (paymentMethod === "mercadopago" && details?.order_id) {
          setMpPendingOrder(details.order_id);
          window.sessionStorage.setItem(MP_ACTIVE_STORAGE_KEY, details.order_id);
          window.sessionStorage.setItem(`suspiro-mp-${details.order_id}`, JSON.stringify({ key: `${idempotencyKey}:mp`, cart: JSON.stringify(cart.map((item) => [item.id, item.quantity, item.isBox])) }));
        } else if (paymentMethod === "mercadopago" && details?.error) {
          setMpAttemptLocked(false);
          window.sessionStorage.removeItem(MP_ACTIVE_STORAGE_KEY);
        }
        setSubmitError(details?.error || data?.error || error?.message || "No pudimos registrar el pedido. Intentá nuevamente.");
        return;
      }

      if (paymentMethod === "mercadopago") {
        const checkoutUrl = mercadoPagoCheckoutUrl(data.checkout_url);
        if (!checkoutUrl) throw new Error("Checkout inválido");
        window.sessionStorage.setItem(`suspiro-mp-${data.order_id}`, JSON.stringify({
          key: `${idempotencyKey}:mp`,
          cart: JSON.stringify(cart.map((item) => [item.id, item.quantity, item.isBox])),
        }));
        window.sessionStorage.setItem(MP_ACTIVE_STORAGE_KEY, data.order_id);
        window.location.assign(checkoutUrl);
        return;
      }

      setOrderId(data.order_id);
      setConfirmedTotal(Number(data.total));
      window.sessionStorage.removeItem(IDEMPOTENCY_STORAGE_KEY);
      clearCart();
    } catch {
      setSubmitError(paymentMethod === "mercadopago" ? "No pudimos confirmar el inicio del pago. Para evitar duplicados, reintentá con este mismo formulario o consultanos." : "No pudimos registrar el pedido. Revisá tu conexión e intentá nuevamente.");
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  if (orderId) {
    return (
      <section className="min-h-[70vh] grid place-items-center px-5 py-20 text-center">
        <div className="max-w-xl">
          <CheckCircle2 className="mx-auto h-11 w-11 text-primary" strokeWidth={1.4} />
          <h1 className="mt-4 font-serif text-5xl">Gracias por tu compra</h1>
          <p className="mt-5 leading-7 text-muted-foreground">Hemos recibido tu pedido. Quedará confirmado una vez que se acredite la transferencia.</p>
          <div className="mt-6 text-left bg-secondary/30 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Datos para la transferencia</h3>
            <p><strong>Alias:</strong> {transferData.alias}</p>
            <p><strong>CBU:</strong> {transferData.cbu}</p>
            <p><strong>Titular:</strong> {transferData.holder}</p>
            <p><strong>Total a transferir:</strong> ${(confirmedTotal ?? total).toLocaleString("es-AR")}</p>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Nro de Pedido: {orderId.substring(0, 8)}</p>
          <Button asChild className="mt-9 rounded-full px-8"><Link to="/tienda">Volver a la tienda</Link></Button>
        </div>
      </section>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 md:py-32">
      <h1 className="text-center font-serif text-4xl font-bold md:text-5xl">Finalizar compra</h1>
      <div className="mx-auto mt-12 grid max-w-6xl gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="mb-6 font-serif text-2xl font-bold">1. Datos de envío</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2" noValidate>
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Nombre y apellido</FormLabel>
                    <FormControl><Input autoComplete="name" placeholder="Tu nombre completo" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customer_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" autoComplete="email" placeholder="nombre@ejemplo.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customer_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl><Input type="tel" autoComplete="tel" placeholder="261 555 0000" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shipping_address"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Dirección de entrega</FormLabel>
                    <FormControl><Input autoComplete="street-address" placeholder="Calle, número, piso o referencia" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl><Input autoComplete="address-level2" placeholder="Ciudad" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provincia</FormLabel>
                    <FormControl><Input autoComplete="address-level1" placeholder="Provincia" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postal_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código postal</FormLabel>
                    <FormControl><Input autoComplete="postal-code" placeholder="Código postal" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button type="submit" className="hidden" aria-hidden="true" />
            </form>
          </Form>
        </div>
        <div>
          <h2 className="mb-6 font-serif text-2xl font-bold">2. Resumen y pago</h2>
          <div className="rounded-[1.5rem] border border-border/70 bg-card p-5 sm:p-6">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.isBox ? "box" : "bottle"}`} className="flex items-start justify-between gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="mt-1 text-muted-foreground">{item.quantity} × {item.isBox ? "caja de 6" : "botella"}</p>
                  </div>
                  <p className="shrink-0 font-medium">${(item.price * item.quantity * (item.isBox ? 6 * 0.9 : 1)).toLocaleString("es-AR")}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3 border-t border-border/70 pt-5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toLocaleString("es-AR")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Envío</span><span>{shippingInfo ? (shippingInfo.cost === 0 ? "Gratis" : `$${shippingInfo.cost.toLocaleString("es-AR")}`) : "A calcular"}</span></div>
              {shippingInfo && <div className="flex justify-between gap-4 text-xs text-muted-foreground"><span>{shippingInfo.zone}</span><span>{shippingInfo.timeEstimate}</span></div>}
              {shippingError && <p role="alert" className="text-destructive">{shippingError}</p>}
              <div className="flex justify-between border-t border-border/70 pt-4 text-lg font-semibold"><span>Total estimado</span><span>${total.toLocaleString("es-AR")}</span></div>
              <p className="text-xs leading-5 text-muted-foreground">El importe definitivo se valida y calcula nuevamente en el servidor.</p>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-sans uppercase tracking-widest text-sm text-foreground">Método de pago</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} disabled={submitting || mpAttemptLocked || !!mpPendingOrder} className="mt-4">
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="transfer" id="transfer" />
                <Label htmlFor="transfer" className="flex-1 cursor-pointer">Transferencia Bancaria</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="mercadopago" id="mercadopago" />
                <Label htmlFor="mercadopago" className="flex-1 cursor-pointer">Mercado Pago <span className="text-xs text-muted-foreground">— modo de prueba</span></Label>
              </div>
            </RadioGroup>
            {paymentMethod === "mercadopago" && <p className="mt-4 text-sm leading-6 text-muted-foreground">Te llevaremos al checkout TEST de Mercado Pago. Usá el email de tu cuenta compradora de prueba (@testuser.com) y una tarjeta de prueba. El pedido solo se confirma cuando el servidor verifica el pago.</p>}
          </div>
          {paymentMethod === 'transfer' && (
            <div className="mt-4 text-sm bg-secondary/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Datos para la transferencia</h4>
              <p><strong>Alias:</strong> {transferData.alias}</p>
              <p><strong>CBU:</strong> {transferData.cbu}</p>
              <p>Una vez finalizada la compra, te enviaremos un email con el detalle completo.</p>
            </div>
          )}
          <div className="mt-8">
            {shippingValidation && <p className="mb-4 text-sm text-muted-foreground">{shippingValidation}</p>}
            {submitError && <p role="alert" className="mb-4 text-sm text-destructive">{submitError}</p>}
            {mpPendingOrder && <Button asChild variant="outline" className="mb-4 w-full rounded-full"><Link to={`/checkout/mercadopago?order_id=${mpPendingOrder}`}>Consultar pedido #{mpPendingOrder.substring(0, 8)}</Link></Button>}
            <Button type="button" onClick={form.handleSubmit(onSubmit)} disabled={submitting || !!shippingValidation || !!mpPendingOrder} className="w-full rounded-full">
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando...</> : paymentMethod === "mercadopago" ? "Ir a Mercado Pago (prueba)" : "Confirmar pedido"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
