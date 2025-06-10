import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Eye, X, Play, Pause, Volume2, VolumeX, Youtube, ArrowRight, Filter, ExternalLink } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GamingAnimation from '../components/GamingAnimation';
import useMediaOptimization from '../hooks/useMediaOptimization';
import YouTubeEmbed from '../components/YouTubeEmbed';

// Define interfaces for our types
interface Project {
  id: number;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  mediaType: string;
  mediaUrl: string;
  youtubeId?: string;
  tags: string[];
  tools: string[];
  highlights: string[];
  link: string;
  comingSoon: boolean;
}

interface ProjectCardProps {
  project: Project;
  openProjectModal: (project: Project) => void;
  index: number;
}

// Memoize GamingAnimation for better performance
const MemoizedGamingAnimation = memo(GamingAnimation);

// Optimized Project Card Component with proper typing
const ProjectCard = memo(({ project, openProjectModal, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Determine if the thumbnail aspect ratio is portrait (vertical)
  const isPortrait = project.imageUrl.includes('portrait') || project.imageUrl.includes('vertical');

  const handleProjectClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default behavior
    e.stopPropagation(); // Prevent event from bubbling up
    console.log(`Clicked on project: ${project.title}, YouTube ID: ${project.youtubeId}`);
    openProjectModal(project);
  };

  return (
    <div 
      ref={cardRef}
      className={`project-card group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-white/30 hover:shadow-md cursor-pointer h-full flex flex-col z-10`}
      style={{ 
        animationDelay: `${index * 0.1}s`, 
        animationFillMode: 'both' 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProjectClick}
    >
      {/* Project Media Thumbnail */}
      <div className={`${isPortrait ? 'aspect-[9/16]' : 'aspect-video'} overflow-hidden relative flex-grow`}>
        <img 
          ref={imgRef}
          src={project.imageUrl} 
          alt={project.title} 
          loading={index < 6 ? "eager" : "lazy"}
          className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-105 brightness-110' : 'brightness-90'}`}
        />
        
        {/* YouTube Indicator */}
        {project.youtubeId && (
          <div className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-1.5 z-10">
            <Youtube size={16} />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 group-hover:opacity-70 transition-opacity pointer-events-none"></div>
        
        {/* Content - Always visible */}
        <div className="absolute inset-0 p-5 flex flex-col justify-end z-10">
          <div className="transform transition-all duration-300 group-hover:translate-y-[-5px]">
            <span className="inline-block text-white text-xs font-medium mb-2 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">{project.category}</span>
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{project.title}</h3>
            <p className="text-white/70 text-sm mb-3 line-clamp-2">{project.shortDescription}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 2).map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-white/90">
                View <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Individual category button component to isolate click behavior
const CategoryButton = memo(({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: string; 
  isActive: boolean; 
  onClick: (category: string) => void;
}) => {
  // Create a dedicated ref for the button
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handleClick = (e: React.MouseEvent) => {
    // Only trigger if the click was directly on this button or its children
    e.stopPropagation();
    e.preventDefault();
    
    // Only process the click for this specific button
    onClick(category);
    
    // Force any active element to blur to prevent focus issues
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="relative isolate" onClick={(e) => e.stopPropagation()}>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`px-5 py-2 rounded-full text-sm transition-all ${
          isActive
            ? 'bg-white/10 backdrop-blur-sm text-white border border-white/20 shadow-sm'
            : 'bg-transparent text-white/70 border border-transparent hover:bg-white/5 hover:border-white/10'
        }`}
      >
        {category === "all" ? "All Works" : category}
      </button>
    </div>
  );
});

const Works = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { optimizeVideo } = useMediaOptimization();
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Define categories manually to ensure correct order and naming
  const categories = ["all", "CGI & VFX", "Motion Graphics", "3D Modelling", "Video Production", "AI Concepts"];
  
  const filteredProjects = activeCategory === "all" 
    ? portfolioData 
    : portfolioData.filter(project => project.category === activeCategory);

  // Function to handle category selection - isolated to prevent unintended triggers
  const handleCategoryChange = useCallback((category: string) => {
    // Clear any focus on buttons to prevent keyboard navigation issues
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    
    // Set the active category
    setActiveCategory(category);
  }, []);

  // Function to toggle the mobile filter dropdown
  const toggleFilters = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowFilters(prev => !prev);
  }, []);

  // Memoize event handlers
  const openProjectModal = useCallback((project: Project) => {
    console.log("Opening project modal for:", project.title);
    console.log("YouTube ID:", project.youtubeId);
    console.log("Media type:", project.mediaType);
    
    // Set the selected project which triggers modal to open
    setSelectedProject(project);
    setIsPlaying(false);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
    setIsPlaying(false);
    document.body.style.overflow = 'auto';
  }, []);

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  // Close the mobile filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showFilters && categoryContainerRef.current && !categoryContainerRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);

  // Video optimization effect
  useEffect(() => {
    if (selectedProject?.mediaType === 'video' && videoRef.current) {
      optimizeVideo(videoRef.current);
    }
  }, [selectedProject, optimizeVideo]);
  
  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        closeProjectModal();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject, closeProjectModal]);

  // Simplify container click handler
  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
    }
  }, []);

  return (
    <div className="bg-gaming-dark text-white min-h-screen flex flex-col relative">
      <MemoizedGamingAnimation />
      <Navbar />
      
      {/* Content area */}
      <div className="pt-28 pb-20 flex-grow relative z-20" ref={contentRef} onClick={handleContainerClick}>
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto mb-14 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">My <span className="gaming-gradient-text">Portfolio</span></h1>
            <div className="w-20 h-1 bg-gradient-to-r from-gaming-purple to-gaming-blue rounded-full mx-auto mb-6 opacity-80"></div>
            <p className="text-white/80 max-w-2xl mx-auto text-base">
              Explore my creative work across different visual disciplines
            </p>
          </div>
          
          {/* Category Filter - Mobile */}
          <div className="md:hidden mb-8" ref={categoryContainerRef}>
            <button 
              onClick={toggleFilters}
              className="w-full flex items-center justify-between px-5 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-white focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-white/70" />
                <span className="font-medium">{activeCategory === 'all' ? 'All Categories' : activeCategory}</span>
              </div>
              <span className="text-white/70">{showFilters ? '−' : '+'}</span>
            </button>
            
            {showFilters && (
              <div className="mt-2 p-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 flex flex-col space-y-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleCategoryChange(category);
                      setShowFilters(false);
                      // Force blur to prevent focus issues
                      if (document.activeElement instanceof HTMLElement) {
                        document.activeElement.blur();
                      }
                    }}
                    className={`px-4 py-2 rounded-lg text-left text-sm transition-all focus:outline-none ${
                      activeCategory === category
                        ? 'bg-white/10 text-white font-medium'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {category === "all" ? "All Works" : category}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Category Filter - Desktop */}
          <div 
            ref={categoriesRef}
            className="hidden md:flex flex-wrap justify-center gap-3 mb-12 relative z-30 pointer-events-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            {categories.map((category) => (
              <CategoryButton
                key={category}
                category={category}
                isActive={activeCategory === category}
                onClick={handleCategoryChange}
              />
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr pointer-events-auto">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                openProjectModal={openProjectModal}
                index={index}
              />
            ))}
          </div>
          
          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            closeProjectModal();
          }}
        >
          <div 
            className="bg-gaming-darker/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden w-full max-w-5xl cursor-default shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row md:items-start">
              {/* Media Content */}
              <div className="relative bg-black/50 md:w-2/5">
                {selectedProject.youtubeId ? (
                  // YouTube Video Embed - Ensure this works correctly
                  <div className="w-full aspect-[9/16]" onClick={(e) => e.stopPropagation()}>
                    <YouTubeEmbed 
                      videoId={selectedProject.youtubeId} 
                      title={selectedProject.title}
                      autoplay={true}
                    />
                  </div>
                ) : selectedProject.mediaType === 'video' ? (
                  // Regular Video
                  <div className="relative aspect-video w-full" onClick={(e) => e.stopPropagation()}>
                    <video
                      ref={videoRef}
                      src={selectedProject.mediaUrl}
                      className="w-full h-full object-contain z-10"
                      controls={false}
                      autoPlay={false}
                      loop
                      muted={isMuted}
                      playsInline
                      poster={selectedProject.imageUrl}
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause();
                      }}
                    />
                    <div className="absolute bottom-4 left-4 flex space-x-3 z-20">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlayPause();
                        }}
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer text-white shadow-sm"
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer text-white shadow-sm"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                      >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>
                    </div>
                  </div>
                ) : (
                  // Image
                  <div className="w-full" onClick={(e) => e.stopPropagation()}>
                    <img 
                      src={selectedProject.mediaUrl} 
                      alt={selectedProject.title} 
                      className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                    />
                  </div>
                )}
                
                {/* Close button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    closeProjectModal();
                  }}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer text-white shadow-sm z-30"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6 md:p-8 md:w-3/5 max-h-[70vh] md:overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col mb-8">
                  <span className="inline-block text-white/90 text-xs font-medium mb-2 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">{selectedProject.category}</span>
                  <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{selectedProject.fullDescription}</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-medium mb-3 text-white/90 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool) => (
                        <span 
                          key={tool}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium mb-3 text-white/90 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      Key Features
                    </h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      {selectedProject.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-white/70 mt-2"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* YouTube Link */}
                  {selectedProject.youtubeId && (
                    <div className="mt-6">
                      <a 
                        href={`https://www.youtube.com/watch?v=${selectedProject.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} />
                        View on YouTube
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Works;
