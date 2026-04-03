import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

const P = "hsl(10,85%,65%)";
const CARD_BG = "hsl(222,47%,9%)";
const BORDER = "hsl(222,30%,20%)";
const MUTED = "hsl(40,20%,70%)";
const FG = "hsl(40,33%,95%)";

export default function OrderSuccessPage() {
  const params = new URLSearchParams(window.location.search);
  const orderNumber = params.get("order") || "SKR-XXXXXXXX";
  const estimatedTime = params.get("time") || "25-35 min";

  return (
    <div className="max-w-xl mx-auto px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="rounded-2xl p-8 md:p-12 w-full text-center relative overflow-hidden"
        style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}` }}
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: P }} />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "rgba(80,150,80,0.2)", color: "hsl(120,50%,60%)" }}
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>

        <h1 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: FG }}>
          Order Confirmed!
        </h1>
        <p className="text-lg mb-8" style={{ color: MUTED }}>
          Thank you for choosing Sakura Sushi. Our master chefs are preparing your omakase experience.
        </p>

        <div className="rounded-xl p-6 mb-8 text-left grid gap-4" style={{ backgroundColor: "hsl(222,47%,13%)", border: `1px solid ${BORDER}` }}>
          <div className="flex justify-between items-center pb-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <span style={{ color: MUTED }}>Order Number</span>
            <span className="font-mono font-bold text-lg" style={{ color: FG }}>{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span style={{ color: MUTED }}>Est. Delivery Time</span>
            <span className="font-bold text-lg" style={{ color: P }}>{estimatedTime}</span>
          </div>
        </div>

        <Link href="/" style={{ textDecoration: "none" }}>
          <button
            className="w-full h-14 flex items-center justify-center gap-2 font-bold tracking-widest text-base transition-opacity"
            style={{ backgroundColor: "hsl(20,20%,22%)", color: FG }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            RETURN HOME <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
