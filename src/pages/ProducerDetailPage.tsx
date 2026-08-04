import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCERS, PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { MapPin, ShieldCheck, CheckCircle2, Award, ArrowLeft, Leaf } from 'lucide-react';
import { Button } from '../components/ui/button';

export const ProducerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const producer = PRODUCERS.find((p) => p.id === id) || PRODUCERS[0];
  const producerProducts = PRODUCTS.filter((p) => p.producerId === producer.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back button */}
      <Link to="/producers" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A3323] hover:text-[#C85A32]">
        <ArrowLeft className="w-4 h-4" /> Back to Mendoza Producers Directory
      </Link>

      {/* Hero Farm Header */}
      <div className="relative rounded-3xl overflow-hidden bg-[#1A3323] text-white p-8 sm:p-12 border border-[#2B523A] shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img src={producer.heroImage} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A3323] via-[#1A3323]/90 to-transparent" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] bg-[#D4AF37]/20 px-3 py-1 rounded-full inline-flex items-center gap-1 border border-[#D4AF37]/40">
              <ShieldCheck className="w-3.5 h-3.5" /> {producer.certification}
            </span>
            <h1 className="font-serif font-bold text-3xl sm:text-5xl text-white">
              {producer.name}
            </h1>
            <p className="text-sm text-[#D8D0C0] italic font-serif">
              "{producer.tagline}"
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#C8BFB0] pt-2">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#D4AF37]" /> {producer.location}</span>
              <span>•</span>
              <span>{producer.sizeHectares} Hectares</span>
              <span>•</span>
              <span>{producer.yearsFarming} Years Biodynamic</span>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center md:justify-end">
            <img
              src={producer.portraitImage}
              alt={producer.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover border-4 border-[#D4AF37] shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Philosophy & Practices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#E3DEC3] shadow-xs space-y-6">
          <h3 className="font-serif font-bold text-2xl text-[#1A3323] flex items-center gap-2">
            <Leaf className="w-5 h-5 text-[#284933]" /> Farm Story & Philosophy
          </h3>
          <p className="text-xs sm:text-sm text-[#524B3B] leading-relaxed">
            {producer.story}
          </p>
          <div className="p-4 bg-[#FAF7F0] border border-[#E5DFCE] rounded-2xl text-xs text-[#524128]">
            <strong className="block text-[#1A3323] font-bold mb-1">Estate Philosophy:</strong>
            {producer.philosophy}
          </div>
          <div>
            <strong className="block text-[#1A3323] font-bold text-xs uppercase tracking-wider mb-2">Family History:</strong>
            <p className="text-xs text-[#625846] leading-relaxed">{producer.familyHistory}</p>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#EFF4EC] p-8 rounded-3xl border border-[#C8DAC0] space-y-4">
          <h4 className="font-serif font-bold text-xl text-[#1A3323] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#284933]" /> Verified Farm Practices
          </h4>
          <ul className="space-y-2.5 text-xs text-[#1A3323]">
            {producer.practices.map((practice, i) => (
              <li key={i} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-[#B3C8A9]">
                <CheckCircle2 className="w-4 h-4 text-[#284933] shrink-0 mt-0.5" />
                <span>{practice}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Products from this farm */}
      <div className="space-y-6">
        <div className="border-b border-[#E3DEC8] pb-3">
          <h3 className="font-serif font-bold text-2xl text-[#1A3323]">
            Products Harvested at {producer.name}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {producerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
};