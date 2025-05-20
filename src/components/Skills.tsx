import { Video, Boxes, Film, HeadphonesIcon, Monitor, Gamepad, Zap, Palette } from 'lucide-react';
import { memo } from 'react';
import ThreeDCubeSphere from './ThreeDCubeSphere';

// Memoizing the ThreeDCubeSphere component for better performance
const MemoizedThreeDCubeSphere = memo(ThreeDCubeSphere);

const skills = [
  {
    name: 'Video Editing',
    icon: Video,
    level: 90,
    color: 'gaming-purple'
  },
  {
    name: '3D Campaigns/CGI',
    icon: Boxes,
    level: 85,
    color: 'gaming-blue'
  },
  {
    name: '3D Modeling',
    icon: MemoizedThreeDCubeSphere,
    level: 80,
    color: 'gaming-green'
  },
  {
    name: 'Motion Graphics',
    icon: Film,
    level: 85,
    color: 'gaming-purple'
  },
  {
    name: 'Sound Design',
    icon: HeadphonesIcon,
    level: 75,
    color: 'gaming-blue'
  },
  {
    name: 'Product Visualization',
    icon: Monitor,
    level: 80,
    color: 'gaming-green'
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-8 bg-gaming-dark relative">
      {/* Background gradient elements */}
      <div className="absolute -top-10 left-0 w-full h-20 bg-gradient-to-r from-gaming-purple/20 via-gaming-blue/10 to-gaming-purple/20 blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mb-4">Services & Skills</h2>
        <p className="text-lg text-center text-white/70 max-w-3xl mx-auto mb-6">
          I offer a range of creative services, combining technical expertise with artistic vision.
        </p>
        
        {/* Services Section - Using grid with icons as requested */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          <div className="bg-gaming-darker/40 backdrop-blur-sm p-4 rounded-lg text-center hover:bg-gaming-purple/10 transition-colors">
            <div className="flex justify-center mb-2">
              <Video className="h-8 w-8 text-gaming-purple" />
            </div>
            <p className="text-sm font-medium">Video Editing</p>
          </div>
          
          <div className="bg-gaming-darker/40 backdrop-blur-sm p-4 rounded-lg text-center hover:bg-gaming-blue/10 transition-colors">
            <div className="flex justify-center mb-2">
              <Boxes className="h-8 w-8 text-gaming-blue" />
            </div>
            <p className="text-sm font-medium">3D Campaigns/CGI</p>
          </div>
          
          <div className="bg-gaming-darker/40 backdrop-blur-sm p-4 rounded-lg text-center hover:bg-gaming-green/10 transition-colors">
            <div className="flex justify-center mb-2">
              <div className="h-8 w-8 text-gaming-green">
                <MemoizedThreeDCubeSphere />
              </div>
            </div>
            <p className="text-sm font-medium">3D Modeling</p>
          </div>
          
          <div className="bg-gaming-darker/40 backdrop-blur-sm p-4 rounded-lg text-center hover:bg-gaming-purple/10 transition-colors">
            <div className="flex justify-center mb-2">
              <Film className="h-8 w-8 text-gaming-purple" />
            </div>
            <p className="text-sm font-medium">Motion Graphics</p>
          </div>
          
          <div className="bg-gaming-darker/40 backdrop-blur-sm p-4 rounded-lg text-center hover:bg-gaming-blue/10 transition-colors">
            <div className="flex justify-center mb-2">
              <HeadphonesIcon className="h-8 w-8 text-gaming-blue" />
            </div>
            <p className="text-sm font-medium">Sound Design</p>
          </div>
          
          <div className="bg-gaming-darker/40 backdrop-blur-sm p-4 rounded-lg text-center hover:bg-gaming-green/10 transition-colors">
            <div className="flex justify-center mb-2">
              <Monitor className="h-8 w-8 text-gaming-green" />
            </div>
            <p className="text-sm font-medium">Product Visualization</p>
          </div>
        </div>
        
        {/* Skills Progress Bars */}
        <h3 className="text-xl font-orbitron text-center mb-4">My Expertise</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, index) => (
            <div 
              key={skill.name}
              className={`bg-gaming-darker/40 backdrop-blur-sm border-b border-white/10 p-5 rounded-lg transition-all hover:border-${skill.color}/20 hover:shadow-glow`}
            >
              <div className="flex items-center mb-3">
                <div className={`text-${skill.color} h-8 w-8 mr-3 p-1.5 bg-${skill.color}/10 rounded-lg`}>
                  <skill.icon className="h-full w-full" />
                </div>
                <h4 className="text-base font-medium">{skill.name}</h4>
              </div>
              
              <div className="mb-1.5 w-full bg-white/5 rounded-full h-2">
                <div 
                  className={`bg-${skill.color} h-2 rounded-full relative`} 
                  style={{ width: `${skill.level}%` }}
                >
                  <span className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-white shadow-glow"></span>
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-white/60 mb-2 font-medium">
                <span></span>
                <span className={`text-${skill.color}`}>{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Service highlights - more compact */}
      <div className="container mx-auto px-6 mt-8">
        <h3 className="text-xl font-orbitron text-center mb-4 gaming-gradient-text">What I Can Do For You</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-gaming-darker/50 border border-gaming-purple/20 rounded-lg p-5 flex flex-col items-center text-center transform transition-all hover:-translate-y-1 hover:shadow-glow">
            <Video className="text-gaming-purple h-10 w-10 mb-3" />
            <h4 className="text-lg font-orbitron mb-2">Premium Editing</h4>
            <p className="text-white/70 text-sm">Professional video editing with attention to detail and visual impact.</p>
          </div>
          
          <div className="bg-gaming-darker/50 border border-gaming-blue/20 rounded-lg p-5 flex flex-col items-center text-center transform transition-all hover:-translate-y-1 hover:shadow-glow-blue">
            <Boxes className="text-gaming-blue h-10 w-10 mb-3" />
            <h4 className="text-lg font-orbitron mb-2">3D Campaign Creation</h4>
            <p className="text-white/70 text-sm">Stunning 3D visuals and campaigns that create memorable brand experiences.</p>
          </div>
          
          <div className="bg-gaming-darker/50 border border-gaming-green/20 rounded-lg p-5 flex flex-col items-center text-center transform transition-all hover:-translate-y-1 hover:shadow-glow-green">
            <Zap className="text-gaming-green h-10 w-10 mb-3" />
            <h4 className="text-lg font-orbitron mb-2">Creative Vision</h4>
            <p className="text-white/70 text-sm">Unique creative direction and innovative concepts that set your content apart.</p>
          </div>
        </div>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute -bottom-10 left-0 w-full h-20 bg-gradient-to-r from-gaming-blue/20 via-gaming-purple/10 to-gaming-blue/20 blur-3xl opacity-30"></div>
    </section>
  );
};

export default Skills;
