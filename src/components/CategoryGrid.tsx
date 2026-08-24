import { CATEGORIES, type Category } from '@/data/products';
import { ArrowUpRight } from 'lucide-react';

interface CategoryGridProps {
  onSelect: (category: Category) => void;
}

export default function CategoryGrid({ onSelect }: CategoryGridProps) {
  return (
    <section className="py-16 lg:py-24 container-lux">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-gold-600 mb-3">Explore</p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-ink-900">
          Shop by Category
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {CATEGORIES.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-ink-100 animate-fade-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent transition-opacity group-hover:from-ink-900/90" />
            <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 text-left">
              <h3 className="font-serif text-xl lg:text-2xl font-medium text-ink-50 mb-1">
                {cat.label}
              </h3>
              <p className="text-xs lg:text-sm text-ink-100 leading-relaxed mb-3 line-clamp-2 opacity-90">
                {cat.description}
              </p>
              <span className="inline-flex items-center gap-1 text-xs tracking-wider uppercase text-gold-300 group-hover:text-gold-200 transition-colors">
                Discover
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
