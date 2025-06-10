import { useEffect, useState, useRef } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
}

const YouTubeEmbed = ({ videoId, title = 'YouTube video player', autoplay = true }: YouTubeEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Reset states and handle loading when videoId changes
  useEffect(() => {
    // Reset states when videoId changes
    setIsLoaded(false);
    setError(false);
    
    // Immediate loading for better responsiveness
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    // Safety timeout - if video doesn't load within 5 seconds, show error
    const errorTimer = setTimeout(() => {
      if (iframeRef.current && !iframeRef.current.contentWindow) {
        console.error("YouTube iframe failed to initialize properly");
        setError(true);
      }
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(errorTimer);
    };
  }, [videoId]);
  
  // Prevent event propagation from YouTube iframe
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  // Handle iframe load success
  const handleIframeLoad = () => {
    setIsLoaded(true);
    setError(false);
  };
  
  // Handle iframe load errors
  const handleIframeError = () => {
    console.error("Error loading YouTube iframe");
    setError(true);
  };

  // Create YouTube embed URL with proper parameters
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&showinfo=0&modestbranding=1&enablejsapi=1`;
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black/40 rounded-md overflow-hidden z-20 flex items-center justify-center" 
      onClick={handleContainerClick}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gaming-purple/30 border-t-gaming-purple rounded-full animate-spin"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white">
          <span className="text-red-400 mb-2">Video loading error</span>
          <p className="text-sm text-white/70 text-center max-w-xs">
            Unable to load the YouTube video. Please try again or view directly on YouTube.
          </p>
          <a 
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
          >
            Open on YouTube
          </a>
        </div>
      )}
      
      <div className={`relative w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full z-10"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </div>
    </div>
  );
};

export default YouTubeEmbed; 