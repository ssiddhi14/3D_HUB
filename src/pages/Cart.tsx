import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, BadgePercent } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const DELIVERY_CHARGE = 50;
const COUPONS: Record<string, { type: "percent" | "flat"; value: number; label: string }> = {
  SAVE10: { type: "percent", value: 10, label: "10% off" },
  SAVE20: { type: "percent", value: 20, label: "20% off" },
  FLAT100: { type: "flat", value: 100, label: "₹100 off" },
};

const CHECKOUT_FORM_KEY = "3dhub-checkout-form";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");

  // Load saved form + autofill email
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CHECKOUT_FORM_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setName(parsed.name || "");
        setAddress(parsed.address || "");
        setEmail(parsed.email || "");
      }
    } catch {}
  }, []);

  // Autofill email from logged-in user (priority) or stored auth user
  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
      return;
    }
    try {
      const storedUser = localStorage.getItem("3dhub-user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed?.email) setEmail(parsed.email);
      }
    } catch {}
  }, [user]);

  // Persist form
  useEffect(() => {
    localStorage.setItem(
      CHECKOUT_FORM_KEY,
      JSON.stringify({ name, address, email })
    );
  }, [name, address, email]);

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const c = COUPONS[appliedCoupon];
    if (!c) return 0;
    if (c.type === "percent") return Math.round((total * c.value) / 100);
    return Math.min(c.value, total);
  }, [appliedCoupon, total]);

  const deliveryCharge = items.length > 0 ? DELIVERY_CHARGE : 0;
  const finalTotal = Math.max(0, total - discount + deliveryCharge);

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code");
      setAppliedCoupon(null);
      return;
    }
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError("");
      toast({ title: `Coupon applied: ${COUPONS[code].label}` });
    } else {
      setAppliedCoupon(null);
      setCouponError("Invalid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCoupon("");
    setCouponError("");
  };

  const handleCheckout = async () => {
    if (!user) {
      toast({ title: "Please login to checkout", variant: "destructive" });
      navigate("/auth");
      return;
    }
    if (!name.trim() || !address.trim() || !email.trim()) {
      toast({ title: "Please fill in name, address and email", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      items: { products: items, name, address, email, coupon: appliedCoupon, discount, delivery: deliveryCharge } as any,
      total: finalTotal,
      status: "pending",
    });

    if (error) {
      toast({ title: "Error creating order", variant: "destructive" });
    } else {
      clearCart();
      handleRemoveCoupon();
      toast({ title: "Order placed successfully!" });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-dark pt-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Cart is empty</h2>
          <Link to="/shop" className="text-primary hover:underline">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark pt-20 px-4 pb-12">
      <div className="container mx-auto max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          Your <span className="text-gradient">Cart</span>
        </motion.h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="glass-card rounded-xl p-4 flex items-center gap-4"
            >
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-secondary" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                <p className="text-primary font-bold">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded border border-border text-muted-foreground hover:text-foreground">
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-foreground">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded border border-border text-muted-foreground hover:text-foreground">
                  <Plus size={14} />
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-destructive hover:opacity-80">
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Shipping Details */}
        <div className="glass-card rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Shipping Details</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter delivery address"
                rows={2}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Email (auto-filled)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Coupon */}
        <div className="glass-card rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BadgePercent size={18} className="text-primary" /> Coupon Code
          </h2>
          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-secondary border border-primary/40 rounded-lg px-3 py-2">
              <span className="text-foreground text-sm">
                <span className="text-primary font-semibold">{appliedCoupon}</span> applied — {COUPONS[appliedCoupon].label}
              </span>
              <button
                onClick={handleRemoveCoupon}
                className="text-sm text-muted-foreground hover:text-destructive"
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    setCouponError("");
                  }}
                  placeholder="Enter coupon code"
                  className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="text-destructive text-xs mt-2">{couponError}</p>
              )}
            </>
          )}
        </div>

        {/* Summary */}
        <div className="glass-card rounded-xl p-6">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-primary">
                <span>Discount ({appliedCoupon})</span>
                <span>- ₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Delivery Charges</span>
              <span>₹{deliveryCharge}</span>
            </div>
            <div className="border-t border-border my-2" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-foreground">Total Amount to be Paid</span>
              <span className="text-2xl font-bold text-primary">₹{finalTotal}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-semibold hover:opacity-90 transition-opacity"
          >
            Place Order — ₹{finalTotal}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
