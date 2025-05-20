/**
 * Video Optimizer Utility
 * Provides functions for optimizing video playback and loading
 */

/**
 * Detects if the browser supports the given video format
 * @param format Video format to check (e.g., 'webm', 'mp4', 'ogg')
 * @returns Boolean indicating if the format is supported
 */
export const isVideoFormatSupported = (format: string): boolean => {
  const video = document.createElement('video');
  
  switch (format.toLowerCase()) {
    case 'webm':
      return video.canPlayType('video/webm') !== '';
    case 'mp4':
      return video.canPlayType('video/mp4') !== '';
    case 'ogg':
      return video.canPlayType('video/ogg') !== '';
    case 'hls':
      return video.canPlayType('application/vnd.apple.mpegurl') !== '';
    case 'dash':
      return 'MediaSource' in window;
    default:
      return false;
  }
};

/**
 * Gets the best supported video format for the current browser
 * @param availableFormats Array of available formats
 * @returns The best supported format or null if none are supported
 */
export const getBestVideoFormat = (availableFormats: string[]): string | null => {
  // Order of preference (most efficient/modern first)
  const formatPreference = ['webm', 'mp4', 'ogg'];
  
  // Filter to only supported formats
  const supportedFormats = formatPreference.filter(format => 
    availableFormats.includes(format) && isVideoFormatSupported(format)
  );
  
  return supportedFormats.length > 0 ? supportedFormats[0] : null;
};

/**
 * Creates an optimized source URL for a video based on device capabilities
 * @param baseUrl Base URL of the video without extension
 * @param availableFormats Available format extensions
 * @returns The most appropriate video URL
 */
export const getOptimizedVideoSource = (
  baseUrl: string,
  availableFormats: string[] = ['webm', 'mp4']
): string => {
  const bestFormat = getBestVideoFormat(availableFormats);
  
  if (!bestFormat) {
    // Fallback to mp4 if no supported format is found
    return `${baseUrl}.mp4`;
  }
  
  return `${baseUrl}.${bestFormat}`;
};

/**
 * Creates a video element with optimized attributes for performance
 * @param src Video source URL
 * @param options Configuration options
 * @returns HTMLVideoElement with optimized attributes
 */
export const createOptimizedVideo = (
  src: string,
  options: {
    autoplay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
    preload?: 'auto' | 'metadata' | 'none';
    width?: number;
    height?: number;
    poster?: string;
  } = {}
): HTMLVideoElement => {
  const video = document.createElement('video');
  
  // Set source
  video.src = src;
  
  // Set basic attributes
  video.autoplay = options.autoplay || false;
  video.muted = options.muted !== undefined ? options.muted : true; // Default to muted for autoplay
  video.loop = options.loop || false;
  video.controls = options.controls || false;
  video.preload = options.preload || 'metadata';
  
  // Set dimensions if provided
  if (options.width) video.width = options.width;
  if (options.height) video.height = options.height;
  
  // Set poster if provided
  if (options.poster) video.poster = options.poster;
  
  // Add performance attributes
  video.setAttribute('playsinline', ''); // Better mobile experience
  video.setAttribute('disablePictureInPicture', ''); // Disable PiP for better performance
  
  // Detect low-end devices
  const isLowEndDevice = () => {
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
      return true;
    }
    
    if ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4) {
      return true;
    }
    
    return false;
  };
  
  // Apply additional optimizations for low-end devices
  if (isLowEndDevice()) {
    video.setAttribute('data-low-quality', 'true');
    
    // Add event listener to reduce quality when playing
    video.addEventListener('play', () => {
      // Reduce resolution with CSS
      video.style.transform = 'scale(0.8)';
      video.style.transformOrigin = 'center';
      
      // Force lower quality if possible
      if ((video as any).getVideoPlaybackQuality) {
        // Some browsers allow quality hints
        (video as any).quality = 'low';
      }
    });
  }
  
  return video;
};

/**
 * Generates multiple video sources for different formats
 * @param baseUrl Base URL of the video without extension
 * @param formats Array of formats to generate sources for
 * @returns Array of source elements
 */
export const generateVideoSources = (
  baseUrl: string,
  formats: Array<{format: string, type: string}>
): HTMLSourceElement[] => {
  return formats.map(({ format, type }) => {
    const source = document.createElement('source');
    source.src = `${baseUrl}.${format}`;
    source.type = type;
    return source;
  });
};

/**
 * Optimizes an existing video element
 * @param videoElement The video element to optimize
 * @param options Options for optimization
 */
export const optimizeExistingVideo = (
  videoElement: HTMLVideoElement,
  options: {
    enablePlaybackRate?: boolean;
    disableAnimations?: boolean;
    lowQualityForLowEndDevices?: boolean;
  } = {}
): void => {
  // Add playsinline for better mobile experience
  videoElement.setAttribute('playsinline', '');
  
  // Detect if this is a low-end device
  const isLowEndDevice = () => {
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
      return true;
    }
    
    if ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4) {
      return true;
    }
    
    return false;
  };
  
  // Apply optimizations for low-end devices
  if (isLowEndDevice() && options.lowQualityForLowEndDevices !== false) {
    // Reduce resolution with CSS
    videoElement.style.transform = 'scale(0.8)';
    videoElement.style.transformOrigin = 'center';
    
    // Disable animations if specified
    if (options.disableAnimations) {
      videoElement.style.animation = 'none';
    }
    
    // Force muted for better performance
    videoElement.muted = true;
  }
  
  // Enable playback rate optimization if specified
  if (options.enablePlaybackRate) {
    videoElement.addEventListener('play', () => {
      // Check if the video is visible in viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            // Slow down video when not in view
            if (!entry.isIntersecting) {
              videoElement.playbackRate = 0.25;
            } else {
              videoElement.playbackRate = 1.0;
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(videoElement);
      
      // Cleanup on pause
      videoElement.addEventListener('pause', () => {
        observer.disconnect();
      }, { once: true });
    });
  }
};

export default {
  isVideoFormatSupported,
  getBestVideoFormat,
  getOptimizedVideoSource,
  createOptimizedVideo,
  generateVideoSources,
  optimizeExistingVideo
}; 