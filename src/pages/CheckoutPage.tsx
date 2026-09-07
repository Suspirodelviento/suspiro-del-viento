import { useState, useEffect, useMemo } from "react";
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

const formSchema = z.object({
  name: z.string().trim().min(2, "Nombre muy corto").max(120),
  email: z.string().trim().email("Email inválido").max(180),
  phone: z.string().trim().min(8, "Teléfono inválido").max(40),
  address: z.string().trim().min(5, "Dirección muy corta").max(240),
  city: z.string().trim().min(2, "Ciudad inválida").max(100),
  province: z.string().trim().min(2, "Provincia inválida").max(100),
  zip: z.string().trim().min(3, "Código postal inválido").max(20),
});

interface ShippingInfo {
  zone: string;
  cost: number;
  timeEstimate: string;
  minBottles?: number;
}

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
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [shippingError, setShippingError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("transfer");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity * (item.isBox ? 6 : 1), 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity * (item.isBox ? 6 * 0.9 : 1), 0);
  const total = subtotal + (shippingInfo?.cost ?? 0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", address: "", city: "", province: "Mendoza", zip: "" },
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
    if (!shippingInfo) return "Ingrese una ciudad y provincia para calcular el envío.";
    if (shippingInfo.minBottles && totalItems < shippingInfo.minBottles) {
      return `Para envíos a ${shippingInfo.zone}, la compra mínima es de ${shippingInfo.minBottles} botellas.`;
    }
    return null;
  }, [shippingInfo, totalItems]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (shippingValidation) {
      setSubmitError(shippingValidation);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    const { data, error } = await supabase.functions.invoke("create-order", {
      body: {
        ...values,
        items: cart.map(item => ({ product_id: item.id, quantity: item.quantity, is_box: item.isBox })),
        payment_method: paymentMethod,
        shipping_zone: shippingInfo?.zone,
        shipping_cost: shippingInfo?.cost,
        shipping_time_estimate: shippingInfo?.timeEstimate,
      },
    });

    setSubmitting(false);
    if (error || !data?.order_id) {
      setSubmitError(error?.message || "No pudimos registrar el pedido. Intente nuevamente.");
      return;
    }

    setOrderId(data.order_id);
    clearCart();
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
            <p><strong>Total a transferir:</strong> ${total.toLocaleString("es-AR")}</p>
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
      <div className="mx-auto mt-12 grid max-w-6xl gap-16 md:grid-cols-2">
        <div>
          <h2 className="mb-6 font-serif text-2xl font-bold">1. Datos de envío</h2>
          <Form {...form}>{/* ... (formulario) */}</Form>
        </div>
        <div>
          <h2 className="mb-6 font-serif text-2xl font-bold">2. Resumen y Pago</h2>
          {/* ... (resumen del pedido) */}
          <div className="mt-8">
            <h3 className="font-sans uppercase tracking-widest text-sm text-foreground">Método de Pago</h3>
            <RadioGroup defaultValue="transfer" onValueChange={setPaymentMethod} className="mt-4">
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="transfer" id="transfer" />
                <Label htmlFor="transfer" className="flex-1 cursor-pointer">Transferencia Bancaria</Label>
              </div>
            </RadioGroup>
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
            {submitError && <p role="alert" className="text-sm text-destructive mb-4">{submitError}</p>}
            <Button onClick={form.handleSubmit(onSubmit)} disabled={submitting || !!shippingValidation} className="w-full rounded-full">
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando...</> : "Confirmar Pedido"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
