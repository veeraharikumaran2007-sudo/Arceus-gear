import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  updateDoc 
} from 'firebase/firestore';

// Your web app's Firebase configuration from console
export const firebaseConfig = {
  apiKey: "AIzaSyD24TnKh7pXlhlkHrYsrg3S1Hw1pSopVFk",
  authDomain: "kalki-arcues.firebaseapp.com",
  projectId: "kalki-arcues",
  storageBucket: "kalki-arcues.firebasestorage.app",
  messagingSenderId: "600974562072",
  appId: "1:600974562072:web:4c67084bdb359fb5da046d",
  measurementId: "G-YEL7XPCH1J"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Auth & Providers
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Cloud Firestore Database for permanent orders, users, and catalog
export const db = getFirestore(app);

// Helper for Real Google Sign In
export async function loginWithGooglePopup() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Save/update user profile in Firebase Firestore (safe async attempt)
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        name: user.displayName || 'Gamer',
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: new Date().toISOString()
      }, { merge: true });
    } catch (dbErr) {
      console.warn('Firestore profile write skipped or security rules pending:', dbErr);
    }

    return user;
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
}

// Sign out helper
export async function logoutFirebase() {
  await firebaseSignOut(auth);
}

// Helper to save order permanently in Firebase Firestore
export async function saveOrderToFirestore(orderData: any) {
  try {
    const orderId = orderData.id || `ord-${Date.now()}`;
    const cleanOrder = {
      ...orderData,
      id: orderId,
      createdAt: orderData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: orderData.status || 'CONFIRMED'
    };

    // Save to Firestore 'orders' collection
    const orderRef = doc(db, 'orders', orderId);
    await setDoc(orderRef, cleanOrder, { merge: true });

    // Also persist in localStorage for instant offline access
    const local = JSON.parse(localStorage.getItem('arceus_orders') || '[]');
    const filtered = local.filter((o: any) => o.id !== orderId);
    localStorage.setItem('arceus_orders', JSON.stringify([cleanOrder, ...filtered]));

    return cleanOrder;
  } catch (err) {
    console.warn('Firestore order save fallback to localStorage:', err);
    const local = JSON.parse(localStorage.getItem('arceus_orders') || '[]');
    const cleanOrder = {
      ...orderData,
      id: orderData.id || `ord-${Date.now()}`,
      createdAt: orderData.createdAt || new Date().toISOString(),
      status: orderData.status || 'CONFIRMED'
    };
    localStorage.setItem('arceus_orders', JSON.stringify([cleanOrder, ...local]));
    return cleanOrder;
  }
}

// Helper to get orders for user from Firestore
export async function getOrdersFromFirestore(userEmail?: string) {
  const localOrders = JSON.parse(localStorage.getItem('arceus_orders') || '[]');

  try {
    const ordersCol = collection(db, 'orders');
    let q;
    if (userEmail) {
      q = query(ordersCol, where('customerEmail', '==', userEmail));
    } else {
      q = query(ordersCol);
    }

    const snapshot = await getDocs(q);
    const cloudOrders: any[] = [];
    snapshot.forEach(docSnap => {
      cloudOrders.push({ id: docSnap.id, ...(docSnap.data() as any) });
    });

    // Merge cloud and local orders by ID without duplicates
    const orderMap = new Map();
    [...cloudOrders, ...localOrders].forEach(o => {
      if (o && o.id) orderMap.set(o.id, o);
    });

    const merged = Array.from(orderMap.values());
    merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return merged;
  } catch (err) {
    console.warn('Failed to query Firestore orders, using local storage:', err);
    if (userEmail) {
      return localOrders.filter((o: any) => !o.customerEmail || o.customerEmail === userEmail);
    }
    return localOrders;
  }
}

// Helper to cancel order permanently in Firebase Firestore
export async function cancelOrderInFirestore(orderId: string, reason: string = 'Customer requested cancellation') {
  const cancellationUpdate = {
    status: 'CANCELLED',
    cancellationReason: reason,
    cancelledAt: new Date().toISOString()
  };

  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, cancellationUpdate);
  } catch (err) {
    console.warn('Could not update Firestore, updating local storage:', err);
  }

  // Update local storage
  const local = JSON.parse(localStorage.getItem('arceus_orders') || '[]');
  const updated = local.map((o: any) => {
    if (o.id === orderId) {
      return { ...o, ...cancellationUpdate };
    }
    return o;
  });
  localStorage.setItem('arceus_orders', JSON.stringify(updated));

  return true;
}

// Helper to get categories from Cloud Firestore or offline fallback
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../data/catalog';
import { Category, Product } from '../types';

export async function getCategoriesFromCloud(): Promise<Category[]> {
  try {
    const colRef = collection(db, 'categories');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const cats: Category[] = [];
      snapshot.forEach(docSnap => {
        const d = docSnap.data();
        cats.push({
          id: d.id || docSnap.id,
          name: d.name || 'Category',
          slug: d.slug || docSnap.id,
          description: d.description || '',
          image: d.image || '',
          _count: d._count || { products: 15 }
        });
      });
      return cats;
    }
  } catch (err) {
    console.warn('Firestore categories query failed, using static catalog:', err);
  }
  return INITIAL_CATEGORIES;
}

export async function getProductsFromCloud(): Promise<Product[]> {
  try {
    const colRef = collection(db, 'products');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const prods: Product[] = [];
      snapshot.forEach(docSnap => {
        const d = docSnap.data();
        prods.push({
          id: d.id || docSnap.id,
          title: d.title || 'Hardware Gear',
          slug: d.slug || docSnap.id,
          description: d.description || '',
          price: d.price || 0,
          discountPrice: d.discountPrice,
          stock: d.stock ?? 10,
          categoryId: d.categoryId || 'gaming-laptops',
          category: {
            id: d.categoryId || 'gaming-laptops',
            name: d.categoryName || 'Hardware',
            slug: d.categorySlug || 'gaming-laptops'
          },
          images: Array.isArray(d.images) && d.images.length > 0 ? d.images : ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'],
          specs: d.specs || {},
          isFeatured: !!d.isFeatured,
          rating: d.rating || 4.8,
          reviewCount: 28,
          createdAt: d.createdAt || new Date().toISOString()
        });
      });
      return prods;
    }
  } catch (err) {
    console.warn('Firestore products query failed, using static catalog:', err);
  }
  return INITIAL_PRODUCTS;
}

