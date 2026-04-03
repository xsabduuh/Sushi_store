import { useGetCart, useUpdateCartItem, useRemoveCartItem, useClearCart, useCreateOrder, getGetCartQueryKey } from "@workspace/api-client-react";
import { useSession } from "@/hooks/use-session";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartPage() {
  const { sessionId } = useSession();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { data: cart, isLoading } = useGetCart(
    { sessionId },
    { query: { enabled: !!sessionId, queryKey: getGetCartQueryKey({ sessionId }) } }
  );

  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const clearCart = useClearCart();
  const createOrder = useCreateOrder();

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItem.mutate(
      { itemId, data: { sessionId, quantity: newQuantity } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetCartQueryKey({ sessionId }) });
        }
      }
    );
  };

  const handleRemove = (itemId: number) => {
    removeItem.mutate(
      { itemId, data: { sessionId } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetCartQueryKey({ sessionId }) });
        }
      }
    );
  };

  const handleClearCart = () => {
    clearCart.mutate(
      { data: { sessionId } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetCartQueryKey({ sessionId }) });
        }
      }
    );
  };

  const handleCheckout = () => {
    createOrder.mutate(
      { data: { sessionId, customerName: "Guest", deliveryAddress: "Provided at payment" } },
      {
        onSuccess: (order) => {
          queryClient.invalidateQueries({ queryKey: getGetCartQueryKey({ sessionId }) });
          setLocation(`/order-success?order=${order.orderNumber}&time=${order.estimatedTime || '45 min'}`);
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Skeleton className="h-12 w-48 mb-8 bg-secondary" />
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {[1,2].map(i => <Skeleton key={i} className="h-32 w-full bg-secondary rounded-xl" />)}
          </div>
          <Skeleton className="h-96 w-full bg-secondary rounded-xl" />
        </div>
      </div>
    );
  }

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-6xl pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-display font-bold text-foreground">Your Order</h1>
        {!isEmpty && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-destructive"
            onClick={handleClearCart}
            disabled={clearCart.isPending}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        )}
      </div>

      {isEmpty ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center"
        >
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-display font-bold mb-3">Your cart is empty</h2>
          <p className="text-muted-foreground max-w-md mb-8 text-lg">
            Looks like you haven't added any premium sushi to your order yet.
          </p>
          <Link href="/menu">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-widest px-8 h-14 rounded-none">
              BROWSE MENU
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Items List */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <AnimatePresence>
              {cart.items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  className="bg-card border border-border rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center relative group"
                >
                  <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-secondary">
                    <img 
                      src={item.productImage || "/fallback-sushi.png"} 
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex justify-between items-start gap-4 mb-1">
                      <Link href={`/product/${item.productId}`} className="font-display font-bold text-lg hover:text-primary transition-colors truncate">
                        {item.productName}
                      </Link>
                      <span className="font-mono font-bold text-primary shrink-0">
                        ${item.subtotal.toFixed(2)}
                      </span>
                    </div>
                    
                    <span className="text-sm text-muted-foreground mb-4">
                      ${item.price.toFixed(2)} each
                    </span>
                    
                    {item.notes && (
                      <p className="text-xs text-muted-foreground bg-secondary/50 p-2 rounded mb-4 italic">
                        Note: {item.notes}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-border rounded-md bg-background h-10 w-32">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={updateItem.isPending}
                          className="px-3 text-muted-foreground hover:text-foreground transition-colors h-full flex items-center justify-center disabled:opacity-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <div className="flex-1 text-center font-mono font-semibold text-sm">
                          {item.quantity}
                        </div>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={updateItem.isPending}
                          className="px-3 text-muted-foreground hover:text-foreground transition-colors h-full flex items-center justify-center disabled:opacity-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => handleRemove(item.id)}
                        disabled={removeItem.isPending}
                        className="text-muted-foreground hover:text-destructive transition-colors p-2 md:opacity-0 md:group-hover:opacity-100 disabled:opacity-50"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-32">
            <div className="bg-card border border-border rounded-xl p-6 shadow-xl">
              <h3 className="font-display font-bold text-xl mb-6 border-b border-border pb-4">Order Summary</h3>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({cart.itemCount} items)</span>
                  <span className="font-mono text-foreground">${cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span className="font-mono text-foreground">
                    {cart.deliveryFee === 0 ? "Free" : `$${cart.deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {cart.deliveryFee > 0 && (
                  <p className="text-xs text-primary italic text-right -mt-2">
                    Free delivery on orders over $50
                  </p>
                )}
                {cart.discount > 0 && (
                  <div className="flex justify-between text-matcha">
                    <span>Discount</span>
                    <span className="font-mono">-${cart.discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-mono font-bold text-3xl text-primary">${cart.total.toFixed(2)}</span>
                </div>
                {cart.estimatedTime && (
                  <p className="text-xs text-muted-foreground text-right mt-2 flex items-center justify-end gap-1">
                    Est. delivery: {cart.estimatedTime}
                  </p>
                )}
              </div>

              <div className="mb-6 space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Promo Code</label>
                <div className="flex gap-2">
                  <Input placeholder="Enter code" className="bg-background border-border h-12" />
                  <Button variant="secondary" className="h-12 px-6">Apply</Button>
                </div>
              </div>

              <Button 
                className="w-full h-14 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-widest text-base group"
                onClick={handleCheckout}
                disabled={createOrder.isPending}
              >
                {createOrder.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    PLACE ORDER <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
