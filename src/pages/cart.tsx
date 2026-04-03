import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "../context/cart-context";

const P = "hsl(10,85%,65%)";
const CARD_BG = "hsl(222,47%,9%)";
const BORDER = "hsl(222,30%,20%)";
const MUTED = "hsl(40,20%,70%)";
const FG = "hsl(40,33%,95%)";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, itemCount, subtotal, deliveryFee, total } = useCart();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      const orderNumber = `SKR-${Date.now().toString().slice(-8)}`;
      clearCart();
      setLocation(`/order-success?order=${orderNumber}&time=25-35 min`);
    }, 1200);
  };

  const isEmpty = items.length === 0;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 pb-24 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display font-bold text-4xl" style={{ color: FG }}>Your Order</h1>
        {!isEmpty && (
          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: MUTED }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(0,70%,60%)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = MUTED; }}
          >
            <Trash2 className="w-4 h-4" /> Clear Cart
          </button>
        )}
      </div>

      {isEmpty ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-12 flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}` }}
        >
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "hsl(20,20%,18%)" }}>
            <ShoppingBag className="w-10 h-10" style={{ color: MUTED }} />
          </div>
          <h2 className="font-display font-bold text-2xl mb-3" style={{ color: FG }}>Your cart is empty</h2>
          <p className="text-lg mb-8 max-w-md" style={{ color: MUTED }}>
            Looks like you haven't added any premium sushi to your order yet.
          </p>
          <Link href="/menu" style={{ textDecoration: "none" }}>
            <button
              className="px-8 py-4 font-bold tracking-widest text-base"
              style={{ backgroundColor: P, color: FG }}
            >
              BROWSE MENU
            </button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center group"
                  style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}` }}
                >
                  <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden" style={{ backgroundColor: "hsl(20,20%,18%)" }}>
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex justify-between items-start gap-4 mb-1">
                      <Link href={`/product/${item.product.id}`} className="font-display font-bold text-lg no-underline hover:underline" style={{ color: FG }}>
                        {item.product.name}
                      </Link>
                      <span className="font-mono font-bold shrink-0" style={{ color: P }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <span className="text-sm mb-4" style={{ color: MUTED }}>${item.product.price.toFixed(2)} each</span>
                    {item.notes && (
                      <p className="text-xs p-2 rounded mb-4 italic" style={{ backgroundColor: "hsl(20,20%,18%)", color: MUTED }}>
                        Note: {item.notes}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center h-10 w-32 rounded-md" style={{ border: `1px solid ${BORDER}`, backgroundColor: "hsl(222,47%,13%)" }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 h-full flex items-center justify-center"
                          style={{ color: MUTED }}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <div className="flex-1 text-center font-mono font-semibold text-sm" style={{ color: FG }}>{item.quantity}</div>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 h-full flex items-center justify-center"
                          style={{ color: MUTED }}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 transition-colors"
                        style={{ color: MUTED }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(0,70%,60%)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = MUTED; }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-32">
            <div className="rounded-xl p-6 shadow-xl" style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}` }}>
              <h3 className="font-display font-bold text-xl mb-6 pb-4" style={{ color: FG, borderBottom: `1px solid ${BORDER}` }}>
                Order Summary
              </h3>

              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between" style={{ color: MUTED }}>
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-mono" style={{ color: FG }}>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" style={{ color: MUTED }}>
                  <span>Delivery Fee</span>
                  <span className="font-mono" style={{ color: FG }}>
                    {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs italic text-right" style={{ color: P }}>
                    Free delivery on orders over $50
                  </p>
                )}
              </div>

              <div className="pt-4 mb-6" style={{ borderTop: `1px solid ${BORDER}` }}>
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg" style={{ color: FG }}>Total</span>
                  <span className="font-mono font-bold text-3xl" style={{ color: P }}>${total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-right mt-2" style={{ color: MUTED }}>Est. delivery: 25-35 min</p>
              </div>

              <div className="mb-6 space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase" style={{ color: MUTED }}>Promo Code</label>
                <div className="flex gap-2">
                  <input
                    placeholder="Enter code"
                    className="flex-1 px-3 py-3 text-sm rounded-lg outline-none"
                    style={{ backgroundColor: "hsl(222,47%,13%)", border: `1px solid ${BORDER}`, color: FG }}
                  />
                  <button
                    className="px-4 py-3 text-sm font-medium rounded-lg"
                    style={{ backgroundColor: "hsl(20,20%,22%)", color: FG }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              <button
                className="w-full h-14 flex items-center justify-center gap-2 font-bold tracking-widest text-base transition-opacity"
                onClick={handleCheckout}
                disabled={loading}
                style={{ backgroundColor: P, color: FG }}
                onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (<>PLACE ORDER <ArrowRight className="w-5 h-5" /></>)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
