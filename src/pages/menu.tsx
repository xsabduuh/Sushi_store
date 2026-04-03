import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Leaf, Flame, X } from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "../components/product-card";

const P = "hsl(10,85%,65%)";
const CARD_BG = "hsl(222,47%,9%)";
const BORDER = "hsl(222,30%,20%)";
const MUTED = "hsl(40,20%,70%)";
const FG = "hsl(40,33%,95%)";

type SortKey = "popular" | "price_asc" | "price_desc" | "name";
type DietFilter = "all" | "veg" | "spicy";

export default function Menu() {
  const searchParams = new URLSearchParams(window.location.search);
  const initCat = searchParams.get("category") ? parseInt(searchParams.get("category")!) : undefined;

  const [activeCategory, setActiveCategory] = useState<number | undefined>(initCat);
  const [sortBy, setSortBy] = useState<SortKey>("popular");
  const [dietFilter, setDietFilter] = useState<DietFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory) list = list.filter((p) => p.categoryId === activeCategory);
    if (dietFilter === "veg") list = list.filter((p) => p.isVegetarian);
    if (dietFilter === "spicy") list = list.filter((p) => p.spiceLevel > 0);
    if (search.trim()) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => b.reviewCount - a.reviewCount);
    return list;
  }, [activeCategory, dietFilter, sortBy, search]);

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Header */}
      <div className="py-16" style={{ backgroundColor: CARD_BG, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2.5rem,6vw,4rem)", color: FG }}>
              Our Menu
            </h1>
            <p className="text-lg" style={{ color: MUTED }}>
              Explore our collection of meticulously crafted sushi, sashimi, and warm dishes.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0 space-y-10">
            {/* Search */}
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-lg text-sm outline-none"
              style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}`, color: FG }}
            />

            {/* Categories */}
            <div>
              <h3 className="font-display font-bold text-lg mb-4 pb-2" style={{ color: FG, borderBottom: `1px solid ${BORDER}` }}>
                Categories
              </h3>
              <div className="flex flex-col gap-1">
                {[{ id: undefined, name: "All Items" }, ...categories].map((cat) => (
                  <button
                    key={cat.id ?? "all"}
                    onClick={() => setActiveCategory(cat.id)}
                    className="text-left px-3 py-2 rounded-md text-sm transition-colors"
                    style={{
                      backgroundColor: activeCategory === cat.id ? "rgba(250,100,80,0.12)" : "transparent",
                      color: activeCategory === cat.id ? P : MUTED,
                      fontWeight: activeCategory === cat.id ? 600 : 400,
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary */}
            <div>
              <h3 className="font-display font-bold text-lg mb-4 pb-2" style={{ color: FG, borderBottom: `1px solid ${BORDER}` }}>
                Dietary
              </h3>
              <div className="flex flex-col gap-1">
                {([
                  { key: "all", label: "All" },
                  { key: "veg", label: "Vegetarian", icon: <Leaf className="w-4 h-4" /> },
                  { key: "spicy", label: "Spicy", icon: <Flame className="w-4 h-4" /> },
                ] as const).map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => setDietFilter(key)}
                    className="text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2"
                    style={{
                      backgroundColor: dietFilter === key ? "rgba(250,100,80,0.12)" : "transparent",
                      color: dietFilter === key ? P : MUTED,
                      fontWeight: dietFilter === key ? 600 : 400,
                    }}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Top bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <p style={{ color: MUTED }}>
                Showing <span style={{ color: FG, fontWeight: 600 }}>{filtered.length}</span> results
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm" style={{ color: MUTED }}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  className="px-4 py-2 rounded-lg text-sm outline-none"
                  style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}`, color: FG }}
                >
                  <option value="popular">Most Popular</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center rounded-xl" style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}` }}>
                <h3 className="font-display font-bold text-xl mb-2">No products found</h3>
                <p className="mb-6" style={{ color: MUTED }}>Try clearing your filters.</p>
                <button
                  onClick={() => { setActiveCategory(undefined); setDietFilter("all"); setSearch(""); }}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm"
                  style={{ border: `1px solid ${P}`, color: P }}
                >
                  <X className="w-4 h-4" /> Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
