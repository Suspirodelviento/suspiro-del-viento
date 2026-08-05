import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Flame, Droplets, ShieldCheck, HeartPulse, TreeDeciduous, Sparkles } from 'lucide-react';

const TOPICS = [
  {
    icon: Sprout,
    title: 'Microbioma del Suelo Vivo',
    subtitle: 'Redes de Hongos 400% Superiores',
    desc: 'El suelo biodinámico está vivo con hongos micorrizas y microfauna que liberan minerales y los transfieren a las raíces sin sales químicas.',
    tag: 'Vitalidad del Suelo'
  },
  {
    icon: Flame,
    title: 'Secuestro Activo de Carbono',
    subtitle: '2.4x Más Carbono Retenido',
    desc: 'Las raíces profundas y el compost húmico sin labranza capturan el carbono atmosférico bajo tierra, mejorando la resistencia a sequías.',
    tag: 'Resiliencia Climática'
  },
  {
    icon: Droplets,
    title: 'Retención de Agua de Deshielo',
    subtitle: '35% Mayor Esponja de Humedad',
    desc: 'El agua pura de deshielo andino se conserva eficazmente en las estructuras húmicas del suelo, optimizando el riego en Mendoza.',
    tag: 'Cuidado del Agua'
  },
  {
    icon: ShieldCheck,
    title: 'Cero Residuos Sintéticos',
    subtitle: '100% Libre de Glifosato y OGM',
    desc: 'Garantía absoluta sin pesticidas químicos, nitrógeno sintético, metales pesados o fungicidas sistémicos. Alimentos puros.',
    tag: 'Pureza Total'
  },
  {
    icon: HeartPulse,
    title: 'Densidad Nutricional y Sabores',
    subtitle: 'Mayor Nivel de Polifenoles',
    desc: 'El desarrollo natural y pausado de los cultivos produce mayores niveles de antioxidantes, vitaminas y minerales de gran complejidad.',
    tag: 'Salud Humana'
  },
  {
    icon: TreeDeciduous,
    title: 'Regeneración del Ecosistema',
    subtitle: 'Finca Viva Autosostenible',
    desc: 'El ganado integrado, los corredores silvestres de Jarilla y las aves nativas transforman cada finca en un santuario natural.',
    tag: 'Biodiversidad'
  }
];

export const WhyBiodynamicSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#284933] bg-[#E2EAD8] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Ventajas Ecológicas y Nutricionales
        </span>
        <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#1A3323] leading-tight">
          Por qué la Agricultura Biodinámica Transforma Todo
        </h2>
        <p className="text-xs sm:text-base text-[#625846] leading-relaxed">
          Va mucho más allá de lo orgánico tradicional. La biodinámica concibe la Tierra como un ser vivo, regenerando el paisaje mientras produce alimentos de pureza inigualable.
        </p>
      </div>

      {/* Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TOPICS.map((topic, i) => {
          const Icon = topic.icon;
          return (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white p-8 rounded-3xl border border-[#E3DEC3] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#EFF4EC] text-[#284933] flex items-center justify-center group-hover:bg-[#1A3323] group-hover:text-[#D4AF37] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A775E] bg-[#F4F1EA] px-2.5 py-1 rounded-md">
                    {topic.tag}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xl text-[#1A3323] group-hover:text-[#284933] transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#D4AF37] mt-0.5 font-serif">
                    {topic.subtitle}
                  </p>
                </div>

                <p className="text-xs text-[#524B3B] leading-relaxed">
                  {topic.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0ECE1] flex items-center justify-between text-[11px] text-[#284933] font-semibold">
                <span>Estudios Científicos Avalados</span>
                <span className="text-[#D4AF37] font-bold">100% Certificado</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Feature Highlight Banner */}
      <div className="bg-[#1A3323] text-white p-8 sm:p-12 rounded-3xl border border-[#2B523A] shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF37]">
            Estándar Demeter Internacional
          </span>
          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
            "No heredamos la tierra de nuestros antepasados; la tomamos prestada de nuestros hijos."
          </h3>
          <p className="text-xs text-[#C8BFB0] leading-relaxed max-w-xl">
            Cada finca miembro de BioMendoza pasa por auditorías anuales de Demeter para garantizar el cumplimiento holístico en biodiversidad y cuidado del suelo.
          </p>
        </div>
        <div className="md:col-span-4 flex justify-center md:justify-end">
          <div className="w-28 h-28 rounded-full border-2 border-[#D4AF37] flex flex-col items-center justify-center text-center p-2 bg-[#23422F]">
            <ShieldCheck className="w-8 h-8 text-[#D4AF37] mb-1" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-white">Demeter</span>
            <span className="text-[9px] text-[#C8BFB0]">100% Verificado</span>
          </div>
        </div>
      </div>

    </section>
  );
};