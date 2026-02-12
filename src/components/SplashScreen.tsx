import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Scene3D from './Scene3D';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const fullName = 'Dhananjaya';

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullName.length) {
        setDisplayText(fullName.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 50);

    return () => {
      clearInterval(typingInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0">
        <Scene3D className="w-full h-full" minimal />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold font-display gradient-text mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {displayText}
          <motion.span
            className="text-primary"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          >
            |
          </motion.span>
        </motion.h1>

        <div className="w-64 h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: 'linear-gradient(90deg, hsl(185, 100%, 50%), hsl(265, 90%, 65%))',
            }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <motion.p
          className="mt-4 text-muted-foreground text-sm font-display tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {Math.min(Math.floor(progress), 100)}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
