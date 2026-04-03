import { Link, useLocation } from "wouter";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function OrderSuccessPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const orderNumber = searchParams.get("order") || "ORD-XXXX";
  const estimatedTime = searchParams.get("time") || "45 min";

  return (
    <div className="container mx-auto px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
        className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-xl w-full text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-primary"></div>
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 bg-matcha/20 text-matcha rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Thank you for choosing Sakura Sushi. Our master chefs are preparing your omakase experience.
        </p>

        <div className="bg-background rounded-xl p-6 mb-8 border border-border text-left grid gap-4">
          <div className="flex justify-between items-center border-b border-border/50 pb-4">
            <span className="text-muted-foreground">Order Number</span>
            <span className="font-mono font-bold text-foreground text-lg">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Est. Delivery Time</span>
            <span className="font-bold text-primary text-lg">{estimatedTime}</span>
          </div>
        </div>

        <Link href="/">
          <Button size="lg" className="w-full h-14 rounded-none bg-secondary hover:bg-secondary/80 text-foreground font-bold tracking-widest text-base group">
            RETURN HOME <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
