import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { X } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

const certificates = [
  { id: 1, title: 'MongoDB - The Complete Developer\'s Guide 2024', issuer: 'Udemy', year: '2024' },
  { id: 2, title: 'Research Methodology', issuer: 'Coursera', year: '2025' },
  { id: 3, title: 'Flutter Development Bootcamp', issuer: 'Udemy', year: '2024' },
  { id: 4, title: 'Mobile App Development', issuer: 'Udemy', year: '2024' },
];

const CertificatesSection = () => {
  const [selected, setSelected] = useState<typeof certificates[0] | null>(null);

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {certificates.map((cert) => (
              <SwiperSlide key={cert.id}>
                <div
                  className="glass rounded-xl p-6 cursor-pointer glow-card h-48 flex flex-col justify-between"
                  onClick={() => setSelected(cert)}
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-2xl"
                      style={{ background: 'linear-gradient(135deg, hsl(185, 100%, 50%, 0.15), hsl(265, 90%, 65%, 0.15))' }}
                    >
                      🏆
                    </div>
                    <h3 className="font-display font-semibold mb-1">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <p className="text-xs text-primary font-display">{cert.year}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                className="glass rounded-2xl p-8 max-w-md w-full text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl font-bold font-display mb-2">{selected.title}</h3>
                <p className="text-muted-foreground mb-1">{selected.issuer}</p>
                <p className="text-sm text-primary font-display">{selected.year}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CertificatesSection;
