import { useState, useEffect, useRef } from 'react';
import { X, RotateCcw, Maximize2, Minimize2, Volume2, VolumeX, ExternalLink, Sparkles } from 'lucide-react';
import ThreeJSViewer from './ThreeJSViewer';

interface ThreeDViewerModalProps {
  project: {
    id: number;
    title: string;
    category: string;
    shortDescription: string;
    fullDescription: string;
    imageUrl: string;
    mediaType: string;
    mediaUrl: string;
    youtubeId?: string;
    sketchfabId?: string;
    glbUrl?: string;
    tags: string[];
    tools: string[];
    highlights: string[];
    link: string;
    comingSoon: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ThreeDViewerModal = ({ project, isOpen, onClose }: ThreeDViewerModalProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      // Lock scroll
      document.body.classList.add('modal-open');
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle 3D model load
  const handleModelLoad = () => {
    setIsLoading(false);
  };

  // Handle 3D model error
  const handleModelError = (error: string) => {
    console.error('3D Model Error:', error);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/95 backdrop-blur-xl cursor-pointer animate-fadeIn overscroll-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className={`bg-black/90 backdrop-blur-md border border-white/10 hover:border-gaming-purple/20 rounded-none sm:rounded-xl overflow-hidden w-full h-full sm:h-auto sm:max-w-7xl sm:max-h-[95vh] cursor-default shadow-glow animate-scaleIn sm:my-4 ${
          isFullscreen ? 'rounded-none' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Digital circuit pattern */}
        <div className="absolute top-5 right-5 w-10 h-10 border border-white/5 rounded-md rotate-12 opacity-20 pointer-events-none hidden sm:block z-10">
          <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-purple/30"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-blue/30"></div>
        </div>
        
        <div className="flex flex-col h-full overflow-y-auto">
          {/* 3D Viewer Section */}
          <div className="relative bg-black/80 w-full h-[60vh] sm:h-[70vh]">
            {/* Custom Three.js Viewer */}
            {project.glbUrl ? (
              <ThreeJSViewer
                modelUrl={project.glbUrl}
                title={project.title}
                onLoad={handleModelLoad}
                onError={handleModelError}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gaming-purple/10 to-gaming-blue/10">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-gaming-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RotateCcw className="w-8 h-8 text-gaming-purple" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">3D Model Preview</h3>
                  <p className="text-white/70 mb-4">Interactive 3D model will be displayed here</p>
                  <div className="space-y-2 text-white/50 text-sm">
                    <p>• Click & drag to rotate</p>
                    <p>• Scroll to zoom in/out</p>
                    <p>• Right-click to pan</p>
                    <p className="text-gaming-purple/70 mt-4">GLB model integration ready</p>
                  </div>
                </div>
              </div>
            )}

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer text-white shadow-glow z-30"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Project Information Section */}
          <div className="p-4 sm:p-6 md:p-8 w-full overflow-y-auto relative bg-black/60">
            <div className="relative mb-4 md:mb-6">
              <div className="absolute -top-5 left-0 w-20 h-px bg-gradient-to-r from-gaming-purple/50 to-transparent"></div>
              
              {/* Category and External Links */}
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="inline-block text-white/90 text-xs font-medium px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
                  {project.category}
                </span>
                
                {/* YouTube Link (if available) */}
                {project.youtubeId && (
                  <a 
                    href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black/40 hover:bg-black/50 text-white rounded-lg transition-all text-xs sm:text-sm font-medium border border-white/10 hover:border-gaming-purple/30 shadow-glow"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="absolute inset-0 w-full h-full">
                      <div className="absolute -inset-x-1/4 top-0 h-px w-[150%] bg-gradient-to-r from-transparent via-gaming-purple/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-opacity"></div>
                    </div>
                    <ExternalLink size={14} className="relative z-10" />
                    <span className="relative z-10">View on YouTube</span>
                  </a>
                )}
              </div>
              
              {/* Project Title */}
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 gaming-gradient-text relative">
                {project.title}
                <Sparkles className="absolute -top-5 -right-5 w-4 h-4 text-gaming-purple opacity-70 animate-pulse" />
              </h3>
              
              {/* Project Description */}
              <p className="text-white/80 text-sm leading-relaxed max-w-3xl mb-4">
                {project.fullDescription}
              </p>
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tags */}
              <div>
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gaming-purple rounded-full"></div>
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs px-3 py-1.5 rounded-full bg-black/30 text-white/90 border border-white/10 hover:border-gaming-purple/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gaming-blue rounded-full"></div>
                  Software & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span 
                      key={tool} 
                      className="text-xs px-3 py-1.5 rounded-full bg-black/30 text-white/90 border border-white/10 hover:border-gaming-blue/30 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="mt-6">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gaming-purple rounded-full"></div>
                  Key Highlights
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/80 text-sm">
                      <div className="w-1.5 h-1.5 bg-gaming-purple rounded-full mt-2 flex-shrink-0"></div>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 3D Model Info */}
            <div className="mt-6 p-4 bg-black/30 rounded-lg border border-white/10">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-gaming-blue rounded-full"></div>
                3D Model Information
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Format:</span>
                  <span className="ml-2 text-white">GLB</span>
                </div>
                <div>
                  <span className="text-white/60">Renderer:</span>
                  <span className="ml-2 text-white">Three.js</span>
                </div>
                <div>
                  <span className="text-white/60">Shadows:</span>
                  <span className="ml-2 text-green-400">Enabled</span>
                </div>
                <div>
                  <span className="text-white/60">Lighting:</span>
                  <span className="ml-2 text-white">PBR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDViewerModal;
