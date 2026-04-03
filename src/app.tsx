import { Switch, Route } from "wouter";
import { CartProvider } from "./context/cart-context";
import Layout from "./components/layout";
import Home from "./pages/home";
import Menu from "./pages/menu";
import ProductDetail from "./pages/product";
import CartPage from "./pages/cart";
import OrderSuccessPage from "./pages/order-success";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/menu" component={Menu} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/cart" component={CartPage} />
      <Route path="/order-success" component={OrderSuccessPage} />
      <Route>
        <div className="flex items-center justify-center min-h-screen text-foreground">
          <div className="text-center">
            <h1 className="font-display text-5xl font-bold mb-4">404</h1>
            <p className="text-muted-foreground mb-6">Page not found</p>
            <a href="/" className="text-primary underline">Return home</a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Layout>
        <Router />
      </Layout>
    </CartProvider>
  );
}