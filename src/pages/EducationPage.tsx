import React from 'react';
import { EDU_ARTICLES } from '../data/mockData';
import { PreparationsGuide } from '../components/PreparationsGuide';
import { LunarCalendarWidget } from '../components/LunarCalendarWidget';
import { BookOpen, Sprout, Sun, Leaf, HeartPulse, Sparkles, Clock, User } from 'lucide-react';

export const EducationPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-[#284933] bg-[#E2EAD8] px-3 py-1 rounded-full inline-flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" /> Educational Hub
        </span>
        <h1 className="font-serif font-bold text-4xl sm:text-6xl text-[#1A3323]">
          Understanding Biodynamics
        </h1>
        <p className="text-xs sm:text-base text-[#625846] leading-relaxed">
          Explore the science, philosophy, and astronomical cosmic rhythms that make biodynamic food healthier for human bodies and resilient for the planet.
        </p>
      </div>

      {/* Lunar Calendar Widget */}
      <LunarCalendarWidget />

      {/* Core Principles */}
      <section className="space-y-8">
        <div className="border-b border-[#E3DEC8] pb-4">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A3323]">
            The 4 Pillars of Biodynamic Agriculture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Sprout,
              title: 'The Farm as an Organism',
              desc: 'Fertility, animal manure, seeds, and pest management are all generated internally on the estate without chemical buying.'
            },
            {
              icon: Sun,
              title: 'Cosmic & Solar Rhythms',
              desc: 'Sowing, pruning, and harvesting occur in alignment with lunar phases and constellation movements.'
            },
            {
              icon: Leaf,
              title: 'Preparations 500–508',
              desc: 'Special homeopathic soil and foliage preparations made from horn manure, quartz, yarrow, chamomile, and nettle.'
            },
            {
              icon: HeartPulse,
              title: 'Microbial Microbiome Vitality',
              desc: 'Fostering subterranean mycorrhizal fungi networks that transfer minerals directly into plant structures.'
            }
          ].map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-3xl border border-[#E3DEC3] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EFF4EC] text-[#284933] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1A3323]">{p.title}</h3>
                <p className="text-xs text-[#625846] leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Preparations Guide */}
      <section className="bg-[#FAF7F0] border border-[#E5DFCE] p-8 rounded-3xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A775E]">Homeopathic Soil Science</span>
          <h2 className="font-serif font-bold text-3xl text-[#1A3323]">
            Biodynamic Preparations Guide (500–508)
          </h2>
          <p className="text-xs text-[#625846]">
            Click any preparation below to see its natural components, application rhythm, and specific soil benefits.
          </p>
        </div>

        <PreparationsGuide />
      </section>

      {/* Articles & Scientific Studies */}
      <section className="space-y-8">
        <div className="border-b border-[#E3DEC8] pb-4">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A3323]">
            Scientific Articles & Terroir Studies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDU_ARTICLES.map((art) => (
            <div key={art.id} className="bg-white rounded-3xl overflow-hidden border border-[#E3DEC3] shadow-xs space-y-4 flex flex-col justify-between p-6">
              <div className="space-y-3">
                <div className="aspect-16/10 rounded-2xl overflow-hidden bg-[#EFECE3]">
                  <img src={art.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[#786D58]">
                  <span className="bg-[#EFF4EC] text-[#284933] px-2.5 py-0.5 rounded-full font-bold">{art.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {art.readTime}</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1A3323]">{art.title}</h3>
                <p className="text-xs text-[#625846] leading-relaxed">{art.summary}</p>
              </div>

              <div className="pt-4 border-t border-[#F0ECE1] text-[11px] text-[#8A7E68] flex items-center justify-between">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {art.author}</span>
                <span>{art.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};