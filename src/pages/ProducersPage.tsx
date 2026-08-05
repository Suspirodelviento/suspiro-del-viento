import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCERS, PRODUCTS } from '../data/mockData';
import { ProducerMap } from '../components/ProducerMap';
import { MapPin, Award, CheckCircle2, ShieldCheck, ArrowRight, Search, Leaf, Sprout, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export const ProducersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedProducerMapId, setSelectedProducerMapId] = useState<string | undefined>(undefined);

  const regions = ['All', 'Valle de Uco', 'Luján de Cuyo', 'Maipú', 'San Rafael'];

  const filteredProducers = PRODUCERS.filter((producer) => {
    const matchesRegion = selectedRegion === 'All' || producer.region === selectedRegion;
    const matchesSearch =
      searchQuery.trim() === '' ||
      producer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producer.story.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-[#284933] bg-[#E2EAD8] px-3.5 py-1 rounded-full inline-flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Directorio de Fincas Auténticas
        </span>
        <h1 className="font-serif font-bold text-4xl sm:text-6xl text-[#1A3323]">
          Nuestros Productores Biodinámicos
        </h1>
        <p className="text-xs sm:text-base text-[#625846] leading-relaxed">
          Trabajamos exclusivamente con familias agricultoras certificadas por Demeter que cuidan suelos vivos en el Valle de Uco, Luján de Cuyo y Maipú.
        </p>
      </div>

      {/* Interactive Leaflet Map */}
      <section className="space-y-4">
        <ProducerMap
          producers={filteredProducers}
          selectedProducerId={selectedProducerMapId}
          onSelectProducer={(p) => setSelectedProducerMapId(p.id)}
        />
      </section>

      {/* Controls / Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E3DEC3] shadow-xs space-y-4">
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por finca, familia, región o certificación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#FBF9F5] border-[#D8D2C0] text-xs h-11 rounded-xl focus-visible:ring-[#1A3323]"
          />
        </div>

        {/* Region Pills */}
        <div className="flex flex-wrap gap-2 justify-center pt-2 border-t border-[#F0ECE1]">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedRegion === reg
                  ? 'bg-[#1A3323] text-white shadow-sm'
                  : 'bg-[#F2EFE8] text-[#524B3B] hover:bg-[#E5E0D0]'
              }`}
            >
              {reg === 'All' ? 'Todas las Regiones' : reg}
            </button>
          ))}
        </div>
      </div>

      {/* Producer Cards Grid */}
      <div className="space-y-10">
        <div className="border-b border-[#E3DEC8] pb-3 flex justify-between items-center">
          <h2 className="font-serif font-bold text-2xl text-[#1A3323]">
            Fincas y Familias ({filteredProducers.length})
          </h2>
          <span className="text-xs text-[#786D58]">
            Certificación Demeter Internacional
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProducers.map((producer) => {
            const producerProducts = PRODUCTS.filter((p) => p.producerId === producer.id);

            return (
              <div
                key={producer.id}
                className="bg-white border border-[#E3DEC3] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Hero Image */}
                  <div className="relative aspect-16/10 overflow-hidden bg-[#EFECE3]">
                    <img
                      src={producer.heroImage}
                      alt={producer.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#1A3323]/90 text-white backdrop-blur-md text-[10px] uppercase font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" /> {producer.region}
                    </div>

                    <div className="absolute top-3 right-3 bg-[#284933] text-[#D4AF37] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Award className="w-3 h-3" /> Demeter Certified
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    {/* Portrait & Title */}
                    <div className="flex items-center gap-3">
                      <img
                        src={producer.portraitImage}
                        alt={producer.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37] shrink-0"
                      />
                      <div>
                        <h3 className="font-serif font-bold text-xl text-[#1A3323]">{producer.name}</h3>
                        <p className="text-[11px] text-[#786D58] flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#284933]" /> {producer.location}
                        </p>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs italic text-[#284933] font-serif font-medium bg-[#FAF7F0] p-2.5 rounded-xl border border-[#EDE8DA]">
                      "{producer.tagline}"
                    </p>

                    {/* Story snippet */}
                    <p className="text-xs text-[#524B3B] leading-relaxed line-clamp-3">
                      {producer.story}
                    </p>

                    {/* Farm Details */}
                    <div className="pt-2 text-[11px] text-[#284933] font-semibold space-y-1.5 bg-[#EFF4EC] p-3.5 rounded-xl border border-[#C8DAC0]">
                      <div className="flex items-center gap-1 text-[#1A3323]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#284933]" /> {producer.certification}
                      </div>
                      <div className="text-[#625846] flex justify-between">
                        <span>Extensión: <strong>{producer.sizeHectares} Hectáreas</strong></span>
                        <span>Experiencia: <strong>{producer.yearsFarming} años</strong></span>
                      </div>
                    </div>

                    {/* Products Produced preview */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#786D58] block">
                        Cosecha en Mercado ({producerProducts.length}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {producerProducts.map((prod) => (
                          <span
                            key={prod.id}
                            className="text-[10px] bg-[#F2EFE8] text-[#1A3323] px-2.5 py-1 rounded-md font-medium border border-[#E3DEC3]"
                          >
                            {prod.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Button */}
                <div className="p-6 pt-0">
                  <Link to={`/producers/${producer.id}`}>
                    <Button className="w-full bg-[#1A3323] hover:bg-[#284933] text-white rounded-xl text-xs font-semibold h-11 flex items-center justify-center gap-1.5 shadow-md">
                      Ver Historia & Galería <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};