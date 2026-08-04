import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Input } from '../components/ui/input';
import { Search, SlidersHorizontal, Leaf, Sparkles } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useShop();

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

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.producerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-[#284933] bg-[#E2EAD8] px-3 py-1 rounded-full inline-flex items-center gap-1">
          <Leaf className="w-3.5 h-3.5" /> Direct Terroir Pantry
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#1A3323]">
          Certified Biodynamic Marketplace
        </h1>
        <p className="text-xs sm:text-sm text-[#625846] leading-relaxed">
          Every product is produced in Mendoza without chemical sprays, in harmony with solar and lunar rhythms.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E3DEC3] shadow-xs space-y-4">
        
        {/* Search bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search wine, olive oil, honey, producer, or preparation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#FBF9F5] border-[#D8D2C0] text-xs h-11 rounded-xl focus-visible:ring-[#1A3323]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 justify-center pt-2 border-t border-[#F0ECE1]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1A3323] text-white shadow-sm'
                  : 'bg-[#F2EFE8] text-[#524B3B] hover:bg-[#E5E0D0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-[#E3DEC3]">
          <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto" />
          <h3 className="font-serif font-bold text-xl text-[#1A3323]">No products match your criteria</h3>
          <p className="text-xs text-[#786D58]">Try adjusting your search query or selecting a different category.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-xs underline text-[#1A3323] font-semibold"
          >
            Clear Search Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};