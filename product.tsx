import { useRoute, Link } from "wouter";
import { useGetProduct, useAddToCart, getGetCartQueryKey } from "@workspace/api-client-react";
import { useSession } from "@/hooks/use-session";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Leaf, Flame, ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  
  const { data: product, isLoading } = useGetProduct(id, { query: { enabled: !!id } });
  
  const { sessionId } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const addToCart = useAddToCart();

  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart.mutate(
      { data: { sessionId, productId: product.id, quantity, notes } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetCartQueryKey({ sessionId }) });
          toast({
            title: "Added to cart",
            description: `${quantity}x ${product.name} added to your cart.`,
          });
          setQuantity(1);
          setNotes("");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square w-full rounded-2xl bg-secondary" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4 bg-secondary" />
            <Skeleton className="h-6 w-1/4 bg-secondary" />
            <Skeleton className="h-24 w-full bg-secondary" />
            <Skeleton className="h-12 w-full bg-secondary" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link href="/menu">
          <Button variant="outline">Return to Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <Link href="/menu" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Menu
      </Link>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border"
        >
          <img 
            src={product.imageUrl || "/fallback-sushi.png"} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded tracking-wider uppercase">
                New
              </span>
            )}
            {product.isPopular && !product.isNew && (
              <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded tracking-wider uppercase">
                Popular
              </span>
            )}
          </div>
        </motion.div>

        {/* Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-3 mb-3">
            {product.categoryName && (
              <span className="text-primary text-sm font-bold tracking-widest uppercase">
                {product.categoryName}
              </span>
            )}
            <div className="flex items-center gap-2">
              {product.isVegetarian && (
                <div className="bg-matcha/20 text-matcha p-1 rounded" title="Vegetarian">
                  <Leaf className="w-4 h-4" />
                </div>
              )}
              {product.spiceLevel ? (
                <div className="bg-destructive/20 text-destructive p-1 rounded flex" title={`Spice Level ${product.spiceLevel}`}>
                  {Array.from({ length: product.spiceLevel }).map((_, i) => (
                    <Flame key={i} className="w-3 h-3 -mx-[2px]" />
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
            {product.name}
          </h1>
          
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-3xl font-mono text-primary font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through font-mono">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-border">
            {product.piecesCount && (
              <div>
                <span className="text-sm text-muted-foreground block mb-1">Serving Size</span>
                <span className="font-medium text-foreground">{product.piecesCount} Pieces</span>
              </div>
            )}
            {product.calories && (
              <div>
                <span className="text-sm text-muted-foreground block mb-1">Calories</span>
                <span className="font-medium text-foreground">{product.calories} kcal</span>
              </div>
            )}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="col-span-2 mt-2">
                <span className="text-sm text-muted-foreground block mb-2">Key Ingredients</span>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map(ing => (
                    <span key={ing} className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Special Instructions</label>
              <Textarea 
                placeholder="Any dietary preferences or allergies?"
                className="resize-none bg-card border-border h-24 focus-visible:ring-primary"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-border rounded-none h-14 bg-card w-full sm:w-1/3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 text-foreground hover:text-primary transition-colors h-full flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center font-mono font-bold text-lg">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 text-foreground hover:text-primary transition-colors h-full flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button 
                size="lg" 
                className="flex-1 h-14 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-widest text-base gap-3"
                onClick={handleAddToCart}
                disabled={addToCart.isPending}
              >
                <ShoppingBag className="w-5 h-5" />
                ADD TO ORDER — ${(product.price * quantity).toFixed(2)}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
