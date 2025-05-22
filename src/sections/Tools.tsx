import React from 'react';

const Tools = () => {
  return (
    <section id="tools-i-use" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Tools I Use</h2>
        {/* Content for individual tools goes here */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Example Tool Box - Replace with your actual tool data */}
          <div className="flex flex-col items-center p-6 rounded-lg shadow-lg bg-gray-800">
            {/* Replace with your tool icon/image */}
            <div className="w-16 h-16 mb-4 bg-gray-700 rounded-full"></div>
            <p className="text-white text-center">Tool Name</p>
          </div>
          {/* End Example Tool Box */}
        </div>
      </div>
    </section>
  );
};

export default Tools;