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
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleProjectClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default behavior
    e.stopPropagation(); // Stop propagation to prevent interference from other handlers
    console.log("Project clicked:", project.title); // Add logging to debug
    if (!project.comingSoon) {
      openProjectModal(project);
    }
  };
  
  return (
    <div 
      ref={cardRef}
      className="group relative overflow-hidden bg-gaming-dark/30 border-b border-white/5 z-10 cursor-pointer"
      onClick={handleProjectClick}
    >
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
        <div className="absolute bottom-2 left-2 bg-black/50 rounded-full p-1 z-10">
          {project.mediaType === 'video' && <Play size={14} className="text-white" />}
          {project.mediaType === 'audio' && <Volume2 size={14} className="text-white" />}
        </div>
        
        {/* Coming Soon Badge */}
        {project.comingSoon && (
          <div className="absolute top-2 right-2 bg-gaming-purple/80 text-white text-xs px-2 py-0.5 rounded-sm z-10">
            Soon
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-darker to-transparent opacity-70 pointer-events-none"></div>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 z-10">
        <h3 className="text-base font-medium mb-1 text-white">{project.title}</h3>
        <p className="text-white/60 text-xs mb-3 line-clamp-1">{project.shortDescription}</p>
        
        {/* Button */}
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            e.stopPropagation(); // Stop propagation
            console.log("View button clicked:", project.title); // Add logging to debug
            if (!project.comingSoon) {
              openProjectModal(project);
            }
          }}
          className="flex items-center text-xs text-white/80 hover:text-white bg-gaming-purple/20 px-2 py-1 rounded-sm"
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
  const modalRef = useRef<HTMLDivElement>(null);
  
  if (!project) return null;
  
  console.log("Rendering modal for project:", project.title);
  console.log("Project video URL:", project.video);
  
  const togglePlayPause = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsPlaying(prev => !prev);
  }, [setIsPlaying]);

  const toggleMute = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsMuted(prev => !prev);
  }, [setIsMuted]);
  
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
      
      // Auto-play the video when the modal opens if it's a video
      if (project.mediaType === 'video') {
        videoRef.current.load();
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch(err => {
            console.log('Video play prevented:', err);
            setIsPlaying(false);
          });
        }
      }
    }
  }, [project, optimizeVideo, setIsPlaying]);
  
  // Update video play state when isPlaying changes
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.log('Video play prevented:', err);
            setIsPlaying(false);
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);
  
  // Update video mute state when isMuted changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);
  
  // Handle clicks on the modal background
  const handleModalBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeProjectModal();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      onClick={handleModalBackgroundClick}
    >
      <div 
        ref={modalRef}
        className="bg-gaming-darker border-t border-white/10 rounded-sm overflow-hidden w-full max-w-4xl max-h-[90vh] z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media Content - Image, Video or Audio player */}
        <div className="relative bg-black">
          {/* Video embed from project.video field */}
          {project.video ? (
            <div className="w-full aspect-video rounded-xl overflow-hidden">
              <iframe
                src={project.video}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          ) : project.mediaType === 'image' ? (
            <div onClick={(e) => e.stopPropagation()}>
              <img 
                src={project.mediaUrl} 
                alt={project.title} 
                className="w-full h-auto max-h-[50vh] object-contain mx-auto"
              />
            </div>
          ) : project.mediaType === 'video' && (
            <div className="relative aspect-video" onClick={(e) => e.stopPropagation()}>
              <video
                ref={videoRef}
                src={project.mediaUrl}
                className="w-full h-full object-contain z-10"
                controls={false}
                autoPlay={false}
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
                onLoadedData={() => {
                  if (videoRef.current) {
                    optimizeVideo(videoRef.current);
                  }
                }}
                onCanPlay={() => {
                  if (isPlaying && videoRef.current) {
                    const playPromise = videoRef.current.play();
                    if (playPromise !== undefined) {
                      playPromise.catch(err => {
                        console.log('Video play prevented:', err);
                      });
                    }
                  }
                }}
              />
              <div className="absolute bottom-4 left-4 flex space-x-3 z-20">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayPause();
                  }}
                  className="bg-black/50 hover:bg-black/70 p-2 rounded-full"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="bg-black/50 hover:bg-black/70 p-2 rounded-full"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
            </div>
          )}
          
          {project.mediaType === 'audio' && (
            <div className="bg-gaming-darker py-8 px-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <audio
                src={project.mediaUrl}
                controls
                className="w-full max-w-md"
              />
            </div>
          )}
          
          {/* Close button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              closeProjectModal();
            }}
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-1 rounded-full text-white/80 hover:text-white z-30"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[40vh]" onClick={(e) => e.stopPropagation()}>
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
                onClick={(e) => e.stopPropagation()}
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
  const portfolioRef = useRef<HTMLDivElement>(null);
  
  // Extract video and image URLs for optimization
  const videoUrls = portfolioData
    .filter(project => project.mediaType === 'video')
    .map(project => project.mediaUrl);
  
  const imageUrls = portfolioData.map(project => project.imageUrl);
  
  // Use the media optimization hook
  const { videosPreloaded, optimizeVideo } = useMediaOptimization({
    videoUrls,
    imageUrls,
    videoQuality: 'medium', // Increased quality for better initial load
    priorityImages: [0, 1, 2], // Prioritize the first three images
    enableVideoPreload: true
  });

  const openProjectModal = useCallback((project: typeof portfolioData[0]) => {
    console.log("Opening modal for project:", project.title);
    
    // Directly set the selected project to show the modal
    setSelectedProject(project);
    
    // Reset playback state when opening a new project
    setIsPlaying(false);
    
    // Set a small delay before attempting to autoplay
    setTimeout(() => {
      if (project.mediaType === 'video') {
        setIsPlaying(true);
      }
    }, 100);
    
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProjectModal = useCallback(() => {
    console.log("Closing modal");
    setSelectedProject(null);
    setIsPlaying(false);
    document.body.style.overflow = 'auto';
  }, []);
  
  // Prevent global click handlers from affecting the portfolio
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (portfolioRef.current?.contains(e.target as Node)) {
        // Don't stop propagation for these interactive elements
        const target = e.target as HTMLElement;
        const isInteractiveElement = 
          target.tagName === 'BUTTON' || 
          target.closest('button') || 
          target.closest('a') ||
          target.closest('video') ||
          target.closest('audio');
          
        if (!isInteractiveElement) {
          e.stopPropagation();
        }
      }
    };
    
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);
  
  // Specifically handle video interactions
  useEffect(() => {
    if (selectedProject?.mediaType === 'video') {
      // Force video to update its play state when selected project changes
      const timer = setTimeout(() => {
        setIsPlaying(true);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [selectedProject]);

  // Log when the selected project changes
  useEffect(() => {
    if (selectedProject) {
      console.log("Selected project changed:", selectedProject.title);
    }
  }, [selectedProject]);

  return (
    <section className="py-16 relative z-20" ref={portfolioRef}>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-medium mb-10 text-center">Portfolio</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      {selectedProject && (
        <ProjectModal 
          project={selectedProject}
          closeProjectModal={closeProjectModal}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />
      )}
    </section>
  );
};

export default Portfolio;
