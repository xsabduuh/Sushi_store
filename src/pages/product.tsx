import { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingBag, Leaf, Flame } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/cart-context";

const P = "hsl(10,85%,65%)";
const CARD_BG = "hsl(222,47%,9%)";
const BORDER = "hsl(222,30%,20%)";
const MUTED = "hsl(40,20%,70%)";
const FG = "hsl(40,33%,95%)";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const product = products.find((p) => p.id === parseInt(params?.id ?? "0"));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="font-display font-bold text-2xl mb-4">Product not found</h2>
        <Link href="/menu" style={{ color: P }}>Return to Menu</Link>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, quantity, notes);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    setQuantity(1);
    setNotes("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 w-full">
      <Link href="/menu" className="inline-flex items-center gap-2 text-sm mb-8 no-underline transition-colors" style={{ color: MUTED }}>
        <ArrowLeft className="w-4 h-4" /> Back to Menu
      </Link>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative rounded-2xl overflow-hidden"
          style={{ aspectRatio: "1/1", backgroundColor: "hsl(20,20%,15%)", border: `1px solid ${BORDER}` }}
        >
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="text-xs font-bold px-3 py-1.5 rounded tracking-wider uppercase" style={{ backgroundColor: P, color: FG }}>New</span>
            )}
            {product.isPopular && !product.isNew && (
              <span className="text-xs font-bold px-3 py-1.5 rounded tracking-wider uppercase" style={{ backgroundColor: P, color: FG }}>Popular</span>
            )}
          </div>
        </motion.div>

        {/* Details */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: P }}>
              {product.categoryName}
            </span>
            {product.isVegetarian && (
              <div className="p-1 rounded" style={{ backgroundColor: "rgba(80,150,80,0.2)", color: "hsl(120,60%,70%)" }}>
                <Leaf className="w-4 h-4" />
              </div>
            )}
            {product.spiceLevel > 0 && (
              <div className="p-1 rounded flex" style={{ backgroundColor: "rgba(200,50,50,0.2)", color: "hsl(0,90%,70%)" }}>
                {Array.from({ length: product.spiceLevel }).map((_, i) => <Flame key={i} className="w-3 h-4" />)}
              </div>
            )}
          </div>

          <h1 className="font-display font-bold mb-2" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: FG }}>
            {product.name}
          </h1>

          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-mono font-bold text-3xl" style={{ color: P }}>${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="font-mono text-lg line-through" style={{ color: MUTED }}>${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="text-lg leading-relaxed mb-8" style={{ color: MUTED }}>{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-8 py-6" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
            {product.piecesCount && (
              <div>
                <span className="text-sm block mb-1" style={{ color: MUTED }}>Serving Size</span>
                <span className="font-medium" style={{ color: FG }}>{product.piecesCount} Pieces</span>
              </div>
            )}
            {product.calories && (
              <div>
                <span className="text-sm block mb-1" style={{ color: MUTED }}>Calories</span>
                <span className="font-medium" style={{ color: FG }}>{product.calories} kcal</span>
              </div>
            )}
            {product.ingredients.length > 0 && (
              <div className="col-span-2 mt-2">
                <span className="text-sm block mb-2" style={{ color: MUTED }}>Key Ingredients</span>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span key={ing} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "hsl(20,20%,20%)", color: FG }}>
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium block mb-2" style={{ color: FG }}>Special Instructions</label>
              <textarea
                placeholder="Any dietary preferences or allergies?"
                className="w-full px-4 py-3 rounded-lg text-sm resize-none outline-none"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}`, color: FG }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center h-14 sm:w-1/3" style={{ border: `1px solid ${BORDER}`, backgroundColor: CARD_BG }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 h-full flex items-center justify-center transition-colors"
                  style={{ color: MUTED }}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center font-mono font-bold text-lg" style={{ color: FG }}>{quantity}</div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 h-full flex items-center justify-center transition-colors"
                  style={{ color: MUTED }}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                className="flex-1 h-14 flex items-center justify-center gap-3 font-bold tracking-widest text-base transition-opacity"
                onClick={handleAdd}
                style={{ backgroundColor: added ? "hsl(120,30%,35%)" : P, color: FG }}
              >
                <ShoppingBag className="w-5 h-5" />
                {added ? "ADDED!" : `ADD TO ORDER — $${(product.price * quantity).toFixed(2)}`}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
