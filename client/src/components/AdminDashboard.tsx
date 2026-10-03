import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  AlertTriangle, 
  Plus, 
  Edit3, 
  Trash2, 
  RefreshCw,
  X
} from 'lucide-react';
import { api } from '../services/api';
import { Product, Category, Order } from '../types';

interface AdminDashboardProps {
  categories: Category[];
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ categories, onRefreshData }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'users'>('overview');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Edit / Add Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formDiscountPrice, setFormDiscountPrice] = useState('');
  const [formStock, setFormStock] = useState('10');
  const [formCategory, setFormCategory] = useState(categories[0]?.id || '');
  const [formImage, setFormImage] = useState('');
  const [formSpecs, setFormSpecs] = useState<{ key: string; val: string }[]>([
    { key: 'GPU', val: 'RTX 4070' },
    { key: 'RAM', val: '32GB DDR5' },
  ]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [dash, prodList, orderList, userList] = await Promise.all([
        api.getAdminDashboard(),
        api.getProducts(),
        api.getAdminOrders(),
        api.getAdminUsers(),
      ]);
      setDashboardData(dash);
      setProducts(prodList);
      setOrders(orderList);
      setUsers(userList);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as any } : o))
      );
      loadData();
    } catch (err: any) {
      alert(err.message || 'Status update failed');
    }
  };

  const openCreateModal = () => {
    setEditingProductId(null);
    setFormTitle('');
    setFormSlug('');
    setFormDesc('');
    setFormPrice('');
    setFormDiscountPrice('');
    setFormStock('10');
    setFormCategory(categories[0]?.id || '');
    setFormImage('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80');
    setFormSpecs([
      { key: 'Processor', val: 'Intel Core i7-14700HX' },
      { key: 'Graphics', val: 'NVIDIA RTX 4070 8GB' },
    ]);
    setIsProductModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProductId(p.id);
    setFormTitle(p.title);
    setFormSlug(p.slug);
    setFormDesc(p.description);
    setFormPrice(String(p.price));
    setFormDiscountPrice(p.discountPrice ? String(p.discountPrice) : '');
    setFormStock(String(p.stock));
    setFormCategory(p.categoryId);
    setFormImage(p.images?.[0] || '');
    setFormSpecs(
      Object.entries(p.specs || {}).map(([key, val]) => ({ key, val }))
    );
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const specsObj: Record<string, string> = {};
      formSpecs.forEach((s) => {
        if (s.key.trim() && s.val.trim()) {
          specsObj[s.key.trim()] = s.val.trim();
        }
      });

      const payload = {
        title: formTitle,
        slug: formSlug || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: formDesc,
        price: parseFloat(formPrice),
        discountPrice: formDiscountPrice ? parseFloat(formDiscountPrice) : null,
        stock: parseInt(formStock),
        categoryId: formCategory,
        images: [formImage],
        specs: specsObj,
      };

      await api.saveProduct(payload, editingProductId || undefined);
      setIsProductModalOpen(false);
      loadData();
      onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this hardware from Arceus inventory?')) {
      return;
    }
    try {
      await api.deleteProduct(id);
      loadData();
      onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete product');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in">
      {/* Admin Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold">
              ADMIN CONTROL CENTER
            </span>
            <span className="text-slate-300 text-xs">|</span>
            <span className="text-slate-500 text-xs font-medium">INFYHACKATHON Mandatory Challenge</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
            Arceus Mission Control
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 shadow-sm transition"
            title="Refresh metrics"
          >
            <RefreshCw size={18} className={isLoading ? 'animate-spin text-blue-600' : ''} />
          </button>
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
          >
            <Plus size={16} />
            <span>Add New Hardware</span>
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex gap-2 pt-6 border-b border-slate-200 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BarChart3 size={16} />
          <span>Dashboard Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === 'products' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Package size={16} />
          <span>Products Management ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === 'orders' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ShoppingCart size={16} />
          <span>Orders Workflow ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users size={16} />
          <span>Users & Roles ({users.length})</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && dashboardData && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[11px] text-slate-500 font-semibold">Total Revenue</span>
              <p className="font-display font-black text-xl text-slate-900 mt-1">
                ₹{dashboardData.metrics.totalRevenue.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 inline-block">
                ● Live gross revenue
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[11px] text-slate-500 font-semibold">Total Orders</span>
              <p className="font-display font-black text-xl text-slate-900 mt-1">
                {dashboardData.metrics.totalOrders}
              </p>
              <span className="text-[10px] text-blue-600 font-bold mt-1 inline-block">
                All simulated checkouts
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[11px] text-slate-500 font-semibold">Active Hardware</span>
              <p className="font-display font-black text-xl text-slate-900 mt-1">
                {dashboardData.metrics.totalProducts}
              </p>
              <span className="text-[10px] text-indigo-600 font-bold mt-1 inline-block">
                In inventory catalog
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[11px] text-slate-500 font-semibold">Registered Users</span>
              <p className="font-display font-black text-xl text-slate-900 mt-1">
                {dashboardData.metrics.totalUsers}
              </p>
              <span className="text-[10px] text-purple-600 font-bold mt-1 inline-block">
                Customer & Admin profiles
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 col-span-2 md:col-span-1">
              <span className="text-[11px] text-amber-800 font-bold flex items-center gap-1">
                <AlertTriangle size={12} />
                <span>Low-Stock Alerts</span>
              </span>
              <p className="font-display font-black text-xl text-amber-900 mt-1">
                {dashboardData.metrics.lowStockCount} Items
              </p>
              <span className="text-[10px] text-amber-700 font-semibold mt-1 inline-block">
                Units ≤ 5 threshold
              </span>
            </div>
          </div>

          {/* Low Stock Alert Table */}
          {dashboardData.lowStockProducts.length > 0 && (
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
              <h3 className="font-display font-bold text-sm text-amber-900 flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>Low-Stock Inventory Warning (Requires Replenishment)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {dashboardData.lowStockProducts.map((p: any) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl bg-white border border-amber-200 flex items-center justify-between text-xs shadow-sm"
                  >
                    <div>
                      <h5 className="font-bold text-slate-900 truncate max-w-[180px]">{p.title}</h5>
                      <span className="text-amber-700 font-bold text-[11px]">
                        Only {p.stock} units left!
                      </span>
                    </div>
                    <button
                      onClick={() => openEditModal(products.find((prod) => prod.id === p.id) || p)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 text-white font-bold text-[10px] hover:bg-amber-600"
                    >
                      Refill
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Orders Overview */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <h3 className="font-display font-bold text-sm text-slate-900">Recent Deployments & Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px]">
                    <th className="py-2.5 px-3">Order #</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentOrders.map((o: any) => (
                    <tr key={o.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono font-bold text-blue-600">{o.orderNumber}</td>
                      <td className="py-3 px-3 font-semibold text-slate-800">{o.customerName}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        ₹{o.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px]">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS CRUD */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-3">Product</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-3">Stock</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0]}
                          alt={p.title}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900 max-w-sm truncate">{p.title}</p>
                          <span className="text-[10px] text-slate-400 font-mono">slug: {p.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-blue-600 font-semibold">
                      {p.category?.name || 'Hardware'}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      ₹{(p.discountPrice || p.price).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`font-bold ${p.stock <= 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                        title="Edit hardware"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600"
                        title="Delete hardware"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS WORKFLOW */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-3">Order Number</th>
                  <th className="py-3 px-3">Customer Details</th>
                  <th className="py-3 px-3">Items</th>
                  <th className="py-3 px-3">Total</th>
                  <th className="py-3 px-3">Status Workflow</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-3 font-mono font-bold text-blue-600">
                      {o.orderNumber}
                      <p className="text-[10px] text-slate-400 font-sans">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">{o.customerName}</p>
                      <p className="text-slate-500 text-[11px]">{o.customerEmail}</p>
                      <p className="text-slate-400 text-[10px]">{o.customerPhone}</p>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {o.items?.length} items ({o.items?.map((i) => i.title).join(', ').slice(0, 40)}...)
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      ₹{o.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={o.status}
                        onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:border-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: USERS MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-3">User Name</th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">Orders Placed</th>
                  <th className="py-3 px-3">Current Role</th>
                  <th className="py-3 px-3 text-right">Role Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-slate-900">{u.name}</td>
                    <td className="py-3 px-3 text-slate-600">{u.email}</td>
                    <td className="py-3 px-3 font-mono font-bold text-blue-600">
                      {u._count?.orders || 0}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={async () => {
                          const newRole = u.role === 'ADMIN' ? 'CUSTOMER' : 'ADMIN';
                          const res = await fetch(`http://localhost:5000/api/admin/users/${u.id}/role`, {
                            method: 'PATCH',
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${localStorage.getItem('arceus_token')}`,
                            },
                            body: JSON.stringify({ role: newRole }),
                          });
                          if (res.ok) loadData();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-semibold"
                      >
                        Toggle to {u.role === 'ADMIN' ? 'CUSTOMER' : 'ADMIN'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/40 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-display font-bold text-base text-slate-900">
                {editingProductId ? 'Edit Hardware Unit' : 'Deploy New Hardware'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-600 font-semibold">Hardware Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Arceus Strix RTX 4080 Gaming Rig"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-600 font-semibold">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-600 font-semibold">Stock Quantity</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-600 font-semibold">Base Price (₹)</label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-600 font-semibold">Discounted Price (₹, optional)</label>
                  <input
                    type="number"
                    value={formDiscountPrice}
                    onChange={(e) => setFormDiscountPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-600 font-semibold">Hardware Image URL</label>
                  <input
                    type="url"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                    required
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-600 font-semibold">Description</label>
                  <textarea
                    rows={2}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                  />
                </div>
              </div>

              {/* Dynamic Specs Builder */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">Dynamic Specifications</span>
                  <button
                    type="button"
                    onClick={() => setFormSpecs([...formSpecs, { key: '', val: '' }])}
                    className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-semibold"
                  >
                    + Add Spec Row
                  </button>
                </div>

                {formSpecs.map((spec, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Key (e.g. GPU, RAM)"
                      value={spec.key}
                      onChange={(e) => {
                        const updated = [...formSpecs];
                        updated[idx].key = e.target.value;
                        setFormSpecs(updated);
                      }}
                      className="w-1/3 p-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. RTX 4070 8GB)"
                      value={spec.val}
                      onChange={(e) => {
                        const updated = [...formSpecs];
                        updated[idx].val = e.target.value;
                        setFormSpecs(updated);
                      }}
                      className="flex-1 p-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setFormSpecs(formSpecs.filter((_, i) => i !== idx))}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-sm"
                >
                  Save Hardware
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
