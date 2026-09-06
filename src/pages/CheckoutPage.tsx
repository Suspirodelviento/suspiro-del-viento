import { useState } from "react";
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

const formSchema = z.object({
  name: z.string().trim().min(2, "Nombre muy corto").max(120),
  email: z.string().trim().email("Email inválido").max(180),
  phone: z.string().trim().min(8, "Teléfono inválido").max(40),
  address: z.string().trim().min(5, "Dirección muy corta").max(240),
  city: z.string().trim().min(2, "Ciudad inválida").max(100),
  province: z.string().trim().min(2, "Provincia inválida").max(100),
  zip: z.string().trim().min(3, "Código postal inválido").max(20),
});

const CheckoutPage = () => {
  const { cart, clearCart } = useWineStore();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity * (item.isBox ? 6 * 0.9 : 1),
    0,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      province: "Mendoza",
      zip: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    setSubmitError(null);

    const { data, error } = await supabase.functions.invoke("create-order", {
      body: {
        customer_name: values.name,
        customer_email: values.email,
        customer_phone: values.phone,
        shipping_address: values.address,
        city: values.city,
        province: values.province,
        postal_code: values.zip,
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          is_box: item.isBox,
        })),
      },
    });

    setSubmitting(false);
    if (error || !data?.order_id) {
      setSubmitError("No pudimos registrar el pedido. Revisá la disponibilidad e intentá nuevamente.");
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
          <p className="mt-6 text-xs uppercase tracking-[0.24em] text-primary">Pedido recibido</p>
          <h1 className="mt-4 font-serif text-5xl">Gracias por elegirnos</h1>
          <p className="mt-5 leading-7 text-muted-foreground">Recibimos tu reserva y nos pondremos en contacto para coordinar el envío y la forma de pago.</p>
          <p className="mt-6 text-xs text-muted-foreground">Referencia: {orderId}</p>
          <Button asChild className="mt-9 rounded-full px-8"><Link to="/vinos/vino-fino-de-mesa">Volver a los vinos</Link></Button>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="min-h-[65vh] grid place-items-center px-5 text-center">
        <div>
          <h1 className="font-serif text-5xl">Tu carrito está vacío</h1>
          <Button asChild className="mt-8 rounded-full px-8"><Link to="/tienda">Descubrir los vinos</Link></Button>
        </div>
      </section>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 md:py-32">
      <h1 className="text-center font-serif text-4xl font-bold md:text-5xl">Finalizar compra</h1>
      <div className="mx-auto mt-12 grid max-w-4xl gap-16 md:grid-cols-2">
        <div>
          <h2 className="mb-6 font-serif text-2xl font-bold">Resumen del pedido</h2>
          <div className="space-y-5">
            {cart.map((item) => (
              <div key={`${item.id}-${item.isBox}`} className="flex items-center justify-between gap-5 border-b border-border/60 pb-5">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt="" className="h-20 w-14 object-contain" />
                  <div>
                    <p className="font-semibold">{item.name} <span className="text-sm text-muted-foreground">× {item.quantity}</span></p>
                    <p className="text-sm text-muted-foreground">{item.variety} · {item.isBox ? "Caja de 6" : "Botella"}</p>
                  </div>
                </div>
                <p>${(item.price * item.quantity * (item.isBox ? 6 * 0.9 : 1)).toLocaleString("es-AR")}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between border-t pt-6 text-xl font-bold"><p>Total</p><p>${total.toLocaleString("es-AR")}</p></div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">El importe definitivo se valida con precios y stock actuales al confirmar el pedido.</p>
        </div>

        <div>
          <h2 className="mb-6 font-serif text-2xl font-bold">Datos de envío</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>Nombre completo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="phone" render={({ field }) => <FormItem><FormLabel>Teléfono</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="address" render={({ field }) => <FormItem><FormLabel>Dirección</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="city" render={({ field }) => <FormItem><FormLabel>Ciudad</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                <FormField control={form.control} name="province" render={({ field }) => <FormItem><FormLabel>Provincia</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              </div>
              <FormField control={form.control} name="zip" render={({ field }) => <FormItem><FormLabel>Código postal</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              {submitError && <p role="alert" className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{submitError}</p>}
              <Button type="submit" disabled={submitting} className="w-full rounded-full">{submitting ? "Registrando pedido…" : "Confirmar pedido"}</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
