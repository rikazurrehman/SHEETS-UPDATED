import { useEffect, useRef, useState } from 'react';
import { preloadVideos, optimizeImageLoading, optimizeVideoPlayback, setupLazyLoading } from '@/utils/mediaOptimizer';

interface UseMediaOptimizationOptions {
  videoUrls?: string[];
  imageUrls?: string[];
  videoQuality?: 'low' | 'medium' | 'high';
  priorityImages?: number[];
  lazyLoadThreshold?: string;
  enableVideoPreload?: boolean;
}

/**
 * Custom hook for optimizing media loading and playback
 */
export const useMediaOptimization = ({
  videoUrls = [],
  imageUrls = [],
  videoQuality = 'medium',
  priorityImages = [],
  lazyLoadThreshold = '200px',
  enableVideoPreload = true,
}: UseMediaOptimizationOptions = {}) => {
  const [videosPreloaded, setVideosPreloaded] = useState(false);
  const [imagesOptimized, setImagesOptimized] = useState(false);
  const mediaElements = useRef<HTMLElement[]>([]);
  
  // Register media elements for lazy loading
  const registerMediaElement = (element: HTMLElement | null) => {
    if (element && !mediaElements.current.includes(element)) {
      mediaElements.current.push(element);
    }
  };
  
  // Optimize video element
  const optimizeVideo = (videoElement: HTMLVideoElement | null) => {
    if (videoElement) {
      optimizeVideoPlayback(videoElement);
    }
  };
  
  // Preload videos on mount
  useEffect(() => {
    if (videoUrls.length > 0 && enableVideoPreload) {
      // Delay preloading to prioritize critical resources
      const timer = setTimeout(() => {
        preloadVideos(videoUrls, videoQuality);
        setVideosPreloaded(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [videoUrls, videoQuality, enableVideoPreload]);
  
  // Optimize image loading
  useEffect(() => {
    if (imageUrls.length > 0) {
      optimizeImageLoading(imageUrls, priorityImages);
      setImagesOptimized(true);
    }
  }, [imageUrls, priorityImages]);
  
  // Setup lazy loading for registered media elements
  useEffect(() => {
    if (mediaElements.current.length > 0) {
      setupLazyLoading(mediaElements.current, lazyLoadThreshold);
    }
    
    // Cleanup function to prevent memory leaks
    return () => {
      mediaElements.current = [];
    };
  }, [lazyLoadThreshold]);
  
  return {
    registerMediaElement,
    optimizeVideo,
    videosPreloaded,
    imagesOptimized,
  };
};

export default useMediaOptimization; 