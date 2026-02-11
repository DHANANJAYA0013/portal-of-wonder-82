import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const FooterSection = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-border py-10">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#home" className="text-lg font-bold font-display gradient-text">
          Portfolio
        </a>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          {['Home', 'About', 'Projects', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {[Github, Linkedin, Mail].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Social link"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="text-center mt-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </div>

      {/* Scroll to top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center
          text-primary hover:shadow-[0_0_20px_hsl(185,100%,50%,0.3)] transition-all z-30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp size={18} />
      </motion.button>
    </footer>
  );
};

export default FooterSection;
