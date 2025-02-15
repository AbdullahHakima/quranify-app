
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Kajian from "./pages/Kajian";
import Doa from "./pages/Doa";
import NotFound from "./pages/NotFound";
import { initializePrayerTimes } from "./utils/initializePrayerTimes";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initializePrayerTimes();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/prayer" element={<Index />} />
            <Route path="/kajian" element={<Kajian />} />
            <Route path="/doa" element={<Doa />} />
            <Route path="/profile" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
