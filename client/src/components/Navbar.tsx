import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Layers, 
  Search, 
  LogOut, 
  Package, 
  Settings, 
  Menu, 
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { Category } from '../types';
import { GeminiStarIcon } from './GeminiAiModal';

const GoogleIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27a7.227 7.227 0 0 1 0-4.54V6.58H1.25a11.97 11.97 0 0 0 0 10.84l4.03-3.15Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
    />
  </svg>
);

interface NavbarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAI: () => void;
  onOpenOrders: () => void;
  onOpenAdmin: () => void;
  isAdminView: boolean;
  setIsAdminView: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenAI,
  onOpenOrders,
  isAdminView,
  setIsAdminView,
}) => {
  const { user, logout, openAuthModal, demoLogin, googleLogin } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const { selectedProducts, setIsCompareModalOpen } = useCompare();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/60 backdrop-blur-2xl border-b border-white/10 transition-all duration-200">
      {/* Main Navbar */}
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand with Arceus Beast Image */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group" 
            onClick={() => { setIsAdminView(false); onSelectCategory('all'); }}
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-slate-700 group-hover:border-blue-500 shadow-sm transition-all duration-300 bg-slate-950">
              <img
                src="/arceus-logo.jpg"
                alt="Arceus Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white">
                  ARCEUS
                </span>
                <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-blue-500">
                  GEAR
                </span>
              </div>
              <p className="hidden sm:block text-[10px] tracking-widest text-slate-400 uppercase font-mono font-medium">
                Next-Gen Intelligent Hardware
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search RTX 4090, OLED laptops, keyboards..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 bg-slate-900/90 border border-white/10 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-all shadow-inner"
              />
              <button
                onClick={onOpenAI}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-[#161717] hover:bg-[#242626] text-xs font-bold text-white flex items-center gap-1.5 border border-white/10 transition shadow-sm cursor-pointer"
              >
                <GeminiStarIcon className="w-3.5 h-3.5" />
                <span>INFY</span>
              </button>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Gemini Star INFY Button (Desktop / Tablet) */}
            <button
              onClick={onOpenAI}
              className="hidden sm:flex relative group px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white hover:bg-rose-50 text-slate-900 items-center gap-1.5 sm:gap-2 border border-rose-200/90 hover:border-rose-400 transition-all shadow-md cursor-pointer"
            >
              <GeminiStarIcon className="w-4 h-4 animate-pulse" />
              <span className="font-extrabold text-xs tracking-wider text-slate-900">
                INFY AI
              </span>
            </button>

            {/* Compare Products Button (Desktop / Tablet) */}
            {selectedProducts.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="hidden sm:flex relative px-3 py-2 rounded-xl bg-slate-900 border border-blue-500/50 text-blue-300 items-center gap-1.5 hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
              >
                <Layers size={18} />
                <span className="text-xs font-bold">Compare</span>
                <span className="h-5 w-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                  {selectedProducts.length}
                </span>
              </button>
            )}

            {/* Cart Button (Always Visible) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-white/15 hover:border-blue-400 text-slate-200 hover:text-blue-400 shadow-sm transition-all cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Dedicated Orders History Button (Desktop / Tablet) */}
            <button
              onClick={onOpenOrders}
              className="hidden sm:flex relative p-2.5 rounded-xl bg-slate-900/90 border border-white/15 hover:border-cyan-400 text-slate-200 hover:text-cyan-400 shadow-sm transition-all cursor-pointer items-center gap-1.5"
              aria-label="Order History"
              title="View Order History & Deployments"
            >
              <Package size={20} />
              <span className="hidden lg:inline text-xs font-bold text-slate-200">Orders</span>
            </button>

            {/* User Profile / Auth (Desktop / Tablet) */}
            <div className="hidden sm:block relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-white/15 hover:border-slate-500 shadow-sm text-slate-200 transition cursor-pointer"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-7 h-7 rounded-lg object-cover border border-white/20"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-xs font-semibold max-w-[90px] truncate hidden sm:inline text-white">
                      {user.name}
                    </span>
                  </button>

                  {/* Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-white/15 p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="text-xs font-bold text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          user.role === 'ADMIN' ? 'bg-purple-900/50 text-purple-300 border border-purple-500/40' : 'bg-blue-900/50 text-blue-300'
                        }`}>
                          {user.role} ROLE
                        </span>
                      </div>

                      {user.role === 'ADMIN' && (
                        <button
                          onClick={() => {
                            setIsAdminView(!isAdminView);
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-purple-300 hover:bg-purple-900/30 transition text-left cursor-pointer"
                        >
                          <Settings size={15} />
                          <span>{isAdminView ? 'Switch to Store' : 'Admin Panel'}</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onOpenOrders();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/5 transition text-left cursor-pointer"
                      >
                        <Package size={15} />
                        <span>Order History</span>
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-950/30 transition text-left cursor-pointer"
                      >
                        <LogOut size={15} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => googleLogin()}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 text-xs font-semibold text-white shadow-sm transition cursor-pointer"
                    title="1-Click Instant Google Sign-In"
                  >
                    <GoogleIcon />
                    <span>Google</span>
                  </button>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-sm hover:shadow-blue-500/30 transition-all cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900/90 border border-white/10 text-slate-200 hover:text-white cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-white/10 px-4 py-4 space-y-3 backdrop-blur-2xl animate-in slide-in-from-top-2">
          {/* Mobile Search Input */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search RTX 4090, Laptops, Keyboards..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Quick Actions Row */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                onOpenAI();
                setIsMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-xl bg-white text-slate-900 font-bold text-xs flex items-center justify-center gap-2 border border-rose-200 shadow-sm cursor-pointer"
            >
              <GeminiStarIcon className="w-4 h-4 animate-pulse" />
              <span>INFY AI</span>
            </button>

            <button
              onClick={() => {
                onOpenOrders();
                setIsMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-xl bg-slate-900 border border-white/15 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Package size={16} />
              <span>Orders</span>
            </button>
          </div>

          {/* Google / User Auth on Mobile */}
          {!user ? (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  googleLogin();
                  setIsMobileMenuOpen(false);
                }}
                className="py-2.5 px-3 rounded-xl bg-white/10 border border-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <GoogleIcon />
                <span>Google Login</span>
              </button>
              <button
                onClick={() => {
                  openAuthModal('login');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                Sign In
              </button>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-white truncate max-w-[140px]">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-[140px]">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 font-semibold p-1 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>

              {user.role === 'ADMIN' && (
                <button
                  onClick={() => {
                    setIsAdminView(!isAdminView);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-purple-900/40 border border-purple-500/40 text-purple-300 font-bold text-xs cursor-pointer"
                >
                  <Settings size={14} />
                  <span>{isAdminView ? 'Switch to Store' : 'Admin Panel'}</span>
                </button>
              )}
            </div>
          )}

          {/* Compare Products Bar on Mobile if items selected */}
          {selectedProducts.length > 0 && (
            <button
              onClick={() => {
                setIsCompareModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-900/40 border border-blue-500/40 text-blue-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Layers size={15} />
              <span>Compare Selected Products ({selectedProducts.length})</span>
            </button>
          )}

          {/* Mobile Category Quick Tabs */}
          <div className="pt-2 border-t border-white/10">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">Departments</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => {
                  onSelectCategory('all');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  selectedCategory === 'all' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-300'
                }`}
              >
                All Gear
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCategory(c.slug);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    selectedCategory === c.slug ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
