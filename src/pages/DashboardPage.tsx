import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Package, Heart, MapPin, CreditCard, Clock, Truck, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';

export const DashboardPage: React.FC = () => {
  const { orders, favorites, products } = useShop();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-[#1A3323] text-white p-8 rounded-3xl border border-[#2B523A] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Mendoza Member Account</span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-white mt-1">
            Welcome back, Sofia
          </h1>
          <p className="text-xs text-[#C8BFB0] mt-1">
            Tracking active harvest box deliveries & saved biodynamic favorites
          </p>
        </div>

        <div className="bg-[#244530] px-4 py-3 rounded-2xl border border-[#30593E] text-xs">
          <span className="text-[#D4AF37] font-bold block">Delivery Zone:</span>
          <span className="text-white font-medium">Chacras de Coria, Luján de Cuyo</span>
        </div>
      </div>

      {/* Orders Tracking */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-[#E3DEC8] pb-3">
          <Package className="w-5 h-5 text-[#284933]" />
          <h2 className="font-serif font-bold text-2xl text-[#1A3323]">Order Tracking & History</h2>
        </div>

        {orders.length === 0 ? (
          <p className="text-xs text-[#786D58]">No orders placed yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-[#E3DEC3] p-6 rounded-3xl shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#F0ECE1] pb-3">
                  <div>
                    <span className="text-xs text-[#8A7E68]">Order ID: <strong className="text-[#1A3323]">{order.id}</strong></span>
                    <span className="text-xs text-[#8A7E68] ml-4">Date: {order.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#EFF4EC] text-[#284933] font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> {order.status}
                    </span>
                    <span className="text-xs font-bold text-[#1A3323]">
                      ${order.totalPrice.toLocaleString('es-AR')} ARS
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-[#524B3B]">
                  <div>
                    <strong className="block text-[#1A3323] mb-0.5">Tracking Number:</strong>
                    {order.trackingCode}
                  </div>
                  <div>
                    <strong className="block text-[#1A3323] mb-0.5">Address:</strong>
                    {order.deliveryAddress}
                  </div>
                  <div>
                    <strong className="block text-[#1A3323] mb-0.5">Payment Method:</strong>
                    {order.paymentMethod}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F0ECE1] flex flex-wrap gap-2 text-xs">
                  {order.items.map((item, i) => (
                    <span key={i} className="bg-[#F2EFE8] px-2.5 py-1 rounded-lg text-[#1A3323] font-medium">
                      {item.quantity}x {item.product.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Saved Favorites / Wishlist */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-[#E3DEC8] pb-3">
          <Heart className="w-5 h-5 text-[#C85A32]" />
          <h2 className="font-serif font-bold text-2xl text-[#1A3323]">Saved Favorites ({favoriteProducts.length})</h2>
        </div>

        {favoriteProducts.length === 0 ? (
          <p className="text-xs text-[#786D58]">No saved items in your wishlist.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};