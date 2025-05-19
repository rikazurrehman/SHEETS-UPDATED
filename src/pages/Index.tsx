
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Portfolio from '../components/Portfolio';
import GamingAnimation from '../components/GamingAnimation';
import MiniGame from '../components/MiniGame';

const Index = () => {
  return (
    <div className="min-h-screen bg-gaming-dark text-white relative">
      <GamingAnimation />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Portfolio />
          </div>
          <div>
            <MiniGame />
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
