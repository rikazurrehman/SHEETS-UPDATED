import { Camera, Video, Share2, Wand2, MessageSquare, ChevronRight, Award, Sparkles, Code, Layers } from 'lucide-react';
import { useEffect, useState } from 'react';

// Function to generate a colored background when an image fails to load
const generateColoredDataUrl = (text: string) => {
  // Generate a color based on the input text
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Convert to a hex color
  const color = `#${((hash & 0xFFFFFF) | 0x333333).toString(16).padStart(6, '0')}`;
  
  return `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='${color}' /%3E%3Ctext x='50' y='50' font-size='20' text-anchor='middle' alignment-baseline='middle' font-family='Arial' fill='white'%3E${text.charAt(0)}%3C/text%3E%3C/svg%3E`;
};

// Define brands array at the top with other constants
const brands = [
  { name: "Naturals", logo: "/assets/brands/placeholder.png" },
  { name: "Naturals Signature", logo: "/assets/brands/placeholder.png" },
  { name: "Nails n' Beyond", logo: "/assets/brands/placeholder.png" },
  { name: "Page 3", logo: "/assets/brands/placeholder.png" },
  { name: "Bespoke", logo: "/assets/brands/placeholder.png" },
  { name: "NXTFACE", logo: "/assets/brands/placeholder.png" },
  { name: "Tuckin Menswear", logo: "/assets/brands/placeholder.png" }
];

// Duplicate brands for smoother infinite scroll
const scrollingBrands = [...brands, ...brands, ...brands];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setIsVisible(true);
    
    // Optional: Add intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-16 bg-gaming-darker relative scroll-mt-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gaming-darker/60 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-gaming-purple/10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-gaming-blue/10 blur-3xl animate-pulse-slow animation-delay-2000"></div>
      
      {/* Digital circuit pattern */}
      <div className="absolute top-1/4 right-10 w-20 h-20 border border-white/5 rounded-md rotate-12 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-purple/30"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-blue/30"></div>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gaming-purple rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-gaming-blue rounded-full"></div>
      </div>
      
      <div className="absolute bottom-1/4 left-10 w-16 h-16 border border-white/5 rounded-md -rotate-12 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-blue/30"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-purple/30"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-gaming-blue rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-gaming-purple rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative flex flex-col items-center">
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-gaming-purple/50 blur-lg"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight">About <span className="gaming-gradient-text">Me</span></h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gaming-purple to-gaming-blue rounded-full mx-auto mb-12 opacity-80"></div>
          </div>
        </div>
        
        {/* Bio */}
        <div className="mb-16 max-w-3xl mx-auto scroll-reveal relative">
          <div className="absolute -top-10 -left-10 w-20 h-20 border border-white/5 rounded-md rotate-12 opacity-20 pointer-events-none"></div>
          <div className="absolute -bottom-10 -right-10 w-16 h-16 border border-white/5 rounded-md -rotate-12 opacity-20 pointer-events-none"></div>
          
          <div className="space-y-6 text-center bg-black/10 backdrop-blur-sm rounded-2xl p-8 border border-white/5 relative overflow-hidden shadow-lg">
            {/* Background glow effect */}
            <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(147,51,234,0.1),transparent_70%)]"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gaming-purple/20 to-transparent"></div>
            
            <p className="text-xl text-white/90 leading-relaxed">
              I create visual content from storyboard to final delivery—directing 
              <span className="gaming-gradient-text font-medium relative"> CGI videos
                <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-gaming-purple/50 to-gaming-blue/50"></div>
              </span>, crafting 
              <span className="gaming-gradient-text font-medium relative"> 3D renders
                <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-gaming-purple/50 to-gaming-blue/50"></div>
              </span>, and bringing scenes to life with 
              <span className="gaming-gradient-text font-medium relative"> VFX
                <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-gaming-purple/50 to-gaming-blue/50"></div>
              </span> and dynamic 3D camera work.
            </p>
            
            <p className="text-base text-white/80 leading-relaxed">
              Alongside that, I focus on growth-driven social media marketing, Meta Ads, 
              WhatsApp campaigns, and DM automation across WhatsApp and Instagram.
            </p>

            <div className="pt-2">
              <p className="text-base text-white/80 leading-relaxed">
                My toolkit spans short- and long-form editing, speed ramps, documentary-style cuts, 
                motion graphics, SFX, color grading, and compositing.
              </p>
              
              <div className="flex justify-center mt-6">
                <blockquote className="text-base text-white/70 leading-relaxed italic relative max-w-lg mx-auto px-8 py-4 bg-black/20 rounded-xl border-l-2 border-gaming-purple/50">
                  <div className="absolute top-0 right-0 opacity-20 text-gaming-purple transform -translate-y-1/2 translate-x-1/4">
                    <Sparkles size={40} />
                  </div>
                  <p>
                    Always evolving, always hands-on — just aiming to build content that connects and performs.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        
        {/* What I do - Services */}
        <div className="mb-20 scroll-reveal">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 tracking-tight">What I <span className="gaming-gradient-text">Do</span></h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { 
                icon: <Camera className="h-6 w-6" />, 
                title: "3D & CGI", 
                desc: "Creating immersive 3D renders and dynamic camera work for stunning visuals",
                gradient: "from-gaming-purple to-gaming-blue",
                iconBg: "bg-gaming-purple/10",
                iconColor: "text-gaming-purple"
              },
              { 
                icon: <Video className="h-6 w-6" />, 
                title: "Video Production", 
                desc: "Expert editing with speed ramps, cuts, and documentary-style storytelling",
                gradient: "from-gaming-blue to-gaming-purple",
                iconBg: "bg-gaming-blue/10",
                iconColor: "text-gaming-blue"
              },
              { 
                icon: <Wand2 className="h-6 w-6" />, 
                title: "VFX & Motion", 
                desc: "Crafting stunning visual effects, motion graphics, and color grading",
                gradient: "from-gaming-purple to-gaming-blue",
                iconBg: "bg-gaming-purple/10",
                iconColor: "text-gaming-purple"
              },
              { 
                icon: <Share2 className="h-6 w-6" />, 
                title: "Social Media", 
                desc: "Growth-driven marketing strategies across Meta platforms",
                gradient: "from-gaming-blue to-gaming-purple",
                iconBg: "bg-gaming-blue/10",
                iconColor: "text-gaming-blue"
              },
              { 
                icon: <MessageSquare className="h-6 w-6" />, 
                title: "Automation", 
                desc: "WhatsApp and Instagram DM automation for efficient engagement",
                gradient: "from-gaming-purple to-gaming-blue",
                iconBg: "bg-gaming-purple/10",
                iconColor: "text-gaming-purple"
              }
            ].map((service, i) => (
              <div 
                key={i} 
                className="group relative bg-black/20 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden transition-all hover:border-white/10 hover:shadow-lg hover:translate-y-[-2px]"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                
                <div className="p-6">
                  <div className={`inline-flex items-center justify-center p-3 rounded-xl ${service.iconBg} mb-4 border border-white/5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <div className={service.iconColor}>
                      {service.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-medium mb-3 flex items-center gap-2">
                    {service.title}
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </h4>
                  <p className="text-sm text-white/70">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Brands & Collaborations - Infinite Scrolling Section */}
        <div className="mb-12 scroll-reveal">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 tracking-tight">Brands & <span className="gaming-gradient-text">Collaborations</span></h3>
          
          {/* Scrolling container */}
          <div className="relative w-full overflow-hidden py-20 rounded-xl bg-black/30 backdrop-blur-sm border border-white/5 shadow-lg">
            {/* Top glow line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gaming-blue/30 to-transparent"></div>
            
            {/* Bottom scan line animation */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gaming-purple/40 to-transparent opacity-70 animate-[scan_8s_ease-in-out_infinite]"></div>
            
            {/* Smooth infinite scroll track */}
            <div className="marquee-container">
              <div className="marquee-track">
                {scrollingBrands.map((brand, index) => (
                  <div 
                    key={`${brand.name}-${index}`}
                    className="marquee-item mx-8 flex flex-col items-center justify-center p-3 group"
                  >
                    {/* Square container for 1080×1080 brand images */}
                    <div className="w-80 h-80 bg-black/40 rounded-xl border border-white/5 hover:border-gaming-blue/20 flex items-center justify-center mb-4 overflow-hidden shadow-lg group-hover:shadow-glow transition-all duration-300">
                      <img 
                        src={brand.logo}
                        alt={brand.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                        onError={(e) => {
                          e.currentTarget.src = generateColoredDataUrl(brand.name);
                        }}
                      />
                    </div>
                    <span className="text-base text-white/80 text-center font-medium group-hover:text-white transition-colors">{brand.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add gradient overlays for smooth fade effect */}
            <div className="absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-gaming-darker to-transparent z-10"></div>
            <div className="absolute top-0 right-0 h-full w-40 bg-gradient-to-l from-gaming-darker to-transparent z-10"></div>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="absolute -bottom-10 left-0 w-full h-20 bg-gradient-to-r from-gaming-purple/10 via-gaming-blue/10 to-gaming-purple/10 blur-3xl"></div>
    </section>
  );
};

export default About;
