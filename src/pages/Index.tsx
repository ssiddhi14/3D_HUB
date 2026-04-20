import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroScene from "@/components/HeroScene";
import ProductCard from "@/components/ProductCard";
import { useProducts, useCategories } from "@/hooks/useProducts";
import logo from "@/assets/logo.png";

const Index = () => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const displayProducts = featured.length > 0 ? featured : products.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        <div className="relative z-10 text-center px-4">
          <motion.img
            src={logo}
            alt="3D HUB logo"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mb-6 h-24 md:h-32 w-auto object-contain drop-shadow-[0_0_30px_hsl(var(--primary)/0.5)]"
          />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Welcome to <span className="text-gradient">3D HUB</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto"
          >
            Discover premium 3D products, collectibles, and custom creations
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity animate-pulse-glow"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link
              to="/customize"
              className="inline-flex items-center gap-2 glass px-8 py-3 rounded-full font-semibold text-foreground hover:border-primary transition-colors"
            >
              <Sparkles size={18} /> Customize
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Browse <span className="text-gradient">Categories</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.id}`}
                  className="glass-card rounded-xl p-6 text-center hover-glow group"
                >
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {displayProducts.length > 0 && (
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Featured <span className="text-gradient">Products</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                View All Products <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto flex flex-col items-center gap-3 text-muted-foreground text-sm">
          <img src={logo} alt="3D HUB logo" className="h-10 w-auto object-contain opacity-90" />
          <p>© 2026 3D HUB. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
