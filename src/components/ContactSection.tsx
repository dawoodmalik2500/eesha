import { Phone, MapPin, MessageCircle, Mail, Clock } from 'lucide-react';
import { CONTACTS } from '@/data/products';

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-ink-900 text-ink-50 scroll-mt-20">
      <div className="container-lux">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-gold-400 mb-3">Get in Touch</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium">
            Visit or Call Us
          </h2>
          <p className="text-ink-200 mt-4 max-w-lg mx-auto">
            We're here to help you find the perfect fabric. Reach out via call or WhatsApp — our team is ready to assist.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Address */}
          <div className="bg-ink-800/50 p-6 rounded-sm border border-ink-700 hover:border-gold-500 transition-colors">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mb-4">
              <MapPin size={22} className="text-gold-400" />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2">Our Store</h3>
            <p className="text-sm text-ink-200 leading-relaxed">{CONTACTS.address}</p>
          </div>

          {/* Contact persons */}
          {CONTACTS.persons.map((person) => (
            <div
              key={person.name}
              className="bg-ink-800/50 p-6 rounded-sm border border-ink-700 hover:border-gold-500 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mb-4">
                <Phone size={22} className="text-gold-400" />
              </div>
              <h3 className="font-serif text-lg font-medium mb-1">{person.name}</h3>
              <a
                href={`tel:${person.raw}`}
                className="block text-sm text-ink-200 hover:text-gold-300 transition-colors mb-3"
              >
                {person.phone}
              </a>
              <a
                href={`https://wa.me/${person.raw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-sage-300 hover:text-sage-200 transition-colors"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          ))}

          {/* Hours */}
          <div className="bg-ink-800/50 p-6 rounded-sm border border-ink-700 hover:border-gold-500 transition-colors">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mb-4">
              <Clock size={22} className="text-gold-400" />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2">Business Hours</h3>
            <p className="text-sm text-ink-200 leading-relaxed">
              Monday – Saturday<br />
              10:00 AM – 9:00 PM<br />
              <span className="text-ink-400">Sunday: Closed</span>
            </p>
          </div>
        </div>

        {/* CTA bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/${CONTACTS.persons[0].raw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lux bg-sage-600 text-ink-50 hover:bg-sage-700 rounded-sm"
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
          <a
            href={`tel:${CONTACTS.persons[0].raw}`}
            className="btn-lux border border-ink-50/30 text-ink-50 hover:bg-ink-50 hover:text-ink-900 rounded-sm"
          >
            <Phone size={18} /> Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
