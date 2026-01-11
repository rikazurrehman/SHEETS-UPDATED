import { ArrowUpRight } from 'lucide-react';

const HeroSection = () => {
    // Defines brands for the footer strip
    const brands = [
        { name: "Page 3", logo: "/assets/brands/page3.png" },
        { name: "Nails N Beyond", logo: "/assets/brands/nails.png" },
        { name: "Bespoke", logo: "/assets/brands/bespoke.png" },
        { name: "Naturals", logo: "/assets/brands/naturals.png" },
        { name: "Naturals Signature", logo: "/assets/brands/naturalssig.png" },
    ];

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
            {/* Main Orange Glow */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#FF7441] rounded-full blur-[120px] opacity-[0.1] pointer-events-none z-0"></div>

            <div className="container mx-auto max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 px-6 mb-20">
                {/* Text Content */}
                <div className="flex flex-col gap-8 text-left order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E6E6E6]/10 bg-[#E6E6E6]/5 w-fit backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-medium text-[#E6E6E6]/80 tracking-wide uppercase">Available for Q4 Projects</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-[#E6E6E6] leading-[1.05]">
                        Crafting <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7441] to-[#FF9D7E]">Digital Reality</span>
                    </h1>

                    <p className="text-lg md:text-xl text-[#E6E6E6]/70 max-w-xl font-light leading-relaxed">
                        I'm Rikaz, a CGI Artist & Social Media Specialist. I create scroll-stopping visual experiences for brands that demand attention.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-2">
                        <a href="#contact" className="px-8 py-4 bg-[#FF7441] hover:bg-[#FF7441]/90 text-[#0D0D0D] rounded-full text-sm font-bold flex items-center gap-2 transition-all hover:scale-105 group shadow-[0_0_20px_rgba(255,116,65,0.2)]">
                            GET A STRATEGY CALL <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                        <a href="/works" className="px-8 py-4 bg-transparent border border-[#E6E6E6]/20 text-[#E6E6E6] hover:bg-[#E6E6E6]/5 rounded-full text-sm font-semibold transition-all hover:border-[#E6E6E6]/40">
                            VIEW SHOWREEL
                        </a>
                    </div>
                </div>

                {/* Hero Reel / Visual */}
                <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                    {/* Image UI Only - Removed Video UI/Overlays as requested */}
                    <div className="relative w-full max-w-[600px] aspect-[4/3] md:aspect-video lg:aspect-[4/3] rounded-[2rem] overflow-hidden glass-card border-none shadow-2xl group transition-transform duration-500 bg-[#0D0D0D]">
                        {/* Video Background/Image */}
                        <div className="absolute inset-0 bg-[#1A1A1A]">
                            <img src="/assets/DSC09562 (3).png" alt="Profile" className="w-full h-full object-cover opacity-90 transition-opacity duration-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Brands Strip Footer */}
            <div className="w-full border-t border-[#E6E6E6]/5 bg-[#0D0D0D]/30 backdrop-blur-sm mt-auto relative overflow-hidden">
                <div className="max-w-[1600px] mx-auto px-6 py-8">
                    <p className="text-center text-xs text-[#E6E6E6]/20 uppercase tracking-widest mb-6">Trusted by Innovative Companies</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        {brands.map((brand, i) => (
                            <img key={i} src={brand.logo} alt={brand.name} className="h-6 md:h-8 w-auto object-contain hover:opacity-100 transition-opacity" onError={(e) => e.currentTarget.style.display = 'none'} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
