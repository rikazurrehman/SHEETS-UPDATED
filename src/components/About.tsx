
import { Monitor, Video, HeadphonesIcon, Boxes } from 'lucide-react';

const tools = [
  { name: 'Blender', logo: '/assets/logos/blender.svg' },
  { name: 'After Effects', logo: '/assets/logos/after-effects.svg' },
  { name: 'Premiere Pro', logo: '/assets/logos/premiere-pro.svg' },
  { name: 'DaVinci Resolve', logo: '/assets/logos/davinci-resolve.svg' },
  { name: 'Photoshop', logo: '/assets/logos/photoshop.svg' },
  { name: 'GitHub', logo: '/assets/logos/github.svg' },
  { name: 'FSpy', logo: '/assets/logos/fspy.png' },
  { name: 'WATI', logo: '/assets/logos/wati.png' },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gaming-dark to-gaming-darker relative">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center">About Me</h2>
        
        {/* Bio */}
        <div className="mb-16 max-w-3xl mx-auto text-center">
          <p className="text-xl mb-6 text-white/90">
            I make crazy 3D campaigns, edit videos, run Meta ads, WhatsApp campaigns, and handle social media.
          </p>
          <p className="text-white/70">
            With a passion for creating immersive digital experiences, I bring brands and stories to life through cutting-edge 3D design and video production. My technical expertise combined with creative vision enables me to deliver content that engages and captivates audiences across platforms.
          </p>
        </div>
        
        {/* What I do - Quick icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-gaming-darker/50 backdrop-blur-sm border border-gaming-purple/20 p-6 rounded-lg shadow-glow transition-all hover:shadow-glow-strong">
            <Video className="text-gaming-purple h-10 w-10 mb-4" />
            <h3 className="text-xl font-orbitron font-semibold mb-2">Video Editing</h3>
            <p className="text-white/70">Creating stunning visual narratives with expert editing techniques</p>
          </div>
          
          <div className="bg-gaming-darker/50 backdrop-blur-sm border border-gaming-blue/20 p-6 rounded-lg shadow-glow-blue transition-all hover:shadow-glow-blue">
            <Boxes className="text-gaming-blue h-10 w-10 mb-4" />
            <h3 className="text-xl font-orbitron font-semibold mb-2">3D Campaigns</h3>
            <p className="text-white/70">Designing immersive 3D experiences that elevate brand messaging</p>
          </div>
          
          <div className="bg-gaming-darker/50 backdrop-blur-sm border border-gaming-green/20 p-6 rounded-lg shadow-glow-green transition-all hover:shadow-glow-green">
            <Monitor className="text-gaming-green h-10 w-10 mb-4" />
            <h3 className="text-xl font-orbitron font-semibold mb-2">Motion Graphics</h3>
            <p className="text-white/70">Bringing static content to life with dynamic motion design</p>
          </div>
          
          <div className="bg-gaming-darker/50 backdrop-blur-sm border border-gaming-purple/20 p-6 rounded-lg shadow-glow transition-all hover:shadow-glow-strong">
            <HeadphonesIcon className="text-gaming-purple h-10 w-10 mb-4" />
            <h3 className="text-xl font-orbitron font-semibold mb-2">Sound Design</h3>
            <p className="text-white/70">Crafting audio experiences that enhance visual storytelling</p>
          </div>
        </div>
        
        {/* Tools */}
        <div>
          <h3 className="text-2xl font-orbitron text-center mb-8 text-white/90">Tools I Use</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
            {tools.map((tool, index) => (
              <div 
                key={tool.name}
                className="flex flex-col items-center justify-center p-4 bg-gaming-darker/50 rounded-lg border border-white/5 hover:border-gaming-purple/30 transition-all"
              >
                <div className="w-16 h-16 mb-2 flex items-center justify-center">
                  <img 
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tool.name.toLowerCase()}/${tool.name.toLowerCase()}-original.svg`}
                    alt={tool.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      // Fallback for tools without standard icons
                      e.currentTarget.src = "https://via.placeholder.com/64?text=" + tool.name.charAt(0);
                    }}
                  />
                </div>
                <span className="text-sm text-white/80">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-5 left-0 w-full h-20 bg-gradient-to-r from-gaming-purple/20 via-gaming-blue/10 to-gaming-purple/20 blur-3xl opacity-30"></div>
    </section>
  );
};

export default About;
