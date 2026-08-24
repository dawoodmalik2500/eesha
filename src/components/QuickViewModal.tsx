import { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative bg-ink-50 rounded-sm shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-ink-50/80 backdrop-blur-sm rounded-full text-ink-700 hover:text-ink-900 hover:bg-ink-100 transition-colors"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-[3/4] md:aspect-auto bg-ink-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.isNew && (
                <span className="bg-sage-600 text-ink-50 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm">
                  New
                </span>
              )}
              {product.isBestseller && (
                <span className="bg-gold-500 text-ink-900 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm">
                  Bestseller
                </span>
              )}
              {discount > 0 && (
                <span className="bg-rose-600 text-ink-50 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm">
                  -{discount}%
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 lg:p-8 flex flex-col">
            <p className="text-[10px] tracking-[0.2em] uppercase text-gold-600 mb-2">
              {product.fabric}
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl font-medium text-ink-900 mb-3">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl font-semibold text-ink-900">
                PKR {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-base text-ink-400 line-through">
                  PKR {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-sm text-ink-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mb-6">
              <p className="text-xs tracking-wider uppercase text-ink-600 mb-2">Color</p>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-gold-500 scale-110'
                        : 'border-ink-200 hover:border-ink-400'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-xs tracking-wider uppercase text-ink-600 mb-2">Quantity</p>
              <div className="flex items-center border border-ink-200 rounded-sm w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-ink-600 hover:text-ink-900 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="px-5 text-sm font-medium text-ink-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2.5 text-ink-600 hover:text-ink-900 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary rounded-sm mt-auto"
            >
              {added ? (
                <>
                  <Check size={18} /> Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> Add to Bag — PKR {(product.price * quantity).toLocaleString()}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
