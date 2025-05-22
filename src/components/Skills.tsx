import React from 'react';

const Skills: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">My Skills</h2>
      {/* Section for displaying individual skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for individual skill items */}
        {/* You can map over an array of skills here */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-white mb-2">Skill Category</h3>
          <p className="text-gray-300">
            List individual skills here. E.g., JavaScript, React, CSS, etc.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-white mb-2">Another Skill Category</h3>
          <p className="text-gray-300">
            More skills go here.
          </p>
        </div>
        {/* Add more skill items as needed */}
      </div>
    </div>
  );
};

export default Skills;
import { memo } from 'react';
import ThreeDCubeSphere from './ThreeDCubeSphere';

// Memoizing the ThreeDCubeSphere component for better performance
const MemoizedThreeDCubeSphere = memo(ThreeDCubeSphere);

const Skills = () => {
  return (
    <section id="skills" className="py-8 bg-gaming-dark relative">
      {/* Background gradient elements */}
      <div className="absolute -top-10 left-0 w-full h-20 bg-gradient-to-r from-gaming-purple/20 via-gaming-blue/10 to-gaming-purple/20 blur-3xl opacity-30"></div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center text-white mb-12">My Toolkit</h2>
        
        {/* Icons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center items-center">
          <div className="flex flex-col items-center">
            <img src="/assets/logos/Images/Premiere pro.png" alt="Adobe Premiere Pro" className="h-20 w-auto mb-2" />
            <p className="text-white text-sm">Premiere Pro</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/assets/logos/Images/After Effects.Github.pngpng" alt="Adobe After Effects" className="h-20 w-auto mb-2" />
            <p className="text-white text-sm">After Effects</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/assets/logos/Images/Blender.png" alt="Blender.png" className="h-20 w-auto mb-2" />
            <p className="text-white text-sm">Blender</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/assets/logos/Images/Fspy.png" alt="Fspy" className="h-20 w-auto mb-2" />
            <p className="text-white text-sm">Fspy</p>
          </div>
        </div>
      </div>
      {/* Spacer div to maintain spacing in layout */}
      <div className="h-8"></div>
      
      {/* Bottom decoration */}
      <div className="absolute -bottom-10 left-0 w-full h-20 bg-gradient-to-r from-gaming-blue/20 via-gaming-purple/10 to-gaming-blue/20 blur-3xl opacity-30"></div>
    </section>
  );

};

export default Skills;
