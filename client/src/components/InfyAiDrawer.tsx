import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Loader2, 
  Layers, 
  ShoppingCart,
  Maximize2,
  Minimize2,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';

interface InfyAiDrawerProps {
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

export const InfyAiDrawer: React.FC<InfyAiDrawerProps> = ({
  isOpen,
  onClose,
  onViewProduct,
}) => {
  const { addToCart } = useCart();
  const { toggleCompare, isComparing } = useCompare();

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Welcome to ARCEUS GEAR. I am INFY, your specialized hardware copilot. I have live access to our inventory catalog. Ask me anything regarding hardware specifications, price differences, budget recommendations, or specific use cases such as competitive gaming, programming, or 4K rendering.',
      insights: 'Inventory intelligence connected',
    },
  ]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Recommend a laptop under 80000 with 16GB RAM',
    'Which hardware is best for 4K ray tracing?',
    'Compare RTX 4070 and RTX 4090 specs',
    'Which laptop is suitable for a college programmer?',
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
        products: response.products,
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
        insights: 'Catalog ready',
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dim backdrop allowing focus */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6">
        <aside 
          className="w-screen max-w-md sm:max-w-lg flex flex-col justify-between shadow-2xl transition-all duration-300 animate-in slide-in-from-right"
          style={{ 
            backgroundColor: '#161717', 
            borderLeft: '1px solid rgba(255,255,255,0.08)' 
          }}
        >
          {/* Top Bar Header */}
          <div 
            className="p-4 sm:p-5 flex items-center justify-between"
            style={{ 
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              backgroundColor: '#161717'
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center font-black shadow-lg"
                style={{ backgroundColor: '#168AFF', color: '#FFFFFF' }}
              >
                <Bot size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-extrabold text-base tracking-wide text-white">
                    INFY
                  </h3>
                  <span 
                    className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase"
                    style={{ 
                      backgroundColor: 'rgba(22, 138, 255, 0.15)', 
                      color: '#3AA0FF',
                      border: '1px solid rgba(22, 138, 255, 0.3)' 
                    }}
                  >
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] font-medium" style={{ color: '#A7AAAC' }}>
                  Context-Aware Hardware Intelligence
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearHistory}
                className="p-2 rounded-xl transition hover:text-white"
                style={{ color: '#A7AAAC' }}
                title="Clear Chat History"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl transition hover:text-white"
                style={{ color: '#A7AAAC' }}
                title="Close INFY"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Container (Dark WhatsApp-inspired aesthetic) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} transition-all`}
              >
                <div
                  className="max-w-[88%] rounded-2xl p-4 text-xs leading-relaxed transition duration-200"
                  style={{
                    backgroundColor: m.role === 'user' ? '#1D2020' : '#242626',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#FFFFFF',
                    borderTopRightRadius: m.role === 'user' ? '4px' : '16px',
                    borderTopLeftRadius: m.role === 'assistant' ? '4px' : '16px',
                  }}
                  onMouseEnter={(e) => {
                    if (m.role === 'assistant') {
                      e.currentTarget.style.backgroundColor = '#2D3030';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (m.role === 'assistant') {
                      e.currentTarget.style.backgroundColor = '#242626';
                    }
                  }}
                >
                  <div className="whitespace-pre-line font-sans">{m.content}</div>

                  {m.insights && (
                    <div 
                      className="mt-2.5 pt-2 flex items-center gap-1.5 text-[11px] font-semibold"
                      style={{ 
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        color: '#3AA0FF' 
                      }}
                    >
                      <span>{m.insights}</span>
                    </div>
                  )}
                </div>

                {/* Inline Product Recommendations with Direct Actions */}
                {m.products && m.products.length > 0 && (
                  <div className="w-full mt-3 grid grid-cols-1 gap-2.5">
                    {m.products.map((p) => {
                      const price = p.discountPrice || p.price;
                      const comparing = isComparing(p.id);

                      return (
                        <div
                          key={p.id}
                          className="p-3 rounded-2xl flex flex-col justify-between gap-2.5 transition"
                          style={{
                            backgroundColor: '#242626',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          <div
                            className="flex gap-3 cursor-pointer group"
                            onClick={() => onViewProduct(p)}
                          >
                            <img
                              src={p.images?.[0]}
                              alt={p.title}
                              className="w-14 h-14 rounded-xl object-cover shrink-0"
                              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                            />
                            <div className="min-w-0 flex-1">
                              <h5 className="font-bold text-xs text-white truncate group-hover:text-[#3AA0FF] transition">
                                {p.title}
                              </h5>
                              <p className="font-mono font-bold mt-1 text-xs" style={{ color: '#3AA0FF' }}>
                                ₹{price.toLocaleString('en-IN')}
                              </p>
                              <span className="text-[10px]" style={{ color: '#A7AAAC' }}>
                                Stock: {p.stock} units available
                              </span>
                            </div>
                          </div>

                          <div 
                            className="flex gap-2 pt-2"
                            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                          >
                            <button
                              onClick={() => toggleCompare(p)}
                              className="flex-1 py-1.5 px-2 rounded-xl text-[10px] font-semibold transition"
                              style={{
                                backgroundColor: '#1D2020',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#FFFFFF'
                              }}
                            >
                              {comparing ? 'In Compare' : 'Compare'}
                            </button>
                            <button
                              onClick={() => addToCart(p, 1)}
                              className="flex-1 py-1.5 px-2 rounded-xl text-[10px] font-bold text-white transition hover:brightness-110 shadow-sm"
                              style={{ backgroundColor: '#168AFF' }}
                            >
                              Add to Cart
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
                className="flex items-center gap-2 text-xs p-3.5 rounded-2xl w-fit animate-pulse"
                style={{ 
                  backgroundColor: '#242626', 
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#3AA0FF' 
                }}
              >
                <Loader2 size={16} className="animate-spin text-[#168AFF]" />
                <span>INFY is evaluating real-time catalog specs...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts Carousel */}
          <div 
            className="px-4 py-2.5 overflow-x-auto flex gap-2"
            style={{ 
              backgroundColor: '#161717',
              borderTop: '1px solid rgba(255,255,255,0.06)' 
            }}
          >
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1.5 rounded-xl text-[11px] whitespace-nowrap transition"
                style={{
                  backgroundColor: '#242626',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#A7AAAC',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = '#2D3030';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#A7AAAC';
                  e.currentTarget.style.backgroundColor = '#242626';
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Bottom Chat Input Form */}
          <div 
            className="p-4"
            style={{ 
              backgroundColor: '#161717',
              borderTop: '1px solid rgba(255,255,255,0.08)' 
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask INFY anything regarding our hardware..."
                className="flex-1 px-4 py-3 rounded-2xl text-xs text-white placeholder-[#A7AAAC] focus:outline-none transition"
                style={{
                  backgroundColor: '#242626',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#168AFF';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="px-4 py-3 rounded-2xl font-bold text-white transition hover:brightness-110 disabled:opacity-40 flex items-center justify-center shadow-lg"
                style={{ backgroundColor: '#168AFF' }}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};
