import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Loader2, 
  Trash2,
  Maximize2,
  Minimize2,
  ShoppingCart,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';

export const GeminiStarIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4772 12 22C12 16.4772 16.4772 12 22 12C16.4772 12 12 7.52285 12 2Z" 
      fill="url(#samurai-ai-grad)" 
    />
    <defs>
      <linearGradient id="samurai-ai-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F43F5E" />
        <stop offset="0.5" stopColor="#E11D48" />
        <stop offset="1" stopColor="#BE123C" />
      </linearGradient>
    </defs>
  </svg>
);

interface GeminiAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewProduct: (product: Product) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  insights?: string;
  products?: Product[];
}

export const GeminiAiModal: React.FC<GeminiAiModalProps> = ({
  isOpen,
  onClose,
  onViewProduct,
}) => {
  const { addToCart } = useCart();
  const { toggleCompare, isComparing } = useCompare();

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Welcome to ARCEUS GEAR. I am INFY, your specialized AI hardware copilot connected live to our inventory telemetry. Ask me anything regarding laptops, GPUs, budget recommendations, or general questions!',
      insights: 'Catalog ready • Samurai Intelligence Active',
    },
  ]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Laptop under 80000 with 16GB RAM',
    'Best hardware for 4K ray tracing',
    'Compare RTX 4070 vs 4090',
    'Mechanical keyboard with lowest latency',
  ];

  const handleSend = async (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: q };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await api.askAI(q);
      const assistantMsg: Message = {
        role: 'assistant',
        content: response.reply,
        insights: response.insights,
        products: response.products || [],
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I encountered an issue retrieving real-time telemetry. Please try your request again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Session history cleared. How may I assist your hardware deployment today?',
        insights: 'Catalog ready • Samurai Intelligence Active',
      },
    ]);
  };

  return (
    <div 
      className={`fixed z-50 flex flex-col justify-between shadow-2xl transition-all duration-300 border border-slate-200/90 ${
        isExpanded 
          ? 'inset-2 sm:inset-8 rounded-2xl sm:rounded-3xl' 
          : 'inset-x-2 bottom-2 top-14 sm:top-auto sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[570px] rounded-2xl sm:rounded-3xl'
      }`}
      style={{ 
        backgroundColor: '#FFFFFF',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.25), 0 0 35px rgba(225, 29, 72, 0.15)'
      }}
    >
      {/* Top Header Bar */}
      <header 
        className="px-4 py-3.5 flex items-center justify-between shrink-0 select-none bg-white border-b border-slate-100 rounded-t-3xl"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-rose-50 border border-rose-200/80 shadow-sm">
            <GeminiStarIcon className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-black text-sm text-slate-900 tracking-wide">
                INFY AI
              </h3>
              <span 
                className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-rose-50 text-rose-600 border border-rose-200"
              >
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              Samurai Hardware Copilot
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClearHistory}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
            title="Clear Chat History"
          >
            <Trash2 size={15} />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
            title={isExpanded ? "Collapse to Window" : "Expand Window"}
          >
            {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
            title="Close Assistant"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Message Feed Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} transition-all`}
          >
            <div
              className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm transition ${
                m.role === 'user'
                  ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-rose-600/20 rounded-tr-sm font-medium'
                  : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-sm border-l-4 border-l-rose-500 hover:border-slate-300'
              }`}
            >
              <div className="whitespace-pre-line font-sans">{m.content}</div>

              {m.insights && (
                <div 
                  className="mt-2.5 pt-2 flex items-center gap-1.5 text-[10px] font-bold text-rose-600 border-t border-slate-100"
                >
                  <GeminiStarIcon className="w-3 h-3" />
                  <span>{m.insights}</span>
                </div>
              )}
            </div>

            {/* Inline Product Cards */}
            {m.products && m.products.length > 0 && (
              <div className="w-full mt-2.5 space-y-2">
                {m.products.map((p) => {
                  const price = p.discountPrice || p.price;
                  const comparing = isComparing(p.id);

                  return (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl flex flex-col justify-between gap-2.5 transition bg-white border border-slate-200 shadow-sm hover:border-rose-300 hover:shadow-md"
                    >
                      <div
                        className="flex gap-2.5 cursor-pointer group"
                        onClick={() => {
                          onViewProduct(p);
                        }}
                      >
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'}
                          alt={p.title}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80';
                          }}
                          className="w-12 h-12 rounded-lg object-cover shrink-0 bg-slate-100 border border-slate-200"
                        />
                        <div className="min-w-0 flex-1">
                          <h5 className="font-bold text-xs text-slate-900 truncate group-hover:text-rose-600 transition">
                            {p.title}
                          </h5>
                          <p className="font-mono font-bold text-xs mt-0.5 text-rose-600">
                            ₹{price.toLocaleString('en-IN')}
                          </p>
                          <span className="text-[10px] text-slate-500 font-medium">
                            Stock: {p.stock} units
                          </span>
                        </div>
                      </div>

                      <div 
                        className="flex gap-2 pt-2 border-t border-slate-100"
                      >
                        <button
                          onClick={() => toggleCompare(p)}
                          className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition border ${
                            comparing
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                          }`}
                        >
                          {comparing ? 'In Compare' : 'Compare'}
                        </button>
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold text-white transition hover:brightness-110 shadow-sm bg-rose-600 hover:bg-rose-700 shadow-rose-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingCart size={13} />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div 
            className="flex items-center gap-2 text-xs p-3 rounded-xl w-fit bg-white border border-slate-200 text-rose-600 shadow-sm"
          >
            <Loader2 size={15} className="animate-spin text-rose-600" />
            <span className="font-medium">Evaluating hardware catalog...</span>
          </div>
        )}
      </main>

      {/* Quick Prompts Carousel */}
      <div 
        className="px-3 py-2 overflow-x-auto flex gap-2 shrink-0 border-t border-slate-100 bg-white"
      >
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition shrink-0 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-600 border border-slate-200 hover:border-rose-200 font-medium cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Bottom Input Area */}
      <footer 
        className="p-3 shrink-0 bg-white border-t border-slate-100 rounded-b-3xl"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask INFY about hardware, setups, gaming..."
            className="w-full pl-4 pr-11 py-2.5 rounded-xl text-xs text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 focus:outline-none focus:border-rose-500 focus:bg-white transition shadow-inner"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="absolute right-1.5 px-3 py-1.5 rounded-lg font-bold text-white transition hover:brightness-110 disabled:opacity-40 flex items-center justify-center shadow-md bg-rose-600 hover:bg-rose-700 cursor-pointer shadow-rose-600/25"
          >
            <Send size={13} />
          </button>
        </form>
      </footer>
    </div>
  );
};
