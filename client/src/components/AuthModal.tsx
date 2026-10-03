import React, { useState } from 'react';
import { X, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    login,
    register,
    demoLogin,
    googleLogin,
  } = useAuth();

  const [tab, setTab] = useState<'login' | 'register'>(authModalTab);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (tab === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-200 mx-auto mb-3 shadow-md">
            <img src="/arceus-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h2 className="font-display font-extrabold text-xl text-slate-900">
            {tab === 'login' ? 'Access Arceus Command' : 'Create Gamer Account'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            JWT-Encrypted Session & Role-Based Access
          </p>
        </div>

        {/* Google 1-Click Sign-In */}
        <div className="mb-4">
          <button
            type="button"
            onClick={async () => {
              try {
                setIsLoading(true);
                await googleLogin();
              } catch (err: any) {
                setError(err.message || 'Google sign in failed');
              } finally {
                setIsLoading(false);
              }
            }}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-3 shadow-sm transition hover:border-slate-300"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Or Judge Quick Access</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* 1-Click Judge Quick Login */}
        <div className="mb-5 p-3 rounded-2xl bg-blue-50/80 border border-blue-200 text-center">
          <span className="text-[11px] font-bold text-blue-800 block mb-2">
            Quick 1-Click Login for Judges:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => demoLogin('customer')}
              className="py-1.5 px-2 rounded-xl bg-white hover:bg-slate-50 border border-blue-200 text-blue-700 font-bold text-xs shadow-sm transition"
            >
              Demo Gamer
            </button>
            <button
              type="button"
              onClick={() => demoLogin('admin')}
              className="py-1.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-5 border border-slate-200">
          <button
            type="button"
            onClick={() => { setTab('login'); setError(null); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
              tab === 'login' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setError(null); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
              tab === 'register' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {tab === 'register' && (
            <div className="space-y-1">
              <label className="text-slate-600 font-semibold">Your Name / Call-Sign</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                  <User size={15} />
                </div>
                <input
                  type="text"
                  placeholder="e.g. Neo Gamer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-slate-600 font-semibold">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <Mail size={15} />
              </div>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-600 font-semibold">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <Lock size={15} />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : tab === 'login' ? 'Sign In to Station' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};
