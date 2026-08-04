import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Landmark, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MENDOZA_DELIVERY_ZONES } from '../data/mockData';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface CheckoutModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, onSuccess }) => {
  const { cartTotal, selectedZoneId, placeOrder } = useShop();
  const [paymentMethod, setPaymentMethod] = useState<'Mercado Pago' | 'Credit Card' | 'Bank Transfer'>('Mercado Pago');
  const [address, setAddress] = useState('Chacras de Coria, Luján de Cuyo, Mendoza');
  const [name, setName] = useState('Sofia Rodriguez');
  const [phone, setPhone] = useState('+54 261 555 3912');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const activeZone = MENDOZA_DELIVERY_ZONES.find((z) => z.id === selectedZoneId) || MENDOZA_DELIVERY_ZONES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder(paymentMethod, `${address} (${name}, Tel: ${phone})`);
      setCompletedOrder(order);
      setIsSubmitting(false);
    }, 1200);
  };

  if (completedOrder) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-[#FBF9F5] rounded-3xl p-8 w-full max-w-lg border border-[#D5CFBE] text-center space-y-4 animate-in zoom-in-95">
          <div className="w-16 h-16 bg-[#284933] text-[#D4AF37] rounded-full flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-[#1A3323]">Order Confirmed!</h3>
          <p className="text-xs text-[#524B3B] leading-relaxed">
            Thank you for supporting small Mendoza biodynamic producers. Your harvest box will be prepared and delivered according to cosmic freshness standards.
          </p>

          <div className="bg-[#EFF4EC] p-4 rounded-2xl text-left text-xs space-y-2 border border-[#C8DAC0]">
            <div><strong className="text-[#1A3323]">Order ID:</strong> {completedOrder.id}</div>
            <div><strong className="text-[#1A3323]">Tracking Code:</strong> {completedOrder.trackingCode}</div>
            <div><strong className="text-[#1A3323]">Delivery Zone:</strong> {activeZone.name}</div>
            <div><strong className="text-[#1A3323]">Estimated Delivery:</strong> {completedOrder.deliveryDate}</div>
            <div><strong className="text-[#1A3323]">Payment via:</strong> {completedOrder.paymentMethod}</div>
          </div>

          <Button
            onClick={onSuccess}
            className="w-full bg-[#1A3323] text-white rounded-xl h-11 text-xs font-semibold"
          >
            Done & View Account
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FBF9F5] border border-[#D5CFBE] rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Truck className="w-5 h-5 text-[#284933]" />
          <h2 className="font-serif font-bold text-2xl text-[#1A3323]">Fast Mendoza Checkout</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A3323]">Delivery Recipient</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#524B3B] block mb-1">Full Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white border-[#C8C2B0] text-xs h-10"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#524B3B] block mb-1">WhatsApp / Phone</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white border-[#C8C2B0] text-xs h-10"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#524B3B] block mb-1">Delivery Address in Mendoza</label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-white border-[#C8C2B0] text-xs h-10"
                required
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A3323]">Payment Method</h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'Mercado Pago', label: 'Mercado Pago', icon: ShieldCheck },
                { key: 'Credit Card', label: 'Credit Card', icon: CreditCard },
                { key: 'Bank Transfer', label: 'Bank Transfer', icon: Landmark }
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.key;
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setPaymentMethod(m.key as any)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'border-[#1A3323] bg-[#E2EAD8] text-[#1A3323] font-bold shadow-xs'
                        : 'border-[#D8D2C0] bg-white text-[#6B614E] hover:border-[#1A3323]'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#284933]" />
                    <span className="text-[11px]">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-[#EFF4EC] p-4 rounded-2xl border border-[#C8DAC0] flex justify-between items-center text-xs">
            <div>
              <span className="text-[#524B3B] block">Zone: {activeZone.name}</span>
              <strong className="text-[#1A3323] font-serif text-base">Total: ${cartTotal.toLocaleString('es-AR')} ARS</strong>
            </div>
            <span className="text-[10px] text-[#284933] font-bold bg-white px-2.5 py-1 rounded-md border border-[#B3C8A9]">
              Encrypted Checkout
            </span>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1A3323] hover:bg-[#284933] text-white rounded-xl h-12 text-sm font-semibold shadow-lg"
          >
            {isSubmitting ? 'Processing Order...' : `Confirm Order — $${cartTotal.toLocaleString('es-AR')} ARS`}
          </Button>
        </form>
      </div>
    </div>
  );
};