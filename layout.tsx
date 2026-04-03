import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useGetCart, getGetCartQueryKey } from "@workspace/api-client-react";
import { useSession } from "@/hooks/use-session";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { sessionId } = useSession();

  const { data: cart } = useGetCart(
    { sessionId },
    { query: { enabled: !!sessionId, queryKey: getGetCartQueryKey({ sessionId }) } }
  );

  const cartItemCount = cart?.itemCount || 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground dark selection:bg-primary/30">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-border py-4 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group z-50">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-xl group-hover:scale-110 transition-transform">
              S
            </div>
            <span className="font-display font-bold text-xl tracking-widest text-foreground group-hover:text-primary transition-colors">
              SAKURA SUSHI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                location === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              HOME
            </Link>
            <Link
              href="/menu"
              className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                location === "/menu" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              MENU
            </Link>
            
            <Link href="/cart" className="relative group flex items-center justify-center">
              <div className="p-2 rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors">
                <ShoppingBag className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              </div>
              {cartItemCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-lg"
                >
                  {cartItemCount}
                </motion.div>
              )}
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden z-50">
            <Link href="/cart" className="relative group">
              <ShoppingBag className="w-6 h-6 text-foreground" />
              {cartItemCount > 0 && (
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {cartItemCount}
                </div>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground p-1"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border py-4 px-6 flex flex-col gap-4 shadow-xl md:hidden"
          >
            <Link
              href="/"
              className={`text-lg font-medium ${location === "/" ? "text-primary" : "text-foreground"}`}
            >
              HOME
            </Link>
            <Link
              href="/menu"
              className={`text-lg font-medium ${location === "/menu" ? "text-primary" : "text-foreground"}`}
            >
              MENU
            </Link>
          </motion.div>
        )}
      </header>

      <main className="flex-1 flex flex-col pt-24 md:pt-28">
        {children}
      </main>

      <footer className="bg-card py-12 mt-20 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
              S
            </div>
            <span className="font-display font-bold text-lg tracking-wider text-foreground">
              SAKURA SUSHI
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sakura Sushi. Crafted with intention.
          </p>
        </div>
      </footer>
    </div>
  );
}
