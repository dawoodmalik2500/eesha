import { useState } from 'react';
import { ArrowLeft, CheckCircle, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CONTACTS } from '@/data/products';

interface CheckoutPageProps {
  onBack: () => void;
}

export default function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { items, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: 'Lahore', notes: '' });

  const submitOrder = (event: React.FormEvent) => {
    event.preventDefault();
    const message = encodeURIComponent(
      `Hello ${CONTACTS.storeName}, I want to place an order.\n\nCustomer: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}, ${form.city}\n${form.notes ? `Notes: ${form.notes}\n` : ''}\nItems:\n${items.map((item) => `• ${item.name} x${item.quantity} — PKR ${(item.price * item.quantity).toLocaleString()}`).join('\n')}\n\nTotal: PKR ${subtotal.toLocaleString()}`,
    );
    window.open(`https://wa.me/${CONTACTS.persons[0].raw}?text=${message}`, '_blank');
    setSubmitted(true);
  };

  if (items.length === 0 && !submitted) {
    return (
      <main className="min-h-[70vh] container-lux py-24 text-center">
        <h1 className="font-serif text-4xl text-ink-900 mb-3">Your bag is empty</h1>
        <p className="text-ink-600 mb-8">Add a beautiful piece before continuing to checkout.</p>
        <button onClick={onBack} className="btn-primary rounded-sm">Continue Shopping</button>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-[70vh] container-lux py-24 text-center">
        <CheckCircle size={54} className="mx-auto text-sage-600 mb-5" />
        <h1 className="font-serif text-4xl text-ink-900 mb-3">Order details sent</h1>
        <p className="text-ink-600 max-w-md mx-auto mb-8">Your order message is ready in WhatsApp. Our team will confirm availability, delivery, and payment with you shortly.</p>
        <button onClick={() => { clearCart(); onBack(); }} className="btn-primary rounded-sm">Back to Store</button>
      </main>
    );
  }

  return (
    <main className="bg-ink-50 min-h-[80vh] py-10 lg:py-16">
      <div className="container-lux">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-ink-600 hover:text-gold-600 transition-colors mb-8"><ArrowLeft size={16} /> Continue Shopping</button>
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
          <form onSubmit={submitOrder} className="bg-white p-6 sm:p-8 rounded-sm card-shadow">
            <p className="text-xs tracking-[0.25em] uppercase text-gold-600 mb-3">Secure Order</p>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink-900 mb-8">Checkout Details</h1>
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="sm:col-span-2 text-sm text-ink-700">Full name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full border border-ink-200 px-4 py-3 outline-none focus:border-gold-500" placeholder="Your name" /></label>
              <label className="text-sm text-ink-700">Phone number<input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full border border-ink-200 px-4 py-3 outline-none focus:border-gold-500" placeholder="03xx-xxxxxxx" /></label>
              <label className="text-sm text-ink-700">City<select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-2 w-full border border-ink-200 bg-white px-4 py-3 outline-none focus:border-gold-500"><option>Lahore</option><option>Islamabad</option><option>Karachi</option><option>Other</option></select></label>
              <label className="sm:col-span-2 text-sm text-ink-700">Complete delivery address<textarea required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={3} className="mt-2 w-full border border-ink-200 px-4 py-3 outline-none focus:border-gold-500 resize-none" placeholder="House, street, area" /></label>
              <label className="sm:col-span-2 text-sm text-ink-700">Order notes <span className="text-ink-400">(optional)</span><textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className="mt-2 w-full border border-ink-200 px-4 py-3 outline-none focus:border-gold-500 resize-none" placeholder="Preferred colour or size" /></label>
            </div>
            <button type="submit" className="w-full btn-primary rounded-sm mt-8"><MessageCircle size={18} /> Send Order on WhatsApp</button>
            <p className="text-xs text-ink-500 text-center mt-3">Our team will confirm your order and payment details personally.</p>
          </form>

          <aside className="bg-ink-900 text-ink-50 p-6 sm:p-8 rounded-sm lg:sticky lg:top-28">
            <h2 className="font-serif text-2xl mb-6">Your Order</h2>
            <div className="space-y-4 pb-5 border-b border-ink-700">
              {items.map((item) => <div key={`${item.id}-${item.selectedColor}`} className="flex gap-3"><img src={item.image} alt={item.name} className="w-14 h-16 object-cover" /><div className="flex-1"><p className="text-sm text-ink-100">{item.name}</p><p className="text-xs text-ink-400 mt-1">Qty {item.quantity}</p></div><p className="text-sm text-ink-100">PKR {(item.price * item.quantity).toLocaleString()}</p></div>)}
            </div>
            <div className="flex justify-between items-center pt-5"><span className="text-sm uppercase tracking-wider text-ink-300">Total</span><span className="font-serif text-2xl">PKR {subtotal.toLocaleString()}</span></div>
            <div className="mt-7 space-y-3 text-xs text-ink-300"><p className="flex items-center gap-2"><Truck size={16} className="text-gold-400" /> Delivery across Pakistan</p><p className="flex items-center gap-2"><ShieldCheck size={16} className="text-gold-400" /> Quality checked before dispatch</p></div>
          </aside>
        </div>
      </div>
    </main>
  );
}
