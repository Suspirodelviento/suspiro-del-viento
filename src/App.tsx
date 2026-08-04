import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { AIBiodynamicChatbot } from "./components/AIBiodynamicChatbot";

import Index from "./pages/Index";
import { ProductsPage } from "./pages/ProductsPage";
import { EducationPage } from "./pages/EducationPage";
import { ProducersPage } from "./pages/ProducersPage";
import { ProducerDetailPage } from "./pages/ProducerDetailPage";
import { BlogPage } from "./pages/BlogPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AdminPage } from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ShopProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1A3323] font-sans selection:bg-[#D4AF37] selection:text-[#1A3323]">
            <Navbar />
            
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/producers" element={<ProducersPage />} />
                <Route path="/producers/:id" element={<ProducerDetailPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
            <CartDrawer />
            <ProductDetailModal />
            <AIBiodynamicChatbot />
          </div>
        </BrowserRouter>
      </ShopProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;