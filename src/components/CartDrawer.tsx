import { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Phone, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CONTACTS } from '@/data/products';

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setCheckingOut(true);
    const message = encodeURIComponent(
      `Hello ${CONTACTS.storeName}, I would like to order:\n\n` +
        items
          .map(
            (i) =>
              `• ${i.name} (${i.selectedColor}) x${i.quantity} — PKR ${(i.price * i.quantity).toLocaleString()}`,
          )
          .join('\n') +
        `\n\nTotal: PKR ${subtotal.toLocaleString()}`,
    );
    window.open(`https://wa.me/${CONTACTS.persons[0].raw}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-ink-50 shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-ink-200">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-gold-600" />
            <h2 className="font-serif text-xl font-medium text-ink-900">
              Shopping Bag ({items.length})
            </h2>
          </div>
          <button onClick={closeCart} className="p-2 text-ink-600 hover:text-ink-900 transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag size={48} className="text-ink-300 mb-4" />
            <p className="font-serif text-xl text-ink-700 mb-2">Your bag is empty</p>
            <p className="text-sm text-ink-500 mb-6">Add some beautiful pieces to your collection.</p>
            <button onClick={closeCart} className="btn-outline">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedColor}`} className="flex gap-4 pb-4 border-b border-ink-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-sm flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-sm font-medium text-ink-900 line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xs text-ink-500">Color:</span>
                      <span
                        className="w-3 h-3 rounded-full border border-ink-200"
                        style={{ backgroundColor: item.selectedColor }}
                      />
                    </div>
                    <p className="text-sm font-semibold text-ink-900 mt-1">
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-ink-200 rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-ink-600 hover:text-ink-900 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-medium text-ink-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-ink-600 hover:text-ink-900 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-ink-400 hover:text-rose-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-ink-200 space-y-4 bg-ink-100/50">
              <div className="flex items-center justify-between">
                <span className="text-sm tracking-wider uppercase text-ink-600">Subtotal</span>
                <span className="font-serif text-2xl font-medium text-ink-900">
                  PKR {subtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-ink-500">Shipping & taxes calculated at checkout.</p>
              <button onClick={() => { closeCart(); onCheckout(); }} className="w-full btn-outline rounded-sm">Open Checkout Page</button>
              {checkingOut ? (
                <div className="space-y-3">
                  <p className="text-sm text-ink-700 text-center">
                    Complete your order via WhatsApp with our team:
                  </p>
                  {CONTACTS.persons.map((p) => (
                    <a
                      key={p.name}
                      href={`https://wa.me/${p.raw}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-sage-600 text-ink-50 hover:bg-sage-700 transition-colors rounded-sm text-sm font-medium tracking-wide uppercase"
                    >
                      <MessageCircle size={16} />
                      {p.name}: {p.phone}
                    </a>
                  ))}
                  <button
                    onClick={() => {
                      setCheckingOut(false);
                      clearCart();
                      closeCart();
                    }}
                    className="w-full text-xs text-ink-500 hover:text-ink-900 underline transition-colors"
                  >
                    Order sent? Clear bag
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleCheckout}
                  className="w-full btn-primary rounded-sm"
                >
                  Checkout via WhatsApp
                </button>
              )}
              <div className="flex items-center justify-center gap-4 pt-2 text-xs text-ink-500">
                {CONTACTS.persons.map((p) => (
                  <a key={p.name} href={`tel:${p.raw}`} className="flex items-center gap-1 hover:text-gold-600 transition-colors">
                    <Phone size={12} />
                    {p.phone}
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
