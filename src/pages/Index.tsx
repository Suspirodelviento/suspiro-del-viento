import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, BookOpen, Sun, MapPin, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCERS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { CategoriesSection } from '../components/CategoriesSection';
import { WhyBiodynamicSection } from '../components/WhyBiodynamicSection';
import { LunarCalendarWidget } from '../components/LunarCalendarWidget';
import { PreparationsGuide } from '../components/PreparationsGuide';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { NewsletterSection } from '../components/NewsletterSection';
import { Button } from '../components/ui/button';

const Index: React.FC = () => {
  const { products } = useShop();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-24 pb-20 overflow-x-hidden">
      
      {/* 1. Fullscreen Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#14261A]">
        {/* Cinematic background image with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
            alt="Viñedo Biodinámico en Mendoza"
            className="w-full h-full object-cover opacity-45 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14261A] via-[#14261A]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 pt-16">
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-md"
          >
            <ShieldCheck className="w-4 h-4" /> Alimentos 100% Biodinámicos Certificados de Mendoza
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl text-[#F4F1EA] tracking-tight leading-[1.1]"
          >
            La comida de verdad nace en un <br className="hidden sm:inline" />
            <span className="italic font-serif text-[#D4AF37]">suelo vivo.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-[#D8D0C0] font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Descubrí vinos finos de reserva, aceite de oliva prensado en frío, miel pura de jarilla y hortalizas frescas cultivadas en Mendoza en perfecta consonancia con la naturaleza.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/products">
              <Button className="bg-[#D4AF37] hover:bg-[#c29e2e] text-[#14261A] font-bold rounded-full h-13 px-8 text-sm shadow-xl flex items-center gap-2">
                Ver Productos <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link to="/education">
              <Button variant="outline" className="border-[#E3DEC8] text-[#F4F1EA] hover:bg-white/10 rounded-full h-13 px-8 text-sm font-semibold backdrop-blur-xs">
                Aprender Biodinámica <BookOpen className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <Link to="/producers">
              <Button variant="ghost" className="text-[#C8BFB0] hover:text-white rounded-full h-13 px-6 text-sm">
                Conocer Productores
              </Button>
            </Link>
          </motion.div>

          {/* Quick stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10 text-xs text-[#C8BFB0]"
          >
            <div>
              <strong className="block text-xl font-serif text-white">100%</strong>
              Certificado Demeter
            </div>
            <div>
              <strong className="block text-xl font-serif text-white">0%</strong>
              Químicos Sintéticos
            </div>
            <div>
              <strong className="block text-xl font-serif text-white">1.300m</strong>
              Altitud Andina
            </div>
            <div>
              <strong className="block text-xl font-serif text-white">24h</strong>
              Entrega Fresca en Mendoza
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Biodynamic Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#284933]">
              <Leaf className="w-4 h-4" /> No es un supermercado. Es un santuario vivo.
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#1A3323] leading-tight">
              Conexión directa con los agricultores más conscientes de Mendoza.
            </h2>
            <p className="text-sm text-[#524B3B] leading-relaxed">
              BioMendoza es un mercado curado nacido a los pies de la Cordillera de los Andes. Aquí la comida no se produce en masa: se cosecha respetando los ritmos astronómicos, se nutre con preparados naturales y se entrega con total transparencia.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white border border-[#E3DEC3] rounded-2xl shadow-xs">
                <ShieldCheck className="w-6 h-6 text-[#284933] mb-2" />
                <h4 className="font-serif font-bold text-sm text-[#1A3323]">Garantía Demeter</h4>
                <p className="text-xs text-[#786D58] mt-1">Cumplimiento verificado con estándares biodinámicos globales.</p>
              </div>
              <div className="p-4 bg-white border border-[#E3DEC3] rounded-2xl shadow-xs">
                <Sun className="w-6 h-6 text-[#D4AF37] mb-2" />
                <h4 className="font-serif font-bold text-sm text-[#1A3323]">Cosecha por Ritmos Cósmicos</h4>
                <p className="text-xs text-[#786D58] mt-1">Frutas y verduras recolectadas en días astronómicos óptimos.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1200"
                alt="Cosecha de viñedo biodinámico"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#1A3323] text-white p-6 rounded-3xl shadow-xl max-w-xs hidden sm:block border border-[#2B523A]">
              <p className="text-xs font-serif italic text-[#D4AF37]">
                "La finca es un organismo vivo único donde el suelo, las plantas, los animales y el espíritu humano se armonizan."
              </p>
              <span className="text-[10px] text-[#A69B88] block mt-2 uppercase font-bold tracking-wider">— Rudolf Steiner (1924)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Why Biodynamic Section */}
      <WhyBiodynamicSection />

      {/* 4. Product Categories Showcase */}
      <CategoriesSection />

      {/* 5. Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#E3DEC8] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A775E]">Cosecha Curada</span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A3323] mt-1">
              Productos Destacados del Terruño
            </h2>
          </div>
          <Link to="/products">
            <Button variant="ghost" className="text-[#1A3323] hover:text-[#C85A32] font-semibold text-xs flex items-center gap-1">
              Ver Colección Completa ({products.length}) <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Lunar Calendar Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LunarCalendarWidget />
      </section>

      {/* 7. Educational Section (Preparations Guide) */}
      <section className="bg-[#FAF7F0] border-y border-[#E5DFCE] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-[#284933] bg-[#E2EAD8] px-3 py-1 rounded-full">
              Enfoque Educativo
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#1A3323]">
              ¿Qué es la Agricultura Biodinámica?
            </h2>
            <p className="text-xs sm:text-sm text-[#625846] leading-relaxed">
              Es el sistema de agricultura ecológica libre de agroquímicos más antiguo del mundo. Concibe la finca como un organismo autosostenible que genera su propia fertilidad mediante compost, preparados de cuerno e integración animal.
            </p>
          </div>

          <PreparationsGuide />

        </div>
      </section>

      {/* 8. Meet the Producers Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A775E]">Artesanos de Mendoza</span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A3323]">
            Nuestros Productores Certificados
          </h2>
          <p className="text-xs text-[#625846]">
            Cada botella, frasco y caja de cosecha es trazable hasta estas familias en el Valle de Uco, Agrelo y Luján.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCERS.map((producer) => (
            <motion.div
              key={producer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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

                <div className="p-6 space-y-3">
                  <h3 className="font-serif font-bold text-xl text-[#1A3323]">
                    {producer.name}
                  </h3>
                  <p className="text-xs text-[#524B3B] leading-relaxed line-clamp-2">
                    {producer.story}
                  </p>

                  <div className="pt-2 text-[11px] text-[#284933] font-semibold space-y-1">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {producer.certification}
                    </div>
                    <div className="text-[#8A7E68]">
                      Cultivando biodinámicamente hace {producer.yearsFarming} años ({producer.sizeHectares} Hectáreas)
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link to={`/producers/${producer.id}`}>
                  <Button className="w-full bg-[#EFECE3] hover:bg-[#1A3323] text-[#1A3323] hover:text-white rounded-xl text-xs font-semibold h-11 transition-colors">
                    Ver Perfil e Historia de la Finca
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. Testimonials Section */}
      <TestimonialsSection />

      {/* 10. Newsletter Section */}
      <NewsletterSection />

    </div>
  );
};

export default Index;