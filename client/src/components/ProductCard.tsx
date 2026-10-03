import React, { useState, useRef, useCallback } from 'react';
import { ShoppingCart, Star, Layers, AlertCircle, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const { toggleCompare, isComparing } = useCompare();

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const comparing = isComparing(product.id);

  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80';
  const effectivePrice = product.discountPrice || product.price;
  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const specEntries = Object.entries(product.specs || {}).slice(0, 2);

  // Smooth calm cursor spotlight without violent shaking or card tilting
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseGlow, setMouseGlow] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouseGlow({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseGlow(prev => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl bg-[#080d1a]/90 backdrop-blur-2xl border border-white/[0.08] hover:border-cyan-400/40 flex flex-col justify-between overflow-hidden shadow-[0_16px_36px_-12px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_-10px_rgba(6,182,212,0.2)] transition-all duration-300 cursor-pointer select-none"
    >
      {/* 1. Calm Ambient Cursor Spotlight Glow (Follows cursor, zero card shake) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 rounded-3xl z-0"
        style={{
          opacity: mouseGlow.opacity,
          background: `radial-gradient(350px circle at ${mouseGlow.x}px ${mouseGlow.y}px, rgba(56, 189, 248, 0.12), transparent 75%)`,
        }}
      />

      {/* 2. Top Laser Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />

      {/* 3. Top Badges & Status */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1.5">
          {product.isFeatured && (
            <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md backdrop-blur-md flex items-center gap-1">
              <Sparkles size={10} className="text-cyan-200" />
              <span>Featured</span>
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 rounded-lg bg-rose-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md border border-rose-500/30 backdrop-blur-md">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Stock Status Badge */}
        <div>
          {isOutOfStock ? (
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-bold backdrop-blur-md">
              Sold Out
            </span>
          ) : isLowStock ? (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold flex items-center gap-1 backdrop-blur-md animate-pulse">
              <AlertCircle size={11} />
              <span>Only {product.stock} Left!</span>
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-semibold backdrop-blur-md">
              In Stock
            </span>
          )}
        </div>
      </div>

      {/* 4. Hardware Visual Showcase with Seamless Edge Melt */}
      <div
        className="relative h-56 sm:h-64 w-full overflow-hidden flex items-center justify-center p-4 cursor-pointer z-10"
        onClick={() => onViewDetails(product)}
      >
        {/* Soft Ambient Radial Bloom Behind Image */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Stable Hardware Image with Gentle Smooth Zoom */}
        <div className="w-full h-full flex items-center justify-center pointer-events-none">
          <img
            src={mainImage}
            alt={product.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/rare-laptop.png';
            }}
            className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.65)] group-hover:drop-shadow-[0_18px_30px_rgba(6,182,212,0.35)] group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none"
            loading="lazy"
          />
        </div>

        {/* Seamless Soft Edge Blending Vignette ("Apadiyee Karaiyum") */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080d1a]/25 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 5. Product Specs & Details Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 relative z-10 bg-[#080d1a]/60">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="text-cyan-400 font-bold truncate uppercase tracking-wider text-[11px] font-mono">
              {product.category?.name || 'Hardware'}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-bold font-mono">
              <Star size={13} fill="currentColor" />
              <span>{product.rating}</span>
              <span className="text-slate-500 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewDetails(product)}
            className="font-display font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-2 leading-snug tracking-tight"
          >
            {product.title}
          </h3>

          {/* Quick Specs Pills */}
          {specEntries.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {specEntries.map(([key, val]) => (
                <span
                  key={key}
                  className="px-2 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[10px] text-slate-300 font-mono truncate max-w-[170px] hover:border-cyan-400/30 transition-colors"
                  title={`${key}: ${val}`}
                >
                  {val}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl sm:text-2xl font-display font-black text-white tracking-wide">
              ₹{effectivePrice.toLocaleString('en-IN')}
            </span>
            {product.discountPrice && (
              <span className="text-xs text-slate-500 line-through font-mono">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.08]">
            {/* Compare Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare(product);
              }}
              className={`px-2.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all duration-200 cursor-pointer active:scale-95 ${
                comparing
                  ? 'bg-blue-600/30 border-blue-400 text-blue-300 shadow-sm'
                  : 'bg-white/[0.05] border-white/[0.1] text-slate-300 hover:text-white hover:bg-white/[0.1] hover:border-cyan-400/40'
              }`}
            >
              <Layers size={14} className={comparing ? 'text-blue-400' : ''} />
              <span>{comparing ? 'Added' : 'Compare'}</span>
            </button>

            {/* Add to Cart */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
              }}
              disabled={isOutOfStock}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95 ${
                isOutOfStock
                  ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
                  : 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-950/40 hover:shadow-cyan-500/25'
              }`}
            >
              <ShoppingCart size={14} />
              <span>{isOutOfStock ? 'Sold Out' : 'Add'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
