import React from 'react';
import { motion } from 'framer-motion';
import { Wine, Sparkles, Sprout, Sun, Leaf, Flame, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  {
    name: 'Wine',
    label: 'Vinos Reserva',
    desc: 'Malbec de altura y fermentaciones naturales',
    icon: Wine,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Olive Oil',
    label: 'Aceites de Oliva',
    desc: 'Variedad Arauco prensada en frío de olivares de 80 años',
    icon: Sun,
    image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Honey',
    label: 'Mieles Puras',
    desc: 'Miel cruda sin calentar de jarilla andina silvestre',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Fresh Vegetables',
    label: 'Hortalizas Frescas',
    desc: 'Cosechadas al amanecer del día de entrega',
    icon: Sprout,
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Fruits',
    label: 'Frutas de Montaña',
    desc: 'Manzanas criollas y membrillos de gran altitud',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Flours',
    label: 'Harinas Molidas a Piedra',
    desc: 'Centeno entero y cereales de molienda artesanal',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600'
  }
];

export const CategoriesSection: React.FC = () => {
  const { setSelectedCategory } = useShop();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    navigate('/products');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#E3DEC8] pb-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#284933] bg-[#E2EAD8] px-3 py-1 rounded-full inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Alacena Directa del Terruño
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A3323] mt-2">
            Explorá las Categorías Biodinámicas
          </h2>
        </div>
        <p className="text-xs text-[#786D58] max-w-md">
          Estrictamente libres de agroquímicos y recolectadas según el calendario cósmico astronómico.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-[#E3DEC3]"
            >
              {/* Image Background */}
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#14261A] via-[#14261A]/40 to-transparent transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#1A3323] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-serif font-bold text-2xl text-white group-hover:text-[#D4AF37] transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-[#E3DCCE] mt-1 line-clamp-1 font-sans">
                    {cat.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};