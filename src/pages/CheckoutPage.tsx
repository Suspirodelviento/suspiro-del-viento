import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useWineStore } from "@/store/wineStore";
import { supabase } from "@/integrations/supabase/client";
import { useDebounce } from "@/hooks/use-debounce";

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

const CheckoutPage = () => {
  const { cart, clearCart } = useWineStore();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [shippingError, setShippingError] = useState<string | null>(null);

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
    if (!shippingInfo) return null;
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
    // ... (resto de la lógica de submit que se implementará en la siguiente fase)
    console.log("Form submitted", values);
    setSubmitting(false);
  };

  if (orderId) { /* ... (código de confirmación) */ }
  if (cart.length === 0) { /* ... (código de carrito vacío) */ }

  return (
    <div className="container mx-auto px-4 py-20 md:py-32">
      <h1 className="text-center font-serif text-4xl font-bold md:text-5xl">Finalizar compra</h1>
      <div className="mx-auto mt-12 grid max-w-6xl gap-16 md:grid-cols-2">
        <div>
          <h2 className="mb-6 font-serif text-2xl font-bold">Datos de envío</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* ... (campos del formulario) */}
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="city" render={({ field }) => <FormItem><FormLabel>Ciudad</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                <FormField control={form.control} name="province" render={({ field }) => <FormItem><FormLabel>Provincia</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              </div>
              {/* ... (resto de campos) */}
              {submitError && <p role="alert" className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{submitError}</p>}
              <Button type="submit" disabled={submitting || !!shippingValidation} className="w-full rounded-full">{submitting ? "Procesando..." : "Continuar al pago"}</Button>
            </form>
          </Form>
        </div>
        <div>
          <h2 className="mb-6 font-serif text-2xl font-bold">Resumen del pedido</h2>
          <div className="space-y-5">
            {cart.map((item) => (/* ... (renderizado de items) */))}
          </div>
          <div className="mt-6 space-y-3 border-t pt-6 text-lg">
            <div className="flex justify-between"><p>Subtotal</p><p className="font-medium">${subtotal.toLocaleString("es-AR")}</p></div>
            {shippingInfo && (
              <>
                <div className="flex justify-between"><p>Envío ({shippingInfo.zone})</p><p className="font-medium">${shippingInfo.cost.toLocaleString("es-AR")}</p></div>
                <div className="flex justify-between text-sm text-muted-foreground"><p>Tiempo estimado</p><p>{shippingInfo.timeEstimate}</p></div>
              </>
            )}
            {shippingError && <p className="text-sm text-destructive">{shippingError}</p>}
            <div className="flex justify-between border-t pt-4 text-xl font-bold"><p>Total</p><p>${total.toLocaleString("es-AR")}</p></div>
            {shippingValidation && <p role="alert" className="rounded-lg bg-amber-100 p-3 text-center text-sm text-amber-800">{shippingValidation}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
