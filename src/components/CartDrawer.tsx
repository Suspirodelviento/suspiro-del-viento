import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, MapPin, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MENDOZA_DELIVERY_ZONES } from '../data/mockData';
import { Button } from './ui/button';
import { CheckoutModal } from './CheckoutModal';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    selectedZoneId,
    setSelectedZoneId
  } = useShop();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const activeZone = MENDOZA_DELIVERY_ZONES.find((z) => z.id === selectedZoneId) || MENDOZA_DELIVERY_ZONES[0];

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
        <div className="bg-[#FBF9F5] w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl animate-in slide-in-from-right duration-300 border-l border-[#D8D2C2]">
          
          {/* Drawer Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E3DEC8]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#1A3323]" />
                <h2 className="font-serif font-bold text-xl text-[#1A3323]">Your Harvest Cart</h2>
                <span className="text-xs text-[#8A7E68]">({cart.length} items)</span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-gray-500 hover:text-black rounded-full hover:bg-[#EFECE3]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery Zone Selector */}
            <div className="mt-4 p-3 bg-[#EFF4EC] border border-[#C8DAC0] rounded-xl text-xs space-y-1.5">
              <label className="font-bold text-[#1A3323] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#284933]" /> Select Mendoza Delivery Zone:
              </label>
              <select
                value={selectedZoneId}
                onChange={(e) => setSelectedZoneId(e.target.value)}
                className="w-full bg-white border border-[#B3C8A9] rounded-lg p-2 text-xs font-medium text-[#1A3323] focus:outline-none"
              >
                {MENDOZA_DELIVERY_ZONES.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name} ({zone.fee === 0 ? 'Free' : `$${zone.fee} ARS`})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-[#425942] flex items-center gap-1">
                <Truck className="w-3 h-3" /> Delivery time: {activeZone.estimatedHours}
              </p>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 my-2 pr-1">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-[#786F5E]">
                <ShoppingBag className="w-12 h-12 text-[#C8C2B0]" />
                <p className="font-serif text-lg font-medium text-[#1A3323]">Your cart is empty</p>
                <p className="text-xs">Explore certified biodynamic wines, honey, olive oil, and organic harvest baskets.</p>
                <Button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#1A3323] text-white rounded-full text-xs px-5 py-2 mt-2"
                >
                  Browse Terroir
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-3 rounded-2xl border border-[#E8E2D4] flex items-center gap-3 shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl bg-[#F0ECE1]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-serif font-bold text-[#1A3323] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-[#786F5E] truncate">{item.product.producerName}</p>
                    <p className="text-xs font-bold text-[#1A3323] mt-1">
                      ${item.product.price.toLocaleString('es-AR')} ARS
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 bg-[#F2EFE8] rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-5 h-5 bg-white text-[#1A3323] rounded font-bold text-xs flex items-center justify-center hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold px-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-5 h-5 bg-white text-[#1A3323] rounded font-bold text-xs flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 hover:text-red-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Summary */}
          {cart.length > 0 && (
            <div className="pt-4 border-t border-[#E3DEC8] space-y-3">
              <div className="space-y-1.5 text-xs text-[#524B3B]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1A3323]">${cartSubtotal.toLocaleString('es-AR')} ARS</span>
                </div>
                <div className="flex justify-between">
                  <span>Mendoza Delivery ({activeZone.name})</span>
                  <span className="font-semibold text-[#1A3323]">
                    {deliveryFee === 0 ? <strong className="text-[#284933]">FREE</strong> : `$${deliveryFee.toLocaleString('es-AR')} ARS`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E3DEC8] text-base font-serif font-bold text-[#1A3323]">
                  <span>Total</span>
                  <span>${cartTotal.toLocaleString('es-AR')} ARS</span>
                </div>
              </div>

              <Button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-[#1A3323] hover:bg-[#284933] text-white rounded-xl h-12 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </Button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#786D58]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#284933]" /> Mercado Pago • Credit Cards • Direct Bank Transfer
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Popup */}
      {isCheckoutOpen && (
        <CheckoutModal
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={() => {
            setIsCheckoutOpen(false);
            setIsCartOpen(false);
          }}
        />
      )}
    </>
  );
};