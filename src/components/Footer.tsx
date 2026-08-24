import { Phone, MapPin, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { CONTACTS, CATEGORIES } from '@/data/products';

interface FooterProps {
  onNavigate: (category: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-ink-900 text-ink-200 border-t border-ink-800">
      <div className="container-lux py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl font-medium text-ink-50 mb-3">
              {CONTACTS.storeName}
            </h3>
            <p className="text-sm text-ink-300 leading-relaxed mb-4">
              {CONTACTS.tagline}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-ink-700 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-ink-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-ink-700 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-ink-900 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-ink-400 mb-4">Shop</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigate('all')}
                  className="text-sm text-ink-300 hover:text-gold-400 transition-colors"
                >
                  All Products
                </button>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate(cat.id)}
                    className="text-sm text-ink-300 hover:text-gold-400 transition-colors"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-ink-400 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-ink-300">
                <MapPin size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
                <span>{CONTACTS.address}</span>
              </li>
              {CONTACTS.persons.map((p) => (
                <li key={p.name}>
                  <a
                    href={`tel:${p.raw}`}
                    className="flex items-center gap-2.5 text-sm text-ink-300 hover:text-gold-400 transition-colors"
                  >
                    <Phone size={16} className="text-gold-500 flex-shrink-0" />
                    <span>{p.name}: {p.phone}</span>
                  </a>
                </li>
              ))}
              {CONTACTS.persons.map((p) => (
                <li key={`wa-${p.name}`}>
                  <a
                    href={`https://wa.me/${p.raw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-ink-300 hover:text-sage-300 transition-colors"
                  >
                    <MessageCircle size={16} className="text-sage-400 flex-shrink-0" />
                    <span>WhatsApp {p.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-ink-400 mb-4">Stay Updated</h4>
            <p className="text-sm text-ink-300 mb-4 leading-relaxed">
              Subscribe for new arrivals, exclusive prints, and special offers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="bg-ink-800 border border-ink-700 text-ink-100 text-sm px-4 py-2.5 rounded-sm outline-none focus:border-gold-500 placeholder:text-ink-500"
              />
              <button
                type="submit"
                className="btn-lux bg-gold-500 text-ink-900 hover:bg-gold-400 rounded-sm text-xs"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-800">
        <div className="container-lux py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-400">
            &copy; {new Date().getFullYear()} {CONTACTS.storeName}. All rights reserved.
          </p>
          <p className="text-xs text-ink-400">
            {CONTACTS.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
