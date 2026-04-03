import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { ProductCard } from "@/components/product-card";
import { useListProducts, useListCategories, ListProductsSortBy } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Flame } from "lucide-react";

export default function Menu() {
  const [location] = useLocation();
  
  // Parse query params for category
  const searchParams = new URLSearchParams(window.location.search);
  const initialCategory = searchParams.get("category") ? parseInt(searchParams.get("category")!) : undefined;
  
  const [activeCategory, setActiveCategory] = useState<number | undefined>(initialCategory);
  const [sortBy, setSortBy] = useState<ListProductsSortBy>(ListProductsSortBy.popular);
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veg" | "spicy">("all");

  const { data: categories, isLoading: loadingCategories } = useListCategories();
  
  const { data: products, isLoading: loadingProducts } = useListProducts({
    categoryId: activeCategory,
    sortBy: sortBy,
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let filtered = products;
    
    if (dietaryFilter === "veg") {
      filtered = filtered.filter(p => p.isVegetarian);
    } else if (dietaryFilter === "spicy") {
      filtered = filtered.filter(p => p.spiceLevel && p.spiceLevel > 0);
    }
    
    return filtered;
  }, [products, dietaryFilter]);

  const handleCategoryClick = (id?: number) => {
    setActiveCategory(id);
    // Update URL without reload
    const url = new URL(window.location.href);
    if (id) {
      url.searchParams.set("category", id.toString());
    } else {
      url.searchParams.delete("category");
    }
    window.history.pushState({}, "", url);
  };

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Header */}
      <div className="bg-card py-16 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-foreground">
              Our Menu
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore our collection of meticulously crafted sushi, sashimi, and warm dishes.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 shrink-0 space-y-10">
            {/* Categories */}
            <div>
              <h3 className="font-display font-bold text-lg mb-4 text-foreground border-b border-border pb-2">
                Categories
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleCategoryClick(undefined)}
                  className={`text-left px-3 py-2 rounded-md transition-colors ${
                    activeCategory === undefined 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  All Items
                </button>
                {loadingCategories ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full bg-secondary rounded-md" />
                  ))
                ) : (
                  categories?.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`text-left px-3 py-2 rounded-md transition-colors flex justify-between items-center ${
                        activeCategory === category.id 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <span>{category.name}</span>
                      {category.productCount !== undefined && (
                        <span className="text-xs opacity-60">{category.productCount}</span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Dietary */}
            <div>
              <h3 className="font-display font-bold text-lg mb-4 text-foreground border-b border-border pb-2">
                Dietary
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setDietaryFilter("all")}
                  className={`text-left px-3 py-2 rounded-md transition-colors ${
                    dietaryFilter === "all" ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietaryFilter("veg")}
                  className={`text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
                    dietaryFilter === "veg" ? "bg-matcha/20 text-matcha font-medium" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <Leaf className="w-4 h-4" /> Vegetarian
                </button>
                <button
                  onClick={() => setDietaryFilter("spicy")}
                  className={`text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
                    dietaryFilter === "spicy" ? "bg-destructive/20 text-destructive font-medium" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <Flame className="w-4 h-4" /> Spicy
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <p className="text-muted-foreground">
                Showing <span className="text-foreground font-medium">{filteredProducts.length}</span> results
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as ListProductsSortBy)}>
                  <SelectTrigger className="w-[180px] bg-card border-border">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grid */}
            {loadingProducts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <Skeleton className="aspect-square w-full rounded-xl bg-secondary" />
                    <Skeleton className="h-6 w-2/3 bg-secondary" />
                    <Skeleton className="h-4 w-full bg-secondary" />
                    <Skeleton className="h-4 w-1/2 bg-secondary" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-card border border-border rounded-xl">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl opacity-50">🍣</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-2">No products found</h3>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find any items matching your current filters. Try selecting a different category or clearing dietary preferences.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => {
                    setActiveCategory(undefined);
                    setDietaryFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => (
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
