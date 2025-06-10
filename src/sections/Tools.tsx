import React from 'react';

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

const Tools = () => {
  return (
    <section id="tools-i-use" className="py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 tracking-tight">Tools I <span className="gaming-gradient-text">Use</span></h3>
        
        {/* Scrolling container */}
        <div className="relative w-full overflow-hidden py-12 rounded-xl bg-black/30 backdrop-blur-sm border border-white/5 shadow-lg">
          {/* Top glow line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gaming-purple/30 to-transparent"></div>
          
          {/* Digital circuit pattern decorations */}
          <div className="absolute top-6 left-6 w-10 h-10 border border-white/5 rounded-md rotate-12 opacity-20 pointer-events-none">
            <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-purple/30"></div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-blue/30"></div>
          </div>
          
          <div className="absolute bottom-6 right-6 w-10 h-10 border border-white/5 rounded-md -rotate-12 opacity-20 pointer-events-none">
            <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-blue/30"></div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-purple/30"></div>
          </div>
          
          {/* Smooth infinite scroll track */}
          <div className="marquee-container">
            <div className="marquee-track">
              {scrollingTools.map((tool, index) => (
                <div 
                  key={`${tool.name}-${index}`}
                  className="marquee-item mx-4 flex flex-col items-center justify-center p-4 group"
                >
                  {/* Fixed square container for all logos - moderately larger */}
                  <div className="w-24 h-24 bg-black/40 rounded-xl border border-white/5 hover:border-gaming-purple/20 flex items-center justify-center mb-3 p-3 overflow-hidden shadow-md transition-all group-hover:shadow-glow group-hover:scale-105">
                    <img 
                      src={tool.logo}
                      alt={tool.name}
                      className="max-w-full max-h-full object-contain transition-transform"
                      onError={(e) => {
                        e.currentTarget.src = generateColoredDataUrl(tool.name);
                      }}
                    />
                  </div>
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add gradient overlays for smooth fade effect */}
          <div className="absolute top-0 left-0 h-full w-28 bg-gradient-to-r from-gaming-darker to-transparent z-10"></div>
          <div className="absolute top-0 right-0 h-full w-28 bg-gradient-to-l from-gaming-darker to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Tools;