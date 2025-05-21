import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import GamingAnimation from '../components/GamingAnimation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gaming-dark text-white relative">
      <GamingAnimation />
      <Navbar />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
