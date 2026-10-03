import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Truck, 
  ArrowRight, 
  ShieldCheck, 
  Loader2,
  PackageCheck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Order } from '../types';
import { saveOrderToFirestore } from '../firebase/config';

interface SimulatedCheckoutModalProps {
  onSuccess: (order: Order) => void;
  onOpenOrders?: () => void;
}

export const SimulatedCheckoutModal: React.FC<SimulatedCheckoutModalProps> = ({ onSuccess, onOpenOrders }) => {
  const { items, cartTotal, clearCart, isCheckoutOpen, setIsCheckoutOpen } = useCart();
  const { user, openAuthModal, googleLogin } = useAuth();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-reset modal state every time checkout is opened or reopened
  useEffect(() => {
    if (isCheckoutOpen) {
      setCurrentStep(1);
      setCreatedOrder(null);
      setErrorMessage(null);
      setIsProcessingPayment(false);
    }
  }, [isCheckoutOpen]);

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCurrentStep(1);
    setCreatedOrder(null);
    setErrorMessage(null);
    setIsProcessingPayment(false);
  };

  // Address State - prefilled from authenticated user if available
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  useEffect(() => {
    if (user) {
      if (!customerName && user.name) setCustomerName(user.name);
      if (!customerEmail && user.email) setCustomerEmail(user.email);
    }
  }, [user, isCheckoutOpen]);

  // Validate step 2 inputs strictly before advancing
  const handleValidateStep2 = () => {
    setErrorMessage(null);
    if (!customerName.trim() || customerName.trim().length < 3) {
      setErrorMessage('Please enter your full name (at least 3 characters)');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail.trim())) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(customerPhone.trim())) {
      setErrorMessage('Please enter a valid 10-digit Indian phone number (digits only, starting with 6-9)');
      return;
    }
    if (!addressLine.trim() || addressLine.trim().length < 5) {
      setErrorMessage('Please enter a valid street delivery address');
      return;
    }
    if (!city.trim() || city.trim().length < 2) {
      setErrorMessage('Please enter your city');
      return;
    }
    if (!/^\d{6}$/.test(postalCode.trim())) {
      setErrorMessage('Please enter a valid 6-digit postal PIN code');
      return;
    }
    setCurrentStep(3);
  };

  // Simulated Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'UPI_SIMULATED' | 'CARD_SIMULATED' | 'COD'>('UPI_SIMULATED');

  if (!isCheckoutOpen) return null;

  const handleSimulatePayment = async () => {
    try {
      setIsProcessingPayment(true);
      setErrorMessage(null);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const orderPayload = {
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress: {
          addressLine,
          city,
          state,
          postalCode,
        },
        paymentMethod,
        items: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
        })),
      };

      let newOrder: any = null;
      try {
        newOrder = await api.createOrder(orderPayload);
      } catch (apiErr) {
        console.warn('Backend API order creation failed, generating local order:', apiErr);
        newOrder = {
          id: `ord-${Date.now()}`,
          orderNumber: `ARC-${Math.floor(100000 + Math.random() * 900000)}`,
          status: 'CONFIRMED',
          paymentStatus: paymentMethod === 'COD' ? 'Pending (COD)' : 'PAID (Simulated)',
          totalAmount: cartTotal,
          paymentMethod,
          createdAt: new Date().toISOString()
        };
      }

      // Save permanently to Firebase Firestore
      const firestoreOrder = {
        ...newOrder,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress: `${addressLine}, ${city}, ${state} - ${postalCode}`,
        items: items.map((i) => ({
          id: i.product.id,
          title: i.product.title,
          price: i.product.discountPrice || i.product.price,
          quantity: i.quantity,
          image: i.product.images[0] || '',
        })),
        totalAmount: cartTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'Pending (COD)' : 'PAID (Simulated)',
        status: 'CONFIRMED',
      };

      await saveOrderToFirestore(firestoreOrder);

      setCreatedOrder(firestoreOrder);
      setCurrentStep(5);
      clearCart();

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      onSuccess(firestoreOrder);
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment simulation failed');
      setCurrentStep(3);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const stepsList = [
    { num: 1, label: 'Cart' },
    { num: 2, label: 'Address' },
    { num: 3, label: 'Review' },
    { num: 4, label: 'Payment' },
    { num: 5, label: 'Confirmation' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-950/95 border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col text-slate-100">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div>
            <h2 className="font-display font-extrabold text-lg text-white">
              Simulated Checkout Experience
            </h2>
            <p className="text-[11px] text-blue-400 font-mono font-semibold">
              SECURE SANDBOX // INFYHACKATHON REQUIREMENT
            </p>
          </div>
          {currentStep !== 5 && (
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="px-6 py-3 bg-slate-900/40 border-b border-white/10 flex items-center justify-between">
          {stepsList.map((s, idx) => (
            <div key={s.num} className="flex items-center gap-1.5 sm:gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep === s.num
                    ? 'bg-blue-600 text-white shadow-sm'
                    : currentStep > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/10 text-slate-400'
                }`}
              >
                {currentStep > s.num ? (
                  <CheckCircle2 size={14} className="text-white" />
                ) : (
                  s.num
                )}
              </div>
              <span
                className={`text-xs hidden sm:inline font-semibold ${
                  currentStep === s.num ? 'text-blue-400' : currentStep > s.num ? 'text-slate-200' : 'text-slate-500'
                }`}
              >
                {s.label}
              </span>
              {idx < stepsList.length - 1 && (
                <div className="w-4 sm:w-8 h-[2px] bg-white/10 mx-1"></div>
              )}
            </div>
          ))}
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border-b border-rose-200 text-rose-700 text-xs px-6 font-medium">
            {errorMessage}
          </div>
        )}

        {/* Step Contents */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[70vh]">
          {/* STEP 1: Cart Summary */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Step 1: Verify Cart Items
              </h3>
              <div className="space-y-3">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="w-12 h-12 rounded-lg object-cover bg-white"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 max-w-sm truncate">{product.title}</h4>
                        <p className="text-slate-500">Qty: {quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold font-mono text-blue-600">
                      ₹{((product.discountPrice || product.price) * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
                <span className="font-semibold text-slate-600">Total:</span>
                <span className="font-display font-black text-xl text-slate-900">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {!user ? (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2.5">
                  <div className="flex items-center justify-center gap-2 text-amber-500 font-bold text-xs sm:text-sm">
                    <AlertCircle size={16} />
                    <span>Please login with your email first to place an order</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Orders are permanently tied to your email account and tracked in cloud telemetry.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        handleClose();
                        googleLogin();
                      }}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:bg-slate-100 transition cursor-pointer"
                    >
                      <span>Instant Google Sign-In</span>
                    </button>
                    <button
                      onClick={() => {
                        handleClose();
                        openAuthModal('login');
                      }}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition cursor-pointer"
                    >
                      <span>Sign In with Email</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-blue-700 shadow-sm transition cursor-pointer"
                >
                  <span>Continue to Shipping Address</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}

          {/* STEP 2: Shipping Address Form */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                Step 2: Shipping & Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:border-blue-500 focus:bg-slate-950"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Email Address</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:border-blue-500 focus:bg-slate-950"
                    required
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-semibold">Phone Number (10 Digits)</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:border-blue-500 focus:bg-slate-950 font-mono"
                    required
                  />
                  <p className="text-[10px] text-slate-500">Only numbers accepted (e.g. 9876543210)</p>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-semibold">Street Address / Landmark</label>
                  <input
                    type="text"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="Enter door/flat no, street address"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:border-blue-500 focus:bg-slate-950"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:border-blue-500 focus:bg-slate-950"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Postal PIN Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit PIN code"
                    maxLength={6}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:border-blue-500 focus:bg-slate-950 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold text-xs hover:bg-white/10 transition cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleValidateStep2}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition cursor-pointer"
                >
                  <span>Review Order Summary</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Summary Review */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                Step 3: Review Order Summary
              </h3>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/15 space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Recipient Name:</span>
                  <span className="text-white font-bold">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contact Number:</span>
                  <span className="text-white font-mono font-bold">+91 {customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Delivery Address:</span>
                  <span className="text-white text-right max-w-xs">{addressLine}, {city} - {postalCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Items:</span>
                  <span className="text-white font-bold">{items.reduce((s, i) => s + i.quantity, 0)} Units</span>
                </div>
                <div className="pt-2.5 border-t border-white/10 flex justify-between items-baseline text-sm font-bold text-white">
                  <span>Payable Amount:</span>
                  <span className="text-cyan-400 font-display font-black text-lg">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold text-xs hover:bg-white/10 transition cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition cursor-pointer"
                >
                  <span>Proceed to Payment Simulation</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Simulated Payment Step */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  Step 4: Simulated Payment Gateway
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Select your test payment channel. No real currency will be charged.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI_SIMULATED')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition cursor-pointer ${
                    paymentMethod === 'UPI_SIMULATED'
                      ? 'bg-blue-600/20 border-cyan-400 shadow-lg shadow-cyan-500/10 text-white'
                      : 'bg-slate-900/80 border-white/10 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <Smartphone className="text-cyan-400" size={24} />
                  <div>
                    <h4 className="font-bold text-xs text-white">Instant UPI Sandbox</h4>
                    <p className="text-[10px] text-slate-400">Mock GPay / PhonePe QR</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD_SIMULATED')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition cursor-pointer ${
                    paymentMethod === 'CARD_SIMULATED'
                      ? 'bg-blue-600/20 border-cyan-400 shadow-lg shadow-cyan-500/10 text-white'
                      : 'bg-slate-900/80 border-white/10 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <CreditCard className="text-indigo-400" size={24} />
                  <div>
                    <h4 className="font-bold text-xs text-white">Mock Credit / Debit</h4>
                    <p className="text-[10px] text-slate-400">Test Visa 4242</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition cursor-pointer ${
                    paymentMethod === 'COD'
                      ? 'bg-blue-600/20 border-cyan-400 shadow-lg shadow-cyan-500/10 text-white'
                      : 'bg-slate-900/80 border-white/10 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <Truck className="text-emerald-400" size={24} />
                  <div>
                    <h4 className="font-bold text-xs text-white">Simulated COD</h4>
                    <p className="text-[10px] text-slate-400">Pay on delivery test</p>
                  </div>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs space-y-1">
                <div className="flex items-center gap-2 text-blue-300 font-bold">
                  <ShieldCheck size={16} />
                  <span>Sandbox Environment: Active</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Clicking "Authorize Simulated Payment" will execute atomic stock deduction, generate unique order ID, and trigger status workflow.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={isProcessingPayment}
                  className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold text-xs hover:bg-white/10 transition cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  disabled={isProcessingPayment}
                  className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Verifying Simulated Gateway Transaction...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Authorize Simulated Payment (₹{cartTotal.toLocaleString('en-IN')})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Order Confirmation */}
          {currentStep === 5 && createdOrder && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-md">
                <PackageCheck size={36} />
              </div>

              <div>
                <h3 className="font-display font-black text-2xl text-white">
                  ORDER CONFIRMED!
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Thank you for deploying your battle gear with Arceus Gear.
                </p>
                <div className="inline-block mt-3 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-cyan-400 font-mono text-xs font-bold">
                  Order Number: {createdOrder.orderNumber}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/15 text-left text-xs space-y-2.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment Status:</span>
                  <span className="text-emerald-400 font-bold">{createdOrder.paymentStatus} (Simulated)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Initial Status:</span>
                  <span className="text-cyan-400 font-bold">{createdOrder.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Charged:</span>
                  <span className="text-white font-mono font-bold text-sm">₹{createdOrder.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    if (onOpenOrders) onOpenOrders();
                  }}
                  className="w-full py-3.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PackageCheck size={16} />
                  <span>View in Order History</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition cursor-pointer"
                >
                  Return to Shop
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
