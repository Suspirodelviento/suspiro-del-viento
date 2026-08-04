import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Compass, BookOpen, Sparkles, Award, Heart, Eye } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCERS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { LunarCalendarWidget } from '../components/LunarCalendarWidget';
import { PreparationsGuide } from '../components/PreparationsGuide';
import { Button } from '../components/ui/button';

const Index: React.FC = () => {
  const { products } = useShop();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#14261A]">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
            alt="Mendoza Biodynamic Vineyard"
            className="w-full h-full object-cover opacity-40 scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14261A] via-[#14261A]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 pt-12">
          
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" /> Certified Biodynamic Foods from Mendoza
          </div>

          <h1 className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl text-[#F4F1EA] tracking-tight leading-[1.1]">
            Real food begins with <br className="hidden sm:inline" />
            <span className="italic font-serif text-[#D4AF37]">living soil.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#D8D0C0] font-sans max-w-2xl mx-auto leading-relaxed">
            Discover certified biodynamic wines, cold-pressed olive oil, raw honey, and seasonal produce grown in Mendoza by artisans farming in harmony with nature.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products">
              <Button className="bg-[#D4AF37] hover:bg-[#c29e2e] text-[#14261A] font-bold rounded-full h-13 px-8 text-sm shadow-xl flex items-center gap-2">
                Shop Terroir Foods <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link to="/education">
              <Button variant="outline" className="border-[#E3DEC8] text-[#F4F1EA] hover:bg-white/10 rounded-full h-13 px-8 text-sm font-semibold backdrop-blur-xs">
                Learn Biodynamics <BookOpen className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <Link to="/producers">
              <Button variant="ghost" className="text-[#C8BFB0] hover:text-white rounded-full h-13 px-6 text-sm">
                Meet Our Producers
              </Button>
            </Link>
          </div>

          {/* Quick stats bar */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10 text-xs text-[#C8BFB0]">
            <div>
              <strong className="block text-xl font-serif text-white">100%</strong>
              Demeter Certified
            </div>
            <div>
              <strong className="block text-xl font-serif text-white">0%</strong>
              Synthetic Chemicals
            </div>
            <div>
              <strong className="block text-xl font-serif text-white">1,300m</strong>
              High Andean Altitude<dyad-write path="src/pages/Index.tsx" description="Completing Index page with hero, biodynamic principles, featured products, lunar calendar, producer spotlight, and philosophy">
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Compass, BookOpen, Sparkles, Award, Heart, Eye, Sun, Sprout, MapPin, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCERS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { LunarCalendarWidget } from '../components/LunarCalendarWidget';
import { PreparationsGuide } from '../components/PreparationsGuide';
import { Button } from '../components/ui/button';

const Index: React.FC = () => {
  const { products } = useShop();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#14261A]">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
            alt="Mendoza Biodynamic Vineyard"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14261A] via-[#14261A]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 pt-12">
          
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" /> Certified Biodynamic Foods from Mendoza
          </div>

          <h1 className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl text-[#F4F1EA] tracking-tight leading-[1.1]">
            Real food begins with <br className="hidden sm:inline" />
            <span className="italic font-serif text-[#D4AF37]">living soil.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#D8D0C0] font-sans max-w-2xl mx-auto leading-relaxed">
            Discover certified biodynamic wines, cold-pressed olive oil, raw honey, and seasonal produce grown in Mendoza by artisans farming in harmony with nature.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products">
              <Button className="bg-[#D4AF37] hover:bg-[#c29e2e] text-[#14261A] font-bold rounded-full h-13 px-8 text-sm shadow-xl flex items-center gap-2">
                Shop Terroir Foods <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link to="/education">
              <Button variant="outline" className="border-[#E3DEC8] text-[#F4F1EA] hover:bg-white/10 rounded-full h-13 px-8 text-sm font-semibold backdrop-blur-xs">
                Learn Biodynamics <BookOpen className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <Link to="/producers">
              <Button variant="ghost" className="text-[#C8BFB0] hover:text-white rounded-full h-13 px-6 text-sm">
                Meet Our Producers
              </Button>
            </Link>
          </div>

          {/* Quick stats bar */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10 text-xs text-[#C8BFB0]">
            <div>
              <strong className="block text-xl font-serif text-white">100%</strong>
              Demeter Certified
            </div>
            <div>
              <strong className="block text-xl font-serif text-white">0%</strong>
              Synthetic Chemicals
            </div>
            <div>
              <strong className="block text-xl font-serif text-white">1,300m</strong>
              High Andean Altitude
            </div>
            <div>
              <strong className="block text-xl font-serif text-white">24h</strong>
              Mendoza Fresh Delivery
            </div>
          </div>
        </div>
      </section>

      {/* Mendoza Terroir Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#284933]">
              <Leaf className="w-4 h-4" /> Not a Supermarket. A Living Sanctuary.
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#1A3323] leading-tight">
              Direct connection to Mendoza’s most conscious growers.
            </h2>
            <p className="text-sm text-[#524B3B] leading-relaxed">
              BioMendoza is a curated marketplace born at the foot of the Andes mountains. Here, food is not mass-produced; it is harvested according to cosmic rhythms, nourished with horn manure preparations, and delivered with total transparency.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white border border-[#E3DEC3] rounded-2xl">
                <ShieldCheck className="w-6 h-6 text-[#284933] mb-2" />
                <h4 className="font-serif font-bold text-sm text-[#1A3323]">Demeter Certified</h4>
                <p className="text-xs text-[#786D58] mt-1">100% verified compliance with global biodynamic standards.</p>
              </div>
              <div className="p-4 bg-white border border-[#E3DEC3] rounded-2xl">
                <Sun className="w-6 h-6 text-[#D4AF37] mb-2" />
                <h4 className="font-serif font-bold text-sm text-[#1A3323]">Cosmic Rhythm Harvest</h4>
                <p className="text-xs text-[#786D58] mt-1">Fruit and vegetables gathered on optimal astronomical days.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1200"
                alt="Biodynamic Vineyard harvest"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#1A3323] text-white p-6 rounded-3xl shadow-xl max-w-xs hidden sm:block border border-[#2B523A]">
              <p className="text-xs font-serif italic text-[#D4AF37]">
                "The farm is a single living entity where soil, plants, animals, and human spirit harmonize."
              </p>
              <span className="text-[10px] text-[#A69B88] block mt-2 uppercase font-bold tracking-wider">— Rudolf Steiner (1924)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#E3DEC8] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A775E]">Curated Harvest</span>
            <h2 className="font-serif font-bold text-3xl text-[#1A3323] mt-1">
              Featured Biodynamic Foods & Wine
            </h2>
          </div>
          <Link to="/products">
            <Button variant="ghost" className="text-[#1A3323] hover:text-[#C85A32] font-semibold text-xs flex items-center gap-1">
              View Entire Collection ({products.length}) <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Lunar Calendar Interactive Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LunarCalendarWidget />
      </section>

      {/* What is Biodynamic Agriculture Section */}
      <section className="bg-[#FAF7F0] border-y border-[#E5DFCE] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-[#284933] bg-[#E2EAD8] px-3 py-1 rounded-full">
              Educational Focus
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#1A3323]">
              What is Biodynamic Agriculture?
            </h2>
            <p className="text-xs sm:text-sm text-[#625846] leading-relaxed">
              It is the oldest ecological, chemical-free farming system in the world. Biodynamics treats the farm as a self-sustaining organism, generating its own fertility through compost, horn preparations, and animal integration.
            </p>
          </div>

          {/* Preparations Guide Interactive Widget */}
          <PreparationsGuide />

        </div>
      </section>

      {/* Meet the Producers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A775E]">Mendoza Artisans</span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A3323]">
            Meet Our Certified Producers
          </h2>
          <p className="text-xs text-[#625846]">
            Every bottle, jar, and harvest box is traceable back to these dedicated families in Valle de Uco, Agrelo, and Luján.
          </p>
        </div>

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
                      Farming biodynamically for {producer.yearsFarming} years ({producer.sizeHectares} Hectares)
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link to={`/producers/${producer.id}`}>
                  <Button className="w-full bg-[#EFECE3] hover:bg-[#1A3323] text-[#1A3323] hover:text-white rounded-xl text-xs font-semibold h-11 transition-colors">
                    View Farm Profile & Story
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Index;