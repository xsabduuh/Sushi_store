import { motion } from "framer-motion";
import { Link } from "wouter";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useListProducts, useListCategories } from "@workspace/api-client-react";
import heroImg from "@/assets/hero.png";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: featuredProducts, isLoading: loadingFeatured } = useListProducts(
    { featured: true }
  );
  
  const { data: categories, isLoading: loadingCategories } = useListCategories();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center overflow-hidden border-b border-border">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="Sakura Sushi Omakase Counter" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Premium Omakase
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-6 text-foreground">
              Artistry in <br />
              <span className="text-primary italic">Every Bite.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Experience Tokyo's finest omakase tradition delivered to your door. Freshly sourced ingredients, masterful technique, uncompromising quality.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/menu">
                <Button size="lg" className="h-14 px-8 text-base font-bold tracking-wide rounded-none group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90">
                  <span className="relative z-10 flex items-center gap-2">
                    EXPLORE MENU <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-bold">Collections</h2>
            <Link href="/menu" className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 gap-4 md:gap-6 hide-scrollbar">
            {loadingCategories ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-40 shrink-0 rounded-xl bg-secondary" />
              ))
            ) : categories?.map((category, i) => (
              <Link key={category.id} href={`/menu?category=${category.id}`}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative h-24 w-40 shrink-0 rounded-xl overflow-hidden cursor-pointer border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="absolute inset-0 bg-secondary/50 group-hover:bg-primary/10 transition-colors z-0"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
                    <span className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors text-center">
                      {category.name}
                    </span>
                    {category.productCount && (
                      <span className="text-xs text-muted-foreground mt-1">
                        {category.productCount} items
                      </span>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Chef's Selection</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold">Featured Signatures</h3>
            </div>
            <p className="text-muted-foreground max-w-md md:text-right">
              Our master chef's daily recommendations, highlighting the season's finest catches and most exquisite flavor profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {loadingFeatured ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <Skeleton className="aspect-square w-full rounded-xl bg-secondary" />
                  <Skeleton className="h-6 w-2/3 bg-secondary" />
                  <Skeleton className="h-4 w-full bg-secondary" />
                  <Skeleton className="h-4 w-1/2 bg-secondary" />
                </div>
              ))
            ) : featuredProducts?.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/menu">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold tracking-widest h-14 px-10">
                VIEW FULL MENU
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
