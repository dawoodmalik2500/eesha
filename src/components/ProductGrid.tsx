import { useState, useMemo } from 'react';
import { CATEGORIES, PRODUCTS, type Category, type Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  activeCategory: Category | 'all';
  onCategoryChange: (cat: Category | 'all') => void;
  searchQuery: string;
  onQuickView: (product: Product) => void;
  onOrderNow: (product: Product) => void;
}

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

export default function ProductGrid({ activeCategory, onCategoryChange, searchQuery, onQuickView, onOrderNow }: ProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.fabric.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      );
    }
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }
    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const tabs: { id: Category | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <section id="products" className="py-16 lg:py-24 bg-ink-50 scroll-mt-20">
      <div className="container-lux">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-gold-600 mb-3">Our Collection</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-ink-900">
            Featured Products
          </h2>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          {/* Category tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full lg:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onCategoryChange(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium tracking-wide uppercase whitespace-nowrap rounded-sm transition-all duration-200 ${
                  activeCategory === tab.id
                    ? 'bg-ink-900 text-ink-50'
                    : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs tracking-wider uppercase text-ink-500">Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-sm border border-ink-200 bg-ink-50 px-3 py-2 rounded-sm text-ink-800 outline-none focus:border-gold-500 cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {filtered.map((product, idx) => (
              <div
                key={product.id}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(idx * 60, 400)}ms` }}
              >
                <ProductCard product={product} onQuickView={onQuickView} onOrderNow={onOrderNow} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-ink-700 mb-2">No products found</p>
            <p className="text-sm text-ink-500">Try a different category or search term.</p>
          </div>
        )}
      </div>
    </section>
  );
}
