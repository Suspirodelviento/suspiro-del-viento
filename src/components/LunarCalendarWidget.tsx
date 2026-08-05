import React from 'react';
import { Moon, Sparkles, Sprout, AlertCircle, CheckCircle2 } from 'lucide-react';
import { CURRENT_LUNAR_STATUS } from '../data/mockData';

export const LunarCalendarWidget: React.FC = () => {
  return (
    <div className="bg-[#1A3323] text-[#F4F1EA] rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-[#2A4B35]">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#284D35] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-1">
            <Sparkles className="w-4 h-4" /> Calendario Agrícola Astronómico de Mendoza
          </div>
          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
            Influencia Cósmica de Hoy: <span className="text-[#D4AF37]">{CURRENT_LUNAR_STATUS.dayType}</span>
          </h3>
          <p className="text-xs text-[#C5BCAE] mt-1">
            Luna en {CURRENT_LUNAR_STATUS.zodiacSign} • {CURRENT_LUNAR_STATUS.phase} ({CURRENT_LUNAR_STATUS.illumination} Iluminación)
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#23422F] px-4 py-3 rounded-2xl border border-[#2E543C]">
          <Moon className="w-8 h-8 text-[#D4AF37]" />
          <div className="text-xs">
            <span className="block font-bold text-white">{CURRENT_LUNAR_STATUS.phase}</span>
            <span className="text-[10px] text-[#A69B88]">Ascenso de savia: Fuerte</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Recommended Actions */}
        <div className="bg-[#213F2C] p-4 rounded-2xl border border-[#2B523A] space-y-2">
          <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Actividades Recomendadas Hoy
          </h4>
          <ul className="space-y-1.5 text-xs text-[#E3DCCE]">
            {CURRENT_LUNAR_STATUS.recommendedActivities.map((act, i) => (
              <li key={i} className="flex items-start gap-2">
                <Sprout className="w-3.5 h-3.5 text-[#A5C898] shrink-0 mt-0.5" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Activities to avoid */}
        <div className="bg-[#213F2C] p-4 rounded-2xl border border-[#2B523A] space-y-2">
          <h4 className="text-xs font-bold text-[#C85A32] uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-[#C85A32]" /> Precaución Cósmica
          </h4>
          <ul className="space-y-1.5 text-xs text-[#E3DCCE]">
            {CURRENT_LUNAR_STATUS.avoidActivities.map((act, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#C85A32] font-bold">•</span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};