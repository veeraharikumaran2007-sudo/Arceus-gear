import React, { useState, useEffect } from 'react';
import { X, Layers, Bot, ShoppingCart, Loader2 } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

export const CompareModal: React.FC = () => {
  const {
    selectedProducts,
    removeFromCompare,
    clearCompare,
    isCompareModalOpen,
    setIsCompareModalOpen,
  } = useCompare();
  const { addToCart } = useCart();

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

  useEffect(() => {
    if (isCompareModalOpen && selectedProducts.length >= 2) {
      const fetchAnalysis = async () => {
        try {
          setIsLoadingAnalysis(true);
          const res = await api.compareAI(selectedProducts.map((p) => p.id));
          setAiAnalysis(res.analysis);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoadingAnalysis(false);
        }
      };
      fetchAnalysis();
    }
  }, [isCompareModalOpen, selectedProducts]);

  if (!isCompareModalOpen) return null;

  const allSpecKeys = Array.from(
    new Set(selectedProducts.flatMap((p) => Object.keys(p.specs || {})))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <Layers className="text-blue-600" size={22} />
            <h2 className="font-display font-extrabold text-lg text-slate-900">
              Hardware Specification Comparison
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
              {selectedProducts.length} Items
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs text-slate-500 hover:text-rose-600 transition font-medium"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {selectedProducts.length < 2 ? (
            <div className="text-center py-12 text-slate-500">
              <Layers size={40} className="mx-auto mb-3 text-slate-300" />
              <p className="text-sm font-bold text-slate-700">Please select at least 2 products to compare.</p>
              <p className="text-xs text-slate-400 mt-1">
                Click "Compare" on any product card in the store.
              </p>
            </div>
          ) : (
            <>
              {/* Product Headers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedProducts.map((p) => {
                  const effectivePrice = p.discountPrice || p.price;
                  return (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between relative group"
                    >
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-white text-slate-400 hover:text-rose-600 shadow-sm"
                        title="Remove"
                      >
                        <X size={15} />
                      </button>

                      <div className="flex gap-3 mb-3">
                        <img
                          src={p.images?.[0]}
                          alt={p.title}
                          className="w-16 h-16 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0 pr-6">
                          <h4 className="font-bold text-xs text-slate-900 line-clamp-2">{p.title}</h4>
                          <p className="text-blue-600 font-mono font-bold text-sm mt-1">
                            ₹{effectivePrice.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(p, 1)}
                        className="w-full py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm transition flex items-center justify-center gap-1.5"
                      >
                        <ShoppingCart size={14} />
                        <span>Add This Gear</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* INFY AI Comparison Verdict Box */}
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs mb-2">
                  <Bot size={16} />
                  <span>INFY AI Side-by-Side Verdict</span>
                </div>

                {isLoadingAnalysis ? (
                  <div className="flex items-center gap-2 text-xs text-slate-600 py-2">
                    <Loader2 size={16} className="animate-spin text-blue-600" />
                    <span>Analyzing differences in architecture, TGP, and value per rupee...</span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-sans">
                    {aiAnalysis}
                  </div>
                )}
              </div>

              {/* Detailed Spec Comparison Table */}
              <div className="rounded-2xl border border-slate-200 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-3 px-4 font-bold text-slate-500 uppercase tracking-wider w-1/4">
                        Feature / Spec
                      </th>
                      {selectedProducts.map((p) => (
                        <th key={p.id} className="py-3 px-4 font-bold text-slate-900 truncate max-w-[200px]">
                          {p.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 bg-white">
                      <td className="py-2.5 px-4 font-semibold text-slate-500">Stock Availability</td>
                      {selectedProducts.map((p) => (
                        <td key={p.id} className="py-2.5 px-4 font-bold text-emerald-600">
                          {p.stock > 0 ? `${p.stock} units` : 'Out of stock'}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      <td className="py-2.5 px-4 font-semibold text-slate-500">Customer Rating</td>
                      {selectedProducts.map((p) => (
                        <td key={p.id} className="py-2.5 px-4 font-bold text-amber-500">
                          {p.rating} / 5.0
                        </td>
                      ))}
                    </tr>

                    {allSpecKeys.map((key, idx) => (
                      <tr
                        key={key}
                        className={`border-b border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                      >
                        <td className="py-2.5 px-4 font-semibold text-slate-500">{key}</td>
                        {selectedProducts.map((p) => (
                          <td key={p.id} className="py-2.5 px-4 text-slate-800 font-mono">
                            {p.specs?.[key] || '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
