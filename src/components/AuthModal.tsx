import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Lock, User, LogIn, Users, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, switchUser, availableMockUsers, user } = useShop();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email, name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FBF9F5] border border-[#D5CFBE] rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#1A3323] p-1 rounded-full hover:bg-[#EFECE3]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 bg-[#1A3323] text-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-[#1A3323]">
            {isRegister ? 'Crear Cuenta BioMendoza' : 'Acceso de Socio'}
          </h3>
          <p className="text-xs text-[#625846]">
            {isRegister
              ? 'Accedé al seguimiento de envíos de cosecha y guardá tus fincas favoritas.'
              : 'Ingresá a tu panel para gestionar tus pedidos o seleccionar un perfil de prueba.'}
          </p>
        </div>

        {/* Quick Profile Switcher Grid */}
        <div className="mb-6 space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#786D58] flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#284933]" /> Perfiles de prueba rápida:
          </label>

          <div className="grid grid-cols-2 gap-2">
            {availableMockUsers.map((u) => {
              const isCurrent = u.id === user.id;
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => {
                    switchUser(u.id);
                    setIsAuthModalOpen(false);
                  }}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    isCurrent
                      ? 'bg-[#1A3323] text-white border-[#1A3323] shadow-xs'
                      : 'bg-white text-[#1A3323] border-[#E3DEC3] hover:border-[#1A3323]'
                  }`}
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0 border border-[#D4AF37]"
                  />
                  <div className="min-w-0 flex-1">
                    <strong className="block text-xs font-serif font-bold truncate leading-tight">{u.name}</strong>
                    <span className={`text-[10px] block truncate ${isCurrent ? 'text-[#D4AF37]' : 'text-[#786D58]'}`}>
                      {u.memberTier}
                    </span>
                  </div>
                  {isCurrent && <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-[#E3DEC3]"></div>
          <span className="shrink mx-3 text-[10px] font-bold text-[#8A7E68] uppercase tracking-wider">o ingresar con tu correo</span>
          <div className="flex-grow border-t border-[#E3DEC3]"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          {isRegister && (
            <div>
              <label className="text-xs font-bold text-[#1A3323] block mb-1">Nombre Completo</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Mateo Paz"
                  className="pl-9 bg-white border-[#C8C2B0] text-xs h-10"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-[#1A3323] block mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mateo.paz@biomendoza.com"
                className="pl-9 bg-white border-[#C8C2B0] text-xs h-10"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#1A3323] hover:bg-[#284933] text-white rounded-xl h-11 text-xs font-bold shadow-lg flex items-center justify-center gap-2 mt-2"
          >
            <LogIn className="w-4 h-4 text-[#D4AF37]" />
            {isRegister ? 'Registrarme' : 'Ingresar a mi Cuenta'}
          </Button>
        </form>

        {/* Footer switch */}
        <div className="mt-4 pt-3 border-t border-[#E3DEC3] text-center text-xs text-[#625846]">
          {isRegister ? (
            <p>
              ¿Ya tenés una cuenta?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-[#1A3323] font-bold underline"
              >
                Iniciar Sesión
              </button>
            </p>
          ) : (
            <p>
              ¿No tenés cuenta aún?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-[#1A3323] font-bold underline"
              >
                Registrarme Gratis
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};