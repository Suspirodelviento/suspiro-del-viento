import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, Leaf, Sparkles, User, ShieldCheck, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    cart,
    favorites,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    isLoggedIn,
    logout,
    setIsAuthModalOpen,
    user
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products');
      setSearchModalOpen(false);
    }
  };

  // Explicit required pages
  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Tienda', path: '/products' },
    { label: 'Productores', path: '/producers' },
    { label: 'Aprender', path: '/education' },
    { label: 'Nosotros', path: '/about' },
    { label: 'Contacto', path: '/contact' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#1A3323] text-[#F4F1EA] text-xs py-2 px-4 text-center flex items-center justify-center gap-3 tracking-wide font-medium">
        <span className="flex items-center gap-1 text-[#D4AF37]">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Biodinámico Certificado
        </span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline">Directo desde fincas mendocinas a tu puerta</span>
        <span>•</span>
        <span className="underline decoration-[#D4AF37]/50 underline-offset-2">Envío gratis en Mendoza desde $12.000 ARS</span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E3DEC3] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#1A3323] flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform shadow-sm">
              <Leaf className="w-5 h-5 fill-[#D4AF37]/20" />
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-[#1A3323] tracking-tight block">
                BioMendoza
              </span>
              <span className="text-[10px] text-[#6B5E4A] tracking-widest uppercase block -mt-1 font-sans">
                Terruño Biodinámico
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors hover:text-[#1A3323] relative py-1 ${
                    isActive ? 'text-[#1A3323]' : 'text-[#625846]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37] rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Conditional Dashboard Link (Only visible if logged in) */}
            {isLoggedIn && (
              <Link
                to="/dashboard"
                className={`text-xs font-semibold uppercase tracking-wider transition-colors hover:text-[#1A3323] relative py-1 flex items-center gap-1 ${
                  location.pathname === '/dashboard' ? 'text-[#1A3323]' : 'text-[#C85A32]'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
                {location.pathname === '/dashboard' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C85A32] rounded-full" />
                )}
              </Link>
            )}
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center space-x-2.5">
            {/* Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-[#524B3B] hover:text-[#1A3323] hover:bg-[#EFECE3] rounded-full transition-colors"
              title="Buscar productos o fincas"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to={isLoggedIn ? "/dashboard" : "#"}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  setIsAuthModalOpen(true);
                }
              }}
              className="p-2 text-[#524B3B] hover:text-[#1A3323] hover:bg-[#EFECE3] rounded-full transition-colors relative"
              title="Favoritos guardados"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#C85A32] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Login/Dashboard Button */}
            {isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 text-xs text-[#1A3323] font-bold bg-[#EFF4EC] px-3 py-1.5 rounded-full border border-[#C8DAC0]"
                >
                  <User className="w-3.5 h-3.5 text-[#284933]" />
                  <span className="truncate max-w-[100px]">{user?.name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#1A3323] px-3.5 py-1.5 rounded-full border border-[#1A3323] hover:bg-[#1A3323] hover:text-white transition-all shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Ingresar</span>
              </button>
            )}

            {/* Cart Button */}
            <Button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#1A3323] hover:bg-[#284933] text-[#F4F1EA] rounded-full px-4 py-2 flex items-center gap-2 transition-all shadow-md"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-semibold hidden sm:inline">Carrito</span>
              {cartCount > 0 && (
                <span className="bg-[#D4AF37] text-[#1A3323] font-bold text-xs rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1A3323] hover:bg-[#EFECE3] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-[#FBF9F5] rounded-2xl w-full max-w-2xl p-6 shadow-2xl border border-[#D8D2C2] animate-in fade-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-[#1A3323] font-serif font-bold text-lg">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                Buscador BioMendoza
              </div>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <Input
                type="text"
                placeholder="Buscar Malbec, Aceite de Oliva, Miel de Jarilla, Cesta de cosecha, Valle de Uco..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border-[#C8C2B0] text-[#1A3323] rounded-xl h-12 focus-visible:ring-[#1A3323]"
                autoFocus
              />
              <Button type="submit" className="bg-[#1A3323] text-white rounded-xl h-12 px-6">
                Buscar
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#524B3B]">
              <span className="font-semibold text-[#1A3323]">Búsquedas frecuentes:</span>
              {['Malbec 2022', 'Aceite Extra Virgen', 'Miel de Jarilla', 'Caja Cosecha', 'Certificado Demeter'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    navigate('/products');
                    setSearchModalOpen(false);
                  }}
                  className="bg-[#EFECE3] hover:bg-[#E2DDD0] px-2.5 py-1 rounded-full transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[112px] bg-[#FBF9F5] border-b border-[#D8D2C2] z-30 p-6 shadow-xl animate-in slide-in-from-top duration-200 space-y-3">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-serif font-bold text-[#1A3323] hover:text-[#C85A32] border-b border-[#E8E3D5] pb-2.5"
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-[#C85A32] border-b border-[#E8E3D5] pb-2.5 flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard de Socio
              </Link>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="text-sm font-bold text-[#1A3323] border-b border-[#E8E3D5] pb-2.5 text-left flex items-center gap-2"
              >
                <LogIn className="w-4 h-4 text-[#D4AF37]" /> Iniciar Sesión / Registrarme
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};