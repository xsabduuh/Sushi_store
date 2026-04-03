import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "./hooks/use-session";
import { Layout } from "./components/layout";
import Home from "./pages/home";
import Menu from "./pages/menu";
import ProductDetail from "./pages/product";
import CartPage from "./pages/cart";
import OrderSuccessPage from "./pages/order-success";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/menu" component={Menu} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/cart" component={CartPage} />
      <Route path="/order-success" component={OrderSuccessPage} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Layout>
          <Router />
        </Layout>
      </SessionProvider>
    </QueryClientProvider>
  );
}