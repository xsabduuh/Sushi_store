import { motion } from "framer-motion";
import { Link } from "wouter";
import { Product } from "@workspace/api-client-react";
import { Leaf, Flame, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import { useAddToCart, getGetCartQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { sessionId } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addToCart = useAddToCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product detail
    addToCart.mutate(
      { data: { sessionId, productId: product.id, quantity: 1 } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetCartQueryKey({ sessionId }) });
          toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
          });
        },
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/product/${product.id}`} className="group block h-full">
        <div className="bg-card rounded-xl overflow-hidden border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(250,112,112,0.15)] flex flex-col h-full hover:-translate-y-1">
          <div className="relative aspect-square overflow-hidden bg-secondary/30">
            {product.isNew && (
              <div className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded tracking-wider">
                NEW
              </div>
            )}
            {product.isPopular && !product.isNew && (
              <div className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded tracking-wider">
                POPULAR
              </div>
            )}
            
            <img
              src={product.imageUrl || "/fallback-sushi.png"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {product.isVegetarian && (
                <div className="bg-matcha text-matcha-foreground p-1.5 rounded-full shadow-lg" title="Vegetarian">
                  <Leaf className="w-4 h-4" />
                </div>
              )}
              {product.spiceLevel ? (
                <div className="bg-destructive text-destructive-foreground p-1.5 rounded-full shadow-lg flex" title={`Spice Level ${product.spiceLevel}`}>
                  {Array.from({ length: product.spiceLevel }).map((_, i) => (
                    <Flame key={i} className="w-3 h-4 -mx-[2px]" />
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="p-5 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2 gap-4">
              <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
              <span className="font-mono text-primary font-medium shrink-0">
                ${product.price.toFixed(2)}
              </span>
            </div>
            
            {product.categoryName && (
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                {product.categoryName}
              </p>
            )}

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
              {product.description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
              <div className="text-xs text-muted-foreground flex gap-3">
                {product.piecesCount && <span>{product.piecesCount} pcs</span>}
                {product.calories && <span>{product.calories} kcal</span>}
              </div>
              
              <Button 
                onClick={handleAddToCart}
                size="sm" 
                className="rounded-full w-8 h-8 p-0 bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground transition-colors"
                disabled={addToCart.isPending}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
