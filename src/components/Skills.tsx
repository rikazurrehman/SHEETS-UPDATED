
import { Video, Boxes, Film, HeadphonesIcon, Monitor, ThreeDCubeSphere } from 'lucide-react';

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
    <section id="skills" className="py-24 bg-gaming-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center">Services & Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div 
              key={skill.name}
              className="bg-gaming-darker/60 backdrop-blur-sm border border-white/5 rounded-lg p-6 transition-all hover:border-gaming-purple/30 hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <skill.icon className={`text-${skill.color} h-8 w-8 mr-3`} />
                <h3 className="text-xl font-semibold font-orbitron">{skill.name}</h3>
              </div>
              
              <div className="mb-4 w-full bg-white/5 rounded-full h-3">
                <div 
                  className={`bg-${skill.color} h-3 rounded-full animate-[width_1s_ease-in-out]`} 
                  style={{ width: `${skill.level}%`, animationFillMode: 'both', animationDelay: '0.5s' }}
                >
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Beginner</span>
                <span className="text-white/60">Expert</span>
              </div>
              
              {/* Skill bullets */}
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full bg-${skill.color} mt-1.5 mr-2`}></span>
                  <span className="text-white/80 text-sm">Professional-grade output</span>
                </li>
                <li className="flex items-start">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full bg-${skill.color} mt-1.5 mr-2`}></span>
                  <span className="text-white/80 text-sm">Fast turnaround times</span>
                </li>
                <li className="flex items-start">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full bg-${skill.color} mt-1.5 mr-2`}></span>
                  <span className="text-white/80 text-sm">Creative problem-solving</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative glow */}
      <div className="absolute -bottom-20 left-1/3 w-2/3 h-40 bg-gaming-purple/20 blur-[100px] opacity-40"></div>
      <div className="absolute -top-20 right-1/3 w-2/3 h-40 bg-gaming-blue/20 blur-[100px] opacity-40"></div>
    </section>
  );
};

export default Skills;
