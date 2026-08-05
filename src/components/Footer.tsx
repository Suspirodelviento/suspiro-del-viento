import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, MapPin, ArrowRight, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#14261A] text-[#F4F1EA] pt-16 pb-12 border-t border-[#233F2B] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter & Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1D3826] p-8 rounded-3xl border border-[#284C34]">
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-4 h-4" /> Diario del Suelo Vivo
            </div>
            <h3 className="font-serif font-bold text-2xl text-white">
              Comunidad Biodinámica de Mendoza
            </h3>
            <p className="text-xs text-[#C8BFB0] leading-relaxed max-w-xl">
              Recibí calendarios lunares mensuales de cosecha, invitaciones a jornadas de preparados en el Valle de Uco y partidas limitadas de fincas.
            </p>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <Input
                type="email"
                placeholder="Ingresá tu correo electrónico"
                className="bg-[#14261A] border-[#2A4B35] text-white text-xs h-11 rounded-xl placeholder:text-[#887D6B]"
              />
              <Button type="submit" className="bg-[#D4AF37] hover:bg-[#b8952b] text-[#14261A] font-bold rounded-xl h-11 px-5 text-xs shrink-0">
                Suscribirme <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </form>
          </div>
        </div>

        {/* Middle Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#14261A]">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-xl font-serif font-bold text-white tracking-tight">
                BioMendoza
              </span>
            </Link>
            <p className="text-[#B3AA9B] leading-relaxed max-w-sm">
              Conectando consumidores conscientes con productores biodinámicos certificados por Demeter en Mendoza, Argentina. Cultivando suelos sanos y alimentos de verdad.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#D4AF37] font-semibold">
              <ShieldCheck className="w-4 h-4" /> Fincas 100% Certificadas por Demeter
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">Navegación</h4>
            <ul className="space-y-2 text-[#B3AA9B]">
              <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Tienda Biodinámica</Link></li>
              <li><Link to="/producers" className="hover:text-white transition-colors">Nuestros Productores</Link></li>
              <li><Link to="/education" className="hover:text-white transition-colors">Aprender Biodinámica</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Educational Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">Educación Biodinámica</h4>
            <ul className="space-y-2 text-[#B3AA9B]">
              <li><Link to="/education" className="hover:text-white transition-colors">Principios de Rudolf Steiner</Link></li>
              <li><Link to="/education" className="hover:text-white transition-colors">Preparados 500–508</Link></li>
              <li><Link to="/education" className="hover:text-white transition-colors">Calendario Lunar Agrícola</Link></li>
              <li><Link to="/education" className="hover:text-white transition-colors">Investigación del Suelo</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">Terruños de Mendoza</h4>
            <ul className="space-y-2 text-[#B3AA9B]">
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Valle de Uco (Tunuyán)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Gualtallary (Tupungato)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Agrelo (Luján de Cuyo)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Maipú y San Rafael</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#233F2B] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#887D6B] gap-4">
          <p>© {new Date().getFullYear()} BioMendoza Terruño S.A. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1 text-[#B3AA9B]">
            Elaborado con <Heart className="w-3 h-3 text-[#C85A32] fill-[#C85A32]" /> en Mendoza, Argentina
          </div>
        </div>

      </div>
    </footer>
  );
};