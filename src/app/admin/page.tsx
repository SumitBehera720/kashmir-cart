"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck, Loader2, Users, LayoutGrid, FileText, Image as ImageIcon,
  Settings, ShoppingBag, Plus, Trash2, Edit3, Save, LogOut, X,
  TrendingUp, Package, Tag, Globe, Link as LinkIcon, UserX, UserCheck,
  Upload, ChevronDown, ChevronUp, RefreshCw, BarChart2,
} from "lucide-react";
import {
  fetchProducts, fetchCategories, fetchAdminUsers, fetchAdminStats,
  createCategory, updateCategory, deleteCategory,
  updateFooterDetails,
  createProduct, updateProduct, deleteProduct, uploadProductImage,
  uploadHomepageImage, updateHomepageSection,
  toggleBlockUser, uploadCategoryImage,
} from "@/data/api";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Category { id: number; name: string; description?: string; image_url?: string; }
interface Product { id: number; sku: string; name: string; price: number; sale_price?: number; stock: number; category?: { name: string }; images: string[]; }
interface User { id: number; name: string; email: string; role: string; is_blocked?: boolean; created_at: string; }

// ─── Homepage section keys ────────────────────────────────────────────────────
const HOMEPAGE_SECTIONS = [
  { key: "hero",            label: "Hero Banner",             hasImage: true,  hasText: true },
  { key: "heritage_story",  label: "Heritage Story",          hasImage: true,  hasText: true },
  { key: "category",        label: "Category Showcase",       hasImage: false, hasText: true },
  { key: "product_grid",    label: "Most Loved Products",     hasImage: false, hasText: true },
  { key: "trust",           label: "Trust Section",           hasImage: false, hasText: true },
  { key: "why_saffron",     label: "Why Saffron Is Special",  hasImage: true,  hasText: true },
  { key: "raya_ayurveda",   label: "RAYA Ayurveda Collection",hasImage: true,  hasText: true },
  { key: "certifications",  label: "Certifications Section",  hasImage: false, hasText: true },
  { key: "reviews",         label: "Customer Reviews",        hasImage: false, hasText: true },
];

const SOCIAL_PLATFORMS = [
  { key: "instagram", label: "Instagram",  icon: "📸" },
  { key: "facebook",  label: "Facebook",   icon: "👍" },
  { key: "whatsapp",  label: "WhatsApp",   icon: "💬" },
  { key: "youtube",   label: "YouTube",    icon: "▶️" },
  { key: "twitter",   label: "Twitter / X",icon: "🐦" },
  { key: "pinterest", label: "Pinterest",  icon: "📌" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8c672b] mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-white border border-[#cba358]/40 px-3.5 py-2.5 outline-none focus:border-[#3d0c11] text-sm text-[#3d0c11] font-sans placeholder:text-[#9d8c7a]";
const btnPrimary = "py-2.5 px-6 bg-[#3d0c11] text-[#d6af65] text-[11px] font-bold uppercase tracking-widest hover:bg-[#6b1f28] border border-[#cba358]/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-2";
const btnDanger = "py-2 px-4 bg-transparent text-maroon-royal border border-maroon-royal/30 text-[10px] font-bold uppercase tracking-widest hover:bg-maroon-royal hover:text-white transition-colors flex items-center gap-1.5";
const btnSecondary = "py-2 px-4 bg-transparent text-[#8c672b] border border-[#cba358]/40 text-[10px] font-bold uppercase tracking-widest hover:bg-[#cba358]/10 transition-colors flex items-center gap-1.5";

// ─── Main Admin Component ─────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Data
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<any>(null);

  // Feedback
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Category forms
  const [categoryForm, setCategoryForm] = useState({ name: "", description: "" });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryImageFile, setCategoryImageFile] = useState<File | null>(null);
  const [uploadingCategoryImageForId, setUploadingCategoryImageForId] = useState<number | null>(null);

  // Product forms
  const [productForm, setProductForm] = useState({
    sku: "", name: "", description: "", price: "", sale_price: "",
    stock: "100", category_id: "", benefits: "", ingredients: "",
    origin: "Kashmir, India", usage: "",
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [uploadingImageForId, setUploadingImageForId] = useState<number | null>(null);

  // Footer form
  const [footerForm, setFooterForm] = useState({
    phone: "", email: "", address: "",
    social_links: {
      instagram: "", facebook: "", whatsapp: "", youtube: "", twitter: "", pinterest: ""
    },
  });

  // Homepage sections
  const [sectionForms, setSectionForms] = useState<Record<string, { headline: string; subtext: string; button_text: string; button_link: string; imageFile: File | null }>>({});
  const [activeSectionKey, setActiveSectionKey] = useState<string | null>(null);

  // ─── Init ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (!storedToken || !storedUser) { router.push("/login"); return; }
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== "admin" && parsedUser.role !== "super_admin") {
      setLoading(false); setAuthorized(false); return;
    }
    setToken(storedToken);
    setCurrentUser(parsedUser);
    setAuthorized(true);
    loadAll(storedToken);

    // Init section forms
    const forms: Record<string, any> = {};
    HOMEPAGE_SECTIONS.forEach(s => {
      forms[s.key] = { headline: "", subtext: "", button_text: "", button_link: "", imageFile: null };
    });
    setSectionForms(forms);
  }, []);

  const loadAll = async (authToken: string) => {
    setLoading(true);
    try {
      const [pData, cData, uRes, sRes] = await Promise.all([
        fetchProducts().catch(() => []),
        fetchCategories().catch(() => []),
        fetchAdminUsers(authToken),
        fetchAdminStats(authToken),
      ]);
      setProducts(pData);
      setCategories(cData);
      if (uRes.ok) setUsers(await uRes.json());
      if (sRes.ok) setStats(await sRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const feedback = (msg: string, isErr = false) => {
    if (isErr) { setErrorMsg(msg); setSuccessMsg(""); }
    else { setSuccessMsg(msg); setErrorMsg(""); }
    setTimeout(() => { setSuccessMsg(""); setErrorMsg(""); }, 5000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  // ─── Category Handlers ─────────────────────────────────────────────────────
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setActionLoading(true);
    try {
      const res = await createCategory(categoryForm, token);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || JSON.stringify(data.errors));
      feedback("Category created successfully!");
      setCategoryForm({ name: "", description: "" });
      setCategories(await fetchCategories());
    } catch (err: any) { feedback(err.message, true); }
    finally { setActionLoading(false); }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingCategory) return;
    setActionLoading(true);
    try {
      const res = await updateCategory(editingCategory.id, { name: editingCategory.name, description: editingCategory.description }, token);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      feedback("Category updated!");
      setEditingCategory(null);
      setCategories(await fetchCategories());
    } catch (err: any) { feedback(err.message, true); }
    finally { setActionLoading(false); }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!token || !confirm("Delete this category? This cannot be undone.")) return;
    setActionLoading(true);
    try {
      const res = await deleteCategory(id, token);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      feedback("Category deleted!");
      setCategories(await fetchCategories());
    } catch (err: any) { feedback(err.message, true); }
    finally { setActionLoading(false); }
  };

  const handleUploadCategoryImage = async (categoryId: number) => {
    if (!token || !categoryImageFile) return;
    setActionLoading(true);
    const fd = new FormData();
    fd.append("image", categoryImageFile);
    try {
      const res = await uploadCategoryImage(categoryId, fd, token);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      feedback("Category image uploaded successfully!");
      setCategoryImageFile(null);
      setUploadingCategoryImageForId(null);
      setCategories(await fetchCategories());
    } catch (err: any) { feedback(err.message, true); }
    finally { setActionLoading(false); }
  };

  // ─── Product Handlers ──────────────────────────────────────────────────────
  const emptyProductForm = {
    sku: "", name: "", description: "", price: "", sale_price: "",
    stock: "100", category_id: "", benefits: "", ingredients: "",
    origin: "Kashmir, India", usage: "",
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setActionLoading(true);
    const payload = {
      ...productForm,
      price: parseFloat(productForm.price),
      sale_price: productForm.sale_price ? parseFloat(productForm.sale_price) : null,
      stock: parseInt(productForm.stock),
      category_id: parseInt(productForm.category_id),
      benefits: productForm.benefits.split(",").map(b => b.trim()).filter(Boolean),
      ingredients: productForm.ingredients.split(",").map(i => i.trim()).filter(Boolean),
    };
    try {
      const res = await createProduct(payload, token);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || JSON.stringify(data.errors));
      feedback("Product created successfully!");
      setProductForm(emptyProductForm);
      setProducts(await fetchProducts());
    } catch (err: any) { feedback(err.message, true); }
    finally { setActionLoading(false); }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingProduct) return;
    setActionLoading(true);
    const payload = {
      ...productForm,
      price: parseFloat(productForm.price),
      sale_price: productForm.sale_price ? parseFloat(productForm.sale_price) : null,
      stock: parseInt(productForm.stock),
      category_id: parseInt(productForm.category_id),
      benefits: productForm.benefits.split(",").map(b => b.trim()).filter(Boolean),
      ingredients: productForm.ingredients.split(",").map(i => i.trim()).filter(Boolean),
    };
    try {
      const res = await updateProduct(editingProduct.id, payload, token);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      feedback("Product updated successfully!");
      setEditingProduct(null);
      setProductForm(emptyProductForm);
      setProducts(await fetchProducts());
    } catch (err: any) { feedback(err.message, true); }
    finally { setActionLoading(false); }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!token || !confirm("Delete this product permanently?")) return;
    setActionLoading(true);
    try {
      const res = await deleteProduct(id, token);
      if (!res.ok) throw new Error("Delete failed");
      feedback("Product deleted!");
      setProducts(await fetchProducts());
    } catch (err: any) { feedback(err.message, true); }
    finally { setActionLoading(false); }
  };

  const handleUploadProductImage = async (productId: number) => {
    if (!token || !productImageFile) return;
    setActionLoading(true);
    const fd = new FormData();
    fd.append("image", productImageFile);
    try {
      const res = await uploadProductImage(productId, fd, token);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      feedback("Image uploaded successfully!");
      setProductImageFile(null);
      setUploadingImageForId(null);
      setProducts(await fetchProducts());
    } catch (err: any) { feedback(err.message, true); }
    finally { setActionLoading(false); }
  };

  const startEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      sku: p.sku,
      name: p.name,
      description: "",
      price: String(p.price),
      sale_price: p.sale_price ? String(p.sale_price) : "",
      stock: String(p.stock),
      category_id: "",
      benefits: "",
      ingredients: "",
      origin: "Kashmir, India",
      usage: "",
    });
  };

  // ─── Footer Handler ────────────────────────────────────────────────────────
  const handleUpdateFooter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setActionLoading(true);
    try {
      const payload = { ...footerForm, social_links: JSON.stringify(footerForm.social_links) };
      const res = await updateFooterDetails(payload, token);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      feedback("Footer updated successfully!");
    } catch (err: any) { feedback(err.message, true); }
    finally { setActionLoading(false); }
  };

  // ─── Homepage Section Handler ──────────────────────────────────────────────
  const handleUpdateSection = async (key: string) => {
    if (!token) return;
    setActionLoading(true);
    const form = sectionForms[key];
    const fd = new FormData();
    fd.append("headline", form.headline);
    fd.append("subtext", form.subtext);
    fd.append("button_text", form.button_text);
    fd.append("button_link", form.button_link);
    if (form.imageFile) fd.append("image", form.imageFile);
    try {
      const res = await updateHomepageSection(key, fd, token);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      feedback(`Section "${key}" updated!`);
    } catch (err: any) { feedback(err.message, true); }
    finally { setActionLoading(false); }
  };

  // ─── User Handler ──────────────────────────────────────────────────────────
  const handleToggleBlock = async (userId: number) => {
    if (!token) return;
    setActionLoading(true);
    try {
      const res = await toggleBlockUser(userId, token);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Action failed");
      feedback(data.message);
      // Update local state
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_blocked: !u.is_blocked } : u));
    } catch (err: any) { feedback(err.message, true); }
    finally { setActionLoading(false); }
  };

  // ─── Loading & Auth Guards ────────────────────────────────────────────────
  if (loading) return (
    <div className="pt-28 pb-24 bg-[#fdfaf4] min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#3d0c11] mx-auto mb-4" />
        <p className="font-sans text-sm text-[#8c672b] uppercase tracking-wider">Loading Admin Portal...</p>
      </div>
    </div>
  );

  if (!authorized) return (
    <div className="pt-28 pb-24 bg-[#fdfaf4] min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white border border-[#3d0c11] p-8 text-center shadow-xl">
        <h1 className="font-serif text-3xl text-[#3d0c11] mb-4">ACCESS DENIED</h1>
        <p className="text-sm text-[#6b5a4e] mb-6">You do not have administrative privileges.</p>
        <button onClick={handleLogout} className={btnPrimary + " w-full justify-center"}>
          Sign In with Admin Account
        </button>
      </div>
    </div>
  );

  // ─── Tab Content ──────────────────────────────────────────────────────────
  const tabs = [
    { id: "overview",   label: "Dashboard",       icon: <LayoutGrid className="w-4 h-4" /> },
    { id: "products",   label: "Products",         icon: <ShoppingBag className="w-4 h-4" /> },
    { id: "categories", label: "Categories",       icon: <Tag className="w-4 h-4" /> },
    { id: "images",     label: "Page Customizer",  icon: <ImageIcon className="w-4 h-4" /> },
    { id: "footer",     label: "Footer & Social",  icon: <Globe className="w-4 h-4" /> },
    { id: "users",      label: "Users",            icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="pt-28 pb-24 bg-[#fdfaf4] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#cba358]/30 pb-6 mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl text-[#3d0c11] uppercase tracking-wider">Admin Portal</h1>
            <p className="text-[11px] text-[#8c672b] uppercase tracking-widest mt-1">
              Logged in as <span className="font-bold">{currentUser?.name}</span> · {currentUser?.role}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => token && loadAll(token)} className={btnSecondary}>
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
            <button onClick={handleLogout} className={btnPrimary}>
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>

        {/* Alerts */}
        {successMsg && (
          <div className="mb-6 bg-green-50 border border-green-300 text-green-700 p-4 text-xs font-semibold flex justify-between items-center">
            ✅ {successMsg}
            <button onClick={() => setSuccessMsg("")}><X className="w-4 h-4" /></button>
          </div>
        )}
        {errorMsg && (
          <div className="mb-6 bg-red-50 border border-red-300 text-red-700 p-4 text-xs font-semibold flex justify-between items-center">
            ⚠️ {errorMsg}
            <button onClick={() => setErrorMsg("")}><X className="w-4 h-4" /></button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Sidebar */}
          <div className="space-y-1 bg-white border border-[#cba358]/30 p-4 h-fit shadow-sm lg:col-span-1">
            <p className="text-[9px] uppercase tracking-widest text-[#8c672b] font-bold mb-3 px-4">Navigation</p>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider border-l-[3px] transition-all ${
                  activeTab === tab.id
                    ? "border-[#3d0c11] bg-[#3d0c11]/5 text-[#3d0c11]"
                    : "border-transparent text-[#6b5a4e] hover:bg-[#fdf5e8]/50"
                }`}
              >
                <span className="text-[#cba358]">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4 space-y-6">

            {/* ── OVERVIEW TAB ─────────────────────────────────────────────── */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: "Products",        value: stats?.total_products ?? products.length,    icon: <ShoppingBag className="w-5 h-5" /> },
                    { label: "Categories",      value: stats?.total_categories ?? categories.length, icon: <Tag className="w-5 h-5" /> },
                    { label: "Registered Users",value: stats?.total_users ?? users.length,           icon: <Users className="w-5 h-5" /> },
                    { label: "Total Orders",    value: stats?.total_orders ?? "—",                   icon: <Package className="w-5 h-5" /> },
                    { label: "Revenue (₹)",     value: stats?.total_revenue ? `₹${parseFloat(stats.total_revenue).toLocaleString("en-IN")}` : "—", icon: <BarChart2 className="w-5 h-5" /> },
                    { label: "Pending Orders",  value: stats?.pending_orders ?? "—",                 icon: <TrendingUp className="w-5 h-5" /> },
                  ].map((s, i) => (
                    <div key={i} className="bg-white border border-[#cba358]/25 p-5 shadow-sm flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#fdf5e8] border border-[#cba358]/30 flex items-center justify-center text-[#8c672b] flex-shrink-0">
                        {s.icon}
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-[#8c672b] font-bold mb-0.5">{s.label}</div>
                        <div className="font-serif text-2xl text-[#3d0c11] font-bold">{s.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent orders */}
                {stats?.recent_orders?.length > 0 && (
                  <div className="bg-white border border-[#cba358]/25 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-[#cba358]/15">
                      <h2 className="font-serif text-xl text-[#3d0c11]">Recent Orders</h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-[#fdf5e8] text-[#8c672b] text-[10px] uppercase tracking-wider font-bold border-b border-[#cba358]/20">
                            <th className="p-4 text-left">Order #</th>
                            <th className="p-4 text-left">Customer</th>
                            <th className="p-4 text-left">Amount</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#cba358]/10">
                          {stats.recent_orders.map((order: any) => (
                            <tr key={order.id} className="hover:bg-[#fdf5e8]/30">
                              <td className="p-4 font-mono text-xs text-[#3d0c11]">#{order.id}</td>
                              <td className="p-4 text-[#3d0c11]">{order.user?.name ?? "Guest"}</td>
                              <td className="p-4 text-[#3d0c11] font-semibold">₹{parseFloat(order.total_amount).toLocaleString("en-IN")}</td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                                  order.status === "delivered" ? "bg-green-50 text-green-700 border border-green-200" :
                                  order.status === "pending"   ? "bg-yellow-50 text-yellow-700 border border-yellow-200" :
                                  "bg-blue-50 text-blue-700 border border-blue-200"
                                }`}>{order.status}</span>
                              </td>
                              <td className="p-4 text-xs text-[#8c672b]">{new Date(order.created_at).toLocaleDateString("en-IN")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="bg-white border border-[#cba358]/25 p-5 shadow-sm">
                  <h2 className="font-serif text-xl text-[#3d0c11] mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { label: "Add Product",    tab: "products" },
                      { label: "Add Category",   tab: "categories" },
                      { label: "Customize Pages",tab: "images" },
                      { label: "Update Footer",  tab: "footer" },
                      { label: "Manage Users",   tab: "users" },
                    ].map(a => (
                      <button
                        key={a.tab}
                        onClick={() => setActiveTab(a.tab)}
                        className="p-3 bg-[#fdf5e8] border border-[#cba358]/25 hover:border-[#3d0c11]/40 text-left text-[11px] font-bold uppercase tracking-wider text-[#3d0c11] transition-colors"
                      >
                        + {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── CATEGORIES TAB ────────────────────────────────────────────── */}
            {activeTab === "categories" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Form */}
                <div className="bg-white border border-[#cba358]/30 p-6 shadow-sm">
                  <h2 className="font-serif text-xl text-[#3d0c11] mb-6 pb-2 border-b border-[#cba358]/20">
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </h2>
                  <form onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory} className="space-y-4">
                    <Field label="Category Name *">
                      <input
                        type="text" required className={inputCls}
                        placeholder="e.g. Pashmina Textiles"
                        value={editingCategory ? editingCategory.name : categoryForm.name}
                        onChange={e => editingCategory
                          ? setEditingCategory({ ...editingCategory, name: e.target.value })
                          : setCategoryForm({ ...categoryForm, name: e.target.value })}
                      />
                    </Field>
                    <Field label="Description">
                      <textarea
                        rows={3} className={inputCls + " resize-none"}
                        placeholder="Describe this category..."
                        value={editingCategory ? (editingCategory.description || "") : categoryForm.description}
                        onChange={e => editingCategory
                          ? setEditingCategory({ ...editingCategory, description: e.target.value })
                          : setCategoryForm({ ...categoryForm, description: e.target.value })}
                      />
                    </Field>
                    <div className="flex gap-3 pt-2">
                      <button type="submit" disabled={actionLoading} className={btnPrimary + " flex-1"}>
                        <Save className="w-3.5 h-3.5" />
                        {actionLoading ? "Saving..." : editingCategory ? "Save Changes" : "Create Category"}
                      </button>
                      {editingCategory && (
                        <button type="button" onClick={() => setEditingCategory(null)} className={btnSecondary}>
                          <X className="w-3.5 h-3.5" /> Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* List */}
                <div className="space-y-3">
                  <h2 className="font-serif text-xl text-[#3d0c11] pb-2 border-b border-[#cba358]/20">
                    Existing Categories ({categories.length})
                  </h2>
                  {categories.length === 0 && (
                    <p className="text-sm text-[#8c672b] italic py-4">No categories yet. Create one!</p>
                  )}
                  {categories.map((cat) => (
                    <div key={cat.id} className="bg-white border border-[#cba358]/25 p-4 flex flex-col gap-3 hover:border-[#cba358]/60 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 items-center flex-1 min-w-0">
                          {cat.image_url ? (
                            <img src={cat.image_url} alt={cat.name} className="w-12 h-12 object-cover border border-[#cba358]/30" />
                          ) : (
                            <div className="w-12 h-12 bg-[#fdf5e8] border border-[#cba358]/30 flex items-center justify-center text-[10px] text-[#8c672b] text-center">No Img</div>
                          )}
                          <div>
                            <h3 className="font-serif text-[15px] text-[#3d0c11] font-semibold mb-0.5">{cat.name}</h3>
                            {cat.description && <p className="text-[11px] text-[#8c672b] leading-relaxed truncate">{cat.description}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button onClick={() => setEditingCategory(cat)} className={btnSecondary} title="Edit">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setUploadingCategoryImageForId(uploadingCategoryImageForId === cat.id ? null : cat.id)}
                            className={btnSecondary} title="Upload Image"
                          >
                            <Upload className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteCategory(cat.id)} disabled={actionLoading} className={btnDanger} title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      
                      {uploadingCategoryImageForId === cat.id && (
                        <div className="mt-2 pt-3 border-t border-[#cba358]/20 flex items-center gap-4 flex-wrap bg-[#fdf5e8]/50 p-3">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8c672b]">
                            Upload Cover Image
                          </label>
                          <input
                            type="file" accept="image/*"
                            onChange={e => e.target.files?.[0] && setCategoryImageFile(e.target.files[0])}
                            className="text-sm text-[#3d0c11] file:mr-2 file:py-1.5 file:px-3 file:border file:border-[#cba358]/40 file:bg-white file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-[#3d0c11] hover:file:bg-[#fdf5e8]"
                          />
                          {categoryImageFile && (
                            <button
                              onClick={() => handleUploadCategoryImage(cat.id)}
                              disabled={actionLoading}
                              className={btnPrimary}
                            >
                              <Upload className="w-3.5 h-3.5" />
                              {actionLoading ? "Uploading..." : "Upload"}
                            </button>
                          )}
                          <button onClick={() => { setUploadingCategoryImageForId(null); setCategoryImageFile(null); }} className={btnSecondary}>
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── PRODUCTS TAB ──────────────────────────────────────────────── */}
            {activeTab === "products" && (
              <div className="space-y-8">

                {/* Add/Edit Product Form */}
                <div className="bg-white border border-[#cba358]/30 p-6 shadow-sm">
                  <h2 className="font-serif text-xl text-[#3d0c11] mb-6 pb-2 border-b border-[#cba358]/20">
                    {editingProduct ? `Editing: ${editingProduct.name}` : "Add New Product"}
                  </h2>
                  <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="SKU *"><input type="text" required className={inputCls} placeholder="KSH-SAF-001" value={productForm.sku} onChange={e => setProductForm({...productForm, sku: e.target.value})} /></Field>
                    <Field label="Product Name *"><input type="text" required className={inputCls} placeholder="Premium Saffron (2g)" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} /></Field>
                    <div className="md:col-span-2">
                      <Field label="Description"><textarea rows={2} className={inputCls + " resize-none"} value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} /></Field>
                    </div>
                    <Field label="Price (₹) *"><input type="number" required className={inputCls} placeholder="5999" min="0" step="0.01" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} /></Field>
                    <Field label="Sale Price (₹) — optional"><input type="number" className={inputCls} placeholder="4999 (leave blank if no sale)" min="0" step="0.01" value={productForm.sale_price} onChange={e => setProductForm({...productForm, sale_price: e.target.value})} /></Field>
                    <Field label="Stock *"><input type="number" required className={inputCls} min="0" value={productForm.stock} onChange={e => setProductForm({...productForm, stock: e.target.value})} /></Field>
                    <Field label="Category *">
                      <select required className={inputCls} value={productForm.category_id} onChange={e => setProductForm({...productForm, category_id: e.target.value})}>
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </Field>
                    <Field label="Origin"><input type="text" className={inputCls} value={productForm.origin} onChange={e => setProductForm({...productForm, origin: e.target.value})} /></Field>
                    <Field label="Usage Instructions"><input type="text" className={inputCls} placeholder="Steep 3-4 strands in warm milk..." value={productForm.usage} onChange={e => setProductForm({...productForm, usage: e.target.value})} /></Field>
                    <div className="md:col-span-2">
                      <Field label="Key Benefits (comma-separated)"><input type="text" className={inputCls} placeholder="Rich in antioxidants, Boosts mood" value={productForm.benefits} onChange={e => setProductForm({...productForm, benefits: e.target.value})} /></Field>
                    </div>
                    <div className="md:col-span-2">
                      <Field label="Ingredients (comma-separated)"><input type="text" className={inputCls} placeholder="100% Pure Kashmiri Saffron" value={productForm.ingredients} onChange={e => setProductForm({...productForm, ingredients: e.target.value})} /></Field>
                    </div>
                    <div className="md:col-span-2 flex gap-3 pt-4">
                      <button type="submit" disabled={actionLoading} className={btnPrimary + " flex-1"}>
                        <Save className="w-3.5 h-3.5" />
                        {actionLoading ? "Saving..." : editingProduct ? "Save Changes" : "Add Product to Catalog"}
                      </button>
                      {editingProduct && (
                        <button type="button" onClick={() => { setEditingProduct(null); setProductForm(emptyProductForm); }} className={btnSecondary}>
                          <X className="w-3.5 h-3.5" /> Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Products Table */}
                <div className="bg-white border border-[#cba358]/25 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-[#cba358]/15">
                    <h2 className="font-serif text-xl text-[#3d0c11]">Product Catalog ({products.length})</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-[#fdf5e8] text-[#8c672b] text-[10px] uppercase tracking-wider font-bold border-b border-[#cba358]/20">
                          <th className="p-4 text-left">Product</th>
                          <th className="p-4 text-left">SKU</th>
                          <th className="p-4 text-left">Category</th>
                          <th className="p-4 text-left">Price</th>
                          <th className="p-4 text-left">Sale Price</th>
                          <th className="p-4 text-left">Stock</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#cba358]/10">
                        {products.map((p) => (
                          <>
                            <tr key={p.id} className="hover:bg-[#fdf5e8]/30">
                              <td className="p-4 font-semibold text-[#3d0c11] max-w-[180px] truncate">{p.name}</td>
                              <td className="p-4 font-mono text-xs text-[#8c672b]">{p.sku}</td>
                              <td className="p-4 text-[#6b5a4e]">{p.category?.name ?? "—"}</td>
                              <td className="p-4 text-[#3d0c11]">₹{parseFloat(String(p.price)).toLocaleString("en-IN")}</td>
                              <td className="p-4 text-green-700">
                                {p.sale_price ? `₹${parseFloat(String(p.sale_price)).toLocaleString("en-IN")}` : <span className="text-[#9d8c7a]">—</span>}
                              </td>
                              <td className="p-4 text-[#6b5a4e]">{p.stock}</td>
                              <td className="p-4">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button onClick={() => startEditProduct(p)} className={btnSecondary} title="Edit">
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setUploadingImageForId(uploadingImageForId === p.id ? null : p.id)}
                                    className={btnSecondary} title="Upload Image"
                                  >
                                    <Upload className="w-3.5 h-3.5" />
                                  </button>
                                  <button onClick={() => handleDeleteProduct(p.id)} disabled={actionLoading} className={btnDanger} title="Delete">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                            {/* Image Upload Row */}
                            {uploadingImageForId === p.id && (
                              <tr key={`img-${p.id}`} className="bg-[#fdf5e8]/50">
                                <td colSpan={7} className="p-4">
                                  <div className="flex items-center gap-4 flex-wrap">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8c672b]">
                                      Upload Image for: <span className="text-[#3d0c11]">{p.name}</span>
                                    </label>
                                    <input
                                      type="file" accept="image/*"
                                      onChange={e => e.target.files?.[0] && setProductImageFile(e.target.files[0])}
                                      className="text-sm text-[#3d0c11] file:mr-2 file:py-1.5 file:px-3 file:border file:border-[#cba358]/40 file:bg-white file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-[#3d0c11] hover:file:bg-[#fdf5e8]"
                                    />
                                    {productImageFile && (
                                      <button
                                        onClick={() => handleUploadProductImage(p.id)}
                                        disabled={actionLoading}
                                        className={btnPrimary}
                                      >
                                        <Upload className="w-3.5 h-3.5" />
                                        {actionLoading ? "Uploading..." : "Upload"}
                                      </button>
                                    )}
                                    <button onClick={() => { setUploadingImageForId(null); setProductImageFile(null); }} className={btnSecondary}>
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  {/* Existing images */}
                                  {p.images?.length > 0 && (
                                    <div className="flex gap-2 mt-3 flex-wrap">
                                      {p.images.map((img, i) => (
                                        <img key={i} src={img} alt="" className="w-16 h-16 object-cover border border-[#cba358]/30" />
                                      ))}
                                    </div>
                                  )}
                                </td>
                              </tr>
                            )}
                          </>
                        ))}
                        {products.length === 0 && (
                          <tr><td colSpan={7} className="p-8 text-center text-[#8c672b] italic text-sm">No products yet. Add one above.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── HOMEPAGE CUSTOMIZER TAB ──────────────────────────────────── */}
            {activeTab === "images" && (
              <div className="space-y-4">
                <p className="text-[11px] text-[#8c672b] uppercase tracking-wider font-bold mb-2">
                  Click a section to expand and edit its content.
                </p>
                {HOMEPAGE_SECTIONS.map((sec) => {
                  const form = sectionForms[sec.key] || {};
                  const isOpen = activeSectionKey === sec.key;
                  return (
                    <div key={sec.key} className="bg-white border border-[#cba358]/25 shadow-sm overflow-hidden">
                      {/* Accordion Header */}
                      <button
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#fdf5e8]/30 transition-colors"
                        onClick={() => setActiveSectionKey(isOpen ? null : sec.key)}
                      >
                        <div>
                          <span className="font-serif text-[15px] text-[#3d0c11] font-semibold">{sec.label}</span>
                          <span className="ml-2 text-[10px] text-[#8c672b] uppercase tracking-wider font-mono">[{sec.key}]</span>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-[#8c672b]" /> : <ChevronDown className="w-4 h-4 text-[#8c672b]" />}
                      </button>

                      {isOpen && (
                        <div className="p-5 border-t border-[#cba358]/15 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Field label="Headline / Title">
                            <input type="text" className={inputCls} placeholder="Section headline..."
                              value={form.headline || ""}
                              onChange={e => setSectionForms(prev => ({ ...prev, [sec.key]: { ...prev[sec.key], headline: e.target.value } }))}
                            />
                          </Field>
                          <Field label="Button Text">
                            <input type="text" className={inputCls} placeholder="e.g. Shop Now"
                              value={form.button_text || ""}
                              onChange={e => setSectionForms(prev => ({ ...prev, [sec.key]: { ...prev[sec.key], button_text: e.target.value } }))}
                            />
                          </Field>
                          <div className="md:col-span-2">
                            <Field label="Sub-text / Body Copy">
                              <textarea rows={3} className={inputCls + " resize-none"} placeholder="Description text for this section..."
                                value={form.subtext || ""}
                                onChange={e => setSectionForms(prev => ({ ...prev, [sec.key]: { ...prev[sec.key], subtext: e.target.value } }))}
                              />
                            </Field>
                          </div>
                          <Field label="Button Link / URL">
                            <input type="text" className={inputCls} placeholder="/shop"
                              value={form.button_link || ""}
                              onChange={e => setSectionForms(prev => ({ ...prev, [sec.key]: { ...prev[sec.key], button_link: e.target.value } }))}
                            />
                          </Field>
                          {sec.hasImage && (
                            <Field label="Section Image (upload from device)">
                              <input type="file" accept="image/*"
                                onChange={e => e.target.files?.[0] && setSectionForms(prev => ({ ...prev, [sec.key]: { ...prev[sec.key], imageFile: e.target.files![0] } }))}
                                className="w-full text-sm text-[#3d0c11] file:mr-2 file:py-2 file:px-3 file:border file:border-[#cba358]/40 file:bg-[#fdf5e8] file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-[#3d0c11] hover:file:bg-[#cba358]/10"
                              />
                              {form.imageFile && <p className="text-[10px] text-green-600 mt-1">Selected: {form.imageFile.name}</p>}
                            </Field>
                          )}
                          <div className="md:col-span-2">
                            <button
                              onClick={() => handleUpdateSection(sec.key)}
                              disabled={actionLoading}
                              className={btnPrimary + " w-full justify-center"}
                            >
                              <Save className="w-3.5 h-3.5" />
                              {actionLoading ? "Saving..." : `Save "${sec.label}"`}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── FOOTER TAB ────────────────────────────────────────────────── */}
            {activeTab === "footer" && (
              <div className="space-y-6">
                <form onSubmit={handleUpdateFooter} className="bg-white border border-[#cba358]/30 p-6 shadow-sm space-y-6">
                  <h2 className="font-serif text-xl text-[#3d0c11] pb-2 border-b border-[#cba358]/20">
                    Contact & Footer Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Support Phone">
                      <input type="text" className={inputCls} value={footerForm.phone}
                        onChange={e => setFooterForm({...footerForm, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                      />
                    </Field>
                    <Field label="Support Email">
                      <input type="email" className={inputCls} value={footerForm.email}
                        onChange={e => setFooterForm({...footerForm, email: e.target.value})}
                        placeholder="contact@kashmircart.com"
                      />
                    </Field>
                    <div className="md:col-span-2">
                      <Field label="Store Address">
                        <textarea rows={2} className={inputCls + " resize-none"} value={footerForm.address}
                          onChange={e => setFooterForm({...footerForm, address: e.target.value})}
                          placeholder="Palace Road, Srinagar, Jammu & Kashmir"
                        />
                      </Field>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div>
                    <h3 className="font-serif text-lg text-[#3d0c11] mb-4 pb-2 border-b border-[#cba358]/15">
                      Social Media Links
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {SOCIAL_PLATFORMS.map(platform => (
                        <Field key={platform.key} label={`${platform.icon} ${platform.label} URL`}>
                          <input
                            type="url" className={inputCls}
                            placeholder={`https://${platform.key}.com/kashmircart`}
                            value={(footerForm.social_links as any)[platform.key] || ""}
                            onChange={e => setFooterForm({
                              ...footerForm,
                              social_links: { ...footerForm.social_links, [platform.key]: e.target.value }
                            })}
                          />
                        </Field>
                      ))}
                    </div>
                  </div>

                  <button type="submit" disabled={actionLoading} className={btnPrimary + " w-full justify-center"}>
                    <Save className="w-3.5 h-3.5" />
                    {actionLoading ? "Saving..." : "Save Footer & Social Links"}
                  </button>
                </form>
              </div>
            )}

            {/* ── USERS TAB ─────────────────────────────────────────────────── */}
            {activeTab === "users" && (
              <div className="bg-white border border-[#cba358]/25 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-[#cba358]/15 flex justify-between items-center">
                  <h2 className="font-serif text-xl text-[#3d0c11]">User Directory ({users.length})</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#fdf5e8] text-[#8c672b] text-[10px] uppercase tracking-wider font-bold border-b border-[#cba358]/20">
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-left">Role</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Registered</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#cba358]/10">
                      {users.map(u => (
                        <tr key={u.id} className={`hover:bg-[#fdf5e8]/30 ${u.is_blocked ? "opacity-60" : ""}`}>
                          <td className="p-4 font-semibold text-[#3d0c11]">{u.name}</td>
                          <td className="p-4 text-[#6b5a4e]">{u.email}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                              u.role === "admin" || u.role === "super_admin"
                                ? "bg-[#3d0c11]/5 border-[#3d0c11]/30 text-[#3d0c11]"
                                : "bg-[#cba358]/10 border-[#cba358]/30 text-[#8c672b]"
                            }`}>{u.role}</span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                              u.is_blocked
                                ? "bg-red-50 border-red-200 text-red-600"
                                : "bg-green-50 border-green-200 text-green-700"
                            }`}>
                              {u.is_blocked ? "Blocked" : "Active"}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-[#8c672b]">
                            {new Date(u.created_at).toLocaleDateString("en-IN")}
                          </td>
                          <td className="p-4 text-center">
                            {u.role !== "admin" && u.role !== "super_admin" && (
                              <button
                                onClick={() => handleToggleBlock(u.id)}
                                disabled={actionLoading}
                                className={`${u.is_blocked ? btnSecondary : btnDanger} text-[9px]`}
                                title={u.is_blocked ? "Unblock User" : "Block User"}
                              >
                                {u.is_blocked
                                  ? <><UserCheck className="w-3.5 h-3.5" /> Unblock</>
                                  : <><UserX className="w-3.5 h-3.5" /> Block</>
                                }
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {users.length === 0 && (
                        <tr><td colSpan={6} className="p-8 text-center text-[#8c672b] italic text-sm">No users registered yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
