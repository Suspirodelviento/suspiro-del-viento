import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sparkles, Sun, Flame, Droplets, Wind, Sprout } from 'lucide-react';

const CELESTIAL_DAYS = [
  {
    type: 'Día de Raíz',
    element: 'Tierra',
    signs: 'Tauro, Virgo, Capricornio',
    organ: 'Sistemas radiculares y tubérculos',
    icon: Sprout,
    bg: '#FAF5E8',
    color: '#8A775E',
    desc: 'Ideal para la siembra y cosecha de zanahorias, ajos, remolachas, rabanitos y poda de raíces principales.'
  },
  {
    type: 'Día de Hoja',
    element: 'Agua',
    signs: 'Cáncer, Escorpio, Piscis',
    organ: 'Hojas, tallos y clorofila',
    icon: Droplets,
    bg: '#EFF4EC',
    color: '#284933',
    desc: 'Favorables para el riego, siembra de lechugas, acelgas, espinacas y vegetales de hoja verde.'
  },
  {
    type: 'Día de Flor',
    element: 'Aire / Luz',
    signs: 'Géminis, Libra, Acuario',
    organ: 'Flores y aceites esenciales',
    icon: Wind,
    bg: '#FDF8F0',
    color: '#D4AF37',
    desc: 'Momento idóneo para la recolección de aromáticas, lavanda, manzanilla y manejo de olivos.'
  },
  {
    type: 'Día de Fruto',
    element: 'Fuego',
    signs: 'Aries, Leo, Sagitario',
    organ: 'Frutos, uvas y semillas',
    icon: Flame,
    bg: '#FDF5F2',
    color: '#C85A32',
    desc: 'Día perfecto para la vendimia de Malbec, cosecha de manzanas, tomates y conservación de semillas.'
  }
];

export const ExhibitLunarCalendar: React.FC = () => {
  const [activeDay, setActiveDay] = useState(CELESTIAL_DAYS[0]);

  return (
    <div className="space-y-12">
      
      {/* Exhibit Header */}
      <div className="border-l-4 border-[#D4AF37] pl-6 space-y-2">
        <span className="text-xs uppercase font-serif font-bold tracking-widest text-[#D4AF37] flex items-center gap-2">
          <Moon className="w-4 h-4 text-[#D4AF37]" /> Sala IV • Observatorio Agrícola Astronómico
        </span>
        <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#1A3323]">
          El Calendario Cósmico
        </h2>
        <p className="text-xs sm:text-base text-[#625846] max-w-3xl leading-relaxed">
          Basado en las investigaciones de Maria Thun, la luna y los planetas ejercen impulsos sobre el agua y la savia vegetal al transitar frente a las 12 constelaciones del zodíaco.
        </p>
      </div>

      {/* Interactive Celestial Wheel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1A3323] text-white p-8 sm:p-12 rounded-3xl border border-[#2B523A] shadow-2xl relative">
        
        {/* Left selector */}
        <div className="lg:col-span-5 space-y-3 z-10">
          <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#D4AF37] block">
            Seleccioná un Impulso Cósmico:
          </span>

          {CELESTIAL_DAYS.map((day) => {
            const isSelected = activeDay.type === day.type;
            const Icon = day.icon;
            return (
              <button
                key={day.type}
                onClick={() => setActiveDay(day)}
                className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#1A3323] border-[#D4AF37] font-bold shadow-xl scale-[1.02]'
                    : 'bg-[#23422F] text-white border-[#2E543C] hover:bg-[#2B523A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSelected ? 'bg-[#1A3323] text-[#D4AF37]' : 'bg-[#1A3323]/50 text-[#D4AF37]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm">{day.type}</h4>
                    <span className="text-[10px] opacity-80 block">Elemento {day.element}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right detail card */}
        <motion.div
          key={activeDay.type}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-7 bg-white text-[#1A3323] p-8 rounded-3xl border border-[#E3DEC3] shadow-xl space-y-6 z-10"
        >
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#284933] bg-[#EFF4EC] px-3 py-1 rounded-full">
                Constelaciones de {activeDay.element}
              </span>
              <h3 className="font-serif font-bold text-3xl text-[#1A3323] mt-2">
                {activeDay.type}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#1A3323] text-[#D4AF37] flex items-center justify-center">
              <Moon className="w-6 h-6 text-[#D4AF37]" />
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl space-y-1" style={{ backgroundColor: activeDay.bg }}>
              <strong className="block text-[#1A3323] font-serif text-sm">Constelaciones Zodiacales:</strong>
              <p className="text-sm font-semibold" style={{ color: activeDay.color }}>{activeDay.signs}</p>
            </div>

            <div>
              <strong className="block text-[#1A3323] font-bold text-xs uppercase tracking-wider mb-1">Órgano Vegetal Estimulado:</strong>
              <p className="text-xs text-[#524B3B]">{activeDay.organ}</p>
            </div>

            <div>
              <strong className="block text-[#1A3323] font-bold text-xs uppercase tracking-wider mb-1">Cosechas Recomendadas:</strong>
              <p className="text-xs text-[#524B3B] leading-relaxed">{activeDay.desc}</p>
            </div>
          </div>
        </motion.div>

      </div>

    </div>
  );
};