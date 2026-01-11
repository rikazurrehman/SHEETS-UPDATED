import { useRef, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import useMediaOptimization from '@/hooks/useMediaOptimization';

interface ProjectModalProps {
    project: typeof portfolioData[0] | null;
    closeProjectModal: () => void;
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    isMuted: boolean;
    setIsMuted: (value: boolean) => void;
}

const ProjectModal = ({
    project,
    closeProjectModal,
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted
}: ProjectModalProps) => {
    const { optimizeVideo } = useMediaOptimization();
    const videoRef = useRef<HTMLVideoElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Hooks must be unconditional
    const togglePlayPause = useCallback((e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying, setIsPlaying]);

    const toggleMute = useCallback((e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }
        setIsMuted(!isMuted);
    }, [isMuted, setIsMuted]);

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeProjectModal();
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [closeProjectModal]);

    // Optimize video playback when video is loaded
    useEffect(() => {
        if (videoRef.current) {
            optimizeVideo(videoRef.current);

            // Auto-play the video when the modal opens if it's a video
            if (project?.mediaType === 'video') {
                videoRef.current.load();
                const playPromise = videoRef.current.play();

                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setIsPlaying(true);
                    }).catch(err => {
                        console.log('Video play prevented:', err);
                        setIsPlaying(false);
                    });
                }
            }
        }
    }, [project, optimizeVideo, setIsPlaying]);

    // Update video play state when isPlaying changes
    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(err => {
                        console.log('Video play prevented:', err);
                        setIsPlaying(false);
                    });
                }
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Update video mute state when isMuted changes
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    if (!project) return null;

    // Handle clicks on the modal background
    const handleModalBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeProjectModal();
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={handleModalBackgroundClick}
        >
            <div
                ref={modalRef}
                className="glass-card border border-[#E6E6E6]/10 rounded-2xl overflow-hidden w-full max-w-6xl max-h-[90vh] z-[10002] flex flex-col md:flex-row shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Media Content - Image, Video or Audio player */}
                <div className="relative bg-[#050505] w-full md:w-2/3 flex items-center justify-center overflow-hidden">
                    {/* Noise Overlay applied correctly */}
                    <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none z-10"></div>

                    {/* Youtube embed if available and preferred */}
                    {project.youtubeId ? (
                        <div className="w-full h-full flex items-center justify-center p-4 relative z-20">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&modestbranding=1&rel=0`}
                                title={project.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full max-w-full max-h-full object-contain aspect-video md:aspect-auto"
                            ></iframe>
                        </div>
                    ) : project.mediaType === 'video' ? (
                        <div className="relative w-full h-full min-h-[300px] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                            <video
                                ref={videoRef}
                                src={project.mediaUrl}
                                className="w-full max-h-[80vh] object-contain"
                                controls={false}
                                autoPlay={false}
                                loop
                                muted={isMuted}
                                playsInline
                                preload="auto"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePlayPause();
                                }}
                            />
                            <div className="absolute bottom-6 left-6 flex space-x-3 z-20">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        togglePlayPause();
                                    }}
                                    className="bg-black/50 hover:bg-[#FF7441] text-white p-3 rounded-full backdrop-blur-md transition-colors"
                                    aria-label={isPlaying ? "Pause" : "Play"}
                                >
                                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleMute();
                                    }}
                                    className="bg-black/50 hover:bg-[#FF7441] text-white p-3 rounded-full backdrop-blur-md transition-colors"
                                    aria-label={isMuted ? "Unmute" : "Mute"}
                                >
                                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center p-4">
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="max-w-full max-h-[80vh] object-contain"
                            />
                        </div>
                    )}

                    {/* Close button (Mobile) */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            closeProjectModal();
                        }}
                        className="absolute top-4 right-4 bg-black/50 hover:bg-[#FF7441] p-2 rounded-full text-white transition-colors z-30 md:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content Sidebar */}
                <div className="w-full md:w-1/3 p-6 md:p-8 overflow-y-auto max-h-[40vh] md:max-h-full bg-[#0D0D0D] border-l border-white/5 relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            closeProjectModal();
                        }}
                        className="absolute top-4 right-4 bg-white/5 hover:bg-[#FF7441] p-2 rounded-full text-white transition-colors z-30 hidden md:block"
                    >
                        <X size={18} />
                    </button>

                    <div className="mb-6">
                        <h3 className="text-sm font-bold text-[#FF7441] uppercase tracking-widest mb-2">{project.category}</h3>
                        <h2 className="text-2xl font-bold text-[#E6E6E6] leading-tight">{project.title}</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <p className="text-[#E6E6E6]/70 leading-relaxed text-sm">{project.fullDescription}</p>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-[#E6E6E6] mb-2 uppercase tracking-wide opacity-50">Tools</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tools?.map((tool: string) => (
                                    <span key={tool} className="text-xs border border-[#E6E6E6]/10 px-2 py-1 rounded-md text-[#E6E6E6]/60">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-[#E6E6E6] mb-2 uppercase tracking-wide opacity-50">Highlights</h4>
                            <ul className="space-y-1">
                                {project.highlights?.map((highlight: string, i: number) => (
                                    <li key={i} className="text-sm text-[#E6E6E6]/60 flex items-start gap-2">
                                        <span className="text-[#FF7441] mt-1.5">•</span> {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {(project.link && project.link !== '#') && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-3 text-center bg-[#FF7441] text-[#0D0D0D] font-bold rounded-lg hover:bg-[#FF7441]/90 transition-colors mt-8"
                            >
                                View Project
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ProjectModal;
