import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import mongodbImage from '../assets/mongodb.webp';
import flutterImage from '../assets/flutter.webp';
import researchImage from '../assets/research.webp';

// Certificate images for the infinite carousel
const certificateImages = [
  { src: mongodbImage, alt: 'MongoDB Developer Certificate', title: 'MongoDB - The Complete Developer\'s Guide 2024' },
  { src: researchImage, alt: 'Research Methodology Certificate', title: 'Research Methodology' },
  { src: flutterImage, alt: 'Flutter Development Certificate', title: 'Flutter Development Bootcamp' },
];

const CertificatesSection = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string } | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...certificateImages, ...certificateImages, ...certificateImages];

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setTranslateX((prev) => {
          const newTranslateX = prev - 1; // Slow continuous movement

          // Reset position when we've scrolled through one full set
          if (Math.abs(newTranslateX) >= certificateImages.length * 320) {
            return 0;
          }

          return newTranslateX;
        });
      }, 20); // Smooth animation
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered]);

  return (
    <section id="certificates" className="section-padding bg-card/30">
      <div className="section-container">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-display text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          My <span className="gradient-text">Certificates</span>
        </motion.h2>

        {/* Infinite Carousel Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="relative overflow-hidden rounded-xl glass p-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={containerRef}
          >
            {/* Carousel strip */}
            <div
              className="flex gap-4 transition-none"
              style={{
                transform: `translateX(${translateX}px)`,
                width: `${duplicatedImages.length * 320}px`,
              }}
            >
              {duplicatedImages.map((image, index) => (
                <div
                  key={`${index}-${image.alt}`}
                  className="flex-shrink-0 relative group cursor-pointer"
                  style={{ width: '300px', height: '220px' }}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="w-full h-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-4">
                      <p className="text-sm font-semibold text-foreground line-clamp-2">{image.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Full Certificate Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative max-w-4xl w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedImage(null)} 
                  className="absolute -top-12 right-0 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="glass rounded-2xl overflow-hidden">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                  <div className="p-6 border-t border-border">
                    <h3 className="text-xl font-bold font-display text-center">{selectedImage.title}</h3>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CertificatesSection;
