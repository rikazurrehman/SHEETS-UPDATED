import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Eye, X, Play, Pause, Volume2, VolumeX, Boxes } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GamingAnimation from '../components/GamingAnimation';
import useMediaOptimization from '@/hooks/useMediaOptimization';

// Memoize GamingAnimation for better performance
const MemoizedGamingAnimation = memo(GamingAnimation);

// Optimized Project Card Component
const ProjectCard = memo(({ project, openProjectModal, index }) => {
  // Track if element is visible for lazy loading
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className="group relative overflow-hidden bg-gaming-darker border-b border-white/5 hover:shadow-md transition-shadow animate-fadeIn"
      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
    >
      {/* Project Image - with loading optimization */}
      <div className="aspect-video overflow-hidden relative">
        {(index < 6 || isVisible) ? (
          <img 
            ref={imgRef}
            src={project.imageUrl} 
            alt={project.title} 
            loading={index < 6 ? "eager" : "lazy"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            width="400"
            height="225"
          />
        ) : (
          <div ref={imgRef} className="w-full h-full bg-gaming-darker"></div>
        )}
        
        {/* Media Type Indicator */}
        <div className="absolute bottom-2 left-2 bg-black/50 rounded-full p-1">
          {project.mediaType === 'video' && <Play size={14} className="text-white" />}
          {project.mediaType === 'audio' && <Volume2 size={14} className="text-white" />}
          {project.mediaType === '3d-model' && <Boxes size={14} className="text-white" />}
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-sm">
          {project.category}
        </div>
        
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
        >
          <Eye size={14} className="mr-1" />
          View Project
        </button>
      </div>
    </div>
  );
});

const Works = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(12);
  const { optimizeVideo } = useMediaOptimization();
  const videoRef = useRef(null);

  const categories = ["all", ...Array.from(new Set(portfolioData.map(project => project.category)))];
  
  const filteredProjects = activeCategory === "all" 
    ? portfolioData 
    : portfolioData.filter(project => project.category === activeCategory);

  // Load more projects as user scrolls
  const loadMoreProjects = () => {
    if (visibleProjects < filteredProjects.length) {
      setVisibleProjects(prev => Math.min(prev + 6, filteredProjects.length));
    }
  };

  // Set up intersection observer to detect when user scrolls to the bottom
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '200px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreProjects();
      }
    }, options);

    const sentinelElement = document.getElementById('load-more-sentinel');
    if (sentinelElement) {
      observer.observe(sentinelElement);
    }

    return () => observer.disconnect();
  }, [visibleProjects, filteredProjects.length]);

  // Reset visible projects when category changes
  useEffect(() => {
    setVisibleProjects(12);
  }, [activeCategory]);

  // Memoize event handlers to prevent unnecessary re-renders
  const openProjectModal = useCallback((project) => {
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
    setIsPlaying(prev => !prev);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  // Apply video optimizations when selected project changes
  useEffect(() => {
    if (selectedProject && selectedProject.mediaType === 'video' && videoRef.current) {
      optimizeVideo(videoRef.current);
    }
  }, [selectedProject, optimizeVideo]);
  
  // Handle escape key for modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        closeProjectModal();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject, closeProjectModal]);

  return (
    <div className="min-h-screen bg-gaming-dark text-white">
      {/* Only render animation when not on a low-end device */}
      {!document.body.classList.contains('low-end-device') && <MemoizedGamingAnimation />}
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-orbitron font-bold mb-6 text-center gaming-gradient-text">My Works</h1>
          
          {/* Category Filter - Simplified for better performance */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-gaming-purple text-white' 
                    : 'bg-gaming-darker hover:bg-gaming-purple/30 text-white/70'
                }`}
              >
                {category === "all" ? "All Works" : category}
              </button>
            ))}
          </div>
          
          {/* Projects Grid - Using progressive loading */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.slice(0, visibleProjects).map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                openProjectModal={openProjectModal}
                index={index}
              />
            ))}
          </div>
          
          {/* Load more sentinel element */}
          {visibleProjects < filteredProjects.length && (
            <div id="load-more-sentinel" className="w-full h-20 flex items-center justify-center mt-8">
              <div className="animate-spin w-6 h-6 border-2 border-gaming-purple border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Project Modal - Only render when needed with optimized video loading */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeProjectModal}
        >
          <div 
            className="bg-gaming-darker border-t border-white/10 rounded-sm overflow-hidden w-full max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media Content - Image, Video, Audio, or 3D model */}
            <div className="relative bg-black">
              {selectedProject.mediaType === 'image' && (
                <img 
                  src={selectedProject.mediaUrl} 
                  alt={selectedProject.title} 
                  className="w-full h-auto max-h-[50vh] object-contain mx-auto"
                  loading="eager"
                />
              )}
              
              {selectedProject.mediaType === 'video' && (
                <div className="relative aspect-video">
                  <video
                    ref={videoRef}
                    src={selectedProject.mediaUrl}
                    className="w-full h-full object-contain"
                    controls={false}
                    autoPlay={false}
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    poster={selectedProject.imageUrl}
                  />
                  <div className="absolute bottom-4 left-4 flex space-x-3">
                    <button 
                      onClick={togglePlayPause}
                      className="bg-black/50 hover:bg-black/70 p-2 rounded-full"
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button 
                      onClick={toggleMute}
                      className="bg-black/50 hover:bg-black/70 p-2 rounded-full"
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>
                </div>
              )}
              
              {selectedProject.mediaType === 'audio' && (
                <div className="bg-gaming-darker py-8 px-4 flex items-center justify-center">
                  <audio
                    src={selectedProject.mediaUrl}
                    controls
                    className="w-full max-w-md"
                    preload="metadata"
                  />
                </div>
              )}
              
              {selectedProject.mediaType === '3d-model' && (
                <div className="relative aspect-video bg-gaming-darker flex items-center justify-center">
                  <iframe 
                    src={selectedProject.mediaUrl} 
                    title={selectedProject.title} 
                    className="w-full h-[50vh]"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
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
              <h3 className="text-xl font-medium mb-2">{selectedProject.title}</h3>
              
              <div className="mb-3 flex flex-wrap gap-1">
                {selectedProject.tags.slice(0,5).map((tag) => (
                  <span 
                    key={tag} 
                    className="bg-gaming-purple/10 text-white/70 text-xs px-2 py-0.5 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-white/70 text-sm mb-4">{selectedProject.fullDescription}</p>
              
              {/* Project details in a more compact form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="text-sm font-medium mb-1 text-white/90">Tools Used</h4>
                  <p className="text-white/60">{selectedProject.tools.join(', ')}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1 text-white/90">Highlights</h4>
                  <ul className="list-disc list-inside text-white/60">
                    {selectedProject.highlights.map(highlight => (
                      <li key={highlight}>{highlight}</li>
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
