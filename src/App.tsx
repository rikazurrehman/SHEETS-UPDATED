import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { startPerformanceMonitoring, applyPerformanceOptimizations } from "@/utils/performanceMonitor";

// Works page
const Works = lazy(() => import("./pages/Works"));
// Resume page removed
// const Resume = lazy(() => import("./pages/Resume"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-gaming-dark text-white flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-gaming-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white/70">Loading...</p>
    </div>
  </div>
);

// Create a new query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetching when window regains focus
      staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Cache data for 30 minutes (formerly cacheTime)
    },
  },
});

const App = () => {
  // Initialize performance monitoring and optimizations
  useEffect(() => {
    // Start performance monitoring in production only
    if (process.env.NODE_ENV === 'production') {
      startPerformanceMonitoring(false);
    } else {
      // In development, enable debug logging
      startPerformanceMonitoring(true);
    }

    // Apply performance optimizations based on device capabilities
    const isLowEndDevice = applyPerformanceOptimizations();

    if (isLowEndDevice) {
      console.log('Low-end device detected. Performance optimizations applied.');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/index" element={<Navigate to="/" replace />} />
            {/* Works route restored */}
            <Route path="/works" element={
              <Suspense fallback={<PageLoader />}>
                <Works />
              </Suspense>
            } />
            {/* Resume route removed as part of theme migration */}
            <Route path="/resume" element={<Navigate to="/" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
