import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONTACTS } from '@/data/products';

interface HeroProps {
  onShopNow: () => void;
}

const slides = [
  {
    image: 'https://images.pexels.com/photos/27830847/pexels-photo-27830847.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    eyebrow: 'The Festive Edit',
    title: 'Prints That Make An Entrance',
    text: 'Discover elegant suits, expressive prints, and timeless fabric stories curated for every celebration.',
  },
  {
    image: 'https://images.pexels.com/photos/11960760/pexels-photo-11960760.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    eyebrow: 'New Arrivals',
    title: 'Tradition, Reimagined',
    text: 'Beautiful textures and statement colours, brought together for the modern wardrobe.',
  },
  {
    image: 'https://images.pexels.com/photos/34095447/pexels-photo-34095447.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    eyebrow: 'Curated For You',
    title: 'The Art Of Beautiful Dressing',
    text: 'We deal in all kinds of replica and branded prints, selected with an eye for quality and detail.',
  },
];

export default function Hero({ onShopNow }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  const goToSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  const slide = slides[activeSlide];

  return (
    <section className="relative h-[70vh] min-h-[540px] max-h-[720px] overflow-hidden">
      {slides.map((item, index) => (
        <div
          key={item.image}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={index !== activeSlide}
        >
          <img src={item.image} alt="Woman wearing an elegant traditional suit" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/75 via-ink-900/45 to-ink-900/10" />
        </div>
      ))}

      <div className="relative h-full container-lux flex items-center">
        <div key={slide.title} className="max-w-xl animate-fade-up">
          <p className="text-gold-300 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">{slide.eyebrow}</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-ink-50 leading-[1.1] text-balance mb-6">
            {slide.title}
          </h1>
          <p className="text-ink-100 text-base sm:text-lg leading-relaxed max-w-md mb-8">{slide.text}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={onShopNow} className="btn-lux bg-gold-500 text-ink-900 hover:bg-gold-400 group">
              Shop Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href={`https://wa.me/${CONTACTS.persons[0].raw}`} target="_blank" rel="noopener noreferrer" className="btn-lux border border-ink-50/60 text-ink-50 hover:bg-ink-50 hover:text-ink-900 backdrop-blur-sm">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-0 right-0 container-lux flex items-center justify-between">
        <div className="flex items-center gap-2">
          {slides.map((item, index) => (
            <button key={item.eyebrow} onClick={() => setActiveSlide(index)} className={`h-1 transition-all duration-300 ${index === activeSlide ? 'w-10 bg-gold-400' : 'w-5 bg-ink-50/50 hover:bg-ink-50'}`} aria-label={`Show slide ${index + 1}`} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => goToSlide(-1)} className="p-2 text-ink-50 border border-ink-50/40 hover:bg-ink-50 hover:text-ink-900 transition-colors" aria-label="Previous slide"><ChevronLeft size={18} /></button>
          <button onClick={() => goToSlide(1)} className="p-2 text-ink-50 border border-ink-50/40 hover:bg-ink-50 hover:text-ink-900 transition-colors" aria-label="Next slide"><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />
    </section>
  );
}
