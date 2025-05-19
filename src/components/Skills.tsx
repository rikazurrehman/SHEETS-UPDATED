
import { Video, Boxes, Film, HeadphonesIcon, Monitor, Gamepad } from 'lucide-react';
import ThreeDCubeSphere from './ThreeDCubeSphere';

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
    icon: ThreeDCubeSphere,
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
    <section id="skills" className="py-16 bg-gaming-dark relative">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-orbitron font-bold mb-12 text-center">Services & Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div 
              key={skill.name}
              className="bg-gaming-darker/40 backdrop-blur-sm border-b border-white/10 p-4 transition-all hover:border-gaming-purple/20"
            >
              <div className="flex items-center mb-3">
                <skill.icon className={`text-${skill.color} h-6 w-6 mr-3`} />
                <h3 className="text-lg font-medium">{skill.name}</h3>
              </div>
              
              <div className="mb-2 w-full bg-white/5 rounded-full h-1.5">
                <div 
                  className={`bg-${skill.color} h-1.5 rounded-full`} 
                  style={{ width: `${skill.level}%` }}
                >
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-white/40 mb-2">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
