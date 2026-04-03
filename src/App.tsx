import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Zap, 
  ShieldCheck, 
  Truck,
  ArrowRight,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';

// Mock Product Data
const PRODUCTS = [
  {
    id: 1,
    name: "Neon Pulse Headphones",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    tag: "Best Seller",
    rating: 4.9
  },
  {
    id: 2,
    name: "Cyberpunk Mechanical Keyboard",
    price: 189.50,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800",
    tag: "New Arrival",
    rating: 4.8
  },
  {
    id: 3,
    name: "Vortex Gaming Mouse",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&q=80&w=800",
    tag: "Trending",
    rating: 4.7
  },
  {
    id: 4,
    name: "Prism RGB Desk Mat",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=800",
    tag: "Limited Edition",
    rating: 5.0
  }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/80 backdrop-blur-lg py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-brand-purple rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <span className="text-2xl font-display font-black tracking-tighter glitch-text">VIRAL CARTS</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          {['Shop All', 'New Arrivals', 'Best Sellers', 'About'].map((item) => (
            <a key={item} href="#" className="hover:text-brand-cyan transition-colors">{item}</a>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button className="hover:text-brand-cyan transition-colors"><Search size={20} /></button>
          <div className="relative cursor-pointer group">
            <ShoppingBag size={20} className="group-hover:text-brand-purple transition-colors" />
            <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
          </div>
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-dark z-[60] flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8 mt-12 text-4xl font-display font-bold">
              {['Shop All', 'New Arrivals', 'Best Sellers', 'About'].map((item) => (
                <a key={item} href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-purple transition-colors">{item}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProductCard = ({ product }: { product: typeof PRODUCTS[0], key?: any }) => {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass-card overflow-hidden group hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-shadow duration-300"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-purple text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {product.tag}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-brand-dark font-bold px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
            Quick Add <ShoppingBag size={18} />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold leading-tight group-hover:text-brand-cyan transition-colors">{product.name}</h3>
          <div className="flex items-center gap-1 text-brand-orange">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>
        <p className="text-xl font-display font-bold text-white/90">${product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-cyan selection:text-brand-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan/20 blur-[120px] rounded-full animate-pulse delay-700" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-white/10 border border-white/20 text-brand-cyan text-xs font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6">
              Exclusive Drop: Gen-Z Tech Gear
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter mb-8 leading-[0.9] italic uppercase">
              Go <span className="text-brand-purple italic">Viral</span> <br />
              With Your <span className="text-brand-cyan">Setup</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 font-medium">
              The most aesthetic, high-performance gear curated for creators, gamers, and trendsetters. Don't just follow the trend—be the trend.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-brand-purple hover:bg-brand-purple/90 text-white font-bold px-10 py-5 rounded-full text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 group">
                Shop the Collection <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-10 py-5 rounded-full text-lg transition-all">
                View Lookbook
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-purple to-transparent" />
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all duration-500">
                <Truck size={32} />
              </div>
              <div>
                <h3 className="text-xl mb-1">Fast Shipping</h3>
                <p className="text-white/50 text-sm">Worldwide delivery in 3-5 days.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-white transition-all duration-500">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="text-xl mb-1">Secure Checkout</h3>
                <p className="text-white/50 text-sm">100% encrypted payment processing.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-500">
                <Zap size={32} />
              </div>
              <div>
                <h3 className="text-xl mb-1">Viral Quality</h3>
                <p className="text-white/50 text-sm">Tested and approved by top creators.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-brand-purple font-bold uppercase tracking-widest text-sm mb-4 block">Shop the Hype</span>
              <h2 className="text-5xl md:text-6xl">Featured <span className="text-brand-cyan italic">Drops</span></h2>
            </div>
            <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group font-bold">
              View All Products <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-brand-purple to-brand-cyan p-1">
            <div className="bg-brand-dark rounded-[2.9rem] p-12 md:p-24 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
              <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl mb-8 leading-tight">Join the <span className="glitch-text">Viral</span> Community</h2>
                <p className="text-xl text-white/60 max-w-xl mx-auto mb-12">
                  Get early access to drops, exclusive discounts, and be the first to know what's trending.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 focus:outline-none focus:border-brand-purple transition-colors"
                  />
                  <button className="w-full sm:w-auto bg-white text-brand-dark font-bold px-10 py-5 rounded-full hover:bg-brand-cyan hover:text-white transition-all">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-brand-purple rounded flex items-center justify-center">
                  <Zap className="text-white fill-white" size={18} />
                </div>
                <span className="text-xl font-display font-black tracking-tighter">VIRAL CARTS</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                Curating the most aesthetic and high-performance gear for the modern digital lifestyle.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-purple transition-colors"><Instagram size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-cyan transition-colors"><Twitter size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-colors"><Facebook size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg mb-8">Shop</h4>
              <ul className="flex flex-col gap-4 text-white/40 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg mb-8">Support</h4>
              <ul className="flex flex-col gap-4 text-white/40 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg mb-8">Legal</h4>
              <ul className="flex flex-col gap-4 text-white/40 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-6">
            <p className="text-white/20 text-xs">
              © 2026 Viral Carts. All rights reserved. Built for the hype.
            </p>
            <div className="flex items-center gap-4 opacity-30 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="Paypal" className="h-4" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png" alt="Apple Pay" className="h-6" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
