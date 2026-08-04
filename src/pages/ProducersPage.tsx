import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCERS } from '../data/mockData';
import { MapPin, Award, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

export const ProducersPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-[#284933] bg-[#E2EAD8] px-3 py-1 rounded-full inline-flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Authentic Mendoza Estates
        </span>
        <h1 className="font-serif font-bold text-4xl sm:text-6xl text-[#1A3323]">
          Meet Our Biodynamic Producers
        </h1>
        <p className="text-xs sm:text-base text-[#625846] leading-relaxed">
          We work exclusively with certified family estates who nurture living soil in Valle de Uco, Luján de Cuyo, and Tupungato.
        </p>
      </div>

      {/* Simulated Map Banner */}
      <div className="bg-[#1A3323] text-white p-8 rounded-3xl border border-[#2B523A] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl z-10">
          <div className="flex items-center gap-2 text-xs uppercase text-[#D4AF37] font-bold">
            <MapPin className="w-4 h-4" /> Interactive Mendoza Terroir Map
          </div>
          <h3 className="font-serif font-bold text-2xl text-white">
            High-Altitude Andean Soil Zones
          </h3>
          <p className="text-xs text-[#C8BFB0] leading-relaxed">
            From Vista Flores at 1,100 meters to Gualtallary at 1,400 meters, explore how snow-melt irrigation and gravel terroir create unique food character.
          </p>
        </div>

        <div className="bg-[#244530] p-4 rounded-2xl border border-[#30593E] text-xs space-y-2 z-10 min-w-[240px]">
          <div className="font-bold text-[#D4AF37] border-b border-[#30593E] pb-1">
            Certified Zones:
          </div>
          <div className="flex items-center gap-2 text-[#E3DCCE]">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" /> Valle de Uco (Tunuyán / Tupungato)
          </div>
          <div className="flex items-center gap-2 text-[#E3DCCE]">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" /> Agrelo (Luján de Cuyo)
          </div>
          <div className="flex items-center gap-2 text-[#E3DCCE]">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" /> Maipú & San Rafael
          </div>
        </div>
      </div>

      {/* Producer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRODUCERS.map((producer) => (
          <div
            key={producer.id}
            className="bg-white border border-[#E3DEC3] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-16/10 overflow-hidden bg-[#EFECE3]">
                <img
                  src={producer.heroImage}
                  alt={producer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 bg-[#1A3323] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <MapPin className="w-3 h-3 text-[#D4AF37]" /> {producer.region}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={producer.portraitImage}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[#1A3323]">{producer.name}</h3>
                    <p className="text-[11px] text-[#786D58]">{producer.location}</p>
                  </div>
                </div>

                <p className="text-xs text-[#524B3B] leading-relaxed line-clamp-3">
                  {producer.story}
                </p>

                <div className="pt-2 text-[11px] text-[#284933] font-semibold space-y-1 bg-[#EFF4EC] p-3 rounded-xl">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {producer.certification}
                  </div>
                  <div className="text-[#625846]">
                    Size: {producer.sizeHectares} Hectares • {producer.yearsFarming} Years Farming
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link to={`/producers/${producer.id}`}>
                <Button className="w-full bg-[#1A3323] hover:bg-[#284933] text-white rounded-xl text-xs font-semibold h-11 flex items-center justify-center gap-1.5 shadow-md">
                  View Full Farm Profile <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};