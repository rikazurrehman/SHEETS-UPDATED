/**
 * Media Optimizer Utility
 * Provides functions for optimizing media loading and playback
 */

/**
 * Preloads video files to improve playback performance
 * @param urls Array of video URLs to preload
 * @param quality 'low' | 'medium' | 'high' - Quality level for preloading (affects how much is preloaded)
 */
export const preloadVideos = (urls: string[], quality: 'low' | 'medium' | 'high' = 'medium') => {
  // Don't preload on mobile devices to save bandwidth
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log('Skipping video preload on mobile device');
    return;
  }
  
  // Set preload attribute based on quality
  const preloadType = quality === 'low' ? 'metadata' : 'auto';
  
  // Create hidden video elements to preload videos
  urls.forEach(url => {
    const video = document.createElement('video');
    video.style.display = 'none';
    video.preload = preloadType;
    video.src = url;
    
    // For medium quality, load just a bit of the video
    if (quality === 'medium') {
      video.onloadedmetadata = () => {
        video.currentTime = 0.1;
        video.oncanplaythrough = () => {
          video.remove(); // Remove element after preloading
        };
      };
    }
    
    // For high quality, load more of the video
    if (quality === 'high') {
      video.onloadedmetadata = () => {
        video.currentTime = 0.1;
        video.play().then(() => {
          setTimeout(() => {
            video.pause();
            video.remove(); // Remove element after preloading
          }, 500);
        }).catch(err => {
          console.log('Video preload play prevented:', err);
          video.remove();
        });
      };
    }
    
    document.body.appendChild(video);
  });
};

/**
 * Optimizes image loading by creating a priority queue
 * @param imageUrls Array of image URLs to optimize loading for
 * @param priority Array of indices representing priority order
 */
export const optimizeImageLoading = (imageUrls: string[], priority: number[] = []) => {
  // Create a queue of images based on priority
  const queue = [...priority, ...Array.from({ length: imageUrls.length }, (_, i) => 
    priority.includes(i) ? -1 : i).filter(i => i !== -1)];
  
  // Load images in queue order
  queue.forEach((index, queuePosition) => {
    if (index < 0 || index >= imageUrls.length) return;
    
    const img = new Image();
    img.src = imageUrls[index];
    
    // Add small delay between each image load to prevent network congestion
    setTimeout(() => {
      img.onload = () => {
        // Image loaded
        console.log(`Image ${index} loaded`);
      };
    }, queuePosition * 100);
  });
};

/**
 * Reduces video quality based on device performance
 * @param videoElement The video element to optimize
 */
export const optimizeVideoPlayback = (videoElement: HTMLVideoElement) => {
  // Check if device is low-end
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
  
  if (isLowEndDevice()) {
    // Reduce quality for low-end devices
    videoElement.setAttribute('playsinline', '');
    videoElement.muted = true;
    
    // Reduce resolution if possible
    if (videoElement.videoHeight > 480) {
      // Add a CSS transform to scale down the video while maintaining aspect ratio
      videoElement.style.transform = 'scale(0.7)';
      videoElement.style.transformOrigin = 'center';
    }
  }
};

/**
 * Lazy loads media based on viewport visibility
 * @param mediaElements Array of media elements to lazy load
 * @param rootMargin Root margin for Intersection Observer
 */
export const setupLazyLoading = (mediaElements: HTMLElement[], rootMargin = '200px') => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers that don't support Intersection Observer
    mediaElements.forEach(element => {
      if (element instanceof HTMLImageElement) {
        element.src = element.dataset.src || '';
      } else if (element instanceof HTMLVideoElement) {
        element.src = element.dataset.src || '';
      }
    });
    return;
  }
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          if (element instanceof HTMLImageElement && element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
          } else if (element instanceof HTMLVideoElement && element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
          }
          
          observer.unobserve(element);
        }
      });
    },
    { rootMargin }
  );
  
  mediaElements.forEach(element => {
    observer.observe(element);
  });
}; 