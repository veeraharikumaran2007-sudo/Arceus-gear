import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';
import { auth, loginWithGooglePopup, logoutFirebase } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  demoLogin: (role: 'admin' | 'customer') => Promise<void>;
  googleLogin: (fallbackName?: string, fallbackEmail?: string) => Promise<void>;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (defaultTab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  authModalTab: 'login' | 'register';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('arceus_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(localStorage.getItem('arceus_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  // Listen to Firebase Auth state for real Google Login persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const profile: User = {
          id: fbUser.uid,
          name: fbUser.displayName || 'Google Gamer',
          email: fbUser.email || '',
          role: 'CUSTOMER',
          avatar: fbUser.photoURL || undefined
        };
        setUser(profile);
        localStorage.setItem('arceus_user', JSON.stringify(profile));
        if (!localStorage.getItem('arceus_token')) {
          localStorage.setItem('arceus_token', 'fb_' + fbUser.uid);
          setToken('fb_' + fbUser.uid);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const savedUserStr = localStorage.getItem('arceus_user');
      let localUser: User | null = null;
      if (savedUserStr) {
        try {
          localUser = JSON.parse(savedUserStr);
          setUser(localUser);
        } catch {}
      }

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.getMe();
        if (res && res.user) {
          setUser(res.user);
          localStorage.setItem('arceus_user', JSON.stringify(res.user));
        }
      } catch {
        // Backend offline / static hosting: keep current user from localStorage
        if (localUser) {
          setUser(localUser);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const login = async (email: string, pass: string) => {
    const res = await api.login(email, pass);
    localStorage.setItem('arceus_token', res.token);
    localStorage.setItem('arceus_user', JSON.stringify(res.user));
    setToken(res.token);
    setUser(res.user);
    setIsAuthModalOpen(false);
  };

  const register = async (name: string, email: string, pass: string) => {
    const res = await api.register(name, email, pass);
    localStorage.setItem('arceus_token', res.token);
    localStorage.setItem('arceus_user', JSON.stringify(res.user));
    setToken(res.token);
    setUser(res.user);
    setIsAuthModalOpen(false);
  };

  const demoLogin = async (role: 'admin' | 'customer') => {
    const res = await api.demoLogin(role);
    localStorage.setItem('arceus_token', res.token);
    localStorage.setItem('arceus_user', JSON.stringify(res.user));
    setToken(res.token);
    setUser(res.user);
    setIsAuthModalOpen(false);
  };

  const googleLogin = async (fallbackName?: string, fallbackEmail?: string) => {
    try {
      // 1. Trigger Real Google OAuth Popup via Firebase
      const fbUser = await loginWithGooglePopup();
      const displayName = fbUser.displayName || fallbackName || 'Google Gamer';
      const email = fbUser.email || fallbackEmail || 'gamer@arceus.com';
      const photoURL = fbUser.photoURL || undefined;

      const profile: User = {
        id: fbUser.uid,
        name: displayName,
        email: email,
        role: 'CUSTOMER',
        avatar: photoURL
      };

      const tokenVal = 'google_' + fbUser.uid;
      localStorage.setItem('arceus_token', tokenVal);
      localStorage.setItem('arceus_user', JSON.stringify(profile));
      setToken(tokenVal);
      setUser(profile);

      try {
        const res = await api.googleLogin(displayName, email, photoURL);
        if (res && res.token) {
          localStorage.setItem('arceus_token', res.token);
          setToken(res.token);
        }
      } catch {}

      setIsAuthModalOpen(false);
    } catch (firebaseErr: any) {
      console.error('Firebase Google Sign-In Error:', firebaseErr);
      
      // If user closed the popup window
      if (firebaseErr?.code === 'auth/popup-closed-by-user') {
        return;
      }

      // If domain is not authorized in Firebase Console
      if (firebaseErr?.code === 'auth/unauthorized-domain') {
        alert(
          "Firebase Domain Authorization Required:\n\n" +
          "The domain 'arceusgear.web.app' must be added to your Firebase project's Authorized Domains list.\n\n" +
          "Steps to enable real Google Login (15 seconds):\n" +
          "1. In your Firebase Console tab, go to Authentication -> Settings\n" +
          "2. Under 'Authorized domains', click 'Add domain'\n" +
          "3. Enter 'arceusgear.web.app' and click Save\n\n" +
          "Once saved, real Google sign-in with your personal Gmail will work instantly!"
        );
        return;
      }

      alert(`Google Sign-In: ${firebaseErr?.message || 'Failed to authenticate with Google.'}`);
    }
  };

  const logout = async () => {
    try {
      await logoutFirebase();
    } catch (e) {
      console.warn('Firebase signout error:', e);
    }
    localStorage.removeItem('arceus_token');
    localStorage.removeItem('arceus_user');
    setToken(null);
    setUser(null);
  };

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        demoLogin,
        googleLogin,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalTab,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
