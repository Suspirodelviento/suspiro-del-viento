import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Sun, Heart, RefreshCw, Layers, ShieldCheck } from 'lucide-react';

const ORGANISM_NODES = [
  {
    id: 'cows',
    title: 'Ganado Vacuno & Cuernos',
    role: 'El Sistema Digestivo de la Finca',
    desc: 'Las vacas alimentadas exclusivamente con pasto propio generan el estiércol vital para el Preparado 500. Sus cuernos concentran la energía metabólica durante el invierno.',
    color: '#D4AF37'
  },
  {
    id: 'cover',
    title: 'Cultivos de Cobertura',
    role: 'El Sistema Respiratorio y Pulmón del Suelo',
    desc: 'Tréboles, brásicas y leguminosas silvestres entre hileras fijan nitrógeno de la atmósfera y alimentan la red de micorrizas sin labranza.',
    color: '#284933'
  },
  {
    id: 'bees',
    title: 'Abejas Silvestres & Jarilla',
    role: 'El Sistema Nervioso Polinizador',
    desc: 'Los matorrales nativos de Jarilla y Lavanda andina sustentan colonias de abejas silvestres que polinizan las flores y transfieren vitalidad vegetal.',
    color: '#C85A32'
  },
  {
    id: 'farmer',
    title: 'El Agricultor Consciente',
    role: 'La Mente y Corazón de la Finca',
    desc: 'El agricultor biodinámico no domina la naturaleza: observa los ritmos astronómicos, dinamiza las preparaciones y guía la armonía del conjunto.',
    color: '#1A3323'
  }
];

export const ExhibitFarmOrganism: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState(ORGANISM_NODES[0]);

  return (
    <div className="space-y-12">
      
      {/* Exhibit Header */}
      <div className="border-l-4 border-[#284933] pl-6 space-y-2">
        <span className="text-xs uppercase font-serif font-bold tracking-widest text-[#284933] flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-[#284933]" /> Sala II • La Finca Holobionte
        </span>
        <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#1A3323]">
          El Organismo Finca
        </h2>
        <p className="text-xs sm:text-base text-[#625846] max-w-3xl leading-relaxed">
          Una finca biodinámica busca ser un ser vivo autosuficiente. En lugar de importar insumos del exterior, genera su propia fertilidad, sus semillas, su estiércol y sus defensas naturales a través del equilibrio entre sus órganos.
        </p>
      </div>

      {/* Interactive Organism Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Nodes list */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#786D58] block">
            Hacé clic en un Órgano de la Finca:
          </span>

          {ORGANISM_NODES.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#1A3323] text-white border-[#1A3323] shadow-lg scale-[1.02]'
                    : 'bg-white text-[#1A3323] border-[#E3DEC3] hover:border-[#1A3323]'
                }`}
              >
                <div>
                  <h4 className="font-serif font-bold text-sm">{node.title}</h4>
                  <p className={`text-xs mt-0.5 ${isSelected ? 'text-[#D4AF37]' : 'text-[#786D58]'}`}>
                    {node.role}
                  </p>
                </div>
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: node.color }}
                />
              </button>
            );
          })}
        </div>

        {/* Node Detail Spotlight */}
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-7 bg-[#FAF7F0] border-2 border-[#E5DFCE] p-8 rounded-3xl space-y-6 shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-[#E3DEC3] pb-4">
            <div>
              <span className="text-xs font-serif font-bold uppercase text-[#D4AF37] bg-[#1A3323] px-3 py-1 rounded-full">
                Órgano de la Finca
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A3323] mt-2">
                {selectedNode.title}
              </h3>
            </div>
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-md"
              style={{ backgroundColor: selectedNode.color }}
            >
              <Sprout className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="space-y-3 text-xs text-[#4A4234] leading-relaxed">
            <h5 className="font-bold text-[#1A3323] text-sm font-serif">Función Holística:</h5>
            <p className="bg-white p-4 rounded-2xl border border-[#E3DEC3] text-sm text-[#1A3323]">
              {selectedNode.desc}
            </p>
          </div>

          <div className="p-4 bg-[#EFF4EC] rounded-2xl border border-[#C8DAC0] text-xs text-[#284933] flex items-center gap-2 font-medium">
            <ShieldCheck className="w-5 h-5 shrink-0 text-[#284933]" />
            Garantiza que la finca no necesite comprar nitrógeno químico ni plaguicidas sintéticos.
          </div>
        </motion.div>

      </div>

    </div>
  );
};