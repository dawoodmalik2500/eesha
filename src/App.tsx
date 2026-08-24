import { useState, useCallback } from 'react';
import { Truck, ShieldCheck, RefreshCw, Sparkles } from 'lucide-react';
import { CartProvider, useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CheckoutPage from '@/components/CheckoutPage';
import type { Category, Product } from '@/data/products';

function PromoBanner() {
  const features = [
    { icon: Truck, title: 'Nationwide Delivery', desc: 'Across Pakistan' },
    { icon: ShieldCheck, title: 'Quality Assured', desc: 'Authentic prints' },
    { icon: RefreshCw, title: 'Easy Exchange', desc: '7-day policy' },
    { icon: Sparkles, title: 'Curated Prints', desc: 'Replica & branded' },
  ];

  return <section className="border-y border-ink-100 bg-ink-100/40"><div className="container-lux py-6"><div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{features.map((f, idx) => <div key={idx} className="flex items-center gap-3 justify-center lg:justify-start"><f.icon size={24} className="text-gold-600 flex-shrink-0" /><div><p className="text-xs sm:text-sm font-semibold text-ink-900">{f.title}</p><p className="text-[10px] sm:text-xs text-ink-500">{f.desc}</p></div></div>)}</div></div></section>;
}

function Storefront() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const scrollToProducts = useCallback(() => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleNavigate = useCallback((category: string) => {
    if (category === 'contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setActiveCategory(category === 'all' ? 'all' : category as Category);
    setSearchQuery('');
    scrollToProducts();
  }, [scrollToProducts]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    scrollToProducts();
  }, [scrollToProducts]);

  const handleOrderNow = useCallback((product: Product) => {
    addToCart(product);
    setShowCheckout(true);
  }, [addToCart]);

  if (showCheckout) {
    return <><Header onNavigate={handleNavigate} onSearch={handleSearch} /><CheckoutPage onBack={() => setShowCheckout(false)} /><Footer onNavigate={handleNavigate} /></>;
  }

  return <>
    <Header onNavigate={handleNavigate} onSearch={handleSearch} />
    <main>
      <Hero onShopNow={scrollToProducts} />
      <PromoBanner />
      <CategoryGrid onSelect={(category) => handleNavigate(category)} />
      <ProductGrid activeCategory={activeCategory} onCategoryChange={setActiveCategory} searchQuery={searchQuery} onQuickView={setQuickViewProduct} onOrderNow={handleOrderNow} />
      <ContactSection />
    </main>
    <Footer onNavigate={handleNavigate} />
    <CartDrawer onCheckout={() => setShowCheckout(true)} />
    <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
  </>;
}

function App() {
  return <CartProvider><div className="min-h-screen bg-ink-50"><Storefront /></div></CartProvider>;
}

export default App;
