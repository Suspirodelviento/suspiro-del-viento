import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PREPARATIONS } from '../../data/mockData';
import { Sparkles, Sun, Sprout, FlaskConical, Check } from 'lucide-react';

export const ExhibitPreparations: React.FC = () => {
  const [selectedPrep, setSelectedPrep] = useState(PREPARATIONS[0]);

  return (
    <div className="space-y-12">
      
      {/* Exhibit Header */}
      <div className="border-l-4 border-[#C85A32] pl-6 space-y-2">
        <span className="text-xs uppercase font-serif font-bold tracking-widest text-[#C85A32] flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-[#C85A32]" /> Sala III • La Botica del Suelo
        </span>
        <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#1A3323]">
          Preparados Biodinámicos (500–508)
        </h2>
        <p className="text-xs sm:text-base text-[#625846] max-w-3xl leading-relaxed">
          Inoculantes homeopáticos elaborados a partir de bosta de vaca, cuarzo y hierbas medicinales (milenrama, manzanilla, ortiga, diente de león, valeriana y cola de caballo) fermentados en receptáculos naturales.
        </p>
      </div>

      {/* Interactive Apothecary Cabinet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Specimen Jars Selector */}
        <div className="lg:col-span-5 grid grid-cols-3 gap-3">
          {PREPARATIONS.map((prep) => {
            const isSelected = selectedPrep.number === prep.number;
            return (
              <button
                key={prep.number}
                onClick={() => setSelectedPrep(prep)}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  isSelected
                    ? 'bg-[#1A3323] text-[#D4AF37] border-[#D4AF37] shadow-xl scale-105'
                    : 'bg-white text-[#1A3323] border-[#E3DEC3] hover:border-[#1A3323]'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs font-serif ${
                  isSelected ? 'bg-[#D4AF37] text-[#1A3323]' : 'bg-[#EFF4EC] text-[#284933]'
                }`}>
                  {prep.number}
                </div>
                <span className="text-[10px] font-serif font-bold line-clamp-1">{prep.name.split('(')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Specimen Showcase */}
        <motion.div
          key={selectedPrep.number}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#E3DEC3] shadow-md space-y-6"
        >
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#284933] bg-[#EFF4EC] px-3 py-1 rounded-full">
                Preparado {selectedPrep.number} • {selectedPrep.type === 'Field Spray' ? 'Pulverización de Campo' : 'Inóculo de Compost'}
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A3323] mt-2">
                {selectedPrep.name}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#1A3323] text-[#D4AF37] flex items-center justify-center font-serif font-bold text-lg shadow-md">
              {selectedPrep.number}
            </div>
          </div>

          <div className="space-y-4 text-xs text-[#4A4234] leading-relaxed">
            <div>
              <h5 className="font-bold text-[#1A3323] text-sm font-serif mb-1">Descripción y Origen:</h5>
              <p className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#EDE8DA] text-sm text-[#1A3323]">
                {selectedPrep.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#EDE8DA]">
                <strong className="block text-[#1A3323] font-serif font-bold text-xs mb-1">Ingredientes Naturales:</strong>
                <p className="text-[#625846]">{selectedPrep.ingredients}</p>
              </div>

              <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#EDE8DA]">
                <strong className="block text-[#1A3323] font-serif font-bold text-xs mb-1">Ritmo de Aplicación:</strong>
                <p className="text-[#625846]">{selectedPrep.usage}</p>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-[#1A3323] text-sm font-serif mb-2">Beneficios para la Salud del Suelo:</h5>
              <ul className="space-y-1.5">
                {selectedPrep.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 bg-[#EFF4EC] p-2.5 rounded-xl text-[#1A3323]">
                    <Check className="w-4 h-4 text-[#284933] shrink-0 mt-0.5" />
                    <span className="font-medium">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

      </div>

    </div>
  );
};