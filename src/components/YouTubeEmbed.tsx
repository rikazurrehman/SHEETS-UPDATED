import { useEffect, useState } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
}

const YouTubeEmbed = ({ videoId, title = 'YouTube video player', autoplay = false }: YouTubeEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Lazy load iframe to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative w-full aspect-video bg-black/40 rounded-md overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gaming-purple/30 border-t-gaming-purple rounded-full animate-spin"></div>
        </div>
      )}
      
      {isLoaded && (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
};

export default YouTubeEmbed; 