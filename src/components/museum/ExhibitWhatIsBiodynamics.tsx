import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Scale, Info, CheckCircle2 } from 'lucide-react';

export const ExhibitWhatIsBiodynamics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'paradigm'>('philosophy');

  return (
    <div className="space-y-12">
      
      {/* Exhibit Header */}
      <div className="border-l-4 border-[#D4AF37] pl-6 space-y-2">
        <span className="text-xs uppercase font-serif font-bold tracking-widest text-[#D4AF37] flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#D4AF37]" /> Sala I • La Génesis del Pensamiento Agrícola
        </span>
        <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#1A3323]">
          ¿Qué es la Biodinámica?
        </h2>
        <p className="text-xs sm:text-base text-[#625846] max-w-3xl leading-relaxed">
          Surgida en 1924 tras el ciclo de conferencias de Rudolf Steiner en Koberwitz, la biodinámica es el sistema de agricultura ecológica verificado más antiguo del mundo. Concibe la tierra no como una máquina química, sino como un ser vivo interconectado con el cosmos.
        </p>
      </div>

      {/* Interactive Switcher */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setActiveTab('philosophy')}
          className={`px-5 py-2.5 rounded-full text-xs font-serif font-bold transition-all ${
            activeTab === 'philosophy'
              ? 'bg-[#1A3323] text-[#D4AF37] shadow-lg border border-[#D4AF37]/40'
              : 'bg-[#EFECE3] text-[#524B3B] hover:bg-[#E3DDD0]'
          }`}
        >
          I. La Visión Filosófica (1924)
        </button>
        <button
          onClick={() => setActiveTab('paradigm')}
          className={`px-5 py-2.5 rounded-full text-xs font-serif font-bold transition-all ${
            activeTab === 'paradigm'
              ? 'bg-[#1A3323] text-[#D4AF37] shadow-lg border border-[#D4AF37]/40'
              : 'bg-[#EFECE3] text-[#524B3B] hover:bg-[#E3DDD0]'
          }`}
        >
          II. Matriz Comparativa de Paradigmas
        </button>
      </div>

      {/* Content Section 1: Philosophy */}
      {activeTab === 'philosophy' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#1A3323] text-white p-8 sm:p-12 rounded-3xl border border-[#2B523A] shadow-2xl relative overflow-hidden"
        >
          <div className="md:col-span-7 space-y-5 relative z-10">
            <span className="text-[10px] uppercase font-bold tracking-widest bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full border border-[#D4AF37]/30">
              Placa de Exposición #01
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-4xl text-white leading-tight">
              "La planta no puede comprenderse separada de la tierra ni del cielo."
            </h3>
            <p className="text-xs sm:text-sm text-[#C8BFB0] leading-relaxed font-sans">
              Mientras la ciencia industrial aísla a la planta en macetas hydroponicas inyectadas con sales de NPK, la biodinámica reconoce que el crecimiento vegetal es la síntesis armónica entre la fuerza telúrica de las raíces bajo tierra y la energía fotosintética reflejada por el sol y los planetas.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
              <div className="bg-[#244530] p-4 rounded-2xl border border-[#325C40] space-y-1">
                <strong className="text-[#D4AF37] block font-serif">Fuerzas Telúricas</strong>
                <p className="text-[11px] text-[#D8D0C0]">Amoníaco, agua, nitrógeno y minerales absorbidos por micorrizas en las raíces.</p>
              </div>
              <div className="bg-[#244530] p-4 rounded-2xl border border-[#325C40] space-y-1">
                <strong className="text-[#D4AF37] block font-serif">Fuerzas Cósmicas</strong>
                <p className="text-[11px] text-[#D8D0C0]">Luz solar, ciclos lunares, calor y polaridades que forman pigmentos y aromas.</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 relative z-10">
            <div className="aspect-4/5 rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000"
                alt="Viñedo biodinámico"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A3323] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-white font-serif italic text-center">
                Finca El Sol — Mendoza, Argentina (1.300m sobre el nivel del mar)
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content Section 2: Paradigm Comparison */}
      {activeTab === 'paradigm' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DEC3] shadow-xs space-y-6"
        >
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="font-serif font-bold text-2xl text-[#1A3323]">Evolución del Pensamiento Agrícola</h3>
            <p className="text-xs text-[#786D58]">
              Comparativa técnica entre la agricultura química convencional, la orgánica básica y la biodinámica regenerativa.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1A3323]">
              <thead className="bg-[#FAF7F0] border-b border-[#E3DEC3] uppercase text-[10px] font-bold text-[#786D58]">
                <tr>
                  <th className="p-4">Criterio</th>
                  <th className="p-4 text-gray-500">Agr. Convencional</th>
                  <th className="p-4 text-[#284933]">Agr. Orgánica Estándar</th>
                  <th className="p-4 text-[#1A3323] bg-[#EFF4EC] font-serif text-sm">Agr. Biodinámica Demeter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0ECE1]">
                <tr>
                  <td className="p-4 font-bold">Concepción del Suelo</td>
                  <td className="p-4 text-gray-500">Soporte inerte para fertilizante</td>
                  <td className="p-4 text-[#284933]">Medio biológico a no contaminar</td>
                  <td className="p-4 bg-[#EFF4EC] font-bold text-[#1A3323]">Organismo vivo autorregenerativo</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Fertilidad y Abono</td>
                  <td className="p-4 text-gray-500">Sales de Nitrógeno / Fósforo sintético</td>
                  <td className="p-4 text-[#284933]">Compost comprado e insumos orgánicos</td>
                  <td className="p-4 bg-[#EFF4EC] font-bold text-[#1A3323]">Compost propio enriquecido con Preps 502–507</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Uso del Calendario</td>
                  <td className="p-4 text-gray-500">Criterio industrial mecánico</td>
                  <td className="p-4 text-[#284933]">Criterio climático estacional</td>
                  <td className="p-4 bg-[#EFF4EC] font-bold text-[#1A3323]">Calendario astronómico (Luna / Constelaciones)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Diversidad del Ecosistema</td>
                  <td className="p-4 text-gray-500">Monocultivo intensivo</td>
                  <td className="p-4 text-[#284933]">Manejo de plagas sin químicos</td>
                  <td className="p-4 bg-[#EFF4EC] font-bold text-[#1A3323]">Integración animal, corredores biológicos nativos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

    </div>
  );
};