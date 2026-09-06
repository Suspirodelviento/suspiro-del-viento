import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useWineStore } from "@/store/wineStore";

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useWineStore();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity * (item.isBox ? 6 * 0.9 : 1),
    0,
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full" aria-label={`Abrir carrito, ${itemCount} productos`}>
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-[94vw] flex-col border-l-border/60 bg-background p-6 sm:max-w-md sm:p-8">
        <SheetHeader className="text-left">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Tu selección</p>
          <SheetTitle className="font-serif text-3xl font-medium">Carrito</SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" strokeWidth={1.3} />
            <p className="mt-5 text-muted-foreground">Tu carrito está vacío.</p>
            <Button asChild variant="link" className="mt-3 text-primary"><Link to="/tienda">Descubrir los vinos</Link></Button>
          </div>
        ) : (
          <>
            <div className="my-6 flex-1 space-y-1 overflow-y-auto pr-2">
              {cart.map((item) => {
                const unitPrice = item.price * (item.isBox ? 6 * 0.9 : 1);
                return (
                  <div key={`${item.id}-${item.isBox}`} className="flex gap-4 border-b border-border/60 py-5">
                    <img src={item.image} alt="" className="h-24 w-16 shrink-0 object-contain" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-serif text-xl leading-none">{item.name}</p>
                          <p className="mt-2 text-xs text-muted-foreground">{item.variety} · {item.isBox ? "Caja de 6" : "Botella"}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="-mr-2 -mt-2 h-8 w-8 rounded-full" onClick={() => removeFromCart(item.id, item.isBox)} aria-label={`Eliminar ${item.name}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="mt-3 text-sm">${unitPrice.toLocaleString("es-AR")} c/u</p>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center rounded-full border border-border">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.id, item.isBox, item.quantity - 1)} aria-label="Disminuir cantidad"><Minus className="h-3 w-3" /></Button>
                          <span className="w-8 text-center text-sm" aria-label={`Cantidad ${item.quantity}`}>{item.quantity}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.id, item.isBox, item.quantity + 1)} aria-label="Aumentar cantidad"><Plus className="h-3 w-3" /></Button>
                        </div>
                        <p className="font-medium">${(unitPrice * item.quantity).toLocaleString("es-AR")}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-4 border-t border-border pt-5">
              <div className="flex justify-between font-serif text-2xl"><p>Subtotal</p><p>${total.toLocaleString("es-AR")}</p></div>
              <p className="text-xs text-muted-foreground">El envío se coordina después de confirmar la reserva.</p>
              <Button asChild className="w-full rounded-full"><Link to="/checkout">Finalizar compra</Link></Button>
              <Button variant="ghost" className="w-full rounded-full text-muted-foreground" onClick={clearCart}>Vaciar carrito</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
