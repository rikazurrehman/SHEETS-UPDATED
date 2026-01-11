import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const brands = [
    { name: "Naturals", logo: "/assets/logos/naturals.png" },
    { name: "Page 3", logo: "/assets/logos/page3.png" },
    { name: "Nails N Beyond", logo: "/assets/logos/nailsnbeyond.png" },
    { name: "Bespoke", logo: "/assets/logos/bespoke.png" },
    { name: "Naturals Signature", logo: "/assets/logos/signature.png" },
    { name: "Naturals Ayur", logo: "/assets/logos/ayur.png" }
];

const AboutSection = () => {
    return (
        <section id="about" className="pt-12">
            <div className="space-y-12">
                {/* Photo Space */}
                <div className="w-full aspect-video bg-[#E6E6E6]/5 rounded-2xl overflow-hidden shadow-2xl relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
                    <img
                        src="/assets/about me.png"
                        alt="Rikaz"
                        className="w-full h-full object-contain object-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                    />
                </div>

                {/* Title */}
                <div>
                    <h3 className="text-2xl font-medium tracking-tight text-[#E6E6E6] mb-4">About Me</h3>
                    <p className="text-[#E6E6E6]/60 text-sm leading-relaxed max-w-lg">
                        Hey, I’m Rikaz.<br />
                        You’ll find my work and things I’m working on here.
                    </p>
                </div>

                {/* Bio Content */}
                <div className="space-y-8">
                    <h2 className="text-3xl md:text-4xl font-medium text-[#E6E6E6] leading-tight max-w-3xl">
                        I am a <span className="text-[#FF7441]">Social Media Marketing and Content Specialist</span> who enjoys building content that feels real and actually connects with people.
                    </h2>

                    <div className="space-y-6 text-[#E6E6E6]/70 leading-relaxed font-light text-lg max-w-3xl">
                        <p>
                            I handle social media strategy and planning, starting with audience research, content calendars, and content buckets. From there, I plan and execute social content across reels, stories, short-form videos, posters, carousels, and trend-based formats built for each platform.
                        </p>
                        <p>
                            Along with organic content, I work on paid media including Meta ads, WhatsApp marketing, and Instagram automation to support reach, leads, and engagement. I also handle visuals like AI and CGI ads, UGC-style edits, influencer content editing, sound design, color grading, 3D product modeling for showcase renders and animations, as well as video shoots and photography.
                        </p>
                        <p>
                            From concept to posting and optimization, I stay hands-on throughout the process. If it helps improve a brand’s online presence and performance, it’s part of my work.
                        </p>
                    </div>

                    <Link to="/works" className="inline-flex items-center gap-2 text-[#FF7441] hover:text-[#FF7441]/80 transition-colors font-medium group">
                        My works <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>


            </div>
        </section>
    );
};

export default AboutSection;
