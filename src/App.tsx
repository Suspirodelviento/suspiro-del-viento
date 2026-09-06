import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Vinos from "./pages/Vinos";
import Historia from "./pages/Historia";
import Lugar from "./pages/Lugar";
import Tienda from "./pages/Tienda";
import Contacto from "./pages/Contacto";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <main className="pt-20 bg-background font-sans">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vinos" element={<Vinos />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/lugar" element={<Lugar />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tienda/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/contacto" element={<Contacto />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
