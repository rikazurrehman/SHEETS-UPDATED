import { Camera, Video, Share2, Wand2, MessageSquare } from 'lucide-react';
import { useEffect } from 'react';

const tools = [
  { name: 'Blender', logo: '/assets/logos/Images/Blender.png' },
  { name: 'After Effects', logo: '/assets/logos/Images/After Effects.png' },
  { name: 'Premiere Pro', logo: '/assets/logos/Images/Premiere pro.png' },
  { name: 'DaVinci Resolve', logo: '/assets/logos/Images/DaVinci Resolve.png' },
  { name: 'Photoshop', logo: '/assets/logos/Images/Photoshop.png' },
  { name: 'GitHub', logo: '/assets/logos/Images/Github.png' },
  { name: 'FSpy', logo: '/assets/logos/Images/Fspy.png' },
  { name: 'WATI', logo: '/assets/logos/Images/Wati.png' },
];

// Duplicate tools multiple times for smoother infinite scroll effect
const scrollingTools = [...tools, ...tools, ...tools];

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
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gaming-dark to-gaming-darker relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-orbitron font-bold text-center mb-12 gaming-gradient-text">About Me</h2>
        
        {/* Bio */}
        <div className="mb-16 max-w-3xl mx-auto">
          <div className="space-y-6 text-center">
            <p className="text-xl text-white/95 leading-relaxed">
              I create visual content from storyboard to final delivery—directing 
              <span className="gaming-gradient-text font-medium"> CGI videos</span>, crafting 
              <span className="gaming-gradient-text font-medium"> 3D renders</span>, and bringing scenes to life with 
              <span className="gaming-gradient-text font-medium"> VFX</span> and dynamic 3D camera work.
            </p>
            
            <p className="text-lg text-white/85 leading-relaxed">
              Alongside that, I focus on growth-driven social media marketing, Meta Ads, 
              WhatsApp campaigns, and DM automation across WhatsApp and Instagram.
            </p>

            <div className="pt-2">
              <p className="text-lg text-white/85 leading-relaxed">
                My toolkit spans short- and long-form editing, speed ramps, documentary-style cuts, 
                motion graphics, SFX, color grading, and compositing.
              </p>
              
              <p className="text-lg text-white/85 leading-relaxed mt-2 italic">
                Always evolving, always hands-on — just aiming to build content that connects and performs.
              </p>
            </div>
          </div>
        </div>
        
        {/* What I do - Quick icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-24">
          <div className="bg-gaming-darker/50 backdrop-blur-sm border border-gaming-purple/20 p-6 rounded-lg shadow-glow transition-all hover:shadow-glow-strong">
            <Camera className="text-gaming-purple h-10 w-10 mb-4" />
            <h3 className="text-xl font-orbitron font-semibold mb-2">3D & CGI</h3>
            <p className="text-white/70">Creating immersive 3D renders and dynamic camera work for stunning visuals</p>
          </div>
          
          <div className="bg-gaming-darker/50 backdrop-blur-sm border border-gaming-blue/20 p-6 rounded-lg shadow-glow-blue transition-all hover:shadow-glow-blue">
            <Video className="text-gaming-blue h-10 w-10 mb-4" />
            <h3 className="text-xl font-orbitron font-semibold mb-2">Video Production</h3>
            <p className="text-white/70">Expert editing with speed ramps, cuts, and documentary-style storytelling</p>
          </div>
          
          <div className="bg-gaming-darker/50 backdrop-blur-sm border border-gaming-green/20 p-6 rounded-lg shadow-glow-green transition-all hover:shadow-glow-green">
            <Wand2 className="text-gaming-green h-10 w-10 mb-4" />
            <h3 className="text-xl font-orbitron font-semibold mb-2">VFX & Motion</h3>
            <p className="text-white/70">Crafting stunning visual effects, motion graphics, and color grading</p>
          </div>
          
          <div className="bg-gaming-darker/50 backdrop-blur-sm border border-gaming-purple/20 p-6 rounded-lg shadow-glow transition-all hover:shadow-glow-strong">
            <Share2 className="text-gaming-purple h-10 w-10 mb-4" />
            <h3 className="text-xl font-orbitron font-semibold mb-2">Social Media</h3>
            <p className="text-white/70">Growth-driven marketing strategies across Meta platforms</p>
          </div>

          <div className="bg-gaming-darker/50 backdrop-blur-sm border border-gaming-blue/20 p-6 rounded-lg shadow-glow-blue transition-all hover:shadow-glow-blue">
            <MessageSquare className="text-gaming-blue h-10 w-10 mb-4" />
            <h3 className="text-xl font-orbitron font-semibold mb-2">Automation</h3>
            <p className="text-white/70">WhatsApp and Instagram DM automation for efficient engagement</p>
          </div>
        </div>
        
        {/* Tools - Infinite Scrolling Section */}
        <div id="skills" className="mb-16">
          <h3 className="text-3xl font-orbitron font-bold text-center mb-8 gaming-gradient-text">Tools I Use</h3>
          
          {/* Scrolling container */}
          <div className="relative w-full overflow-hidden py-6 bg-gaming-darker/20 rounded-lg border border-gaming-purple/20 shadow-glow animate-glow-pulse">
            {/* Smooth infinite scroll track */}
            <div className="marquee-container">
              <div className="marquee-track">
                {scrollingTools.map((tool, index) => (
                  <div 
                    key={`${tool.name}-${index}`}
                    className="marquee-item mx-4 flex flex-col items-center justify-center px-8 py-4 min-w-[120px] bg-gaming-darker/50 rounded-lg border border-white/5 hover:border-gaming-purple/30 transition-all shadow-glow hover:shadow-glow-strong animate-pulse"
                  >
                    <div className="w-16 h-16 mb-2 flex items-center justify-center">
                      <img 
                        src={tool.logo}
                        alt={tool.name}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/64?text=" + tool.name.charAt(0);
                        }}
                      />
                    </div>
                    <span className="text-sm text-white/80">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add gradient overlays for smooth fade effect */}
            <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-gaming-darker to-transparent z-10"></div>
            <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-gaming-darker to-transparent z-10"></div>
          </div>
        </div>

        {/* Brands & Collaborations - Infinite Scrolling Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-orbitron font-bold text-center mb-8 gaming-gradient-text">Brands & Collaborations</h3>
          
          {/* Scrolling container */}
          <div className="relative w-full overflow-hidden py-6 bg-gaming-darker/20 rounded-lg border border-gaming-purple/20 shadow-glow animate-glow-pulse">
            {/* Smooth infinite scroll track */}
            <div className="marquee-container">
              <div className="marquee-track">
                {scrollingBrands.map((brand, index) => (
                  <div 
                    key={`${brand.name}-${index}`}
                    className="marquee-item mx-4 flex flex-col items-center justify-center px-8 py-4 min-w-[160px] bg-gaming-darker/50 rounded-lg border border-white/5 hover:border-gaming-purple/30 transition-all shadow-glow hover:shadow-glow-strong animate-pulse"
                  >
                    <div className="w-16 h-16 mb-2 flex items-center justify-center">
                      <img 
                        src={brand.logo}
                        alt={brand.name}
                        className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/64?text=" + brand.name.charAt(0);
                        }}
                      />
                    </div>
                    <span className="text-sm text-white/80 text-center">{brand.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add gradient overlays for smooth fade effect */}
            <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-gaming-darker to-transparent z-10"></div>
            <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-gaming-darker to-transparent z-10"></div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-5 left-0 w-full h-20 bg-gradient-to-r from-gaming-purple/20 via-gaming-blue/10 to-gaming-purple/20 blur-3xl opacity-30"></div>
    </section>
  );
};

export default About;
