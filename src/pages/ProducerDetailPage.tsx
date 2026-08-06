import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCERS, PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { ProducerMap } from '../components/ProducerMap';
import { ProducerGallery } from '../components/ProducerGallery';
import {
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Award,
  ArrowLeft,
  Leaf,
  Sprout,
  Wine,
  Globe,
  Instagram,
  Mail,
  Phone,
  ExternalLink,
  Clock,
  Compass,
  Sparkles,
  Sun,
  Moon,
  Flame,
  Flower2,
  Calendar,
  ShoppingBag,
  Users,
  TreeDeciduous,
  Layers,
  Heart
} from 'lucide-react';
import { Button } from '../components/ui/button';

export const ProducerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const producer = PRODUCERS.find((p) => p.id === id) || PRODUCERS[0];
  const producerProducts = PRODUCTS.filter((p) => p.producerId === producer.id);

  const iconMap: Record<string, any> = {
    Wine,
    Sprout,
    Leaf,
    Flower2,
    Sun,
    Sparkles,
    ShieldCheck
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          to="/producers"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A3323] hover:text-[#C85A32] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Directorio de Productores
        </Link>
        <span className="text-xs uppercase font-serif font-bold tracking-widest text-[#284933] bg-[#EFF4EC] px-3 py-1 rounded-full border border-[#C8DAC0]">
          {producer.certification}
        </span>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden bg-[#14261A] text-white border border-[#23422E] shadow-2xl min-h-[60vh] flex items-end p-8 sm:p-14">
        <div className="absolute inset-0 z-0">
          <img
            src={producer.heroImage}
            alt={producer.name}
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14261A] via-[#14261A]/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Certified Biodynamic Farm
              </span>
              <span className="text-xs font-bold text-white bg-[#284933] px-3.5 py-1 rounded-full flex items-center gap-1">
                {producer.category === 'Winery' ? <Wine className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Sprout className="w-3.5 h-3.5 text-[#D4AF37]" />}
                {producer.category}
              </span>
              {producer.status === 'Temporarily Closed' && (
                <span className="text-xs font-bold text-white bg-red-800 px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Temporalmente Cerrado
                </span>
              )}
            </div>

            <h1 className="font-serif font-bold text-4xl sm:text-6xl text-[#F4F1EA] tracking-tight leading-tight">
              {producer.name}
            </h1>

            <p className="text-base sm:text-xl text-[#D8D0C0] italic font-serif max-w-2xl">
              "{producer.tagline}"
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#C8BFB0] pt-2">
              <span className="flex items-center gap-1.5 font-medium"><MapPin className="w-4 h-4 text-[#D4AF37]" /> {producer.location}</span>
              <span>•</span>
              <span><strong>{producer.sizeHectares}</strong> Hectáreas de Finca Viva</span>
              <span>•</span>
              <span><strong>{producer.yearsFarming} Años</strong> de Trabajo Regenerativo</span>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap gap-3">
              <a href="#available-products">
                <Button className="bg-[#D4AF37] hover:bg-[#c29e2e] text-[#14261A] font-bold rounded-xl h-12 px-6 text-xs shadow-lg flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Comprar Productos
                </Button>
              </a>

              <a href="#farm-experiences">
                <Button variant="outline" className="border-[#E3DEC8] text-[#F4F1EA] hover:bg-white/10 rounded-xl h-12 px-6 text-xs font-semibold backdrop-blur-xs">
                  Visitar la Finca <Compass className="w-4 h-4 ml-1" />
                </Button>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <img
              src={producer.portraitImage}
              alt={producer.name}
              className="w-32 h-36 sm:w-40 sm:h-44 rounded-3xl object-cover border-4 border-[#D4AF37] shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL: ABOUT THE FARM */}
      <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E3DEC3] shadow-xs space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase font-serif font-bold tracking-widest text-[#284933] bg-[#EFF4EC] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-[#284933]" /> Un Oasis Biodinámico en Mendoza
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#1A3323] leading-tight">
            Sobre {producer.name}
          </h2>
          <p className="text-sm sm:text-base text-[#625846] leading-relaxed font-sans">
            {producer.story}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#F0ECE1]">
          <div className="p-6 bg-[#FAF7F0] rounded-2xl border border-[#EDE8DA] space-y-2">
            <strong className="block text-[#1A3323] font-serif font-bold text-base">Filosofía Agrícola</strong>
            <p className="text-xs text-[#524B3B] leading-relaxed">{producer.philosophy}</p>
          </div>

          <div className="p-6 bg-[#FAF7F0] rounded-2xl border border-[#EDE8DA] space-y-2">
            <strong className="block text-[#1A3323] font-serif font-bold text-base">Proyecto Familiar</strong>
            <p className="text-xs text-[#524B3B] leading-relaxed">{producer.familyHistory}</p>
          </div>

          <div className="p-6 bg-[#EFF4EC] rounded-2xl border border-[#C8DAC0] space-y-2">
            <strong className="block text-[#1A3323] font-serif font-bold text-base">Suelo Vivo & Biodiversidad</strong>
            <p className="text-xs text-[#284933] leading-relaxed">
              Inoculación de compost biodinámico maduro, dinamización de preparados 500 y 501, e integración de flora nativa para transformar la tierra.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHAT THEY PRODUCE */}
      {producer.produceCategories && producer.produceCategories.length > 0 && (
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-serif font-bold tracking-widest text-[#8A775E] bg-[#EFECE3] px-3.5 py-1 rounded-full">
              Diversidad Agrícola
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A3323]">
              ¿Qué Produce {producer.name}?
            </h2>
            <p className="text-xs text-[#625846]">
              Líneas de producción vivas cultivadas y elaboradas en la finca en concordancia con los ritmos naturales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {producer.produceCategories.map((cat, idx) => {
              const IconComp = iconMap[cat.icon] || Sprout;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-[#E3DEC3] shadow-xs hover:shadow-xl transition-all duration-300 space-y-3"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#EFF4EC] text-[#284933] flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#1A3323]">{cat.name}</h3>
                  <p className="text-xs text-[#625846] leading-relaxed">{cat.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. MASONRY PHOTO GALLERY */}
      <section className="bg-[#FAF7F0] border border-[#E5DFCE] p-8 sm:p-12 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-[#E3DEC3] pb-4">
          <div>
            <span className="text-xs uppercase font-serif font-bold tracking-widest text-[#D4AF37] bg-[#1A3323] px-3 py-1 rounded-full">
              Fotografía del Terruño
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A3323] mt-2">
              Galería Fotográfica de la Finca
            </h3>
          </div>
          <p className="text-xs text-[#786D58]">Imágenes del viñedo, huerta viva, paisaje y biodiversidad.</p>
        </div>

        <ProducerGallery images={producer.galleryImages} producerName={producer.name} />
      </section>

      {/* 5. FARM EXPERIENCE */}
      {producer.experiences && producer.experiences.length > 0 && (
        <section id="farm-experiences" className="bg-[#1A3323] text-white p-8 sm:p-12 rounded-3xl border border-[#2B523A] shadow-2xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#D4AF37]">
              Visitas & Vivencias en Lavalle
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">
              Experiencias en la Finca
            </h2>
            <p className="text-xs text-[#C8BFB0] leading-relaxed">
              Paseos guiados, catas artesanales, talleres de plantas medicinales y caminatas educativas por el organismo granja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {producer.experiences.map((exp, idx) => (
              <div
                key={idx}
                className="bg-[#244530] p-6 rounded-2xl border border-[#325C40] space-y-3 hover:border-[#D4AF37]/50 transition-colors"
              >
                {exp.tag && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-1 rounded-md border border-[#D4AF37]/30">
                    {exp.tag}
                  </span>
                )}
                <h3 className="font-serif font-bold text-xl text-white mt-1">{exp.title}</h3>
                <p className="text-xs text-[#D8D0C0] leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. BIODYNAMIC PRACTICES CARDS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-serif font-bold tracking-widest text-[#284933] bg-[#E2EAD8] px-3.5 py-1 rounded-full">
            Principios Steinerianos
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A3323]">
            Prácticas Biodinámicas Verificadas
          </h2>
          <p className="text-xs text-[#625846]">
            Métodos naturales aplicados sistemáticamente para sanar y vitalizar el paisaje.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E3DEC3] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-[#EFF4EC] text-[#284933] flex items-center justify-center font-bold">
              <TreeDeciduous className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A3323]">Biodiversidad Intocada</h3>
            <p className="text-xs text-[#625846] leading-relaxed">
              Reservas biológicas de lavanda, jarilla y arbustos nativos para refugio de polinizadores silvestres.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E3DEC3] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-[#EFF4EC] text-[#284933] flex items-center justify-center font-bold">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A3323]">Compost Inoculado</h3>
            <p className="text-xs text-[#625846] leading-relaxed">
              Humus maduro preparado con milenrama, manzanilla, ortiga, roble, diente de león y valeriana.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E3DEC3] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-[#EFF4EC] text-[#284933] flex items-center justify-center font-bold">
              <Moon className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A3323]">Calendario Astronómico</h3>
            <p className="text-xs text-[#625846] leading-relaxed">
              Labores culturales de siembra y cosecha sincronizadas con los impulsos cósmicos del zodíaco.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E3DEC3] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-[#EFF4EC] text-[#284933] flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A3323]">Suelo Vivo sin Labranza</h3>
            <p className="text-xs text-[#625846] leading-relaxed">
              Mantenimiento de coberturas vegetales para alimentar redes subterráneas de hongos micorrizas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E3DEC3] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-[#EFF4EC] text-[#284933] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A3323]">Preparados 500 & 501</h3>
            <p className="text-xs text-[#625846] leading-relaxed">
              Dinamización de boñiga en cuerno para raíz y cuarzo pulverizado para potenciar la luz foliar.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E3DEC3] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-[#EFF4EC] text-[#284933] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-[#284933]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A3323]">Equilibrio Natural</h3>
            <p className="text-xs text-[#625846] leading-relaxed">
              Manejo preventivo mediante decocciones de cola de caballo sin necesidad de insumos sintéticos.
            </p>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE MAP */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#E3DEC3] pb-3">
          <div>
            <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#284933]">
              Ubicación Geográfica
            </span>
            <h3 className="font-serif font-bold text-2xl text-[#1A3323]">
              Mapa de {producer.name}
            </h3>
          </div>

          <a
            href={producer.contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#1A3323] text-[#D4AF37] hover:bg-[#284933] px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            Cómo Llegar (Google Maps) <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <ProducerMap producers={[producer]} selectedProducerId={producer.id} />
      </section>

      {/* 8. CONTACT SECTION */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E3DEC3] shadow-xs space-y-6">
        <h3 className="font-serif font-bold text-2xl text-[#1A3323] border-b border-[#F0ECE1] pb-3">
          Contacto Oficial & Enlaces
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#1A3323]">
          <div className="p-5 bg-[#FAF7F0] rounded-2xl border border-[#E3DEC3] space-y-3">
            <span className="text-[#786D58] font-bold block flex items-center gap-1.5 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#284933]" /> Dirección & Ubicación
            </span>
            <p className="font-semibold text-sm">{producer.contact.address}</p>
            <a
              href={producer.contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#1A3323] text-white hover:bg-[#284933] px-4 py-2 rounded-xl font-bold text-xs shadow-xs transition-colors"
            >
              Abrir Google Maps <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            </a>
          </div>

          <div className="p-5 bg-[#FAF7F0] rounded-2xl border border-[#E3DEC3] space-y-3">
            <span className="text-[#786D58] font-bold block flex items-center gap-1.5 uppercase tracking-wider">
              <Phone className="w-4 h-4 text-[#284933]" /> Atención & Correo
            </span>
            <p className="font-semibold text-sm">{producer.contact.phone}</p>
            <p className="text-[#524B3B]">{producer.contact.email}</p>
          </div>

          <div className="p-5 bg-[#FAF7F0] rounded-2xl border border-[#E3DEC3] space-y-3">
            <span className="text-[#786D58] font-bold block uppercase tracking-wider">Canales Oficiales</span>
            <div className="flex flex-col gap-2 pt-1">
              {producer.contact.website && (
                <a
                  href={producer.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1A3323] hover:text-[#C85A32] font-bold text-sm bg-white p-2.5 rounded-xl border border-[#E3DEC3] shadow-xs"
                >
                  <Globe className="w-4 h-4 text-[#284933]" /> Sitio Web Oficial <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                </a>
              )}
              {producer.contact.instagram && (
                <a
                  href={producer.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1A3323] hover:text-[#C85A32] font-bold text-sm bg-white p-2.5 rounded-xl border border-[#E3DEC3] shadow-xs"
                >
                  <Instagram className="w-4 h-4 text-[#C85A32]" /> Instagram Oficial <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. AVAILABLE PRODUCTS */}
      <section id="available-products" className="space-y-6">
        <div className="border-b border-[#E3DEC8] pb-3 flex justify-between items-center">
          <div>
            <span className="text-xs uppercase font-serif font-bold text-[#284933]">Catálogo del Terruño</span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A3323]">
              Productos Disponibles de {producer.name} ({producerProducts.length})
            </h3>
          </div>
          <span className="text-xs text-[#786D58]">Directo de la Finca</span>
        </div>

        {producerProducts.length === 0 ? (
          <p className="text-xs text-[#786D58]">No hay productos cargados en catálogo en este momento.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {producerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};