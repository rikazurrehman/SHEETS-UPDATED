import { useState, useCallback, memo, useEffect, useRef } from 'react';
import { Eye, X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import useMediaOptimization from '@/hooks/useMediaOptimization';

// Memoized project card component to prevent unnecessary re-renders
const ProjectCard = memo(({ project, openProjectModal }: { 
  project: typeof portfolioData[0], 
  openProjectModal: (project: typeof portfolioData[0]) => void 
}) => {
  const { registerMediaElement } = useMediaOptimization();
  
  return (
    <div className="group relative overflow-hidden bg-gaming-dark/30 border-b border-white/5">
      {/* Project Image */}
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          width="400"
          height="225"
          ref={registerMediaElement}
        />
        
        {/* Media Type Indicator */}
        <div className="absolute bottom-2 left-2 bg-black/50 rounded-full p-1">
          {project.mediaType === 'video' && <Play size={14} className="text-white" />}
          {project.mediaType === 'audio' && <Volume2 size={14} className="text-white" />}
        </div>
        
        {/* Coming Soon Badge */}
        {project.comingSoon && (
          <div className="absolute top-2 right-2 bg-gaming-purple/80 text-white text-xs px-2 py-0.5 rounded-sm">
            Soon
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-darker to-transparent opacity-70"></div>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-4">
        <h3 className="text-base font-medium mb-1 text-white">{project.title}</h3>
        <p className="text-white/60 text-xs mb-3 line-clamp-1">{project.shortDescription}</p>
        
        {/* Button */}
        <button
          onClick={() => openProjectModal(project)}
          className="flex items-center text-xs text-white/80 hover:text-white"
          disabled={project.comingSoon}
        >
          <Eye size={14} className="mr-1" />
          {project.comingSoon ? 'Coming Soon' : 'View Project'}
        </button>
      </div>
    </div>
  );
});

// Memoized project modal component
const ProjectModal = memo(({ 
  project, 
  closeProjectModal, 
  isPlaying, 
  setIsPlaying, 
  isMuted, 
  setIsMuted 
}: {
  project: typeof portfolioData[0] | null,
  closeProjectModal: () => void,
  isPlaying: boolean,
  setIsPlaying: (value: boolean) => void,
  isMuted: boolean,
  setIsMuted: (value: boolean) => void
}) => {
  const { optimizeVideo } = useMediaOptimization();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  if (!project) return null;
  
  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying, setIsPlaying]);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted, setIsMuted]);
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProjectModal();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeProjectModal]);
  
  // Optimize video playback when video is loaded
  useEffect(() => {
    if (videoRef.current) {
      optimizeVideo(videoRef.current);
    }
  }, [optimizeVideo]);
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      onClick={closeProjectModal}
    >
      <div 
        className="bg-gaming-darker border-t border-white/10 rounded-sm overflow-hidden w-full max-w-4xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media Content - Image, Video or Audio player */}
        <div className="relative bg-black">
          {project.mediaType === 'image' && (
            <img 
              src={project.mediaUrl} 
              alt={project.title} 
              className="w-full h-auto max-h-[50vh] object-contain mx-auto"
            />
          )}
          
          {project.mediaType === 'video' && (
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                src={project.mediaUrl}
                className="w-full h-full object-contain"
                controls={false}
                autoPlay={false}
                loop
                muted={isMuted}
                playsInline
                onLoadedData={() => {
                  if (videoRef.current) {
                    optimizeVideo(videoRef.current);
                  }
                }}
                onCanPlay={() => {
                  if (isPlaying && videoRef.current) {
                    videoRef.current.play().catch(err => {
                      console.log('Video play prevented:', err);
                    });
                  }
                }}
              />
              <div className="absolute bottom-4 left-4 flex space-x-3">
                <button 
                  onClick={togglePlayPause}
                  className="bg-black/50 hover:bg-black/70 p-2 rounded-full"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button 
                  onClick={toggleMute}
                  className="bg-black/50 hover:bg-black/70 p-2 rounded-full"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
            </div>
          )}
          
          {project.mediaType === 'audio' && (
            <div className="bg-gaming-darker py-8 px-4 flex items-center justify-center">
              <audio
                src={project.mediaUrl}
                controls
                className="w-full max-w-md"
              />
            </div>
          )}
          
          {/* Close button */}
          <button 
            onClick={closeProjectModal}
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-1 rounded-full text-white/80 hover:text-white"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[40vh]">
          <h3 className="text-xl font-medium mb-2">{project.title}</h3>
          
          <div className="mb-3 flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="bg-gaming-purple/10 text-white/70 text-xs px-2 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-white/70 text-sm mb-4">{project.fullDescription}</p>
          
          {/* Project details in a more compact form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="text-sm font-medium mb-1 text-white/90">Tools Used</h4>
              <p className="text-white/60">{project.tools.join(', ')}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1 text-white/90">Highlights</h4>
              <ul className="list-disc list-inside text-white/60 text-sm">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="text-xs">{highlight}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Link button */}
          {project.link && !project.comingSoon && (
            <div className="mt-4">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-sm text-gaming-blue hover:underline"
              >
                View Project
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<null | typeof portfolioData[0]>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // Extract video and image URLs for optimization
  const videoUrls = portfolioData
    .filter(project => project.mediaType === 'video')
    .map(project => project.mediaUrl);
  
  const imageUrls = portfolioData.map(project => project.imageUrl);
  
  // Use the media optimization hook
  const { videosPreloaded } = useMediaOptimization({
    videoUrls,
    imageUrls,
    videoQuality: 'low', // Use low quality for initial preload
    priorityImages: [0, 1, 2], // Prioritize the first three images
    enableVideoPreload: true
  });

  const openProjectModal = useCallback((project: typeof portfolioData[0]) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
    setIsPlaying(false);
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <section id="portfolio" className="py-16 bg-gaming-darker relative">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-orbitron font-bold mb-8 text-center">My Works</h2>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioData.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              openProjectModal={openProjectModal} 
            />
          ))}
        </div>
      </div>
      
      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        closeProjectModal={closeProjectModal}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />
    </section>
  );
};

export default Portfolio;
