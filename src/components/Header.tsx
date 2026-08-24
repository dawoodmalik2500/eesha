import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone, Search } from 'lucide-react';
import { CONTACTS, CATEGORIES } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  onNavigate: (category: string) => void;
  onSearch: (query: string) => void;
}

export default function Header({ onNavigate, onSearch }: HeaderProps) {
  const { totalItems, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (cat: string) => {
    onNavigate(cat);
    setMobileOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
    setSearchOpen(false);
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-ink-900 text-ink-50 text-xs sm:text-sm overflow-hidden">
        <div className="container-lux flex items-center justify-center gap-6 py-2 whitespace-nowrap">
          <div className="flex items-center gap-2 animate-marquee">
            <span className="tracking-wider uppercase">{CONTACTS.tagline}</span>
            <span className="text-gold-400">•</span>
            <span className="tracking-wider">Call {CONTACTS.persons[0].name}: {CONTACTS.persons[0].phone}</span>
            <span className="text-gold-400">•</span>
            <span className="tracking-wider">Call {CONTACTS.persons[1].name}: {CONTACTS.persons[1].phone}</span>
            <span className="text-gold-400">•</span>
            <span className="tracking-wider uppercase">{CONTACTS.tagline}</span>
            <span className="text-gold-400">•</span>
            <span className="tracking-wider">Call {CONTACTS.persons[0].name}: {CONTACTS.persons[0].phone}</span>
            <span className="text-gold-400">•</span>
            <span className="tracking-wider">Call {CONTACTS.persons[1].name}: {CONTACTS.persons[1].phone}</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-ink-50/95 backdrop-blur-md shadow-md' : 'bg-ink-50'
        }`}
      >
        <div className="container-lux">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 text-ink-900 hover:text-gold-600 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <button
              onClick={() => handleNav('all')}
              className="flex flex-col items-center lg:items-start lg:flex-1"
            >
              <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-wide text-ink-900">
                Eesha Eshal
              </span>
              <span className="hidden lg:block text-[10px] tracking-[0.2em] uppercase text-ink-500 mt-0.5">
                Replica & Branded Prints
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => handleNav('all')}
                className="text-sm font-medium tracking-wide uppercase text-ink-700 hover:text-gold-600 transition-colors link-underline"
              >
                Home
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleNav(cat.id)}
                  className="text-sm font-medium tracking-wide uppercase text-ink-700 hover:text-gold-600 transition-colors link-underline"
                >
                  {cat.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('contact')}
                className="text-sm font-medium tracking-wide uppercase text-ink-700 hover:text-gold-600 transition-colors link-underline"
              >
                Contact
              </button>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 lg:gap-3 lg:flex-1 lg:justify-end">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-ink-700 hover:text-gold-600 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                onClick={openCart}
                className="relative p-2 text-ink-700 hover:text-gold-600 transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold-600 text-ink-50 text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4 animate-fade-in">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 border-b border-ink-200 pb-2">
                <Search size={18} className="text-ink-400" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search for fabrics, prints, collections..."
                  className="flex-1 bg-transparent outline-none text-sm text-ink-900 placeholder:text-ink-400"
                  autoFocus
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="text-ink-400 hover:text-ink-900">
                  <X size={18} />
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-ink-50 shadow-2xl animate-slide-in flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-ink-200">
              <span className="font-serif text-2xl font-semibold text-ink-900">Eesha Eshal</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-ink-700 hover:text-gold-600">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col p-5 gap-1">
              <button
                onClick={() => handleNav('all')}
                className="text-left px-4 py-3 text-sm font-medium tracking-wide uppercase text-ink-800 hover:bg-ink-100 rounded transition-colors"
              >
                Home
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleNav(cat.id)}
                  className="text-left px-4 py-3 text-sm font-medium tracking-wide uppercase text-ink-800 hover:bg-ink-100 rounded transition-colors"
                >
                  {cat.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('contact')}
                className="text-left px-4 py-3 text-sm font-medium tracking-wide uppercase text-ink-800 hover:bg-ink-100 rounded transition-colors"
              >
                Contact
              </button>
            </nav>
            <div className="mt-auto p-5 border-t border-ink-200 space-y-3">
              <p className="text-xs tracking-wider uppercase text-ink-500">Contact Us</p>
              {CONTACTS.persons.map((p) => (
                <a
                  key={p.name}
                  href={`tel:${p.raw}`}
                  className="flex items-center gap-3 text-sm text-ink-800 hover:text-gold-600 transition-colors"
                >
                  <Phone size={16} className="text-gold-600" />
                  <span>{p.name}: {p.phone}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
