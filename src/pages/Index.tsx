import MainLayout from "@/components/layout/MainLayout";
import AboutSection from "@/components/sections/AboutSection";
import Expertise from "@/components/sections/Expertise";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <MainLayout>
      {/* About Section - Using the consistent layout structure */}
      <AboutSection />

      {/* Expertise Section */}
      <div className="pt-20">
        <Expertise />
      </div>

      {/* Contact Section */}
      <ContactSection />
    </MainLayout>
  );
};

export default Index;
