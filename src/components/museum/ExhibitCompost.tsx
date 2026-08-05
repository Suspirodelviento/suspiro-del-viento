import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Sprout, ShieldCheck, Thermometer } from 'lucide-react';

const COMPOST_STAGES = [
  {
    stage: 'Etapa 1: Apilado & Inoculación (Días 1-7)',
    title: 'Inoculación con Preparados 502–507',
    temp: '25°C – 40°C',
    desc: 'Se alternan capas de guano vacuno, restos de cosecha, paja seca y tierra del lugar. Se introducen diminutas dosis de milenrama, manzanilla, ortiga, corteza de roble, diente de león y valeriana.',
    bg: '#EFF4EC'
  },
  {
    stage: 'Etapa 2: Fermentación Termófila (Semanas 2-6)',
    title: 'Transformación Térmica & Digestión',
    temp: '55°C – 65°C',
    desc: 'Bacterias termófilas descomponen la materia orgánica eliminando semillas de malezas y patógenos sin perder nitrógeno gracias al manto regulador de valeriana.',
    bg: '#FDF5F2'
  },
  {
    stage: 'Etapa 3: Humificación Cosechada (Meses 3-6)',
    title: 'Maduración & Formación de Humus Negro',
    temp: '20°C – 25°C',
    desc: 'Los hongos y actinobacterias estructuran el compuesto transformándolo en abono dulce de olor a bosque andino, cargado de nutrientes de liberación lenta.',
    bg: '#FAF7F0'
  }
];

export const ExhibitCompost: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState(COMPOST_STAGES[0]);

  return (
    <div className="space-y-12">
      
      {/* Exhibit Header */}
      <div className="border-l-4 border-[#D4AF37] pl-6 space-y-2">
        <span className="text-xs uppercase font-serif font-bold tracking-widest text-[#D4AF37] flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#D4AF37]" /> Sala VI • El Crisol de Alquimia del Compost
        </span>
        <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#1A3323]">
          Compost Biodinámico
        </h2>
        <p className="text-xs sm:text-base text-[#625846] max-w-3xl leading-relaxed">
          El compost biodinámico no es desperdicio pudriéndose: es una pila viva estructurada con preparados herbales que metamorfosea el estiércol en humus de altísima calidad vital.
        </p>
      </div>

      {/* Lifecycle Stage Switcher */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Stage List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#786D58] block">
            Fases de Metamorfosis del Compost:
          </span>

          {COMPOST_STAGES.map((st) => {
            const isSelected = selectedStage.stage === st.stage;
            return (
              <button
                key={st.stage}
                onClick={() => setSelectedStage(st)}
                className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#1A3323] text-white border-[#1A3323] shadow-lg scale-[1.02]'
                    : 'bg-white text-[#1A3323] border-[#E3DEC3] hover:border-[#1A3323]'
                }`}
              >
                <div>
                  <h4 className="font-serif font-bold text-sm">{st.title}</h4>
                  <p className={`text-xs mt-0.5 ${isSelected ? 'text-[#D4AF37]' : 'text-[#786D58]'}`}>
                    Temperatura: {st.temp}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stage Spotlight */}
        <motion.div
          key={selectedStage.stage}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#E3DEC3] shadow-md space-y-6"
        >
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-4">
            <div>
              <span className="text-xs font-serif font-bold uppercase text-[#284933] bg-[#EFF4EC] px-3 py-1 rounded-full">
                {selectedStage.stage}
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#1A3323] mt-2">
                {selectedStage.title}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FAF7F0] px-3 py-1.5 rounded-full border border-[#E3DEC3] text-xs font-bold text-[#1A3323]">
              <Thermometer className="w-4 h-4 text-[#C85A32]" /> {selectedStage.temp}
            </div>
          </div>

          <p className="bg-[#FAF7F0] p-5 rounded-2xl border border-[#EDE8DA] text-sm text-[#1A3323] leading-relaxed">
            {selectedStage.desc}
          </p>

          <div className="p-4 bg-[#EFF4EC] rounded-2xl border border-[#C8DAC0] text-xs text-[#284933] font-medium flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 shrink-0 text-[#284933]" />
            Capacidad de retención de agua de lluvia y deshielo 35% superior a fertilizantes químicos.
          </div>
        </motion.div>

      </div>

    </div>
  );
};