import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/cart-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "hsl(222,47%,11%)", color: "hsl(40,33%,95%)" }}>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? "rgba(15,20,40,0.97)" : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: isScrolled ? "1px solid hsl(222,30%,20%)" : "1px solid transparent",
          padding: isScrolled ? "16px 0" : "24px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group no-underline">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-110"
              style={{ backgroundColor: "hsl(10,85%,65%)", color: "hsl(40,33%,95%)" }}
            >
              S
            </div>
            <span className="font-display font-bold text-xl tracking-widest" style={{ color: "hsl(40,33%,95%)" }}>
              SAKURA SUSHI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[{ href: "/", label: "HOME" }, { href: "/menu", label: "MENU" }].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium tracking-wide transition-colors no-underline"
                style={{ color: location === href ? "hsl(10,85%,65%)" : "hsl(40,20%,70%)" }}
              >
                {label}
              </Link>
            ))}
            <Link href="/cart" className="relative group no-underline">
              <div
                className="p-2 rounded-full transition-colors"
                style={{ backgroundColor: "hsl(20,20%,20%)" }}
              >
                <ShoppingBag className="w-5 h-5" style={{ color: "hsl(40,33%,95%)" }} />
              </div>
              {itemCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: "hsl(10,85%,65%)", color: "hsl(40,33%,95%)" }}
                >
                  {itemCount}
                </motion.div>
              )}
            </Link>
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-4 md:hidden">
            <Link href="/cart" className="relative no-underline">
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <div
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ backgroundColor: "hsl(10,85%,65%)", color: "hsl(40,33%,95%)" }}
                >
                  {itemCount}
                </div>
              )}
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 py-4 px-6 flex flex-col gap-4 shadow-xl md:hidden"
            style={{ backgroundColor: "hsl(222,47%,9%)", borderBottom: "1px solid hsl(222,30%,20%)" }}
          >
            <Link href="/" className="text-lg font-medium no-underline" style={{ color: location === "/" ? "hsl(10,85%,65%)" : "hsl(40,33%,95%)" }}>HOME</Link>
            <Link href="/menu" className="text-lg font-medium no-underline" style={{ color: location === "/menu" ? "hsl(10,85%,65%)" : "hsl(40,33%,95%)" }}>MENU</Link>
            <Link href="/cart" className="text-lg font-medium no-underline" style={{ color: location === "/cart" ? "hsl(10,85%,65%)" : "hsl(40,33%,95%)" }}>CART ({itemCount})</Link>
          </motion.div>
        )}
      </header>

      <main className="flex-1 flex flex-col" style={{ paddingTop: "88px" }}>
        {children}
      </main>

      <footer className="py-12 mt-20" style={{ backgroundColor: "hsl(222,47%,9%)", borderTop: "1px solid hsl(222,30%,20%)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: "hsl(10,85%,65%)" }}>S</div>
            <span className="font-display font-bold text-lg tracking-wider">SAKURA SUSHI</span>
          </div>
          <p className="text-sm" style={{ color: "hsl(40,20%,70%)" }}>
            © {new Date().getFullYear()} Sakura Sushi. Crafted with intention.
          </p>
        </div>
      </footer>
    </div>
  );
}
