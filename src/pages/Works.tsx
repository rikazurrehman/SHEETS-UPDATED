import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Eye, X, Play, Pause, Volume2, VolumeX, Youtube } from 'lucide-react';
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

  // Determine if the thumbnail aspect ratio is portrait (vertical)
  const isPortrait = project.imageUrl.includes('portrait') || project.imageUrl.includes('vertical');

  return (
    <div 
      className={`group relative overflow-hidden rounded-lg bg-gaming-darker/40 backdrop-blur-sm border border-gaming-purple/10 transition-all duration-300 hover:border-gaming-purple/30 hover:shadow-glow-strong cursor-pointer hover:cursor-pointer h-full flex flex-col`}
      style={{ 
        animationDelay: `${index * 0.1}s`, 
        animationFillMode: 'both' 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => openProjectModal(project)}
    >
      {/* Project Media Thumbnail */}
      <div className={`${isPortrait ? 'aspect-[9/16]' : 'aspect-[16/9]'} overflow-hidden relative flex-grow`}>
        <img 
          ref={imgRef}
          src={project.imageUrl} 
          alt={project.title} 
          loading={index < 6 ? "eager" : "lazy"}
          className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}
        />
        
        {/* YouTube Indicator */}
        {project.youtubeId && (
          <div className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-1.5 z-10">
            <Youtube size={16} />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-darker via-gaming-darker/80 to-transparent opacity-70"></div>
        
        {/* Content - Always visible */}
        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
          <div className="transform transition-all duration-300">
            <span className="text-gaming-purple text-xs sm:text-sm font-medium mb-1 sm:mb-2 block">{project.category}</span>
            <h3 className="text-lg sm:text-xl font-orbitron font-bold text-white mb-1 sm:mb-2">{project.title}</h3>
            <p className="text-white/70 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2">{project.shortDescription}</p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {project.tags.slice(0, 2).map((tag) => (
                <span 
                  key={tag} 
                  className="text-xs px-2 py-0.5 rounded-full bg-gaming-purple/10 text-gaming-purple/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const Works = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { optimizeVideo } = useMediaOptimization();

  // Define categories manually to ensure correct order and naming
  const categories = ["all", "CGI & VFX", "Motion Graphics", "3D Modelling", "Video Production"];
  
  const filteredProjects = activeCategory === "all" 
    ? portfolioData 
    : portfolioData.filter(project => project.category === activeCategory);

  // Memoize event handlers
  const openProjectModal = useCallback((project: Project) => {
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

  return (
    <div className="bg-gaming-dark text-white min-h-screen flex flex-col">
      <MemoizedGamingAnimation />
      <Navbar />
      
      {/* Content area */}
      <div className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-6">
          <h1 className="text-6xl font-orbitron font-bold text-center mb-6 gaming-gradient-text">Featured Works</h1>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto text-lg">
            Showcasing a blend of CGI excellence, dynamic video production, and creative motion design
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full text-base font-medium transition-all cursor-pointer hover:cursor-pointer ${
                  activeCategory === category
                    ? 'bg-gaming-purple text-gaming-darker font-bold shadow-glow-strong border border-gaming-purple'
                    : 'bg-transparent text-white/90 hover:text-white hover:bg-gaming-purple/10 border border-gaming-purple/20 hover:border-gaming-purple/50'
                }`}
              >
                {category === "all" ? "All Works" : category}
              </button>
            ))}
          </div>
          
          {/* Projects Grid - Updated to handle various aspect ratios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 auto-rows-fr">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                openProjectModal={openProjectModal}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg cursor-pointer"
          onClick={closeProjectModal}
        >
          <div 
            className="bg-gaming-darker/90 backdrop-blur-sm border border-gaming-purple/20 rounded-lg overflow-hidden w-full max-w-5xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              {/* Media Content */}
              <div className="relative bg-black/50 md:w-3/5">
                {selectedProject.youtubeId ? (
                  // YouTube Video Embed
                  <div className="w-full">
                    <YouTubeEmbed 
                      videoId={selectedProject.youtubeId} 
                      title={selectedProject.title}
                    />
                  </div>
                ) : selectedProject.mediaType === 'video' ? (
                  // Regular Video
                  <div className="relative aspect-video w-full">
                    <video
                      ref={videoRef}
                      src={selectedProject.mediaUrl}
                      className="w-full h-full object-contain"
                      controls={false}
                      autoPlay={false}
                      loop
                      muted={isMuted}
                      playsInline
                      poster={selectedProject.imageUrl}
                    />
                    <div className="absolute bottom-4 left-4 flex space-x-3">
                      <button 
                        onClick={togglePlayPause}
                        className="bg-gaming-purple/20 hover:bg-gaming-purple/40 p-2 rounded-full backdrop-blur-sm transition-all cursor-pointer hover:cursor-pointer"
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                      <button 
                        onClick={toggleMute}
                        className="bg-gaming-purple/20 hover:bg-gaming-purple/40 p-2 rounded-full backdrop-blur-sm transition-all cursor-pointer hover:cursor-pointer"
                      >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                    </div>
                  </div>
                ) : (
                  // Image
                  <div className="w-full">
                    <img 
                      src={selectedProject.mediaUrl} 
                      alt={selectedProject.title} 
                      className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                    />
                  </div>
                )}
                
                {/* Close button */}
                <button 
                  onClick={closeProjectModal}
                  className="absolute top-4 right-4 bg-gaming-purple/20 hover:bg-gaming-purple/40 p-2 rounded-full backdrop-blur-sm transition-all cursor-pointer hover:cursor-pointer z-10"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6 md:p-8 md:w-2/5 max-h-[70vh] md:overflow-y-auto">
                <div className="flex flex-col mb-6">
                  <h3 className="text-2xl font-orbitron font-bold mb-2">{selectedProject.title}</h3>
                  <span className="text-gaming-purple text-sm font-medium mb-4">{selectedProject.category}</span>
                  <p className="text-white/80 mb-6">{selectedProject.fullDescription}</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-orbitron font-semibold mb-3 text-white/90">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool) => (
                        <span 
                          key={tool}
                          className="px-3 py-1 rounded-full bg-gaming-purple/10 text-gaming-purple/90 text-sm"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-orbitron font-semibold mb-3 text-white/90">Key Features</h4>
                    <ul className="space-y-2 text-white/70">
                      {selectedProject.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gaming-purple"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
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
