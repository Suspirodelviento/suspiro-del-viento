import React from 'react';
import { X, MapPin, Calendar, Award, Leaf, Utensils, Heart, ShoppingBag, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Button } from './ui/button';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductModal, setSelectedProductModal, addToCart, toggleFavorite, isFavorite } = useShop();

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const favorite = isFavorite(product.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FBF9F5] border border-[#D5CFBE] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductModal(null)}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-[#1A3323] p-2 rounded-full shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image Gallery */}
          <div className="p-6 bg-[#F3EFE6] flex flex-col gap-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-inner">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-[#D8D2C0]">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Farm Verification Card */}
            <div className="bg-[#1A3323] text-[#F4F1EA] p-4 rounded-2xl text-xs space-y-2 mt-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-serif font-bold text-sm">
                <ShieldCheck className="w-4 h-4" /> Certified Biodynamic Estate
              </div>
              <p className="text-[#D3CBC0] leading-relaxed">
                Produced by <strong className="text-white">{product.producerName}</strong> in {product.location}.
                Guaranteed zero synthetic chemicals, heavy metals, or GMOs.
              </p>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#8A775E] bg-[#EFECE3] px-2.5 py-1 rounded-md">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="text-xs font-bold text-[#1A3323] bg-[#E2EAD8] px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#284933]" /> {product.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A3323] leading-tight">
                {product.name}
              </h2>

              <p className="text-sm text-[#625846] mt-2 leading-relaxed">
                {product.subtitle}
              </p>

              {/* Price Tag */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-[#1A3323]">
                  ${product.price.toLocaleString('es-AR')} ARS
                </span>
                <span className="text-xs text-[#8A7E68]">per {product.unit}</span>
              </div>

              {/* Harvest details */}
              <div className="mt-4 p-3 bg-[#EFF4EC] rounded-xl text-xs text-[#1A3323] space-y-1">
                <div className="flex items-center gap-2 font-medium">
                  <Calendar className="w-4 h-4 text-[#284933]" /> Harvested: {product.harvestDate}
                </div>
                <div className="flex items-center gap-2 text-[#524B3B]">
                  <MapPin className="w-4 h-4 text-[#284933]" /> Location: {product.location}
                </div>
              </div>

              {/* Story */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A3323] flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-[#284933]" /> Product Story & Terroir
                </h4>
                <p className="text-xs text-[#4A4234] leading-relaxed">
                  {product.story}
                </p>
              </div>

              {/* Biodynamic Preparation notes */}
              {product.biodynamicNotes && (
                <div className="mt-4 p-3 bg-[#FAF5E8] border border-[#E3D9C3] rounded-xl text-xs text-[#524128]">
                  <strong className="block font-semibold text-[#1A3323] mb-1">
                    Biodynamic Soil & Cosmic Notes:
                  </strong>
                  {product.biodynamicNotes}
                </div>
              )}

              {/* Suggested Recipe / Pairings */}
              {product.suggestedPairings && (
                <div className="mt-4 text-xs space-y-1">
                  <span className="font-bold text-[#1A3323] flex items-center gap-1">
                    <Utensils className="w-3.5 h-3.5 text-[#C85A32]" /> Pairings:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.suggestedPairings.map((p, i) => (
                      <span key={i} className="bg-[#EFECE3] text-[#524B3B] px-2 py-0.5 rounded-md">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E8E2D4] flex items-center gap-3">
              <button
                onClick={() => toggleFavorite(product.id)}
                className={`p-3 rounded-xl border border-[#D5CFBE] hover:bg-[#EFECE3] transition-colors ${
                  favorite ? 'text-[#C85A32] bg-[#FDF5F2]' : 'text-[#1A3323]'
                }`}
              >
                <Heart className={`w-5 h-5 ${favorite ? 'fill-[#C85A32]' : ''}`} />
              </button>

              <Button
                onClick={() => {
                  addToCart(product);
                  setSelectedProductModal(null);
                }}
                className="flex-1 bg-[#1A3323] hover:bg-[#284933] text-white rounded-xl h-12 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                Add to Mendoza Cart — ${product.price.toLocaleString('es-AR')} ARS
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};