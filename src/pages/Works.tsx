import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Eye, X, Play, Pause, Volume2, VolumeX, Youtube, ArrowRight, Filter, ExternalLink, Sparkles } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GamingAnimation from '../components/GamingAnimation';
import useMediaOptimization from '../hooks/useMediaOptimization';
import YouTubeEmbed from '../components/YouTubeEmbed';
import Particles from '../components/Particles';

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
      className={`project-card group relative overflow-hidden rounded-xl bg-black/40 border border-white/10 transition-all duration-300 hover:border-gaming-purple/30 hover:shadow-glow cursor-pointer h-full flex flex-col z-10 backdrop-blur-sm animate-fadeIn`}
      style={{ 
        animationDelay: `${index * 0.1}s`, 
        animationFillMode: 'both' 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProjectClick}
    >
      {/* Project Media Thumbnail */}
      <div className={`${isPortrait ? 'aspect-[9/16]' : 'aspect-video'} overflow-hidden relative flex-shrink-0`}>
        <img 
          ref={imgRef}
          src={project.imageUrl} 
          alt={project.title} 
          loading={index < 6 ? "eager" : "lazy"}
          className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-105 brightness-110' : 'brightness-90'}`}
        />
        
        {/* YouTube Indicator */}
        {project.youtubeId && (
          <div className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-1.5 z-10 shadow-glow">
            <Youtube size={16} />
          </div>
        )}
        
        {/* Coming Soon Badge */}
        {project.comingSoon && (
          <div className="absolute top-2 right-2 bg-gaming-purple/80 text-white text-xs px-2 py-0.5 rounded-sm z-10 shadow-glow">
            Soon
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-darker to-transparent opacity-70 pointer-events-none"></div>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 z-10">
        <span className="inline-block text-white text-xs font-medium mb-2 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">{project.category}</span>
        <h3 className="text-base font-medium mb-1 text-white line-clamp-1">{project.title}</h3>
        <p className="text-white/60 text-xs mb-3 line-clamp-2">{project.shortDescription}</p>
        
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-0.5 rounded-full bg-black/20 text-white/90 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Button */}
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            e.stopPropagation(); // Stop propagation
            if (!project.comingSoon) {
              openProjectModal(project);
            }
          }}
          className="group relative overflow-hidden flex items-center text-xs text-white/80 hover:text-white bg-black/40 px-3 py-1.5 rounded-sm transition-all duration-300 hover:border-gaming-purple/30 border border-white/10"
          disabled={project.comingSoon}
        >
          {/* Button background effects */}
          {!project.comingSoon && (
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute -inset-x-1/4 top-0 h-px w-[150%] bg-gradient-to-r from-transparent via-gaming-purple/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-opacity"></div>
            </div>
          )}
          
          <Eye size={14} className="mr-1.5 relative z-10" />
          <span className="relative z-10">{project.comingSoon ? 'Coming Soon' : 'View Project'}</span>
        </button>
      </div>
      
      {/* Hover glow effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-purple/5 to-transparent opacity-30 pointer-events-none"></div>
      )}
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
        className={`group relative overflow-hidden px-5 py-2 rounded-full text-sm transition-all duration-300 ${
          isActive
            ? 'bg-black/40 backdrop-blur-sm text-white border border-gaming-purple/30 shadow-glow'
            : 'bg-transparent text-white/70 border border-transparent hover:bg-black/20 hover:border-white/10 hover:text-white'
        }`}
      >
        {isActive && (
          <div className="absolute -inset-x-1/4 top-0 h-px w-[150%] bg-gradient-to-r from-transparent via-gaming-purple/50 to-transparent group-hover:animate-scan"></div>
        )}
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
  const [isVisible, setIsVisible] = useState(false);
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

  // Trigger animation after mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      <Particles className="absolute inset-0 z-10" />
      <Navbar />
      
      {/* Digital circuit pattern - decorative elements from Hero */}
      <div className="absolute top-1/4 right-10 w-20 h-20 border border-white/5 rounded-md rotate-12 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-purple/30"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-blue/30"></div>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gaming-purple rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-gaming-blue rounded-full"></div>
      </div>
      
      <div className="absolute bottom-1/4 left-10 w-16 h-16 border border-white/5 rounded-md -rotate-12 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-blue/30"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-purple/30"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-gaming-blue rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-gaming-purple rounded-full"></div>
      </div>
      
      {/* Floating animated shapes */}
      <div className="absolute top-32 left-1/4 w-16 h-16 border border-white/10 rounded-full blur-sm animate-float opacity-20 pointer-events-none"></div>
      <div className="absolute top-48 right-1/4 w-24 h-24 border border-white/5 rounded-full blur-sm animate-float opacity-10 pointer-events-none" style={{ animationDuration: '15s', animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-1/3 w-20 h-20 border border-white/10 rounded-sm blur-sm animate-float opacity-20 pointer-events-none" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
      
      {/* Content area */}
      <div className="pt-28 pb-20 flex-grow relative z-20" ref={contentRef} onClick={handleContainerClick}>
        <div className="container mx-auto px-6">
          {/* Header Section - Styled like Hero */}
          <div 
            className={`max-w-4xl mx-auto mb-14 text-center transition-all duration-700 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="relative mb-6">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-gaming-purple/50 to-transparent"></div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight relative">
                My <span className="gaming-gradient-text relative">
                  Portfolio
                  <Sparkles className="absolute -top-5 -right-5 w-4 h-4 text-gaming-purple opacity-70 animate-pulse" />
                </span>
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-gaming-purple to-gaming-blue rounded-full mx-auto mt-3 mb-6 opacity-80"></div>
            </div>
            
            <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
              Explore my creative work across 
              <span className="gaming-gradient-text font-medium relative ml-2">
                different visual disciplines
                <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-gaming-purple/50 to-gaming-blue/50"></div>
              </span>
            </p>
            
            {/* Glowing accent dots */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gaming-purple rounded-full shadow-glow animate-pulse-slow"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gaming-blue rounded-full shadow-glow animate-pulse-slow animation-delay-2000"></div>
          </div>
          
          {/* Category Filter - Mobile */}
          <div className="md:hidden mb-8" ref={categoryContainerRef}>
            <button 
              onClick={toggleFilters}
              className="w-full flex items-center justify-between px-5 py-3 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 text-white focus:outline-none hover:border-gaming-purple/30 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-white/70" />
                <span className="font-medium">{activeCategory === 'all' ? 'All Categories' : activeCategory}</span>
              </div>
              <span className="text-white/70">{showFilters ? '−' : '+'}</span>
            </button>
            
            {showFilters && (
              <div className="mt-2 p-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 flex flex-col space-y-1">
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
                        ? 'bg-gaming-purple/10 text-white font-medium border border-white/10'
                        : 'text-white/70 hover:bg-black/30 hover:text-white'
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
            className={`hidden md:flex flex-wrap justify-center gap-3 mb-12 relative z-30 pointer-events-auto transition-all duration-700 delay-100 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {categories.map((category, index) => (
              <CategoryButton
                key={category}
                category={category}
                isActive={activeCategory === category}
                onClick={handleCategoryChange}
              />
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr pointer-events-auto animate-staggerFadeIn transition-all duration-700 delay-200 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
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
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gaming-darker/60 to-transparent pointer-events-none"></div>
      
      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-xl cursor-pointer animate-fadeIn"
          onClick={(e) => {
            e.preventDefault();
            closeProjectModal();
          }}
        >
          <div 
            className="bg-black/70 backdrop-blur-md border border-white/10 hover:border-gaming-purple/20 rounded-none sm:rounded-xl overflow-hidden w-full h-full sm:h-auto sm:max-w-5xl sm:max-h-[90vh] cursor-default shadow-glow animate-scaleIn overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Digital circuit pattern */}
            <div className="absolute top-5 right-5 w-10 h-10 border border-white/5 rounded-md rotate-12 opacity-20 pointer-events-none hidden sm:block">
              <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-purple/30"></div>
              <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-blue/30"></div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-start h-full">
              {/* Media Content */}
              <div className="relative bg-black/80 md:w-2/5 h-auto max-h-[30vh] sm:max-h-[40vh] md:max-h-full">
                {selectedProject.youtubeId ? (
                  // YouTube Video Embed - Ensure this works correctly
                  <div className="w-full aspect-video sm:aspect-[9/16]" onClick={(e) => e.stopPropagation()}>
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
                        className="bg-black/30 hover:bg-black/50 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer text-white shadow-glow"
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="bg-black/30 hover:bg-black/50 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer text-white shadow-glow"
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
                      className="w-full h-auto max-h-[30vh] sm:max-h-[40vh] md:max-h-[70vh] object-contain mx-auto"
                    />
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-4 md:p-6 lg:p-8 md:w-3/5 overflow-y-auto flex-grow relative" onClick={(e) => e.stopPropagation()}>
                {/* Close button - moved from media content to top-right of info panel */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    closeProjectModal();
                  }}
                  className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer text-white shadow-glow z-30"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
                
                <div className="relative mb-6 md:mb-8 mt-2 md:mt-0">
                  <div className="absolute -top-5 left-0 w-20 h-px bg-gradient-to-r from-gaming-purple/50 to-transparent"></div>
                  <span className="inline-block text-white/90 text-xs font-medium mb-2 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">{selectedProject.category}</span>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 gaming-gradient-text relative">
                    {selectedProject.title}
                    <Sparkles className="absolute -top-5 -right-5 w-4 h-4 text-gaming-purple opacity-70 animate-pulse" />
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">{selectedProject.fullDescription}</p>
                </div>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h4 className="text-base font-medium mb-2 md:mb-3 text-white/90 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gaming-purple shadow-glow"></span>
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool) => (
                        <span 
                          key={tool}
                          className="px-2 sm:px-3 py-1 rounded-full bg-black/30 border border-white/10 text-white/80 text-xs hover:bg-black/40 hover:border-white/20 transition-all"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium mb-2 md:mb-3 text-white/90 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gaming-blue shadow-glow"></span>
                      Key Features
                    </h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      {selectedProject.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-white/70 mt-2 shadow-glow flex-shrink-0"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* YouTube Link */}
                  {selectedProject.youtubeId && (
                    <div className="mt-4 md:mt-6">
                      <a 
                        href={`https://www.youtube.com/watch?v=${selectedProject.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/50 text-white rounded-lg transition-all text-sm font-medium border border-white/10 hover:border-gaming-purple/30 shadow-glow"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Button background effects */}
                        <div className="absolute inset-0 w-full h-full">
                          <div className="absolute -inset-x-1/4 top-0 h-px w-[150%] bg-gradient-to-r from-transparent via-gaming-purple/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-opacity"></div>
                        </div>
                        
                        <ExternalLink size={14} className="relative z-10" />
                        <span className="relative z-10">View on YouTube</span>
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
