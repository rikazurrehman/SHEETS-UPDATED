
import { useState } from 'react';
import { Eye, X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import portfolioData from '../data/portfolioData';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<null | typeof portfolioData[0]>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const openProjectModal = (project: typeof portfolioData[0]) => {
    setSelectedProject(project);
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

  return (
    <section id="portfolio" className="py-16 bg-gaming-darker relative">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-orbitron font-bold mb-8 text-center">My Works</h2>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioData.map((project) => (
            <div 
              key={project.id}
              className="group relative overflow-hidden bg-gaming-dark/30 border-b border-white/5"
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
          ))}
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div 
            className="bg-gaming-darker border-t border-white/10 rounded-sm overflow-hidden w-full max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media Content - Image, Video or Audio player */}
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
              {selectedProject.link && !selectedProject.comingSoon && (
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
    </section>
  );
};

export default Portfolio;
