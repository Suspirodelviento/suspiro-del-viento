import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Bug, TreeDeciduous, Bird, Sparkles, Heart } from 'lucide-react';

const BIODIVERSITY_SANCTUARIES = [
  {
    title: 'Corredores Biológicos de Jarilla Nactiva',
    icon: TreeDeciduous,
    desc: 'Los arbustos autóctonos de Jarilla (Larrea nitida) rodean las fincas mendocinas brindando refugio a insectos depredadores naturales que controlan plagas sin insecticidas.'
  },
  {
    title: 'Avifauna Precordillerana',
    icon: Bird,
    desc: 'Cernícalos, lechuzas y aves insectívoras andinas anidan en postes de madera tratada naturalmente, regulando poblaciones de roedores e insectos de forma biológica.'
  },
  {
    title: 'Insectos Beneficiosos & Polinizadores',
    icon: Bug,
    desc: 'Avispas parasitoides, vaquitas de San Antonio y abejas melíferas silvestres encuentran floración continua gracias a los cultivos de cobertura entre hileras.'
  }
];

export const ExhibitBiodiversity: React.FC = () => {
  return (
    <div className="space-y-12">
      
      {/* Exhibit Header */}
      <div className="border-l-4 border-[#284933] pl-6 space-y-2">
        <span className="text-xs uppercase font-serif font-bold tracking-widest text-[#284933] flex items-center gap-2">
          <TreeDeciduous className="w-4 h-4 text-[#284933]" /> Sala VII • Santuario de Flora & Fauna Nativa
        </span>
        <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#1A3323]">
          Biodiversidad Sustentable
        </h2>
        <p className="text-xs sm:text-base text-[#625846] max-w-3xl leading-relaxed">
          En lugar de erradicar la naturaleza silvestre para crear desiertos monocultivo, las fincas biodinámicas destinan al menos el 10% de su superficie a santuarios biológicos intocados.
        </p>
      </div>

      {/* Sanctuary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BIODIVERSITY_SANCTUARIES.map((sanctuary, index) => {
          const Icon = sanctuary.icon;
          return (
            <motion.div
              key={sanctuary.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-[#E3DEC3] shadow-xs hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EFF4EC] text-[#284933] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1A3323]">{sanctuary.title}</h3>
                <p className="text-xs text-[#524B3B] leading-relaxed">{sanctuary.desc}</p>
              </div>

              <div className="pt-4 border-t border-[#F0ECE1] text-[11px] text-[#284933] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#284933]" /> Estándar Demeter de Hábitat
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};