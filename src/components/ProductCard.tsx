import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { motion } from "framer-motion";
import type { Product } from "@/hooks/useProducts";

interface Props {
  product: Product;
  onWishlist?: () => void;
}

const ProductCard = ({ product, onWishlist }: Props) => {
  const { addToCart } = useCart();
  const image = product.images?.[0] || "/placeholder.svg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl overflow-hidden group hover-glow"
    >
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
        <p className="text-primary font-bold mt-1">₹{product.price}</p>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image })}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <ShoppingCart size={16} /> Add to Cart
          </button>
          <button
            onClick={onWishlist}
            className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            <Heart size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
