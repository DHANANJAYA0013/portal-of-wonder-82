import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Scene3D from './Scene3D';
import profileHero from '@/assets/profile-hero.png';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene3D className="w-full h-full" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/90 via-background/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 section-container w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          {/* Text */}
          <div className="max-w-xl">
            <motion.p
              className="text-primary font-display text-sm md:text-base tracking-widest uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Welcome to my portfolio
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold font-display leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Hi, I'm{' '}
              <span className="gradient-text">Your Name</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Full Stack Developer | MCA Student | MERN Stack Developer
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a
                href="#projects"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold font-display
                  hover:shadow-[0_0_30px_hsl(185,100%,50%,0.3)] transition-all duration-300 hover:scale-105"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-primary/50 text-primary rounded-lg font-semibold font-display
                  hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              >
                Download Resume
              </a>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden animate-glow-pulse">
              <div className="absolute inset-0 rounded-full p-[3px]"
                style={{ background: 'linear-gradient(135deg, hsl(185, 100%, 50%), hsl(265, 90%, 65%))' }}
              >
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={profileHero}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="text-primary animate-scroll-indicator" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
