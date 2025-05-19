
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FileText, Download, Briefcase, GraduationCap, Award } from 'lucide-react';
import { Button } from '../components/ui/button';

const Resume = () => {
  return (
    <div className="min-h-screen bg-gaming-dark text-white">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-orbitron font-bold">Resume</h1>
            
            <Button variant="outline" className="border-gaming-purple text-white">
              <Download size={16} className="mr-2" />
              Download PDF
            </Button>
          </div>
          
          <div className="bg-gaming-darker/40 p-6 mb-8">
            <div className="flex items-center mb-4">
              <FileText size={24} className="text-gaming-purple mr-3" />
              <h2 className="text-xl font-orbitron">Professional Summary</h2>
            </div>
            <p className="text-white/70 mb-4">
              Creative professional with over 5 years of experience in 3D modeling, animation, and video production. 
              Specialized in creating engaging digital content for various platforms, with a focus on gaming and tech industries. 
              Expert in translating client visions into compelling visual narratives that drive engagement and results.
            </p>
          </div>
          
          <div className="bg-gaming-darker/40 p-6 mb-8">
            <div className="flex items-center mb-4">
              <Briefcase size={24} className="text-gaming-purple mr-3" />
              <h2 className="text-xl font-orbitron">Work Experience</h2>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <h3 className="font-medium">Senior 3D Artist</h3>
                <span className="text-gaming-purple text-sm">2021 - Present</span>
              </div>
              <h4 className="text-white/80 mb-2">Digital Horizons Studio</h4>
              <ul className="list-disc list-inside text-white/70 text-sm space-y-1">
                <li>Lead a team of 3 junior artists in creating assets for client projects</li>
                <li>Developed CGI product visualizations for major tech company product launches</li>
                <li>Created and implemented efficient 3D workflow pipelines, reducing delivery time by 30%</li>
                <li>Collaborated with marketing teams to develop cohesive visual campaigns</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <h3 className="font-medium">Motion Graphics Designer</h3>
                <span className="text-gaming-purple text-sm">2018 - 2021</span>
              </div>
              <h4 className="text-white/80 mb-2">Creative Pulse Media</h4>
              <ul className="list-disc list-inside text-white/70 text-sm space-y-1">
                <li>Created motion graphics for corporate clients and advertising campaigns</li>
                <li>Produced video content optimized for multiple social media platforms</li>
                <li>Designed animated UI elements for mobile applications</li>
                <li>Developed brand identity animations for startup companies</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gaming-darker/40 p-6 mb-8">
            <div className="flex items-center mb-4">
              <GraduationCap size={24} className="text-gaming-purple mr-3" />
              <h2 className="text-xl font-orbitron">Education</h2>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <h3 className="font-medium">Bachelor of Fine Arts, Digital Media</h3>
                <span className="text-gaming-purple text-sm">2014 - 2018</span>
              </div>
              <h4 className="text-white/80 mb-2">University of Creative Arts</h4>
              <p className="text-white/70 text-sm">Specialized in 3D modeling and animation, with minor in digital video production.</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <h3 className="font-medium">Certificate in Advanced CGI Production</h3>
                <span className="text-gaming-purple text-sm">2019</span>
              </div>
              <h4 className="text-white/80 mb-2">Digital Arts Academy</h4>
              <p className="text-white/70 text-sm">Intensive 6-month program focused on industry-standard CGI production techniques.</p>
            </div>
          </div>
          
          <div className="bg-gaming-darker/40 p-6">
            <div className="flex items-center mb-4">
              <Award size={24} className="text-gaming-purple mr-3" />
              <h2 className="text-xl font-orbitron">Certifications & Awards</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/10 p-3">
                <h3 className="font-medium mb-1">Adobe Certified Expert</h3>
                <p className="text-white/70 text-sm">After Effects & Premiere Pro</p>
              </div>
              
              <div className="border border-white/10 p-3">
                <h3 className="font-medium mb-1">Autodesk Certified Professional</h3>
                <p className="text-white/70 text-sm">3ds Max & Maya</p>
              </div>
              
              <div className="border border-white/10 p-3">
                <h3 className="font-medium mb-1">Digital Arts Awards 2022</h3>
                <p className="text-white/70 text-sm">Best Product Visualization</p>
              </div>
              
              <div className="border border-white/10 p-3">
                <h3 className="font-medium mb-1">Motion Design Awards 2020</h3>
                <p className="text-white/70 text-sm">Finalist - Commercial Animation</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Resume;
