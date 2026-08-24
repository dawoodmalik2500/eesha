import { useState } from 'react';
import { Eye, Plus, Check } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onOrderNow: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView, onOrderNow }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="group cursor-pointer" onClick={() => onQuickView(product)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-ink-100 card-shadow transition-shadow duration-300 group-hover:card-shadow-hover">
        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <span className="bg-sage-600 text-ink-50 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm">New</span>}
          {product.isBestseller && <span className="bg-gold-500 text-ink-900 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm">Bestseller</span>}
          {discount > 0 && <span className="bg-rose-600 text-ink-50 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm">-{discount}%</span>}
        </div>
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button onClick={handleQuickAdd} className="flex-1 flex items-center justify-center gap-1.5 bg-ink-900/90 backdrop-blur-sm text-ink-50 text-xs font-medium tracking-wide uppercase py-3 hover:bg-gold-600 transition-colors rounded-sm">
            {added ? <><Check size={14} /> Added</> : <><Plus size={14} /> Quick Add</>}
          </button>
          <button onClick={(e) => { e.stopPropagation(); onQuickView(product); }} className="w-12 flex items-center justify-center bg-ink-50/90 backdrop-blur-sm text-ink-900 hover:bg-gold-300 transition-colors rounded-sm" aria-label="Quick view"><Eye size={18} /></button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <button onClick={handleQuickAdd} className="flex items-center justify-center gap-1 bg-ink-900 text-ink-50 py-2.5 text-[10px] sm:text-xs font-medium tracking-wide uppercase rounded-sm hover:bg-gold-600 transition-colors">
          {added ? <Check size={13} /> : <Plus size={13} />} {added ? 'Added' : 'Add to Cart'}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onOrderNow(product); }} className="flex items-center justify-center gap-1 border border-ink-900 text-ink-900 py-2.5 text-[10px] sm:text-xs font-medium tracking-wide uppercase rounded-sm hover:bg-ink-900 hover:text-ink-50 transition-colors">Order Now</button>
      </div>
      <div className="mt-4 px-1">
        <p className="text-[10px] tracking-[0.15em] uppercase text-ink-500 mb-1">{product.fabric}</p>
        <h3 className="font-serif text-base lg:text-lg font-medium text-ink-900 leading-snug line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1.5"><span className="text-sm font-semibold text-ink-900">PKR {product.price.toLocaleString()}</span>{product.originalPrice && <span className="text-xs text-ink-400 line-through">PKR {product.originalPrice.toLocaleString()}</span>}</div>
        <div className="flex items-center gap-1.5 mt-2">{product.colors.map((color, idx) => <span key={idx} className="w-3 h-3 rounded-full border border-ink-200" style={{ backgroundColor: color }} />)}</div>
      </div>
    </div>
  );
}
