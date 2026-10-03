import React, { useState, useEffect, useRef } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SimulatedCheckoutModal } from './components/SimulatedCheckoutModal';
import { GeminiAiModal, GeminiStarIcon } from './components/GeminiAiModal';
import { CompareModal } from './components/CompareModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { CinematicLoader } from './components/CinematicLoader';

import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { useCompare } from './context/CompareContext';
import { api } from './services/api';
import { Product, Category } from './types';
import { 
  Filter, 
  Loader2, 
  RotateCcw,
  Zap,
  Shield,
  Laptop,
  Cpu,
  Monitor,
  Keyboard,
  Headphones,
  Gamepad2,
  Layers,
  Sparkles,
  Flame,
  Tag,
  SlidersHorizontal
} from 'lucide-react';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from './data/catalog';

export const AppContent: React.FC = () => {
  const { user } = useAuth();
  const { toastMessage } = useCart();
  const { selectedProducts, setIsCompareModalOpen } = useCompare();

  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'rating'>('newest');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(350000);
  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'deals' | 'rtx' | 'under100k'>('all');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Views & Modals
  const [isAdminView, setIsAdminView] = useState(false);
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  // Fetch initial data
  const fetchData = async () => {
    try {
      const [cats, prods] = await Promise.all([
        api.getCategories(),
        api.getProducts({
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          search: searchQuery || undefined,
          inStock: inStockOnly || undefined,
          maxPrice: maxPriceFilter,
          sort: sortBy,
        }),
      ]);
      if (Array.isArray(cats) && cats.length > 0) {
        setCategories(cats);
      }

      let filtered = Array.isArray(prods) && prods.length > 0 ? prods : INITIAL_PRODUCTS;
      if (activeFilterTab === 'deals') {
        filtered = filtered.filter((p) => p.discountPrice && p.discountPrice < p.price);
      } else if (activeFilterTab === 'rtx') {
        filtered = filtered.filter((p) => p.title.includes('RTX') || JSON.stringify(p.specs).includes('RTX'));
      } else if (activeFilterTab === 'under100k') {
        filtered = filtered.filter((p) => (p.discountPrice || p.price) <= 100000);
      }

      setProducts(filtered);
    } catch (err) {
      console.warn('Network fetch error, fallback active:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory, searchQuery, sortBy, inStockOnly, maxPriceFilter, activeFilterTab]);

  const handleExploreScroll = () => {
    const el = document.getElementById('arsenal-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    'all': <Layers size={15} />,
    'gaming-laptops': <Laptop size={15} />,
    'gpus-and-desktops': <Cpu size={15} />,
    'esports-displays': <Monitor size={15} />,
    'mechanical-keyboards': <Keyboard size={15} />,
    'pro-gaming-audio': <Headphones size={15} />,
    'consoles-and-handhelds': <Gamepad2 size={15} />,
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  const bgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (bgContainerRef.current) {
            const offset = Math.min(window.scrollY * 0.12, 100);
            bgContainerRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playbackRate = 0.65;
      videoRef.current.style.imageRendering = 'high-quality';
      videoRef.current.style.transform = 'translate3d(0, 0, 0) scale(1.03)';
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative bg-[#050811] overflow-x-hidden">
      {/* Smooth Cinematic Samurai Preloader */}
      <CinematicLoader />

      {/* Persistent Full-Site Background Video with Cinematic Scroll Parallax Depth */}
      <div
        ref={bgContainerRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          transform: 'translate3d(0, 0px, 0) scale(1.04)',
          willChange: 'transform'
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            e.currentTarget.playbackRate = 0.65;
          }}
          className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.08] saturate-[1.05] will-change-transform"
          src="/1003.mp4"
        />
        {/* Balanced Cinematic Overlay - High transparency so Samurai & Sakura tree shine proudly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050811]/15 via-transparent to-[#050811]/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_68%,#050811_98%)] pointer-events-none opacity-30" />
      </div>

      {/* Main Foreground Stacking Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="fixed bottom-6 left-6 z-50 bg-slate-900/95 border border-slate-700 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300 backdrop-blur-md">
            <Zap size={18} className="text-blue-400" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        )}

      {/* Navigation */}
      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(slug) => setSelectedCategory(slug)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        onOpenAI={() => setIsAiDrawerOpen(true)}
        onOpenOrders={() => setIsOrdersModalOpen(true)}
        onOpenAdmin={() => setIsAdminView(true)}
        isAdminView={isAdminView}
        setIsAdminView={setIsAdminView}
      />

      {/* Main Content Area */}
      {isAdminView ? (
        <main className="flex-1 bg-slate-950/60 backdrop-blur-md">
          <AdminDashboard categories={categories} onRefreshData={fetchData} />
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero Section with interactive video */}
          <HeroSection
            onOpenAI={() => setIsAiDrawerOpen(true)}
            onExplore={handleExploreScroll}
          />

          {/* Telemetry Pillars Bar - Non-obtrusive & sleek */}
          <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-slate-950/40 backdrop-blur-md border border-white/10 shadow-lg">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02]">
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Zap size={14} className="text-amber-400" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-white">Simulated Checkout</h4>
                  <p className="text-[9px] text-slate-400">Zero-latency UPI & Card</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02]">
                <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0">
                  <GeminiStarIcon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-white">Useful INFY AI</h4>
                  <p className="text-[9px] text-slate-400">Live inventory telemetry</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02]">
                <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0">
                  <Cpu size={14} className="text-sky-400" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-white">Live Inventory</h4>
                  <p className="text-[9px] text-slate-400">Atomic stock verification</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02]">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Shield size={14} className="text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-white">Enterprise Security</h4>
                  <p className="text-[9px] text-slate-400">JWT & bcrypt defenses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Animated Scrolling Category Tabs */}
          <section className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 pt-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-display font-black text-white tracking-wide flex items-center gap-2">
                  <span>Hardware Department</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 font-mono font-bold">
                    LIVE TELEMETRY
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Browse by specialized component architecture
                </p>
              </div>

              {/* Reset filter shortcut */}
              {(selectedCategory !== 'all' || activeFilterTab !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setActiveFilterTab('all');
                    setSearchQuery('');
                  }}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1.5 font-medium transition cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Show All Categories</span>
                </button>
              )}
            </div>

            {/* Scrollable Animated Tabs Bar */}
            <div className="overflow-x-auto scrollbar-none pb-2 flex items-center gap-2.5 -mx-4 px-4 sm:mx-0 sm:px-0">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02] border border-blue-400'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <Layers size={15} />
                <span>All Gear</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-black/30 text-[10px] text-slate-300">
                  100
                </span>
              </button>

              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.slug;
                const icon = categoryIcons[cat.slug] || <Cpu size={15} />;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02] border border-blue-400'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {icon}
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Segment Filter Sub-Tabs */}
            <div className="flex flex-wrap items-center gap-2 pt-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
                Quick Focus:
              </span>
              <button
                onClick={() => setActiveFilterTab('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${
                  activeFilterTab === 'all'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                All Deployments
              </button>
              <button
                onClick={() => setActiveFilterTab('deals')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${
                  activeFilterTab === 'deals'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                <Tag size={13} className="text-rose-400" />
                <span>Special Deals</span>
              </button>
              <button
                onClick={() => setActiveFilterTab('rtx')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${
                  activeFilterTab === 'rtx'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                <Flame size={13} className="text-emerald-400" />
                <span>RTX 40-Series</span>
              </button>
              <button
                onClick={() => setActiveFilterTab('under100k')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${
                  activeFilterTab === 'under100k'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                <Sparkles size={13} className="text-amber-400" />
                <span>Under ₹1,00,000</span>
              </button>
            </div>
          </section>

          {/* Catalog & Filter Section */}
          <div id="arsenal-grid" className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 py-6">
            {/* Filter & Sorting Glass Bar */}
            <div className="p-3.5 sm:p-5 rounded-3xl glass-surface border border-white/15 shadow-2xl backdrop-blur-2xl mb-8 space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-blue-400 shrink-0" />
                  <span className="font-display font-bold text-sm text-white">Precision Hardware Filters</span>
                  <span className="text-xs text-slate-400 font-mono">({products.length} units matched)</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                    className="sm:hidden px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-blue-400 flex items-center gap-1.5 cursor-pointer"
                  >
                    <SlidersHorizontal size={13} />
                    <span>{isMobileFiltersOpen ? 'Hide Filters' : 'Adjust Filters'}</span>
                  </button>

                  {/* Reset Filters */}
                  {(selectedCategory !== 'all' || searchQuery || inStockOnly || maxPriceFilter < 350000 || activeFilterTab !== 'all') && (
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                        setInStockOnly(false);
                        setMaxPriceFilter(350000);
                        setSortBy('newest');
                        setActiveFilterTab('all');
                      }}
                      className="text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1 transition font-medium cursor-pointer"
                    >
                      <RotateCcw size={13} />
                      <span className="hidden sm:inline">Reset Parameters</span>
                      <span className="sm:hidden">Reset</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Collapsible Filter Body */}
              <div className={`${isMobileFiltersOpen ? 'grid' : 'hidden sm:grid'} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-3 border-t border-white/10 text-xs`}>
                {/* Sorting */}
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Sort Order</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-slate-200 font-medium focus:border-blue-500 focus:bg-slate-900"
                  >
                    <option value="newest">Latest Deployments</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Highest Gamer Rating</option>
                  </select>
                </div>

                {/* Max Price Slider */}
                <div>
                  <div className="flex justify-between text-slate-400 mb-1 font-semibold">
                    <span>Max Budget</span>
                    <span className="font-mono text-blue-400 font-bold">
                      ₹{maxPriceFilter.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="350000"
                    step="5000"
                    value={maxPriceFilter}
                    onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                {/* In Stock Toggle */}
                <div className="flex items-center sm:justify-center">
                  <label className="flex items-center gap-2.5 cursor-pointer pt-4 sm:pt-0">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 bg-slate-950 border-white/20 focus:ring-0 cursor-pointer"
                    />
                    <span className="text-slate-200 font-semibold">In-Stock Gear Only</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Products Grid with Staggered Fade-in */}
            {isLoading ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
                <Loader2 size={36} className="animate-spin text-blue-500" />
                <span className="text-sm font-semibold tracking-wide text-slate-300">
                  Loading hardware catalog telemetry...
                </span>
              </div>
            ) : products.length === 0 ? (
              <div className="py-16 text-center rounded-3xl glass-surface border border-white/15 space-y-3 shadow-2xl backdrop-blur-2xl">
                <p className="text-base font-bold text-white">No hardware matches your criteria.</p>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Try widening your budget limit or switching category tabs, or ask INFY to find suitable alternatives.
                </p>
                <button
                  onClick={() => setIsAiDrawerOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition shadow-lg cursor-pointer"
                >
                  Ask INFY Copilot
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 animate-fade-in-up perspective-1000">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={(p) => setActiveProductDetail(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      )}

      {/* Floating Bottom Gemini Star Button */}
      <button
        onClick={() => setIsAiDrawerOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-white hover:bg-rose-50/50 text-slate-900 font-extrabold shadow-2xl border border-rose-200/90 hover:border-rose-400 hover:scale-105 transition-all flex items-center gap-2 sm:gap-2.5 cursor-pointer shadow-rose-950/20"
        title="Open INFY AI Assistant"
      >
        <GeminiStarIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
        <span className="text-[11px] sm:text-xs font-black tracking-wider text-slate-900">
          INFY AI
        </span>
      </button>

      {/* Footer */}
      <footer className="bg-slate-950/80 border-t border-white/10 py-10 mt-auto text-xs text-slate-400 backdrop-blur-md">
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-700 bg-slate-950">
              <img src="/arceus-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-white font-extrabold text-base">ARCEUS GEAR</span>
            <span className="text-slate-500">// Built for INFYHACKATHON 2.0</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <span>Customer App</span>
            <span>Admin Control Panel</span>
            <span>Simulated Checkout Sandbox</span>
            <span>INFY Gemini AI</span>
          </div>

          <p className="text-slate-500 text-[11px]">
            © 2026 ARCEUS INTELLIGENCE & GEAR. All rights reserved.
          </p>
        </div>
      </footer>
      </div>

      {/* Modals & Overlays */}
      <ProductDetailModal
        product={activeProductDetail}
        onClose={() => setActiveProductDetail(null)}
        onProductUpdated={fetchData}
      />

      <CartDrawer />

      <SimulatedCheckoutModal
        onSuccess={() => {
          fetchData();
        }}
        onOpenOrders={() => setIsOrdersModalOpen(true)}
      />

      {/* Compact Bottom-Right Floating Gemini Copilot Window (Doesn't block whole screen) */}
      <GeminiAiModal
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        onViewProduct={(p) => setActiveProductDetail(p)}
      />

      <CompareModal />

      <OrderHistoryModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
      />

      <AuthModal />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
