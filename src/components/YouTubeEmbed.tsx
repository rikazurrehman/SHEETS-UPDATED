import { useEffect, useState, useRef } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
}

const YouTubeEmbed = ({ videoId, title = 'YouTube video player', autoplay = false }: YouTubeEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Prevent event propagation from YouTube iframe
  const handleContainerClick = (e: React.MouseEvent) => {
    // Only stop propagation if clicked directly on the container (not child elements)
    if (e.target === e.currentTarget) {
      e.stopPropagation();
    }
  };
  
  // Lazy load iframe to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-black/40 rounded-md overflow-hidden z-20" 
      onClick={handleContainerClick}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gaming-purple/30 border-t-gaming-purple rounded-full animate-spin"></div>
        </div>
      )}
      
      {isLoaded && (
        <div className="relative w-full h-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full z-10"
            loading="lazy"
          />
          {/* Invisible overlay to capture clicks when not on the iframe */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none" 
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

export default YouTubeEmbed; 