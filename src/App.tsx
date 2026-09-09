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
import CriollasPage from "./pages/CriollasPage";
import AdminPage from "./pages/AdminPage";
import CatalogLoader from "./components/CatalogLoader";
import { SessionContextProvider } from "./contexts/SessionContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CatalogLoader />
        <Header />
        <main className="pt-20 bg-background font-sans">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vinos" element={<Vinos />} />
            <Route path="/criollas" element={<CriollasPage />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/lugar" element={<Lugar />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/producto/:slug" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

export default App;
