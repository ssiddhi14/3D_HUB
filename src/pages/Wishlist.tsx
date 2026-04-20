import { motion } from "framer-motion";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-dark pt-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <Heart size={64} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Wishlist</h2>
          <p className="text-muted-foreground mb-4">Your wishlist is empty.</p>
          <Link to="/shop" className="text-primary hover:underline">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark pt-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            Your <span className="text-gradient">Wishlist</span>
          </motion.h1>
          <button
            onClick={clearWishlist}
            className="text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl overflow-hidden hover-glow"
            >
              <div className="aspect-square overflow-hidden bg-secondary">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                <p className="text-primary font-bold mt-1">₹{item.price}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-2 text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    aria-label="Remove from wishlist"
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
