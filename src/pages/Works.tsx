import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Eye, X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GamingAnimation from '../components/GamingAnimation';
import useMediaOptimization from '../hooks/useMediaOptimization';

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

  return (
    <div 
      className="group relative overflow-hidden rounded-lg bg-gaming-darker/40 backdrop-blur-sm border border-gaming-purple/10 transition-all duration-300 hover:border-gaming-purple/30 hover:shadow-glow-strong cursor-pointer hover:cursor-pointer"
      style={{ 
        animationDelay: `${index * 0.1}s`, 
        animationFillMode: 'both' 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => openProjectModal(project)}
    >
      {/* Project Media Thumbnail */}
      <div className="aspect-[9/16] overflow-hidden">
        <img 
          ref={imgRef}
          src={project.imageUrl} 
          alt={project.title} 
          loading={index < 6 ? "eager" : "lazy"}
          className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-105 blur-sm' : ''}`}
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-gaming-darker via-gaming-darker/80 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-90' : 'opacity-50'}`}></div>
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className={`transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <span className="text-gaming-purple text-sm font-medium mb-2 block">{project.category}</span>
          <h3 className="text-xl font-orbitron font-bold text-white mb-2">{project.title}</h3>
          <p className="text-white/70 text-sm mb-4">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="text-xs px-2 py-1 rounded-full bg-gaming-purple/10 text-gaming-purple/90"
              >
                {tag}
              </span>
            ))}
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
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
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
            className="bg-gaming-darker/90 backdrop-blur-sm border border-gaming-purple/20 rounded-lg overflow-hidden w-full max-w-4xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media Content */}
            <div className="relative bg-black/50">
              {selectedProject.mediaType === 'video' && (
                <div className="relative aspect-[9/16] max-h-[85vh] mx-auto">
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
              )}
              
              {selectedProject.mediaType === 'image' && (
                <div className="aspect-[9/16] max-h-[85vh] mx-auto">
                  <img 
                    src={selectedProject.mediaUrl} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              
              {/* Close button */}
              <button 
                onClick={closeProjectModal}
                className="absolute top-4 right-4 bg-gaming-purple/20 hover:bg-gaming-purple/40 p-2 rounded-full backdrop-blur-sm transition-all cursor-pointer hover:cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-orbitron font-bold">{selectedProject.title}</h3>
                <span className="text-gaming-purple text-sm font-medium">{selectedProject.category}</span>
              </div>
              
              <p className="text-white/80 mb-6">{selectedProject.fullDescription}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      )}
      
      <Footer />
    </div>
  );
};

export default Works;
