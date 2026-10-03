import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingCart, 
  Layers, 
  Bot, 
  Check, 
  MessageSquarePlus,
  Send
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onProductUpdated?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onProductUpdated,
}) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleCompare, isComparing } = useCompare();
  const { user, openAuthModal } = useAuth();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  if (!product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : ['/products/legion-laptop.jpg'];

  const effectivePrice = product.discountPrice || product.price;
  const isOutOfStock = product.stock <= 0;
  const comparing = isComparing(product.id);

  const handleAddToCart = (openDrawer = false) => {
    const success = addToCart(product, quantity);
    if (success && openDrawer) {
      setIsCartOpen(true);
      onClose();
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal('login');
      return;
    }
    if (!reviewComment.trim()) return;

    try {
      setIsSubmittingReview(true);
      await api.addReview(product.id, reviewRating, reviewComment.trim());
      setReviewSuccess(true);
      setReviewComment('');
      if (onProductUpdated) onProductUpdated();
      setTimeout(() => setReviewSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to submit review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#0B0F19]/95 border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gallery Column */}
            <div>
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-900/80 border border-white/10 flex items-center justify-center p-4">
                <img
                  src={images[activeImageIndex]}
                  alt={product.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/products/legion-laptop.jpg';
                  }}
                  className="w-full h-full object-contain object-center"
                />
              </div>

              {images.length > 1 && (
                <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                        activeImageIndex === idx ? 'border-rose-500 scale-105' : 'border-white/15 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* INFY AI Insight callout */}
              <div className="mt-4 p-4 rounded-2xl bg-rose-950/30 border border-rose-500/25">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1">
                  <Bot size={16} />
                  <span>INFY AI Hardware Insight</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Engineered with premium tier components. Outstanding choice for high-refresh rate esports and intense ray tracing workloads.
                </p>
              </div>
            </div>

            {/* Product Meta Column */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  {product.category?.name || 'God-Tier Tech'}
                </span>

                <h1 className="text-xl sm:text-2xl font-black font-display text-white mt-1 mb-2 leading-snug">
                  {product.title}
                </h1>

                {/* Rating & Stock */}
                <div className="flex items-center gap-4 text-xs mb-4">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <Star size={15} fill="currentColor" />
                    <span className="font-bold text-white text-sm">{product.rating}</span>
                    <span className="text-slate-400">({product.reviewCount} verified reviews)</span>
                  </div>

                  <span className="text-white/20">|</span>

                  <span className={`font-semibold ${
                    isOutOfStock ? 'text-rose-400' : product.stock <= 5 ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {isOutOfStock ? 'Out of Stock' : `In Stock: ${product.stock} units`}
                  </span>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-5">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-display font-black text-white">
                      ₹{effectivePrice.toLocaleString('en-IN')}
                    </span>
                    {product.discountPrice && (
                      <>
                        <span className="text-base text-slate-400 line-through">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-xs font-bold">
                          {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Inclusive of all taxes & duties. Simulated Payment checkout ready.
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {product.description}
                </p>

                {!isOutOfStock && (
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-semibold text-slate-300">Quantity:</span>
                    <div className="flex items-center rounded-xl bg-white/5 border border-white/10">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1.5 text-slate-300 hover:text-white font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1.5 text-sm font-bold text-white min-w-[32px] text-center font-mono">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="px-3 py-1.5 text-slate-300 hover:text-white font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-white/10">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleAddToCart(false)}
                    disabled={isOutOfStock}
                    className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
                  >
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => handleAddToCart(true)}
                    disabled={isOutOfStock}
                    className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition disabled:opacity-50 cursor-pointer"
                  >
                    <span>Instant Checkout</span>
                  </button>
                </div>

                <button
                  onClick={() => toggleCompare(product)}
                  className={`w-full py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                    comparing
                      ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Layers size={14} />
                  <span>{comparing ? 'Added to Comparison Tray' : 'Compare with other Gear'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabs: Specs & Reviews */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex gap-4 border-b border-white/10 mb-6">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-sm font-bold border-b-2 transition ${
                  activeTab === 'specs' ? 'border-rose-500 text-rose-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Hardware Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-sm font-bold border-b-2 transition flex items-center gap-1.5 ${
                  activeTab === 'reviews' ? 'border-rose-500 text-rose-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <span>Verified Reviews</span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-rose-300 font-bold">
                  {product.reviews?.length || 0}
                </span>
              </button>
            </div>

            {/* Tab: Specs */}
            {activeTab === 'specs' && (
              <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody>
                    {Object.entries(product.specs || {}).map(([key, value], idx) => (
                      <tr
                        key={key}
                        className={idx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}
                      >
                        <td className="py-3 px-4 font-semibold text-slate-400 w-1/3 border-b border-white/5">
                          {key}
                        </td>
                        <td className="py-3 px-4 text-white font-mono font-medium border-b border-white/5">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <MessageSquarePlus size={15} className="text-rose-400" />
                      <span>Write a Gamer Review</span>
                    </h4>

                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setReviewRating(s)}
                          className="text-amber-400 hover:scale-125 transition cursor-pointer"
                        >
                          <Star size={16} fill={s <= reviewRating ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your FPS benchmarks, ergonomics, or build quality review..."
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    required
                  />

                  <div className="flex items-center justify-between">
                    {reviewSuccess && (
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <Check size={14} /> Review posted!
                      </span>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="ml-auto px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Send size={12} />
                      <span>{isSubmittingReview ? 'Submitting...' : 'Post Review'}</span>
                    </button>
                  </div>
                </form>

                <div className="space-y-3">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs space-y-1.5 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{rev.userName}</span>
                          <div className="flex items-center text-amber-400">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} size={11} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{rev.comment}</p>
                        <p className="text-[10px] text-slate-500">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      No reviews yet. Be the first gamer to review!
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
