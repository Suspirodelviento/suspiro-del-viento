import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useWineStore } from "../store/wineStore";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useWineStore();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity * (item.isBox ? 6 : 1), 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {cart.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">Carrito</SheetTitle>
        </SheetHeader>
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-muted-foreground">Tu carrito está vacío.</p>
            <Button asChild variant="link" className="mt-4">
              <Link to="/tienda">Ir a la tienda</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto my-4 pr-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.isBox}`} className="flex items-start justify-between py-4 border-b">
                  <div className="flex items-start space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.isBox ? "Caja de 6" : "Botella"}</p>
                      <p className="text-sm font-bold mt-1">${(item.price * (item.isBox ? 6 * 0.9 : 1)).toLocaleString('es-AR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.id, item.isBox, parseInt(e.target.value))}
                      className="w-16 text-center border rounded-md"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id, item.isBox)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between font-bold text-lg">
                <p>Subtotal</p>
                <p>${total.toLocaleString('es-AR')}</p>
              </div>
              <Button asChild className="w-full">
                <Link to="/checkout">Finalizar Compra</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>Vaciar Carrito</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
