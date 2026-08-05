import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCERS, PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { ProducerMap } from '../components/ProducerMap';
import { ProducerGallery } from '../components/ProducerGallery';
import { MapPin, ShieldCheck, CheckCircle2, Award, ArrowLeft, Leaf, Sprout, Wine, Globe, Instagram, Mail, Phone, ExternalLink, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';

export const ProducerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const producer = PRODUCERS.find((p) => p.id === id) || PRODUCERS[0];
  const producerProducts = PRODUCTS.filter((p) => p.producerId === producer.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back button */}
      <Link to="/producers" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A3323] hover:text-[#C85A32] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Volver al Directorio de Productores
      </Link>

      {/* 1. HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-[#1A3323] text-white p-8 sm:p-12 border border-[#2B523A] shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img src={producer.heroImage} alt={producer.name} className="w-full h-full object-cover opacity-35 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A3323] via-[#1A3323]/90 to-transparent" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] bg-[#D4AF37]/20 px-3 py-1 rounded-full inline-flex items-center gap-1 border border-[#D4AF37]/40">
                <ShieldCheck className="w-3.5 h-3.5" /> {producer.certification}
              </span>
              <span className="text-xs font-bold text-white bg-[#284933] px-3 py-1 rounded-full flex items-center gap-1">
                {producer.category === 'Winery' ? <Wine className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Sprout className="w-3.5 h-3.5 text-[#D4AF37]" />}
                {producer.category}
              </span>
              {producer.status === 'Temporarily Closed' && (
                <span className="text-xs font-bold text-white bg-red-800 px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Temporalmente Cerrado
                </span>
              )}
            </div>

            <h1 className="font-serif font-bold text-3xl sm:text-5xl text-white">
              {producer.name}
            </h1>

            <p className="text-sm sm:text-base text-[#D8D0C0] italic font-serif">
              "{producer.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-[#C8BFB0] leading-relaxed max-w-2xl font-sans">
              {producer.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#C8BFB0] pt-2">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#D4AF37]" /> {producer.location}</span>
              <span>•</span>
              <span><strong>{producer.sizeHectares}</strong> Hectáreas</span>
              <span>•</span>
              <span><strong>{producer.yearsFarming} años</strong> de Práctica Biodinámica</span>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center md:justify-end">
            <img
              src={producer.portraitImage}
              alt={producer.name}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover border-4 border-[#D4AF37] shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* 2. STORY & FARM PHILOSOPHY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Story Column */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#E3DEC3] shadow-xs space-y-6">
          <h3 className="font-serif font-bold text-2xl text-[#1A3323] flex items-center gap-2">
            <Leaf className="w-5 h-5 text-[#284933]" /> Historia & Filosofía del Productor
          </h3>

          <p className="text-xs sm:text-sm text-[#524B3B] leading-relaxed">
            {producer.story}
          </p>

          <div className="p-4 bg-[#FAF7F0] border border-[#E5DFCE] rounded-2xl text-xs text-[#524128]">
            <strong className="block text-[#1A3323] font-bold text-sm mb-1">Filosofía Agrícola:</strong>
            {producer.philosophy}
          </div>

          <div>
            <strong className="block text-[#1A3323] font-bold text-xs uppercase tracking-wider mb-2">Trayectoria Familiar:</strong>
            <p className="text-xs text-[#625846] leading-relaxed">{producer.familyHistory}</p>
          </div>
        </div>

        {/* Right Practices Column */}
        <div className="lg:col-span-5 bg-[#EFF4EC] p-8 rounded-3xl border border-[#C8DAC0] space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-xl text-[#1A3323] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#284933]" /> Prácticas Sustentables Verificadas
            </h4>
            <ul className="space-y-2.5 text-xs text-[#1A3323]">
              {producer.practices.map((practice, i) => (
                <li key={i} className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-[#B3C8A9] shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#284933] shrink-0 mt-0.5" />
                  <span className="font-medium">{practice}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#B3C8A9] text-xs space-y-1">
            <strong className="text-[#1A3323] font-bold block">Sección de Certificación Biodinámica</strong>
            <p className="text-[#625846]">{producer.certification} — Auditado bajo los estándares de agricultura biodinámica y regeneración de suelos.</p>
          </div>
        </div>

      </div>

      {/* 3. CONTACT SECTION & LINKS */}
      <div className="bg-white p-8 rounded-3xl border border-[#E3DEC3] shadow-xs space-y-6">
        <h3 className="font-serif font-bold text-2xl text-[#1A3323] border-b border-[#F0ECE1] pb-3">
          Contacto & Ubicación
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-[#1A3323]">
          <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#E3DEC3] space-y-2">
            <span className="text-[#786D58] font-bold block flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#284933]" /> Dirección
            </span>
            <p className="font-medium">{producer.contact.address}</p>
            <a
              href={producer.contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#1A3323] text-white hover:bg-[#284933] px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs mt-2 transition-colors"
            >
              Abrir en Google Maps <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            </a>
          </div>

          <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#E3DEC3] space-y-2">
            <span className="text-[#786D58] font-bold block flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#284933]" /> Teléfono & Correo
            </span>
            <p className="font-medium">{producer.contact.phone}</p>
            <p className="text-[#524B3B]">{producer.contact.email}</p>
          </div>

          <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#E3DEC3] space-y-2">
            <span className="text-[#786D58] font-bold block">Canales Oficiales</span>
            <div className="flex flex-col gap-2 pt-1">
              {producer.contact.website && (
                <a
                  href={producer.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#1A3323] hover:text-[#C85A32] font-semibold"
                >
                  <Globe className="w-4 h-4 text-[#284933]" /> Sitio Web Oficial <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {producer.contact.instagram && (
                <a
                  href={producer.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#1A3323] hover:text-[#C85A32] font-semibold"
                >
                  <Instagram className="w-4 h-4 text-[#C85A32]" /> Instagram <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. MAP */}
      <section className="space-y-4">
        <ProducerMap
          producers={[producer]}
          selectedProducerId={producer.id}
        />
      </section>

      {/* 5. AVAILABLE PRODUCTS LINKED */}
      <section className="space-y-6">
        <div className="border-b border-[#E3DEC8] pb-3 flex justify-between items-center">
          <h3 className="font-serif font-bold text-2xl text-[#1A3323]">
            Productos Disponibles de {producer.name} ({producerProducts.length})
          </h3>
          <span className="text-xs text-[#786D58]">Directo del terruño</span>
        </div>

        {producerProducts.length === 0 ? (
          <p className="text-xs text-[#786D58]">No hay productos disponibles actualmente.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {producerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 6. GALLERY */}
      <section className="bg-[#FAF7F0] border border-[#E5DFCE] p-8 rounded-3xl">
        <ProducerGallery
          images={producer.galleryImages}
          producerName={producer.name}
        />
      </section>

    </div>
  );
};