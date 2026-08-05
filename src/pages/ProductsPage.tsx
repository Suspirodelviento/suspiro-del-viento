import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Input } from '../components/ui/input';
import { Search, SlidersHorizontal, Leaf, Sparkles, ArrowUpDown, Heart, CheckCircle2 } from 'lucide-react';
import { PRODUCERS } from '../data/mockData';

export const ProductsPage: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    favorites
  } = useShop();

  // Additional Filter States
  const [selectedProducerId, setSelectedProducerId] = useState<string>('All');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('default');

  const categories = [
    'All',
    'Wine',
    'Olive Oil',
    'Honey',
    'Fresh Vegetables',
    'Fruits',
    'Flours',
    'Tea',
    'Natural Preserves'
  ];

  // Filtering Logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesProducer = selectedProducerId === 'All' || p.producerId === selectedProducerId;
    const matchesStock = !onlyInStock || p.inStock;
    const matchesFavorite = !onlyFavorites || favorites.includes(p.id);
    const matchesPrice = p.price <= maxPrice;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.producerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesCategory &&
      matchesProducer &&
      matchesStock &&
      matchesFavorite &&
      matchesPrice &&
      matchesSearch
    );
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // default
  });

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedProducerId('All');
    setOnlyInStock(false);
    setOnlyFavorites(false);
    setMaxPrice(30000);
    setSortBy('default');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Catalog Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-[#284933] bg-[#E2EAD8] px-3.5 py-1 rounded-full inline-flex items-center gap-1">
          <Leaf className="w-3.5 h-3.5" /> Catálogo Directo del Terruño
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#1A3323]">
          Tienda Biodinámica de Mendoza
        </h1>
        <p className="text-xs sm:text-sm text-[#625846] leading-relaxed">
          Explorá vinos de reserva, aceite de oliva extra virgen, miel silvestre de jarilla y cosechas frescas de la precordillera.
        </p>
      </div>

      {/* Main Controls & Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-[#E3DEC3] shadow-xs space-y-5">
        
        {/* Top Row: Search & Sorting */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar producto, varietal, miel, o finca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#FBF9F5] border-[#D8D2C0] text-xs h-11 rounded-xl focus-visible:ring-[#1A3323]"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <ArrowUpDown className="w-4 h-4 text-[#284933] shrink-0" />
            <span className="text-xs font-bold text-[#1A3323] whitespace-nowrap">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FBF9F5] border border-[#D8D2C0] text-xs h-11 px-3 rounded-xl text-[#1A3323] font-medium focus:outline-none w-full md:w-auto"
            >
              <option value="default">Recomendados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Valorados</option>
              <option value="name">Nombre (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#F0ECE1]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1A3323] text-white shadow-xs'
                  : 'bg-[#F2EFE8] text-[#524B3B] hover:bg-[#E5E0D0]'
              }`}
            >
              {cat === 'Wine' ? 'Vinos' : cat === 'Olive Oil' ? 'Aceite de Oliva' : cat === 'Honey' ? 'Miel' : cat === 'Fresh Vegetables' ? 'Hortalizas' : cat === 'Fruits' ? 'Frutas' : cat === 'Flours' ? 'Harinas' : cat === 'Natural Preserves' ? 'Conservas' : cat}
            </button>
          ))}
        </div>

        {/* Secondary Detailed Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-[#F0ECE1] text-xs">
          
          {/* Producer Filter */}
          <div>
            <label className="font-bold text-[#1A3323] block mb-1">Filtrar por Finca / Productor:</label>
            <select
              value={selectedProducerId}
              onChange={(e) => setSelectedProducerId(e.target.value)}
              className="w-full bg-[#FBF9F5] border border-[#D8D2C0] rounded-xl p-2.5 text-xs text-[#1A3323] focus:outline-none"
            >
              <option value="All">Todas las Fincas</option>
              {PRODUCERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between font-bold text-[#1A3323] mb-1">
              <span>Precio Máximo:</span>
              <span>${maxPrice.toLocaleString('es-AR')} ARS</span>
            </div>
            <input
              type="range"
              min="3000"
              max="30000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#1A3323]"
            />
          </div>

          {/* In Stock & Favorites Toggles */}
          <div className="flex items-center gap-4 sm:col-span-2 pt-2 sm:pt-4">
            <label className="flex items-center gap-2 cursor-pointer text-[#1A3323] font-semibold">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 accent-[#1A3323] rounded"
              />
              <span>Solo En Stock</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-[#C85A32] font-semibold">
              <input
                type="checkbox"
                checked={onlyFavorites}
                onChange={(e) => setOnlyFavorites(e.target.checked)}
                className="w-4 h-4 accent-[#C85A32] rounded"
              />
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-[#C85A32]" /> Ver solo Favoritos ({favorites.length})
              </span>
            </label>
          </div>

        </div>

      </div>

      {/* Catalog Results Summary & Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-[#786D58] border-b border-[#E3DEC8] pb-3">
          <span>
            Mostrando <strong>{sortedProducts.length}</strong> de {products.length} productos biodinámicos
          </span>

          {(selectedCategory !== 'All' || selectedProducerId !== 'All' || onlyInStock || onlyFavorites || searchQuery || maxPrice < 30000 || sortBy !== 'default') && (
            <button
              onClick={clearAllFilters}
              className="text-[#C85A32] hover:underline font-bold"
            >
              Limpiar Todos los Filtros
            </button>
          )}
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-[#E3DEC3]">
            <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto" />
            <h3 className="font-serif font-bold text-xl text-[#1A3323]">No encontramos productos que coincidan</h3>
            <p className="text-xs text-[#786D58]">Probá ajustando la búsqueda, aumentando el rango de precio o cambiando de categoría.</p>
            <button
              onClick={clearAllFilters}
              className="text-xs underline text-[#1A3323] font-semibold pt-2"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};