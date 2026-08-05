import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Heart, Award, Sprout, Sun, Users, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#284933] bg-[#E2EAD8] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5" /> Manifest Terruño Vivo
        </span>
        <h1 className="font-serif font-bold text-4xl sm:text-6xl text-[#1A3323] leading-tight">
          Nuestra Historia & Compromiso
        </h1>
        <p className="text-sm sm:text-base text-[#625846] leading-relaxed">
          Nacimos al pie de la Cordillera de los Andes para devolverle la vida al suelo, dignificar el trabajo agrícola y conectar a las familias con alimentos puros y conscientes.
        </p>
      </div>

      {/* Main Banner Image */}
      <div className="relative rounded-3xl overflow-hidden aspect-21/9 bg-[#1A3323] shadow-2xl border border-[#2B523A]">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1800"
          alt="Viñedo biodinámico al pie de los Andes"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14261A] via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 text-white space-y-2 max-w-xl">
          <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest">Valle de Uco, Mendoza</span>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-white">
            "Suelos vivos producen alimentos que sanan."
          </h2>
        </div>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-[#E3DEC3] shadow-xs space-y-4">
          <div className="w-12 h-12 bg-[#EFF4EC] text-[#284933] rounded-2xl flex items-center justify-center">
            <Sprout className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#1A3323]">Regeneración de la Tierra</h3>
          <p className="text-xs text-[#625846] leading-relaxed">
            No utilizamos fertilizantes químicos de síntesis ni herbicidas. Enriquecemos el suelo con compost preparado en la finca y mantenemos viva la microfauna subterránea.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E3DEC3] shadow-xs space-y-4">
          <div className="w-12 h-12 bg-[#EFF4EC] text-[#284933] rounded-2xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#1A3323]">Comercio Justo y Directo</h3>
          <p className="text-xs text-[#625846] leading-relaxed">
            Eliminamos intermediarios especulativos para garantizar que más del 70% del valor vuelva directamente a las familias de productores biodinámicos de Mendoza.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E3DEC3] shadow-xs space-y-4">
          <div className="w-12 h-12 bg-[#EFF4EC] text-[#284933] rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#1A3323]">Garantía Demeter 100%</h3>
          <p className="text-xs text-[#625846] leading-relaxed">
            Todas las fincas aliadas cuentan con certificación internacional Demeter, garantizando los más estrictos estándares agrícolas y éticos del mundo.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="bg-[#FAF7F0] border border-[#E5DFCE] p-8 sm:p-12 rounded-3xl space-y-6">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A775E]">Origen y Propósito</span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A3323]">
            Por qué la agricultura industrial llegó a su límite
          </h2>
          <p className="text-xs sm:text-sm text-[#524B3B] leading-relaxed">
            En los últimos 50 años, la agricultura química desgastó los suelos fértiles de Cuyo, compactando la tierra y destruyendo la microflora natural. En BioMendoza creemos en el camino inverso: la agricultura como un arte sanador.
          </p>
          <p className="text-xs sm:text-sm text-[#524B3B] leading-relaxed">
            Tratamos cada finca como un organismo vivo autosostenible donde los animales, las abejas silvestres, las aromáticas nativas como la Jarilla y los cultivos principales forman una red de armonía biológica.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link to="/products">
            <Button className="bg-[#1A3323] hover:bg-[#284933] text-white rounded-xl text-xs px-6 h-11 flex items-center gap-2">
              Explorar Productos Biodinámicos <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </Button>
          </Link>
          <Link to="/producers">
            <Button variant="outline" className="border-[#1A3323] text-[#1A3323] rounded-xl text-xs px-6 h-11">
              Conocer a las Familias Productoras
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};