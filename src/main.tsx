import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { applyPerformanceOptimizations } from '@/utils/performanceMonitor'

// Apply performance optimizations as early as possible
applyPerformanceOptimizations()

// Use createRoot for React 18's concurrent features
createRoot(document.getElementById("root")!).render(<App />);
