import React, { useState } from 'react';
import { PREPARATIONS } from '../data/mockData';
import { Sprout, Sun, Flower2, Leaf, ShieldCheck, TreeDeciduous, Wind, Flame, Droplet, Check } from 'lucide-react';

const iconMap: Record<string, any> = {
  Sprout,
  Sun,
  Flower2,
  Leaf,
  ShieldCheck,
  TreeDeciduous,
  Wind,
  Flame,
  Droplet
};

export const PreparationsGuide: React.FC = () => {
  const [selectedPrep, setSelectedPrep] = useState(PREPARATIONS[0]);
  const [filterType, setFilterType] = useState<'All' | 'Field Spray' | 'Compost Additive'>('All');

  const filtered = PREPARATIONS.filter(
    (p) => filterType === 'All' || p.type === filterType
  );

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { key: 'All', label: 'Todos los Preparados (500–508)' },
          { key: 'Field Spray', label: 'Preparados de Campo' },
          { key: 'Compost Additive', label: 'Aditivos para Compost' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterType(tab.key as any)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              filterType === tab.key
                ? 'bg-[#1A3323] text-[#F4F1EA] shadow-md'
                : 'bg-[#EFECE3] text-[#524B3B] hover:bg-[#E2DDD0]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: List selector cards */}
        <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2.5">
          {filtered.map((prep) => {
            const Icon = iconMap[prep.iconName] || Sprout;
            const isSelected = selectedPrep.number === prep.number;
            return (
              <div
                key={prep.number}
                onClick={() => setSelectedPrep(prep)}
                className={`p-3.5 rounded-2xl cursor-pointer border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#1A3323] text-white border-[#1A3323] shadow-lg scale-[1.01]'
                    : 'bg-white text-[#1A3323] border-[#E5E0D0] hover:border-[#1A3323]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-[#D4AF37] text-[#1A3323]' : 'bg-[#EFF4EC] text-[#284933]'
                    }`}
                  >
                    {prep.number}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs leading-snug">{prep.name}</h4>
                    <span
                      className={`text-[10px] ${
                        isSelected ? 'text-[#C8BFB0]' : 'text-[#8A7E68]'
                      }`}
                    >
                      {prep.type === 'Field Spray' ? 'Pulverización de Campo' : 'Aditivo de Compost'}
                    </span>
                  </div>
                </div>
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#D4AF37]' : 'text-[#625846]'}`} />
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed View */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E3DEC3] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#284933] bg-[#EFF4EC] px-3 py-1 rounded-full">
                Preparado {selectedPrep.number} • {selectedPrep.type === 'Field Spray' ? 'Pulverización' : 'Inóculo de Compost'}
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A3323] mt-2">
                {selectedPrep.name}
              </h3>
              {selectedPrep.latinName && (
                <p className="text-xs italic text-[#786D58] mt-0.5">{selectedPrep.latinName}</p>
              )}
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#1A3323] text-[#D4AF37] flex items-center justify-center font-bold text-lg shadow-md">
              {selectedPrep.number}
            </div>
          </div>

          <div className="space-y-4 text-xs text-[#4A4234] leading-relaxed">
            <div>
              <h5 className="font-bold text-[#1A3323] text-sm mb-1">¿Qué es?</h5>
              <p className="bg-[#FBF9F5] p-3.5 rounded-xl border border-[#EDE8DA]">
                {selectedPrep.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-[#FBF9F5] rounded-xl border border-[#EDE8DA]">
                <strong className="block text-[#1A3323] font-bold mb-1">Componentes y Fermentación:</strong>
                <p className="text-[#625846]">{selectedPrep.ingredients}</p>
              </div>

              <div className="p-3.5 bg-[#FBF9F5] rounded-xl border border-[#EDE8DA]">
                <strong className="block text-[#1A3323] font-bold mb-1">Aplicación y Ritmo:</strong>
                <p className="text-[#625846]">{selectedPrep.usage}</p>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-[#1A3323] text-sm mb-2">Beneficios para el Suelo y la Planta:</h5>
              <ul className="space-y-1.5">
                {selectedPrep.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 bg-[#EFF4EC] p-2.5 rounded-lg text-[#1A3323]">
                    <Check className="w-4 h-4 text-[#284933] shrink-0 mt-0.5" />
                    <span className="font-medium">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};