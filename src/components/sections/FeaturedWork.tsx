import { useState, useCallback } from 'react';
import { ArrowRight, ArrowUpRight, Play, Eye } from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import ProjectModal from '../ProjectModal';

const FeaturedWork = () => {
    const [selectedProject, setSelectedProject] = useState<typeof portfolioData[0] | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);

    const openProjectModal = useCallback((project: typeof portfolioData[0]) => {
        if (!project.comingSoon) {
            setSelectedProject(project);
            setIsPlaying(false);
            // Auto play logic is handled in Modal
            document.body.style.overflow = 'hidden';
        }
    }, []);

    const closeProjectModal = useCallback(() => {
        setSelectedProject(null);
        setIsPlaying(false);
        document.body.style.overflow = 'auto';
    }, []);

    return (
        <section id="featured" className="pt-12">
            <div className="flex items-end justify-between mb-8 px-2">
                <h3 className="text-2xl font-medium tracking-tight text-[#E6E6E6]">Selected Work</h3>
                <div className="text-xs font-medium text-[#E6E6E6]/40 flex items-center gap-1">
                    {portfolioData.length} Projects <ArrowRight width={12} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {portfolioData.map((project, index) => (
                    <div
                        key={project.id}
                        onClick={() => openProjectModal(project)}
                        className={`glass-card rounded-3xl overflow-hidden group relative card-hover cursor-pointer ${
                            // Make every 3rd item span 2 columns if desired, or keep uniform. 
                            // Let's keep it uniform for now to ensure "Everything" is visible clearly.
                            // Or use the 'featured' layout: generic grid.
                            ''
                            }`}
                    >
                        <div className="aspect-video bg-[#111] img-zoom-container relative w-full">
                            {/* Image */}
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>

                            {/* Play Icon if video */}
                            {project.mediaType === 'video' && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100 border border-white/20">
                                    <Play width={16} fill="white" className="ml-1 text-white" />
                                </div>
                            )}
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent pt-20">
                            <div className="flex justify-between items-end">
                                <div className="flex-1 pr-4">
                                    <div className="text-[#FF7441] text-[10px] font-bold uppercase tracking-widest mb-2">{project.category}</div>
                                    <h4 className="text-xl font-medium text-[#E6E6E6] leading-tight group-hover:text-white transition-colors line-clamp-2 md:line-clamp-1">{project.title}</h4>
                                </div>
                                <div className="h-10 w-10 shrink-0 rounded-full bg-[#E6E6E6]/10 backdrop-blur-md flex items-center justify-center text-[#E6E6E6] group-hover:bg-[#FF7441] group-hover:text-[#0D0D0D] transition-all transform group-hover:-translate-y-1 group-hover:translate-x-1">
                                    <ArrowUpRight width={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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

export default FeaturedWork;
