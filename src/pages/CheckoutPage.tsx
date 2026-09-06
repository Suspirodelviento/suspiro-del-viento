import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useWineStore } from "../store/wineStore";

const formSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Teléfono inválido"),
  address: z.string().min(5, "Dirección muy corta"),
  city: z.string().min(3, "Ciudad inválida"),
  zip: z.string().min(4, "Código postal inválido"),
});

const CheckoutPage = () => {
  const { cart, total } = useWineStore(state => ({
    cart: state.cart,
    total: state.cart.reduce((acc, item) => acc + item.price * item.quantity * (item.isBox ? 6 * 0.9 : 1), 0)
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", address: "", city: "", zip: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const cartDetails = cart.map(item => 
      `${item.quantity} x ${item.name} (${item.isBox ? 'Caja' : 'Botella'})`
    ).join("\n");

    const message = `Hola Suspiro del Viento, quiero reservar mi pedido:\n\n${cartDetails}\n\nTotal: $${total.toLocaleString('es-AR')}\n\nMis datos de envío son:\nNombre: ${values.name}\nTeléfono: ${values.phone}\nDirección: ${values.address}, ${values.city}, ${values.zip}\nEmail: ${values.email}`;
    
    const whatsappUrl = `https://wa.me/5492611234567?text=${encodeURIComponent(message)}`; // Reemplazar con el número real
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto py-20 md:py-32 px-4">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-center">Finalizar Compra</h1>
      <div className="grid md:grid-cols-2 gap-16 mt-12 max-w-4xl mx-auto">
        <div>
          <h2 className="font-serif text-2xl font-bold mb-6">Resumen del Pedido</h2>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={`${item.id}-${item.isBox}`} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name} <span className="text-sm text-muted-foreground">x{item.quantity}</span></p>
                  <p className="text-sm text-muted-foreground">{item.isBox ? 'Caja de 6' : 'Botella'}</p>
                </div>
                <p>${(item.price * item.quantity * (item.isBox ? 6 * 0.9 : 1)).toLocaleString('es-AR')}</p>
              </div>
            ))}
          </div>
          <div className="border-t mt-6 pt-6 flex justify-between font-bold text-xl">
            <p>Total</p>
            <p>${total.toLocaleString('es-AR')}</p>
          </div>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold mb-6">Datos de Envío</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Nombre Completo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Teléfono (WhatsApp)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem><FormLabel>Dirección</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem><FormLabel>Ciudad</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="zip" render={({ field }) => (
                  <FormItem><FormLabel>Código Postal</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <Button type="submit" className="w-full">Confirmar Pedido por WhatsApp</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
