import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, BookOpen, Award } from 'lucide-react';

function AnimatedCounter({ end, label, icon: Icon }: { end: number; label: string; icon: typeof Code }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <Icon className="mx-auto mb-2 text-primary" size={28} />
      <div className="text-3xl font-bold font-display gradient-text">{count}+</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-display text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About <span className="gradient-text">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden glow-card">
              <div className="absolute inset-0 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, hsl(185, 100%, 50%, 0.2), hsl(265, 90%, 65%, 0.2))' }}
              />
              <div className="absolute inset-[2px] rounded-2xl bg-card flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold font-display text-primary mb-4">
              Full Stack Developer & MCA Student
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm a passionate full-stack developer currently pursuing my Master of Computer Applications (MCA).
              I specialize in the MERN stack and love building interactive web applications with modern technologies.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              My goal is to create impactful digital experiences that combine beautiful design with robust functionality.
              I'm constantly learning and exploring new technologies to expand my skill set.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <AnimatedCounter end={15} label="Projects" icon={Code} />
              <AnimatedCounter end={10} label="Technologies" icon={BookOpen} />
              <AnimatedCounter end={8} label="Certificates" icon={Award} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
