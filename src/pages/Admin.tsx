import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit2, Package, FolderOpen, ShoppingBag, Upload, Loader2 } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

const ADMIN_EMAIL = "pragya@gmail.com";

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const { products } = useProducts();
  const { categories } = useCategories();
  const [tab, setTab] = useState<"products" | "categories" | "orders">("products");
  const [orders, setOrders] = useState<any[]>([]);

  // Product form
  const [pName, setPName] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pCat, setPCat] = useState("");
  const [pImages, setPImages] = useState<File[]>([]);
  const [pExistingImages, setPExistingImages] = useState<string[]>([]);
  const [pFeatured, setPFeatured] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Category form
  const [cName, setCName] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (data) setOrders(data);
    };
    fetchOrders();
    const ch = supabase.channel("orders-admin").on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => fetchOrders()).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  if (authLoading) return <div className="min-h-screen bg-gradient-dark flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!user || user.email !== ADMIN_EMAIL) return <Navigate to="/auth" replace />;

  const resetProductForm = () => {
    setPName(""); setPPrice(""); setPDesc(""); setPCat(""); setPImages([]); setPExistingImages([]); setPFeatured(false); setEditingProduct(null);
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
      urls.push(urlData.publicUrl);
    }
    return urls;
  };

  const handleSaveProduct = async () => {
    setUploading(true);
    try {
      let imageUrls = [...pExistingImages];
      if (pImages.length > 0) {
        const newUrls = await uploadImages(pImages);
        imageUrls = [...imageUrls, ...newUrls];
      }

      const payload = {
        name: pName,
        price: parseFloat(pPrice),
        description: pDesc || null,
        category_id: pCat || null,
        images: imageUrls,
        featured: pFeatured,
      };

      if (editingProduct) {
        const { error } = await supabase.from("products").update(payload).eq("id", editingProduct);
        if (error) toast({ title: "Error updating product", variant: "destructive" });
        else { toast({ title: "Product updated!" }); resetProductForm(); }
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) toast({ title: "Error adding product", variant: "destructive" });
        else { toast({ title: "Product added!" }); resetProductForm(); }
      }
    } catch {
      toast({ title: "Error uploading images", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast({ title: "Error", variant: "destructive" });
    else toast({ title: "Product deleted" });
  };

  const handleEditProduct = (p: any) => {
    setPName(p.name); setPPrice(String(p.price)); setPDesc(p.description || ""); setPCat(p.category_id || ""); setPImages([]); setPExistingImages(p.images || []); setPFeatured(p.featured); setEditingProduct(p.id);
  };

  const handleAddCategory = async () => {
    if (!cName.trim()) return;
    const { error } = await supabase.from("categories").insert({ name: cName });
    if (error) toast({ title: "Error", variant: "destructive" });
    else { toast({ title: "Category added!" }); setCName(""); }
  };

  const handleDeleteCategory = async (id: string) => {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) toast({ title: "Error", variant: "destructive" });
    else toast({ title: "Category deleted" });
  };

  const tabs = [
    { key: "products" as const, label: "Products", icon: Package },
    { key: "categories" as const, label: "Categories", icon: FolderOpen },
    { key: "orders" as const, label: "Orders", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark pt-20 px-4 pb-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Admin <span className="text-gradient">Dashboard</span>
        </h1>

        <div className="flex gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t.key ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {tab === "products" && (
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-lg text-foreground">{editingProduct ? "Edit Product" : "Add Product"}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input placeholder="Name" value={pName} onChange={(e) => setPName(e.target.value)} className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                <input placeholder="Price" type="number" value={pPrice} onChange={(e) => setPPrice(e.target.value)} className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-sm text-muted-foreground">Upload Images (jpg, png, webp)</label>
                  <input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={(e) => setPImages(Array.from(e.target.files || []))} className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground file:text-sm file:font-medium file:cursor-pointer w-full" />
                  {pImages.length > 0 && <p className="text-xs text-muted-foreground">{pImages.length} new file(s) selected</p>}
                  {pExistingImages.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {pExistingImages.map((url, i) => (
                        <div key={i} className="relative group">
                          <img src={url} alt="" className="w-16 h-16 rounded-lg object-cover bg-secondary" />
                          <button onClick={() => setPExistingImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <select value={pCat} onChange={(e) => setPCat(e.target.value)} className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">No Category</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <textarea placeholder="Description" value={pDesc} onChange={(e) => setPDesc(e.target.value)} rows={2} className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" checked={pFeatured} onChange={(e) => setPFeatured(e.target.checked)} className="accent-primary" /> Featured
              </label>
              <div className="flex gap-2">
                <button onClick={handleSaveProduct} className="flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-6 py-2 font-medium hover:opacity-90">
                  <Plus size={16} /> {editingProduct ? "Update" : "Add Product"}
                </button>
                {editingProduct && (
                  <button onClick={resetProductForm} className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground">Cancel</button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
                  <img src={p.images?.[0] || "/placeholder.svg"} alt={p.name} className="w-16 h-16 rounded-lg object-cover bg-secondary" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{p.name}</h3>
                    <p className="text-primary text-sm">₹{p.price}</p>
                  </div>
                  <button onClick={() => handleEditProduct(p)} className="p-2 text-muted-foreground hover:text-foreground"><Edit2 size={16} /></button>
                  <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-destructive hover:opacity-80"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "categories" && (
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <div className="flex gap-4">
                <input placeholder="Category name" value={cName} onChange={(e) => setCName(e.target.value)} className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                <button onClick={handleAddCategory} className="flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-6 py-2 font-medium hover:opacity-90">
                  <Plus size={16} /> Add
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {categories.map((c) => (
                <div key={c.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
                  <span className="font-semibold text-foreground">{c.name}</span>
                  <button onClick={() => handleDeleteCategory(c.id)} className="p-2 text-destructive hover:opacity-80"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="space-y-3">
            {orders.length === 0 && <p className="text-muted-foreground text-center py-12">No orders yet</p>}
            {orders.map((o) => (
              <div key={o.id} className="glass-card rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-muted-foreground">Order #{o.id.slice(0, 8)}</span>
                  <span className="text-sm text-primary font-medium">{o.status}</span>
                </div>
                <p className="text-foreground font-semibold">Total: ₹{o.total}</p>
                <p className="text-sm text-muted-foreground mt-1">User: {o.user_id?.slice(0, 8)}...</p>
                <div className="mt-2 text-sm text-muted-foreground">
                  {Array.isArray(o.items) && o.items.map((item: any, i: number) => (
                    <div key={i}>{item.name} × {item.quantity}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
