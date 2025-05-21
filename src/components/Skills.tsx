import { memo } from 'react';
import ThreeDCubeSphere from './ThreeDCubeSphere';

// Memoizing the ThreeDCubeSphere component for better performance
const MemoizedThreeDCubeSphere = memo(ThreeDCubeSphere);

const Skills = () => {
  return (
    <section id="skills" className="py-8 bg-gaming-dark relative">
      {/* Background gradient elements */}
      <div className="absolute -top-10 left-0 w-full h-20 bg-gradient-to-r from-gaming-purple/20 via-gaming-blue/10 to-gaming-purple/20 blur-3xl opacity-30"></div>
      
      {/* Spacer div to maintain spacing in layout */}
      <div className="h-8"></div>
      
      {/* Bottom decoration */}
      <div className="absolute -bottom-10 left-0 w-full h-20 bg-gradient-to-r from-gaming-blue/20 via-gaming-purple/10 to-gaming-blue/20 blur-3xl opacity-30"></div>
    </section>
  );
};

export default Skills;
