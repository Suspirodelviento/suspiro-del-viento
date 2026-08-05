import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "El Reserva Malbec de Finca El Sol refleja una pureza de fruta e intensidad que solo los suelos vivos sin agroquímicos pueden lograr. Es el nuevo estándar del terruño mendocino.",
    author: "Matías Rossi",
    role: "Sommelier Principal, Gremio de Terruños de Mendoza",
    location: "Chacras de Coria",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "Recibir nuestro cajón semanal de hortalizas de Terruño Luján es una conexión directa con la tierra. La densidad de sabor de las zanahorias y el aceite de oliva extra virgen es inigualable.",
    author: "Elena Vasquez",
    role: "Chef de Cocina Consciente",
    location: "Mendoza Capital",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "Saber que cada frasco de miel de jarilla apoya los corredores de abejas silvestres y no contiene pesticidas me da total tranquilidad para mi familia.",
    author: "Ignacio Gómez",
    role: "Divulgador Botánico & Consumidor",
    location: "Valle de Uco",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8A775E] bg-[#EFECE3] px-3 py-1 rounded-full">
          Voces de Mendoza
        </span>
        <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A3323]">
          Elegido por Chefs, Sommeliers y Familias
        </h2>
        <p className="text-xs text-[#625846]">
          Descubrí por qué quienes eligen comer con conciencia eligen BioMendoza.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, index) => (
          <motion.div
            key={t.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-8 rounded-3xl border border-[#E3DEC3] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 relative"
          >
            <Quote className="w-10 h-10 text-[#D4AF37]/30 absolute top-6 right-6 pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-1 text-[#D4AF37]">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-[#4A4234] leading-relaxed italic font-serif">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#F0ECE1] flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.author}
                className="w-11 h-11 rounded-full object-cover border-2 border-[#D4AF37]"
              />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1A3323]">{t.author}</h4>
                <p className="text-[10px] text-[#786D58]">{t.role} • {t.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};