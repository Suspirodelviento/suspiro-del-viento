import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Compass, RefreshCw, FlaskConical, Moon, Layers, Flame, TreeDeciduous, Volume2, ShieldCheck, Sparkles } from 'lucide-react';
import { ExhibitWhatIsBiodynamics } from '../components/museum/ExhibitWhatIsBiodynamics';
import { ExhibitFarmOrganism } from '../components/museum/ExhibitFarmOrganism';
import { ExhibitPreparations } from '../components/museum/ExhibitPreparations';
import { ExhibitLunarCalendar } from '../components/museum/ExhibitLunarCalendar';
import { ExhibitSoilBiology } from '../components/museum/ExhibitSoilBiology';
import { ExhibitCompost } from '../components/museum/ExhibitCompost';
import { ExhibitBiodiversity } from '../components/museum/ExhibitBiodiversity';

export const EducationPage: React.FC = () => {
  const [activeHall, setActiveHall] = useState<number>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const museumHalls = [
    { id: 1, title: 'I. ¿Qué es Biodinámica?', icon: Compass },
    { id: 2, title: 'II. El Organismo Finca', icon: RefreshCw },
    { id: 3, title: 'III. Preparados (500–508)', icon: FlaskConical },
    { id: 4, title: 'IV. Calendario Lunar', icon: Moon },
    { id: 5, title: 'V. Biología del Suelo', icon: Layers },
    { id: 6, title: 'VI. Crisol del Compost', icon: Flame },
    { id: 7, title: 'VII. Biodiversidad', icon: TreeDeciduous },
  ];

  return (
    <div className="space-y-16 pb-20 overflow-x-hidden">
      
      {/* 1. Museum Lobby Entrance Hero */}
      <section className="relative min-h-[60vh] bg-[#14261A] text-white flex items-center justify-center p-8 sm:p-12 overflow-hidden border-b border-[#23422E]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
            alt="Museo Vivo Biodinámico"
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14261A] via-[#14261A]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1.5 rounded-full text-xs font-serif font-bold tracking-widest uppercase"
          >
            <BookOpen className="w-4 h-4" /> Museo Vivo de Agricultura Biodinámica
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif font-bold text-4xl sm:text-6xl text-[#F4F1EA] tracking-tight"
          >
            Las 7 Salas de Exposición Agrícola
          </motion.h1>

          <p className="text-xs sm:text-base text-[#C8BFB0] leading-relaxed max-w-2xl mx-auto font-sans">
            Recorré las salas interactivas dedicadas a la ciencia, cosmología y biología del suelo mendocino. Un viaje museográfico desde la semilla hasta las estrellas.
          </p>

          {/* Audio Guide Simulator Trigger */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#14261A] font-serif font-bold px-5 py-2.5 rounded-full text-xs shadow-xl hover:bg-[#c29e2e] transition-all"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
              {isPlayingAudio ? 'Pausar Audioguía del Museo' : 'Activar Audioguía del Recorrido'}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Interactive Museum Exhibition Directory Header */}
      <section className="sticky top-20 z-30 bg-[#FBF9F5]/95 backdrop-blur-md border-y border-[#E3DEC3] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex space-x-2 shrink-0 py-1">
            {museumHalls.map((hall) => {
              const Icon = hall.icon;
              const isActive = activeHall === hall.id;
              return (
                <button
                  key={hall.id}
                  onClick={() => setActiveHall(hall.id)}
                  className={`px-4 py-2 rounded-full text-xs font-serif font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1A3323] text-[#D4AF37] shadow-md border border-[#D4AF37]/50 scale-105'
                      : 'bg-white text-[#524B3B] hover:bg-[#EFECE3] border border-[#E3DEC3]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4AF37]' : 'text-[#284933]'}`} />
                  <span>{hall.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Exhibition Hall Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {activeHall === 1 && (
          <section id="hall-1" className="scroll-mt-32">
            <ExhibitWhatIsBiodynamics />
          </section>
        )}

        {activeHall === 2 && (
          <section id="hall-2" className="scroll-mt-32">
            <ExhibitFarmOrganism />
          </section>
        )}

        {activeHall === 3 && (
          <section id="hall-3" className="scroll-mt-32">
            <ExhibitPreparations />
          </section>
        )}

        {activeHall === 4 && (
          <section id="hall-4" className="scroll-mt-32">
            <ExhibitLunarCalendar />
          </section>
        )}

        {activeHall === 5 && (
          <section id="hall-5" className="scroll-mt-32">
            <ExhibitSoilBiology />
          </section>
        )}

        {activeHall === 6 && (
          <section id="hall-6" className="scroll-mt-32">
            <ExhibitCompost />
          </section>
        )}

        {activeHall === 7 && (
          <section id="hall-7" className="scroll-mt-32">
            <ExhibitBiodiversity />
          </section>
        )}

      </div>

    </div>
  );
};