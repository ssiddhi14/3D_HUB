import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckout = async () => {
    if (!user) {
      toast({ title: "Please login to checkout", variant: "destructive" });
      navigate("/auth");
      return;
    }

    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      items: items as any,
      total,
      status: "pending",
    });

    if (error) {
      toast({ title: "Error creating order", variant: "destructive" });
    } else {
      clearCart();
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
    <div className="min-h-screen bg-gradient-dark pt-20 px-4">
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

        <div className="glass-card rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-foreground">Total</span>
            <span className="text-2xl font-bold text-primary">₹{total}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-semibold hover:opacity-90 transition-opacity"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
