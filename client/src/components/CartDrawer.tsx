import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    setIsCheckoutOpen,
    showToast,
  } = useCart();
  const { user, openAuthModal } = useAuth();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-blue-600" size={20} />
              <h2 className="font-display font-bold text-lg text-slate-900">Your Arsenal Cart</h2>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <ShoppingBag size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Your cart is empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Equip your gaming battle station with God-Tier rigs and peripherals.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm transition"
                >
                  Explore Arsenal
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => {
                const effectivePrice = product.discountPrice || product.price;
                const images = product.images || [];
                const img = images[0] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';

                return (
                  <div
                    key={product.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex gap-3.5 items-center group"
                  >
                    <img
                      src={img}
                      alt={product.title}
                      className="w-16 h-16 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition">
                        {product.title}
                      </h4>
                      <p className="text-xs font-black text-slate-900 font-mono mt-0.5">
                        ₹{effectivePrice.toLocaleString('en-IN')}
                      </p>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center rounded-lg bg-white border border-slate-200 shadow-sm">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="px-2 py-0.5 text-xs text-slate-500 hover:text-slate-900 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-900 min-w-[20px] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="px-2 py-0.5 text-xs text-slate-500 hover:text-slate-900 font-bold"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-[10px] text-slate-400">
                          (Max: {product.stock})
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-white space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping & Handling</span>
                  <span className="text-emerald-600 font-bold">FREE (Hackathon Special)</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold text-base pt-2 border-t border-slate-100">
                  <span>Estimated Total</span>
                  <span className="text-blue-600 font-display font-black">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {!user && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-800">
                  <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Login Required</p>
                    <p className="text-[11px] text-amber-700">Please login with your email/Google first to place an order.</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  if (!user) {
                    showToast('Please login with your email first to place an order!');
                    openAuthModal('login');
                    return;
                  }
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-blue-500/20 transition hover:scale-[1.01] cursor-pointer"
              >
                <span>{user ? 'Proceed to Simulated Checkout' : 'Login with Email to Order'}</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>Simulated zero-cost checkout. No real card needed.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
