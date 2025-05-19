
import { useState, useEffect } from 'react';
import { Eye, X, Play, Pause, Volume2, VolumeX, Boxes } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GamingAnimation from '../components/GamingAnimation';

const Works = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<null | typeof portfolioData[0]>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const categories = ["all", ...Array.from(new Set(portfolioData.map(project => project.category)))];
  
  const filteredProjects = activeCategory === "all" 
    ? portfolioData 
    : portfolioData.filter(project => project.category === activeCategory);

  const openProjectModal = (project: typeof portfolioData[0]) => {
    setSelectedProject(project);
    setIsPlaying(false);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsPlaying(false);
    document.body.style.overflow = 'auto';
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Initialize scroll animations
  useEffect(() => {
    const scrollReveal = () => {
      const revealElements = document.querySelectorAll('[data-scroll-reveal="true"]');
      
      revealElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (rect.top <= windowHeight * 0.85) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', scrollReveal);
    // Initial check
    setTimeout(scrollReveal, 100);
    
    return () => window.removeEventListener('scroll', scrollReveal);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-gaming-dark text-white">
      <GamingAnimation />
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-orbitron font-bold mb-8 text-center gaming-gradient-text">My Works</h1>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 scroll-reveal" data-scroll-reveal="true">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-all scroll-reveal-delay-${index % 3 + 1} ${
                  activeCategory === category 
                    ? 'bg-gaming-purple text-white shadow-glow' 
                    : 'bg-gaming-darker hover:bg-gaming-purple/30 text-white/70'
                }`}
              >
                {category === "all" ? "All Works" : category}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="group relative overflow-hidden bg-gaming-darker border-b border-white/5 card-hover scroll-reveal"
                data-scroll-reveal="true"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
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
            ))}
          </div>
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div 
            className="bg-gaming-darker border-t border-white/10 rounded-sm overflow-hidden w-full max-w-4xl max-h-[90vh] neo-blur"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media Content - Image, Video, Audio, or 3D model */}
            <div className="relative bg-black">
              {selectedProject.mediaType === 'image' && (
                <img 
                  src={selectedProject.mediaUrl} 
                  alt={selectedProject.title} 
                  className="w-full h-auto max-h-[50vh] object-contain mx-auto"
                />
              )}
              
              {selectedProject.mediaType === 'video' && (
                <div className="relative aspect-video">
                  <video
                    src={selectedProject.mediaUrl}
                    className="w-full h-full object-contain"
                    controls={false}
                    autoPlay={false}
                    loop
                    muted={isMuted}
                    ref={(el) => {
                      if (el) {
                        isPlaying ? el.play() : el.pause();
                      }
                    }}
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
                {selectedProject.tags.map((tag) => (
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
                  <ul className="list-disc list-inside text-white/60 text-sm">
                    {selectedProject.highlights.map((highlight, index) => (
                      <li key={index} className="text-xs">{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Link button */}
              {selectedProject.link && (
                <div className="mt-4">
                  <a 
                    href={selectedProject.link} 
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
      )}
      
      <Footer />
    </div>
  );
};

export default Works;
