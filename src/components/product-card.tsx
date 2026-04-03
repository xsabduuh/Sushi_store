import { motion } from "framer-motion";
import { Link } from "wouter";
import { Leaf, Flame, Plus } from "lucide-react";
import { Product } from "../data/products";
import { useCart } from "../context/cart-context";

const P = "hsl(10,85%,65%)";
const CARD_BG = "hsl(222,47%,9%)";
const BORDER = "hsl(222,30%,20%)";

interface Props {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: Props) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Link href={`/product/${product.id}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
        <div
          className="rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 group"
          style={{
            backgroundColor: CARD_BG,
            border: `1px solid ${BORDER}`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(250,100,80,0.4)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px -10px rgba(250,100,80,0.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = BORDER;
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          {/* Image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "1/1", backgroundColor: "hsl(20,20%,15%)" }}>
            {product.isNew && (
              <div className="absolute top-3 left-3 z-10 text-xs font-bold px-2 py-1 rounded tracking-wider" style={{ backgroundColor: P, color: "hsl(40,33%,95%)" }}>
                NEW
              </div>
            )}
            {product.isPopular && !product.isNew && (
              <div className="absolute top-3 left-3 z-10 text-xs font-bold px-2 py-1 rounded tracking-wider" style={{ backgroundColor: "hsl(10,85%,65%)", color: "hsl(40,33%,95%)" }}>
                POPULAR
              </div>
            )}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {product.isVegetarian && (
                <div className="p-1.5 rounded-full shadow-lg" style={{ backgroundColor: "hsl(120,30%,30%)", color: "hsl(120,60%,80%)" }} title="Vegetarian">
                  <Leaf className="w-4 h-4" />
                </div>
              )}
              {product.spiceLevel > 0 && (
                <div className="p-1.5 rounded-full shadow-lg flex" style={{ backgroundColor: "hsl(0,70%,30%)", color: "hsl(0,90%,75%)" }}>
                  {Array.from({ length: product.spiceLevel }).map((_, i) => (
                    <Flame key={i} className="w-3 h-4 -mx-[2px]" />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="p-5 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-1 gap-4">
              <h3 className="font-display font-semibold text-lg" style={{ color: "hsl(40,33%,95%)" }}>
                {product.name}
              </h3>
              <span className="font-mono font-medium shrink-0" style={{ color: P }}>
                ${product.price.toFixed(2)}
              </span>
            </div>
            <p className="text-xs mb-3 tracking-wider uppercase" style={{ color: "hsl(40,20%,60%)" }}>
              {product.categoryName}
            </p>
            <p className="text-sm mb-4 flex-1 line-clamp-2" style={{ color: "hsl(40,20%,70%)" }}>
              {product.description}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
              <span className="text-xs" style={{ color: "hsl(40,20%,60%)" }}>
                {product.piecesCount ? `${product.piecesCount} pcs` : ""} {product.calories ? `· ${product.calories} kcal` : ""}
              </span>
              <button
                onClick={handleAdd}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: "hsl(20,20%,25%)", color: "hsl(40,33%,95%)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = P; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(20,20%,25%)"; }}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
