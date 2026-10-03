import React, { useState, useEffect } from 'react';
import { 
  X, 
  Package, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  Ban, 
  RotateCcw, 
  Truck, 
  CreditCard, 
  MapPin, 
  Phone, 
  Calendar,
  Clock,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getOrdersFromFirestore, cancelOrderInFirestore } from '../firebase/config';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({ isOpen, onClose }) => {
  const { user, openAuthModal } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'cancelled'>('all');

  // Cancel order modal state
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState<string>('Found a better price / deal');
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState<string | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const data = await getOrdersFromFirestore(user?.email || undefined);
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleCancelOrder = async () => {
    if (!cancellingOrderId) return;
    setIsCancelling(true);
    try {
      await cancelOrderInFirestore(cancellingOrderId, cancelReason);
      setCancelSuccessMsg(`Order #${cancellingOrderId.slice(-8).toUpperCase()} was successfully cancelled. Full refund initiated.`);
      setCancellingOrderId(null);
      await fetchOrders();
      setTimeout(() => setCancelSuccessMsg(null), 5000);
    } catch (err) {
      console.error('Error cancelling order:', err);
    } finally {
      setIsCancelling(false);
    }
  };

  const filteredOrders = orders.filter(o => {
    if (filter === 'active') return o.status !== 'CANCELLED' && o.status !== 'Delivered';
    if (filter === 'cancelled') return o.status === 'CANCELLED';
    return true;
  });

  const getStatusBadge = (status: string) => {
    const s = (status || '').toUpperCase();
    if (s === 'CANCELLED') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-950/60 border border-rose-500/40 text-rose-300">
          <Ban size={13} />
          CANCELLED // REFUND INITIATED
        </span>
      );
    }
    if (s === 'DELIVERED') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
          <CheckCircle2 size={13} />
          DELIVERED
        </span>
      );
    }
    if (s === 'SHIPPED') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-950/60 border border-blue-500/40 text-blue-300">
          <Truck size={13} />
          SHIPPED IN TRANSIT
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
        <Sparkles size={13} />
        ORDER CONFIRMED
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-slate-950/95 border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-100">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400">
              <Package size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-black text-xl text-white tracking-wide">
                  Order History & Deployments
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-900/40 border border-blue-500/30 text-blue-300">
                  FIREBASE CLOUD
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {user ? `Logged in as ${user.name} (${user.email})` : 'Viewing local & guest deployments'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter Navigation */}
        <div className="px-6 py-3 border-b border-white/10 bg-slate-900/40 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                filter === 'active' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              Active ({orders.filter(o => o.status !== 'CANCELLED' && o.status !== 'Delivered').length})
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                filter === 'cancelled' 
                  ? 'bg-rose-600 text-white shadow-sm' 
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              Cancelled ({orders.filter(o => o.status === 'CANCELLED').length})
            </button>
          </div>

          <button
            onClick={fetchOrders}
            className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
          >
            <RotateCcw size={13} className={isLoading ? 'animate-spin' : ''} />
            <span>Sync Firebase</span>
          </button>
        </div>

        {/* Cancel Success Alert */}
        {cancelSuccessMsg && (
          <div className="mx-6 mt-4 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
            <span className="text-xs font-medium">{cancelSuccessMsg}</span>
          </div>
        )}

        {/* Orders Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Loader2 size={32} className="animate-spin text-blue-500" />
              <span className="text-xs font-mono font-medium text-slate-300">
                Fetching cloud orders from Firebase Firestore...
              </span>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-slate-500">
                <Package size={32} />
              </div>
              <h3 className="text-base font-bold text-white">No deployments found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                {filter === 'cancelled' 
                  ? 'You have no cancelled orders.' 
                  : 'You have not placed any hardware orders yet. Complete checkout to track deployments here.'}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isCancelled = order.status === 'CANCELLED';
              const canCancel = !isCancelled && order.status !== 'Delivered';

              return (
                <div
                  key={order.id}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                    isCancelled 
                      ? 'bg-rose-950/10 border-rose-500/20' 
                      : 'bg-slate-900/70 border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-blue-400 text-sm tracking-wider">
                          #{order.orderNumber || order.id.slice(-8).toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-500">•</span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                          <Calendar size={13} className="text-slate-500" />
                          <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>
                      {order.customerName && (
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Recipient: <span className="text-white font-semibold">{order.customerName}</span> ({order.customerPhone || 'Verified'})
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {getStatusBadge(order.status)}
                      <span className="font-mono font-black text-lg text-white">
                        ₹{(order.totalAmount || 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="py-4 space-y-3">
                    {order.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image || '/products/test_scar.jpg'}
                            alt={item.title}
                            className="w-12 h-12 rounded-xl object-cover bg-slate-950 border border-white/15 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                          <div>
                            <p className="font-bold text-sm text-slate-100 line-clamp-1">{item.title}</p>
                            <p className="text-xs text-slate-400">
                              Qty: <span className="text-blue-400 font-mono font-bold">{item.quantity}</span> × ₹{(item.price || 0).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-sm text-slate-200">
                          ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Info & Action */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="space-y-1 text-slate-400 text-[11px]">
                      {order.shippingAddress && (
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-slate-500 shrink-0" />
                          <span className="truncate max-w-md">
                            {typeof order.shippingAddress === 'string' 
                              ? order.shippingAddress 
                              : `${order.shippingAddress.addressLine || ''}, ${order.shippingAddress.city || ''}`}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-blue-400">
                          <CreditCard size={12} />
                          {order.paymentMethod || 'Online'}
                        </span>
                        <span>•</span>
                        <span className="text-emerald-400 font-medium">
                          {order.paymentStatus || 'Payment Verified'}
                        </span>
                      </div>
                    </div>

                    {/* Cancellation Info or Cancel Button */}
                    {isCancelled ? (
                      <div className="text-right">
                        <p className="text-xs text-rose-400 font-bold">
                          Reason: {order.cancellationReason || 'Requested by Customer'}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Refund credited to original payment source within 24-48 hours.
                        </p>
                      </div>
                    ) : canCancel ? (
                      <button
                        onClick={() => {
                          setCancellingOrderId(order.id);
                          setCancelReason('Found a better price / deal');
                        }}
                        className="px-4 py-2 rounded-xl bg-rose-600/10 hover:bg-rose-600 border border-rose-500/30 hover:border-rose-500 text-rose-300 hover:text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
                      >
                        Cancel Order
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Confirmation Modal for Order Cancellation */}
      {cancellingOrderId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-rose-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/30">
                <AlertCircle size={24} />
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-white">Cancel Order?</h3>
                <p className="text-xs text-slate-400">Order #{cancellingOrderId.slice(-8).toUpperCase()}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300">
              Are you sure you want to cancel this deployment? Your simulated payment will be immediately refunded.
            </p>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Reason for Cancellation
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="Found a better price / deal">Found a better price / deal</option>
                <option value="Ordered by mistake">Ordered by mistake</option>
                <option value="Need to change delivery address">Need to change delivery address</option>
                <option value="Delivery timeframe too long">Delivery timeframe too long</option>
                <option value="Changed my mind">Changed my mind</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setCancellingOrderId(null)}
                disabled={isCancelling}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-slate-300 transition cursor-pointer"
              >
                Keep Order
              </button>
              <button
                onClick={handleCancelOrder}
                disabled={isCancelling}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer"
              >
                {isCancelling ? <Loader2 size={14} className="animate-spin" /> : null}
                <span>Confirm Cancellation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
