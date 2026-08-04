import React from 'react';
import { Heart, ShoppingBag, Eye, MapPin, Calendar, Award } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Button } from './ui/button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleFavorite, isFavorite, setSelectedProductModal } = useShop();
  const favorite = isFavorite(product.id);

  return (
    <div className="bg-[#FFFFFF] border border-[#E8E2D4] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative">
      
      {/* Image container */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#F2EFE8]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#1A3323]/90 text-[#F4F1EA] backdrop-blur-md text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Award className="w-3 h-3 text-[#D4AF37]" />
            {product.badge}
          </div>
        )}

        {/* Wishlist toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1A3323] hover:bg-white transition-colors shadow-sm"
          title="Save to favorites"
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-[#C85A32] text-[#C85A32]' : ''}`} />
        </button>

        {/* Quick View Button */}
        <button
          onClick={() => setSelectedProductModal(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 text-[#1A3323] hover:bg-[#1A3323] hover:text-white px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 shadow-md"
        >
          <Eye className="w-3.5 h-3.5" /> Quick View
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Producer & Region */}
          <div className="flex items-center gap-1.5 text-xs text-[#786D58] mb-1.5">
            <MapPin className="w-3 h-3 text-[#1A3323]" />
            <span className="font-medium truncate">{product.producerName}</span>
            <span>•</span>
            <span className="truncate">{product.location}</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setSelectedProductModal(product)}
            className="font-serif font-bold text-lg text-[#1A3323] hover:text-[#C85A32] cursor-pointer transition-colors line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-[#6B614E] mt-1 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>

          {/* Harvest Info */}
          <div className="mt-3 flex items-center gap-1 text-[11px] text-[#2C4A35] bg-[#EFF4EC] px-2.5 py-1 rounded-md w-fit">
            <Calendar className="w-3 h-3" />
            <span>Harvest: {product.harvestDate}</span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-5 pt-4 border-t border-[#F0ECE1] flex items-center justify-between">
          <div>
            <div className="text-xs text-[#8A7E68]">Price / {product.unit}</div>
            <div className="text-lg font-bold text-[#1A3323] font-serif">
              ${product.price.toLocaleString('es-AR')} ARS
            </div>
          </div>

          <Button
            onClick={() => addToCart(product)}
            className="bg-[#1A3323] hover:bg-[#284933] text-white rounded-xl px-3.5 py-2 text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};