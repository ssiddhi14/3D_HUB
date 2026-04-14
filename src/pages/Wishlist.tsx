import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  return (
    <div className="min-h-screen bg-gradient-dark pt-20 px-4 flex items-center justify-center">
      <div className="text-center">
        <Heart size={64} className="mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Wishlist</h2>
        <p className="text-muted-foreground mb-4">Your wishlist will appear here once products are added.</p>
        <Link to="/shop" className="text-primary hover:underline">Browse Products</Link>
      </div>
    </div>
  );
};

export default Wishlist;
