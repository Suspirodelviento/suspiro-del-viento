import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, MapPin, Calendar, Award, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleFavorite, isFavorite } = useShop();
  const favorite = isFavorite(product.id);

  return (
    <div className="bg-[#FFFFFF] border border-[#E8E2D4] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative">
      
      {/* Image container */}
      <Link to={`/products/${product.id}`} className="relative aspect-4/3 overflow-hidden bg-[#F2EFE8] block">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#1A3323]/90 text-[#F4F1EA] backdrop-blur-md text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm z-10">
            <Award className="w-3 h-3 text-[#D4AF37]" />
            {product.badge}
          </div>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/95 text-[#1A3323] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#284933]" /> Ver Producto
          </span>
        </div>
      </Link>

      {/* Wishlist toggle */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(product.id);
        }}
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1A3323] hover:bg-white transition-colors shadow-sm"
        title="Guardar en favoritos"
      >
        <Heart className={`w-4 h-4 ${favorite ? 'fill-[#C85A32] text-[#C85A32]' : ''}`} />
      </button>

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
          <Link
            to={`/products/${product.id}`}
            className="font-serif font-bold text-lg text-[#1A3323] hover:text-[#C85A32] transition-colors line-clamp-1 block"
          >
            {product.name}
          </Link>

          {/* Subtitle */}
          <p className="text-xs text-[#6B614E] mt-1 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>

          {/* Harvest Info & Rating */}
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1 text-[#2C4A35] bg-[#EFF4EC] px-2.5 py-1 rounded-md">
              <Calendar className="w-3 h-3" />
              <span>Cosecha: {product.harvestDate}</span>
            </div>

            <div className="flex items-center gap-1 text-[#1A3323] font-bold">
              <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
              <span>{product.rating}</span>
            </div>
          </div>
        </div>

        {/* Price & View Page Link */}
        <div className="mt-5 pt-4 border-t border-[#F0ECE1] flex items-center justify-between">
          <div>
            <div className="text-[10px] text-[#8A7E68]">Precio / {product.unit}</div>
            <div className="text-base font-bold text-[#1A3323] font-serif">
              ${product.price.toLocaleString('es-AR')} ARS
            </div>
          </div>

          <Link
            to={`/products/${product.id}`}
            className="bg-[#1A3323] hover:bg-[#284933] text-white rounded-xl px-3.5 py-2 text-xs font-semibold flex items-center gap-1 shadow-xs transition-all"
          >
            Ver Ficha
          </Link>
        </div>
      </div>
    </div>
  );
};