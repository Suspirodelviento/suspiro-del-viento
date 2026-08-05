import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, Heart, MapPin, Calendar, Award, Leaf, Utensils, ShieldCheck, CheckCircle2, Star, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { showSuccess } from '../utils/toast';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, toggleFavorite, isFavorite } = useShop();

  const product = products.find((p) => p.id === id) || products[0];
  const favorite = isFavorite(product.id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-3xl text-[#1A3323]">Producto no encontrado</h2>
        <Button onClick={() => navigate('/products')} className="bg-[#1A3323] text-white rounded-xl">
          Volver a la Tienda
        </Button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.subtitle,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showSuccess('Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A3323] hover:text-[#C85A32] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Catálogo
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#625846] hover:text-[#1A3323] bg-white border border-[#E3DEC3] px-3 py-1.5 rounded-full shadow-xs transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" /> Compartir
        </button>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Images Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-[#E3DEC3] shadow-md relative group">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#1A3323] text-[#F4F1EA] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" /> {product.badge}
              </span>
            )}

            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1A3323] hover:bg-white transition-colors shadow-md"
              title="Guardar en favoritos"
            >
              <Heart className={`w-5 h-5 ${favorite ? 'fill-[#C85A32] text-[#C85A32]' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#1A3323] shadow-md scale-105'
                      : 'border-[#E3DEC3] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Farm Quality Verification Box */}
          <div className="bg-[#1A3323] text-white p-6 rounded-3xl border border-[#2B523A] space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-[#D4AF37] font-serif font-bold text-sm">
              <ShieldCheck className="w-5 h-5" /> Finca Biodinámica Verificada
            </div>
            <p className="text-xs text-[#C8BFB0] leading-relaxed">
              Cultivado y elaborado por <strong className="text-white">{product.producerName}</strong> en {product.location}.
              Suelo vivo revitalizado con preparados 500 y 501 sin agrotóxicos ni procesos químicos industriales.
            </p>
            <Link
              to={`/producers/${product.producerId}`}
              className="inline-flex items-center gap-1 text-xs text-[#D4AF37] font-bold hover:underline pt-1"
            >
              Conocer la Finca {product.producerName} &rarr;
            </Link>
          </div>
        </div>

        {/* Right: Product Details & Specifications */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#284933] bg-[#E2EAD8] px-3 py-1 rounded-md">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-[#1A3323] bg-[#FAF7F0] px-2.5 py-1 rounded-md border border-[#E3DEC3]">
                <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                <span>{product.rating}</span>
                <span className="text-[#8A7E68]">({product.reviewCount} reseñas)</span>
              </div>
            </div>

            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A3323] leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-[#625846] leading-relaxed font-sans">
              {product.subtitle}
            </p>
          </div>

          {/* Price & Unit */}
          <div className="p-5 bg-white rounded-2xl border border-[#E3DEC3] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-[#8A7E68] block font-medium">Precio por {product.unit}</span>
              <div className="text-3xl font-serif font-bold text-[#1A3323]">
                ${product.price.toLocaleString('es-AR')} ARS
              </div>
            </div>

            <button
              onClick={() => toggleFavorite(product.id)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                favorite
                  ? 'bg-[#FDF5F2] border-[#C85A32] text-[#C85A32]'
                  : 'bg-[#FBF9F5] border-[#D8D2C0] text-[#1A3323] hover:bg-[#EFECE3]'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-[#C85A32]' : ''}`} />
              {favorite ? 'Guardado en Favoritos' : 'Añadir a Favoritos'}
            </button>
          </div>

          {/* Harvest & Terroir Metadata */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-[#EFF4EC] rounded-2xl border border-[#C8DAC0] space-y-1">
              <span className="text-[#786D58] block flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#284933]" /> Fecha de Cosecha
              </span>
              <strong className="text-[#1A3323] block">{product.harvestDate}</strong>
            </div>

            <div className="p-3.5 bg-[#EFF4EC] rounded-2xl border border-[#C8DAC0] space-y-1">
              <span className="text-[#786D58] block flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#284933]" /> Origen Terruño
              </span>
              <strong className="text-[#1A3323] block truncate">{product.location}</strong>
            </div>
          </div>

          {/* Product Story */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#1A3323] flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-[#284933]" /> Historia del Producto & Método
            </h3>
            <p className="text-xs text-[#524B3B] leading-relaxed bg-white p-4 rounded-2xl border border-[#E3DEC3]">
              {product.story}
            </p>
          </div>

          {/* Biodynamic Preparation Notes */}
          {product.biodynamicNotes && (
            <div className="p-4 bg-[#FAF7F0] border border-[#E5DFCE] rounded-2xl text-xs text-[#524128] space-y-1">
              <strong className="block text-[#1A3323] font-serif font-bold text-sm">
                Notas Astronómicas & Suelo Biodinámico:
              </strong>
              <p className="leading-relaxed">{product.biodynamicNotes}</p>
            </div>
          )}

          {/* Suggested Pairings */}
          {product.suggestedPairings && (
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#1A3323] flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-[#C85A32]" /> Maridaje Sugerido
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.suggestedPairings.map((pairing, i) => (
                  <span key={i} className="bg-[#EFECE3] text-[#1A3323] px-3 py-1 rounded-lg text-xs font-medium border border-[#E3DEC3]">
                    {pairing}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};