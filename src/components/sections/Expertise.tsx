import { Box, Film, Compass, Smartphone, Users, Target, Music, Camera, Rocket } from 'lucide-react';
import { RevealOnScroll } from '../ui/RevealOnScroll';

const Expertise = () => {
    return (
        <section id="services" className="space-y-12">
            <div className="space-y-8">
                <RevealOnScroll delay={0.1}>
                    <h3 className="text-2xl font-medium tracking-tight text-[#E6E6E6] px-2">Expertise</h3>
                </RevealOnScroll>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Service Item - Social Media Strategy & Planning */}
                    <RevealOnScroll delay={0.1}>
                        <div className="glass-card rounded-2xl p-6 group hover:bg-[#E6E6E6]/5 transition-colors cursor-default h-full">
                            <div className="flex items-start gap-5">
                                <div className="mt-1 text-[#FF7441]/60 group-hover:text-[#FF7441] transition-colors">
                                    <Compass width={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-[#E6E6E6] mb-2">Social Media Strategy & Planning</h4>
                                    <p className="text-sm text-[#E6E6E6]/50 font-light leading-relaxed">
                                        Content calendars, content buckets, platform-specific planning, audience research, and execution-focused strategies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Service Item - Social Media Handling & Management */}
                    <RevealOnScroll delay={0.15}>
                        <div className="glass-card rounded-2xl p-6 group hover:bg-[#E6E6E6]/5 transition-colors cursor-default h-full">
                            <div className="flex items-start gap-5">
                                <div className="mt-1 text-[#FF7441]/60 group-hover:text-[#FF7441] transition-colors">
                                    <Smartphone width={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-[#E6E6E6] mb-2">Social Media Handling & Management</h4>
                                    <p className="text-sm text-[#E6E6E6]/50 font-light leading-relaxed">
                                        End-to-end account handling, consistency planning, posting workflows, and content optimization for reach and engagement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Service Item - Short-Form Content & Visual Creation */}
                    <RevealOnScroll delay={0.2}>
                        <div className="glass-card rounded-2xl p-6 group hover:bg-[#E6E6E6]/5 transition-colors cursor-default h-full">
                            <div className="flex items-start gap-5">
                                <div className="mt-1 text-[#FF7441]/60 group-hover:text-[#FF7441] transition-colors">
                                    <Film width={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-[#E6E6E6] mb-2">Short-Form Content & Visual Creation</h4>
                                    <p className="text-sm text-[#E6E6E6]/50 font-light leading-relaxed">
                                        Reels, stories, short-form videos, trend-based edits, posters, and carousels designed for how people actually scroll.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Service Item - CGI, AI & Visual Advertising */}
                    <RevealOnScroll delay={0.25}>
                        <div className="glass-card rounded-2xl p-6 group hover:bg-[#E6E6E6]/5 transition-colors cursor-default h-full">
                            <div className="flex items-start gap-5">
                                <div className="mt-1 text-[#FF7441]/60 group-hover:text-[#FF7441] transition-colors">
                                    <Box width={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-[#E6E6E6] mb-2">CGI, AI & Visual Advertising</h4>
                                    <p className="text-sm text-[#E6E6E6]/50 font-light leading-relaxed">
                                        CGI-led ads, AI-assisted creatives, 3D product modeling, showcase renders, and animations for digital campaigns.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Service Item - UGC & Influencer Content Editing */}
                    <RevealOnScroll delay={0.3}>
                        <div className="glass-card rounded-2xl p-6 group hover:bg-[#E6E6E6]/5 transition-colors cursor-default h-full">
                            <div className="flex items-start gap-5">
                                <div className="mt-1 text-[#FF7441]/60 group-hover:text-[#FF7441] transition-colors">
                                    <Users width={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-[#E6E6E6] mb-2">UGC & Influencer Content Editing</h4>
                                    <p className="text-sm text-[#E6E6E6]/50 font-light leading-relaxed">
                                        UGC-style edits, influencer content post-production, format optimization, and platform-native storytelling.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Service Item - Paid Media & Automation */}
                    <RevealOnScroll delay={0.35}>
                        <div className="glass-card rounded-2xl p-6 group hover:bg-[#E6E6E6]/5 transition-colors cursor-default h-full">
                            <div className="flex items-start gap-5">
                                <div className="mt-1 text-[#FF7441]/60 group-hover:text-[#FF7441] transition-colors">
                                    <Target width={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-[#E6E6E6] mb-2">Paid Media & Automation</h4>
                                    <p className="text-sm text-[#E6E6E6]/50 font-light leading-relaxed">
                                        Meta Ads execution, WhatsApp marketing workflows, Instagram automation, and creative support for performance campaigns.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Service Item - Sound Design & Color Grading */}
                    <RevealOnScroll delay={0.4}>
                        <div className="glass-card rounded-2xl p-6 group hover:bg-[#E6E6E6]/5 transition-colors cursor-default h-full">
                            <div className="flex items-start gap-5">
                                <div className="mt-1 text-[#FF7441]/60 group-hover:text-[#FF7441] transition-colors">
                                    <Music width={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-[#E6E6E6] mb-2">Sound Design & Color Grading</h4>
                                    <p className="text-sm text-[#E6E6E6]/50 font-light leading-relaxed">
                                        Audio enhancement, sound layering, mood-based grading, and visual consistency across content formats.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Service Item - Video Shoots & Photography */}
                    <RevealOnScroll delay={0.45}>
                        <div className="glass-card rounded-2xl p-6 group hover:bg-[#E6E6E6]/5 transition-colors cursor-default h-full">
                            <div className="flex items-start gap-5">
                                <div className="mt-1 text-[#FF7441]/60 group-hover:text-[#FF7441] transition-colors">
                                    <Camera width={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-[#E6E6E6] mb-2">Video Shoots & Photography</h4>
                                    <p className="text-sm text-[#E6E6E6]/50 font-light leading-relaxed">
                                        On-ground shoots, product visuals, lifestyle photography, and content capture for social media use.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Service Item - End-to-End Content Execution */}
                    <RevealOnScroll delay={0.5}>
                        <div className="glass-card rounded-2xl p-6 group hover:bg-[#E6E6E6]/5 transition-colors cursor-default h-full">
                            <div className="flex items-start gap-5">
                                <div className="mt-1 text-[#FF7441]/60 group-hover:text-[#FF7441] transition-colors">
                                    <Rocket width={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-[#E6E6E6] mb-2">End-to-End Content Execution</h4>
                                    <p className="text-sm text-[#E6E6E6]/50 font-light leading-relaxed">
                                        From idea and planning to creation, posting, and optimization with a clear focus on online presence and relevance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            {/* Tech Stack Marquee */}
            <div className="pt-8 border-t border-[#E6E6E6]/5">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-[#E6E6E6]/10"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#E6E6E6]/40">Technical Arsenal</span>
                    <div className="h-px flex-1 bg-[#E6E6E6]/10"></div>
                </div>

                {/* Marquee Container */}
                <div className="relative overflow-hidden w-full mask-linear-fade">
                    <div className="flex gap-8 whitespace-nowrap animate-marquee">
                        {[
                            "Blender", "After Effects", "Premiere Pro", "DaVinci Resolve",
                            "Photoshop", "Midjourney", "fSpy"
                        ].map((tool, index) => (
                            <div key={index} className="flex items-center gap-2 text-[#E6E6E6]/50 text-xl font-medium px-4 py-2 border border-[#E6E6E6]/5 rounded-full glass-card hover:text-[#FF7441] hover:border-[#FF7441]/30 transition-colors cursor-default">
                                {tool}
                            </div>
                        ))}
                        {[
                            "Blender", "After Effects", "Premiere Pro", "DaVinci Resolve",
                            "Photoshop", "Midjourney", "fSpy"
                        ].map((tool, index) => (
                            <div key={`dup-${index}`} className="flex items-center gap-2 text-[#E6E6E6]/50 text-xl font-medium px-4 py-2 border border-[#E6E6E6]/5 rounded-full glass-card hover:text-[#FF7441] hover:border-[#FF7441]/30 transition-colors cursor-default">
                                {tool}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Expertise;
