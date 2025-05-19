
import { useState } from 'react';
import { Eye, X } from 'lucide-react';
import portfolioData from '../data/portfolioData';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<null | typeof portfolioData[0]>(null);

  const openProjectModal = (project: typeof portfolioData[0]) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="portfolio" className="py-24 bg-gaming-darker relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center">My Works</h2>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {portfolioData.map((project) => (
            <div 
              key={project.id}
              className="group relative overflow-hidden rounded-lg card-hover"
            >
              {/* Project Image */}
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gaming-darker to-transparent opacity-80"></div>
                
                {/* Coming Soon Badge */}
                {project.comingSoon && (
                  <div className="absolute top-4 right-4 bg-gaming-purple/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Coming Soon
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-xl font-orbitron font-semibold mb-2 text-white">{project.title}</h3>
                <p className="text-white/70 text-sm mb-4 line-clamp-2">{project.shortDescription}</p>
                
                {/* Button */}
                <button
                  onClick={() => openProjectModal(project)}
                  className="flex items-center text-sm text-white bg-gaming-purple/20 border border-gaming-purple/50 px-4 py-2 rounded-md transition-all hover:bg-gaming-purple/40"
                  disabled={project.comingSoon}
                >
                  <Eye size={16} className="mr-2" />
                  {project.comingSoon ? 'Coming Soon' : 'View Details'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div 
            className="bg-gaming-dark border border-gaming-purple/30 rounded-lg shadow-glow overflow-hidden w-full max-w-4xl max-h-[90vh] animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Header image */}
              <img 
                src={selectedProject.imageUrl} 
                alt={selectedProject.title} 
                className="w-full h-64 object-cover"
              />
              
              {/* Close button */}
              <button 
                onClick={closeProjectModal}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white/80 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
              <h3 className="text-2xl font-orbitron font-bold mb-4 neon-text">{selectedProject.title}</h3>
              
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="bg-gaming-purple/20 text-white/90 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-white/80 mb-6">{selectedProject.fullDescription}</p>
              
              {/* Project details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 neon-text-blue">Tools Used</h4>
                  <ul className="list-disc list-inside text-white/70">
                    {selectedProject.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-3 neon-text-blue">Project Highlights</h4>
                  <ul className="list-disc list-inside text-white/70">
                    {selectedProject.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Link button */}
              {selectedProject.link && (
                <div className="mt-8">
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block btn-glow-alt"
                  >
                    View Project
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Decorative elements */}
      <div className="absolute -top-10 left-0 w-full h-20 bg-gradient-to-r from-gaming-blue/10 via-gaming-purple/10 to-gaming-blue/10 blur-3xl opacity-30"></div>
    </section>
  );
};

export default Portfolio;
