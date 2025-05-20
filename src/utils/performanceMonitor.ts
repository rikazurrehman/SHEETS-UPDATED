/**
 * Performance Monitoring Utility
 * Provides functions for monitoring and optimizing website performance
 */

// Performance metrics interface
interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
  loadTime: number | null; // Page Load Time
}

// Initialize metrics object
const metrics: PerformanceMetrics = {
  fcp: null,
  lcp: null,
  fid: null,
  cls: null,
  ttfb: null,
  loadTime: null
};

/**
 * Start monitoring performance metrics
 */
export const startPerformanceMonitoring = (debug: boolean = false) => {
  if (!window.performance || !window.performance.timing) {
    console.warn('Performance API not supported in this browser');
    return;
  }
  
  // Get TTFB
  const getTTFB = () => {
    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationTiming) {
      metrics.ttfb = navigationTiming.responseStart - navigationTiming.requestStart;
      if (debug) console.log(`TTFB: ${metrics.ttfb.toFixed(2)}ms`);
    }
  };
  
  // Get page load time
  const getLoadTime = () => {
    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationTiming) {
      metrics.loadTime = navigationTiming.loadEventEnd - navigationTiming.fetchStart;
      if (debug) console.log(`Load Time: ${metrics.loadTime.toFixed(2)}ms`);
    }
  };
  
  // Monitor First Contentful Paint (FCP)
  const observeFCP = () => {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const fcp = entries[0];
        metrics.fcp = fcp.startTime;
        if (debug) console.log(`FCP: ${metrics.fcp.toFixed(2)}ms`);
      }
      observer.disconnect();
    });
    
    observer.observe({ type: 'paint', buffered: true });
  };
  
  // Monitor Largest Contentful Paint (LCP)
  const observeLCP = () => {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.lcp = lastEntry.startTime;
      if (debug) console.log(`LCP: ${metrics.lcp.toFixed(2)}ms`);
    });
    
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  };
  
  // Monitor First Input Delay (FID)
  const observeFID = () => {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const firstInput = entries[0];
        metrics.fid = firstInput.processingStart - firstInput.startTime;
        if (debug) console.log(`FID: ${metrics.fid.toFixed(2)}ms`);
      }
      observer.disconnect();
    });
    
    observer.observe({ type: 'first-input', buffered: true });
  };
  
  // Monitor Cumulative Layout Shift (CLS)
  const observeCLS = () => {
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];
    
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      entries.forEach(entry => {
        // Only count layout shifts without recent user input
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          clsEntries.push(entry);
        }
      });
      
      metrics.cls = clsValue;
      if (debug) console.log(`CLS: ${metrics.cls.toFixed(3)}`);
    });
    
    observer.observe({ type: 'layout-shift', buffered: true });
  };
  
  // Start monitoring all metrics
  if ('PerformanceObserver' in window) {
    observeFCP();
    observeLCP();
    observeFID();
    observeCLS();
  }
  
  // Get TTFB and load time when page is fully loaded
  window.addEventListener('load', () => {
    getTTFB();
    getLoadTime();
    
    // Report all metrics after a delay to ensure they're all collected
    setTimeout(() => {
      if (debug) {
        console.log('Performance Metrics:', metrics);
      }
    }, 3000);
  });
  
  return metrics;
};

/**
 * Apply performance optimizations based on device capabilities
 */
export const applyPerformanceOptimizations = () => {
  // Detect low-end devices
  const isLowEndDevice = () => {
    // Check for hardware concurrency (CPU cores)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
      return true;
    }
    
    // Check for device memory (if available)
    if ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4) {
      return true;
    }
    
    return false;
  };
  
  // Apply optimizations for low-end devices
  if (isLowEndDevice()) {
    // Add a CSS class to the body for low-end device optimizations
    document.body.classList.add('low-end-device');
    
    // Disable certain animations
    const style = document.createElement('style');
    style.textContent = `
      .low-end-device .animate-float,
      .low-end-device .animate-ping,
      .low-end-device .animate-bounce {
        animation: none !important;
      }
      
      .low-end-device .blur-xl,
      .low-end-device .blur-3xl {
        filter: blur(4px) !important;
      }
    `;
    document.head.appendChild(style);
    
    return true;
  }
  
  return false;
};

/**
 * Get performance metrics
 */
export const getPerformanceMetrics = (): PerformanceMetrics => {
  return { ...metrics };
};

export default {
  startPerformanceMonitoring,
  applyPerformanceOptimizations,
  getPerformanceMetrics
}; 