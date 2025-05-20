import { useEffect, useRef, useState } from 'react';

interface UseLazyLoadOptions {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}

/**
 * Custom hook for lazy loading images and videos
 * @param options Configuration options for the IntersectionObserver
 * @returns Object with ref to attach to the element and boolean indicating if element is visible
 */
export const useLazyLoad = ({
  rootMargin = '200px',
  threshold = 0.1,
  once = true,
}: UseLazyLoadOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    // Skip if no element ref or if already visible and once is true
    if (!elementRef.current || (isVisible && once)) {
      return;
    }
    
    // Cleanup previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Create new observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // If once is true, disconnect the observer after becoming visible
          if (once && observerRef.current) {
            observerRef.current.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { rootMargin, threshold }
    );
    
    // Start observing the element
    observerRef.current.observe(elementRef.current);
    
    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [rootMargin, threshold, once]);
  
  return { ref: elementRef, isVisible };
};

/**
 * Custom hook specifically for lazy loading images
 * @param src The image source URL to load when visible
 * @param options Configuration options for the IntersectionObserver
 * @returns Object with ref to attach to the image and the current src to use
 */
export const useLazyImage = (
  src: string,
  placeholderSrc: string = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMzMzMiLz48L3N2Zz4=',
  options: UseLazyLoadOptions = {}
) => {
  const { ref, isVisible } = useLazyLoad(options);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  
  // Set the ref to both our hooks
  const setRef = (element: HTMLImageElement | null) => {
    ref.current = element;
    imgRef.current = element;
  };
  
  useEffect(() => {
    if (isVisible && !isLoaded) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoaded(true);
      };
    }
  }, [isVisible, src, isLoaded]);
  
  return { ref: setRef, src: currentSrc, isLoaded };
};

/**
 * Custom hook specifically for lazy loading videos
 * @param src The video source URL to load when visible
 * @param options Configuration options for the IntersectionObserver
 * @returns Object with ref to attach to the video and boolean indicating if video should start loading
 */
export const useLazyVideo = (
  src: string,
  options: UseLazyLoadOptions = {}
) => {
  const { ref, isVisible } = useLazyLoad(options);
  const [shouldLoad, setShouldLoad] = useState(false);
  
  useEffect(() => {
    if (isVisible && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [isVisible, shouldLoad]);
  
  return { ref, shouldLoad, src: shouldLoad ? src : '' };
};

export default useLazyLoad; 