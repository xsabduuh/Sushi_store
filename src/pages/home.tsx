import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "../components/product-card";

const P = "hsl(10,85%,65%)";
const CARD_BG = "hsl(222,47%,9%)";
const BORDER = "hsl(222,30%,20%)";
const MUTED = "hsl(40,20%,70%)";

const featured = products.filter((p) => p.isFeatured);

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative w-full flex items-center overflow-hidden" style={{ minHeight: "85vh", borderBottom: `1px solid ${BORDER}` }}>
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1800&q=90"
            alt="Sushi counter"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, hsl(222,47%,11%) 40%, rgba(15,20,40,0.6) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(222,47%,11%) 0%, transparent 60%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
              style={{ backgroundColor: "rgba(250,100,80,0.12)", border: "1px solid rgba(250,100,80,0.25)", color: P }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: P }} />
              Premium Omakase
            </div>

            <h1 className="font-display font-bold leading-tight mb-6" style={{ fontSize: "clamp(3rem,8vw,6rem)", color: "hsl(40,33%,95%)" }}>
              Artistry in
              <br />
              <span style={{ color: P, fontStyle: "italic" }}>Every Bite.</span>
            </h1>

            <p className="text-lg md:text-xl mb-10 max-w-lg leading-relaxed" style={{ color: MUTED }}>
              Experience Tokyo's finest omakase tradition delivered to your door. Freshly sourced ingredients, masterful technique, uncompromising quality.
            </p>

            <Link href="/menu" style={{ textDecoration: "none" }}>
              <button
                className="flex items-center gap-2 px-8 py-4 font-bold tracking-wide text-base transition-opacity"
                style={{ backgroundColor: P, color: "hsl(40,33%,95%)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                EXPLORE MENU <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12" style={{ backgroundColor: CARD_BG, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl">Collections</h2>
            <Link href="/menu" className="text-sm font-medium flex items-center gap-1 no-underline" style={{ color: P }}>
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex overflow-x-auto pb-4 gap-4 md:gap-6 hide-scrollbar">
            {categories.map((cat, i) => (
              <Link key={cat.id} href={`/menu?category=${cat.id}`} style={{ textDecoration: "none", flexShrink: 0 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all duration-200"
                  style={{ width: "160px", height: "96px", border: `1px solid ${BORDER}`, backgroundColor: "hsl(222,47%,13%)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(250,100,80,0.4)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(250,100,80,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = BORDER;
                    (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(222,47%,13%)";
                  }}
                >
                  <span className="font-display font-semibold text-lg" style={{ color: "hsl(40,33%,95%)" }}>{cat.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: P }}>Chef's Selection</p>
              <h3 className="font-display font-bold" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>Featured Signatures</h3>
            </div>
            <p className="max-w-md md:text-right" style={{ color: MUTED }}>
              Our master chef's daily recommendations, highlighting the season's finest catches.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/menu" style={{ textDecoration: "none" }}>
              <button
                className="px-10 py-4 font-bold tracking-widest text-sm transition-all"
                style={{ border: `1px solid ${P}`, color: P, backgroundColor: "transparent" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = P; (e.currentTarget as HTMLElement).style.color = "hsl(40,33%,95%)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = P; }}
              >
                VIEW FULL MENU
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
