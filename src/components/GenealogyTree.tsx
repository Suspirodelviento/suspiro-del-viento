import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const varieties = {
  listan_prieto: { name: "Listán Prieto", x: 50, y: 200, type: "ancestro" },
  moscatel_alejandria: { name: "Moscatel de Alejandría", x: 350, y: 200, type: "ancestro" },
  criolla_grande: { name: "Criolla Grande", x: 200, y: 50, type: "criolla" },
  cereza: { name: "Cereza", x: 200, y: 150, type: "criolla" },
  pedro_gimenez: { name: "Pedro Giménez", x: 200, y: 250, type: "criolla" },
  torrontes_riojano: { name: "Torrontés Riojano", x: 200, y: 350, type: "criolla" },
};

const relations = [
  { from: "listan_prieto", to: "criolla_grande" },
  { from: "moscatel_alejandria", to: "criolla_grande" },
  { from: "listan_prieto", to: "cereza" },
  { from: "moscatel_alejandria", to: "cereza" },
  { from: "listan_prieto", to: "pedro_gimenez" },
  { from: "moscatel_alejandria", to: "torrontes_riojano" },
];

const GenealogyTree = () => {
  return (
    <TooltipProvider>
      <svg viewBox="0 0 400 400" className="w-full h-auto max-w-4xl mx-auto">
        {relations.map((rel, i) => {
          const from = varieties[rel.from];
          const to = varieties[rel.to];
          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#a3a3a3"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.2 }}
            />
          );
        })}

        {Object.values(varieties).map((variety, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <g>
                <motion.circle
                  cx={variety.x}
                  cy={variety.y}
                  r={variety.type === 'ancestro' ? 6 : 4}
                  fill={variety.type === 'ancestro' ? "#6B2737" : "#a3a3a3"}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                />
                <text
                  x={variety.x + 10}
                  y={variety.y + 3}
                  fontSize="8"
                  fill="#333"
                  className="font-sans"
                >
                  {variety.name}
                </text>
              </g>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">{variety.name}</p>
              <p className="text-sm text-muted-foreground">{variety.type === 'ancestro' ? 'Ancestro Europeo' : 'Variedad Criolla'}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </svg>
    </TooltipProvider>
  );
};

export default GenealogyTree;
