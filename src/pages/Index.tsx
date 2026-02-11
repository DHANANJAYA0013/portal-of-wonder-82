import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TechSection from '@/components/TechSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificatesSection from '@/components/CertificatesSection';
import ContactSection from '@/components/ContactSection';
import FooterSection from '@/components/FooterSection';
import ScrollProgress from '@/components/ScrollProgress';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {!showSplash && (
        <>
          <ScrollProgress />
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <TechSection />
            <ProjectsSection />
            <CertificatesSection />
            <ContactSection />
          </main>
          <FooterSection />
        </>
      )}
    </>
  );
};

export default Index;
