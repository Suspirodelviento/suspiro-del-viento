import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Bug, Sparkles, ShieldCheck, Sprout } from 'lucide-react';

const SOIL_LAYERS = [
  {
    depth: '0cm – 5cm (Manto Superficial)',
    title: 'Humus Vivo & Microfauna',
    desc: 'Capa viva cubierta por restos vegetales y guano dinamizado. Millones de lombrices de tierra (Lumbricus terrestris) digieren material orgánico creando galerías de aireación.',
    microbes: 'Lombrices, colémbolos, bacterias fijadoras de nitrógeno',
    bg: '#3E2723'
  },
  {
    depth: '5cm – 30cm (Rizosfera Activa)',
    title: 'Red de Micorrizas Glomeromycota',
    desc: 'Zona de intensa simiosis entre raíces y hongos micorrizas. Los hongos extienden hifas subterráneas multiplicando por 10 la capacidad de absorción de agua de deshielo y fósforo.',
    microbes: 'Hongos micorricicos, actinobacterias, levaduras nativas',
    bg: '#271A14'
  },
  {
    depth: '30cm – 100cm (Subsuelo Mineral Pedregoso)',
    title: 'Pedregal Andino & Minerales Ancestrales',
    desc: 'Canto rodado y rocas ricas en calcio, magnesio y hierro. Las raíces biodinámicas estimuladas por el Preparado 500 penetran hasta 3 metros absorbiendo la mineralidad del terruño.',
    microbes: 'Bacterias solubilizadoras de silicio y potasio profundo',
    bg: '#1A120B'
  }
];

export const ExhibitSoilBiology: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState(SOIL_LAYERS[0]);

  return (
    <div className="space-y-12">
      
      {/* Exhibit Header */}
      <div className="border-l-4 border-[#1A3323] pl-6 space-y-2">
        <span className="text-xs uppercase font-serif font-bold tracking-widest text-[#1A3323] flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#1A3323]" /> Sala V • Inspección Subterránea de la Rizosfera
        </span>
        <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#1A3323]">
          Biología del Suelo
        </h2>
        <p className="text-xs sm:text-base text-[#625846] max-w-3xl leading-relaxed">
          Un solo gramo de suelo biodinámico mendocino contiene más de 10.000 millones de microorganismos vivos. Explorá las capas subterráneas que transfieren el sabor del terruño a la planta.
        </p>
      </div>

      {/* Layer Depth Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Layer depth buttons */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#786D58] block">
            Seleccioná una Capa de Profundidad:
          </span>

          {SOIL_LAYERS.map((layer) => {
            const isSelected = selectedLayer.depth === layer.depth;
            return (
              <button
                key={layer.depth}
                onClick={() => setSelectedLayer(layer)}
                className={`w-full p-5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#1A3323] text-white border-[#1A3323] shadow-xl scale-[1.02]'
                    : 'bg-white text-[#1A3323] border-[#E3DEC3] hover:border-[#1A3323]'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${isSelected ? 'text-[#D4AF37]' : 'text-[#786D58]'}`}>
                    Profundidad {layer.depth}
                  </span>
                  <h4 className="font-serif font-bold text-base mt-0.5">{layer.title}</h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Inspection Microscope Panel */}
        <motion.div
          key={selectedLayer.depth}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-7 bg-[#FBF9F5] border-2 border-[#E3DEC3] p-8 rounded-3xl space-y-6 shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-[#E3DEC3] pb-4">
            <div>
              <span className="text-xs font-serif font-bold uppercase text-[#284933] bg-[#EFF4EC] px-3 py-1 rounded-full">
                Capa Subterránea
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#1A3323] mt-2">
                {selectedLayer.title}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#1A3323] text-[#D4AF37] flex items-center justify-center font-bold text-xs">
              Micro
            </div>
          </div>

          <div className="space-y-4 text-xs text-[#4A4234] leading-relaxed">
            <p className="bg-white p-4 rounded-2xl border border-[#E3DEC3] text-sm text-[#1A3323]">
              {selectedLayer.desc}
            </p>

            <div className="p-4 bg-[#EFF4EC] rounded-2xl border border-[#C8DAC0] space-y-1">
              <strong className="block text-[#1A3323] font-serif text-xs uppercase tracking-wider">Comunidad Microbiana Dominante:</strong>
              <p className="text-[#284933] font-bold">{selectedLayer.microbes}</p>
            </div>
          </div>
        </motion.div>

      </div>

    </div>
  );
};