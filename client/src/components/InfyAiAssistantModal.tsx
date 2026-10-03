import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Loader2
} from 'lucide-react';
import { api } from '../services/api';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';

interface InfyAiAssistantModalProps {
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

export const InfyAiAssistantModal: React.FC<InfyAiAssistantModalProps> = ({
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
      content: `Greetings Champion! I am **INFY AI**, your god-tier hardware assistant. I have live real-time access to our entire product inventory. \n\nAsk me anything like: *"Laptops under ₹80k"*, *"Best keyboard for FPS"*, or *"Why does RTX 4090 cost more than 4070?"*`,
      insights: 'Live Inventory Copilot Ready',
    },
  ]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Show gaming laptop under ₹80,000',
    'Best keyboard for esports',
    'Which rig is best for 4K ray tracing?',
    'Laptops with OLED 240Hz screen',
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
          content: 'I had trouble accessing the inventory right now. Please try asking again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl h-[650px] max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Bot size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-base text-slate-900">
                  INFY AI Shopping Copilot
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[9px] font-bold">
                  DATABASE CONNECTED
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Context-Aware E-Commerce Hardware Intelligence
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed shadow-sm ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line font-sans">{m.content}</div>

                {m.insights && (
                  <div className={`mt-2.5 pt-2 border-t flex items-center gap-1.5 text-[11px] font-semibold ${
                    m.role === 'user' ? 'border-blue-400/40 text-blue-100' : 'border-slate-100 text-blue-600'
                  }`}>
                    <Sparkles size={13} />
                    <span>{m.insights}</span>
                  </div>
                )}
              </div>

              {/* Matched Product Cards right in the Chat */}
              {m.products && m.products.length > 0 && (
                <div className="w-full mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {m.products.map((p) => {
                    const price = p.discountPrice || p.price;
                    const comparing = isComparing(p.id);

                    return (
                      <div
                        key={p.id}
                        className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 flex flex-col justify-between gap-2 text-xs transition shadow-sm"
                      >
                        <div
                          className="flex gap-2.5 cursor-pointer"
                          onClick={() => {
                            onViewProduct(p);
                            onClose();
                          }}
                        >
                          <img
                            src={p.images?.[0]}
                            alt={p.title}
                            className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <h5 className="font-bold text-slate-900 truncate hover:text-blue-600">
                              {p.title}
                            </h5>
                            <p className="text-blue-600 font-mono font-bold mt-0.5">
                              ₹{price.toLocaleString('en-IN')}
                            </p>
                            <span className="text-[10px] text-slate-500">
                              Stock: {p.stock} units
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-1 border-t border-slate-100">
                          <button
                            onClick={() => toggleCompare(p)}
                            className="flex-1 py-1 px-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[10px] font-semibold hover:border-blue-300"
                          >
                            {comparing ? 'In Compare' : 'Compare'}
                          </button>
                          <button
                            onClick={() => addToCart(p, 1)}
                            className="flex-1 py-1 px-2 rounded-lg bg-blue-600 text-white text-[10px] font-bold hover:bg-blue-700 shadow-sm"
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
            <div className="flex items-center gap-2 text-xs text-blue-600 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm w-fit">
              <Loader2 size={16} className="animate-spin" />
              <span>INFY AI is evaluating catalog benchmarks...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 overflow-x-auto flex gap-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-medium whitespace-nowrap transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-100">
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
              placeholder="Ask INFY: 'Recommend a laptop under 80000 with 16GB RAM'..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 transition shadow-sm"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
