import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Eye, X, Play, Pause, Volume2, VolumeX, Youtube, ArrowRight, Filter } from 'lucide-react';
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
      className={`project-card group relative overflow-hidden rounded-xl bg-gaming-darker/40 backdrop-blur-sm border border-white/5 transition-all duration-300 hover:border-gaming-purple/30 hover:shadow-glow cursor-pointer h-full flex flex-col z-10`}
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
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-darker via-gaming-darker/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none"></div>
        
        {/* Content - Always visible */}
        <div className="absolute inset-0 p-5 flex flex-col justify-end z-10">
          <div className="transform transition-all duration-300 group-hover:translate-y-[-5px]">
            <span className="inline-block text-gaming-purple text-xs font-medium mb-2 px-2.5 py-1 rounded-full bg-gaming-purple/10 backdrop-blur-sm">{project.category}</span>
            <h3 className="text-xl font-orbitron font-bold text-white mb-2 line-clamp-2">{project.title}</h3>
            <p className="text-white/70 text-sm mb-3 line-clamp-2">{project.shortDescription}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 2).map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-0.5 rounded-full bg-gaming-blue/10 text-gaming-blue/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <span className="text-gaming-purple opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs">
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
        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-gaming-purple/50 ${
          isActive
            ? 'bg-black text-white font-bold shadow-glow-strong border-2 border-gaming-purple active:bg-black active:text-white'
            : 'bg-gaming-darker text-white hover:text-white hover:bg-gaming-darker/90 border-2 border-white/30 hover:border-gaming-purple/70 active:bg-black active:text-white'
        }`}
        style={{
          textShadow: isActive ? '0 0 2px #fff, 0 0 4px #fff, 0 0 6px rgba(255, 255, 255, 0.5)' : ''
        }}
      >
        <span className={`${isActive 
          ? 'text-shadow-lg text-white' 
          : 'text-shadow'} relative z-10 px-1`}
        >
          {category === "all" ? "All Works" : category}
        </span>
        {!isActive && (
          <span className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-30 rounded-xl"></span>
        )}
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
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h1 className="text-5xl sm:text-6xl font-orbitron font-bold mb-6 gaming-gradient-text">Portfolio</h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Explore my creative work across different visual disciplines
            </p>
          </div>
          
          {/* Category Filter - Mobile */}
          <div className="md:hidden mb-8" ref={categoryContainerRef}>
            <button 
              onClick={toggleFilters}
              className="w-full flex items-center justify-between px-5 py-3 bg-gaming-darker backdrop-blur-sm rounded-xl border-2 border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-gaming-purple/50"
              style={{
                textShadow: '0 0 2px rgba(255, 255, 255, 0.8)'
              }}
            >
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gaming-purple" />
                <span className="font-medium text-shadow">{activeCategory === 'all' ? 'All Categories' : activeCategory}</span>
              </div>
              <span className="text-gaming-purple">{showFilters ? '−' : '+'}</span>
            </button>
            
            {showFilters && (
              <div className="mt-2 p-2 bg-gaming-darker backdrop-blur-md rounded-xl border-2 border-white/20 flex flex-col space-y-1">
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
                    className={`px-4 py-2.5 rounded-lg text-left text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gaming-purple/50 ${
                      activeCategory === category
                        ? 'bg-black text-white font-bold shadow-inner border border-gaming-purple'
                        : 'text-white hover:bg-gaming-darker/60 hover:text-white active:bg-black'
                    }`}
                    style={{
                      textShadow: activeCategory === category ? '0 0 2px #fff, 0 0 4px #fff' : ''
                    }}
                  >
                    <span className="text-shadow-lg">{category === "all" ? "All Works" : category}</span>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            closeProjectModal();
          }}
        >
          <div 
            className="bg-gaming-darker/90 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden w-full max-w-5xl cursor-default shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row md:items-start">
              {/* Media Content */}
              <div className="relative bg-black/70 md:w-2/5">
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
                        className="bg-gaming-purple/40 hover:bg-gaming-purple/70 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer text-white shadow-md focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="bg-gaming-purple/40 hover:bg-gaming-purple/70 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer text-white shadow-md focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                      >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
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
                  className="absolute top-4 right-4 bg-gaming-purple/40 hover:bg-gaming-purple/70 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer text-white shadow-md focus:outline-none focus:ring-2 focus:ring-white/50 z-30"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6 md:p-8 md:w-3/5 max-h-[70vh] md:overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col mb-8">
                  <span className="inline-block text-gaming-purple text-xs font-medium mb-2 px-2.5 py-1 rounded-full bg-gaming-purple/10 backdrop-blur-sm">{selectedProject.category}</span>
                  <h3 className="text-2xl font-orbitron font-bold mb-4">{selectedProject.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{selectedProject.fullDescription}</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-orbitron font-semibold mb-3 text-white/90 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gaming-purple"></span>
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool) => (
                        <span 
                          key={tool}
                          className="px-3 py-1 rounded-full bg-gaming-darker border border-white/5 text-white/80 text-xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-orbitron font-semibold mb-3 text-white/90 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gaming-blue"></span>
                      Key Features
                    </h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      {selectedProject.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gaming-blue/70"></span>
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
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Youtube size={16} />
                        Watch on YouTube
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
