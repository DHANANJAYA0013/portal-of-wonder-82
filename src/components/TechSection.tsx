import { motion } from 'framer-motion';

const technologies = [
  { name: 'HTML5', color: 'hsl(12, 77%, 52%)' },
  { name: 'CSS3', color: 'hsl(205, 82%, 51%)' },
  { name: 'JavaScript', color: 'hsl(48, 89%, 50%)' },
  { name: 'React', color: 'hsl(193, 95%, 68%)' },
  { name: 'Node.js', color: 'hsl(120, 47%, 45%)' },
  { name: 'MongoDB', color: 'hsl(120, 41%, 41%)' },
  { name: 'Express', color: 'hsl(0, 0%, 70%)' },
  { name: 'Flutter', color: 'hsl(207, 90%, 61%)' },
  { name: 'Git', color: 'hsl(10, 75%, 47%)' },
  { name: 'Three.js', color: 'hsl(0, 0%, 100%)' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

const TechSection = () => {
  return (
    <section id="tech" className="section-padding bg-card/30">
      <div className="section-container">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-display text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Tech <span className="gradient-text">Stack</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover={{ scale: 1.08, y: -6 }}
              className="glass rounded-xl p-6 flex flex-col items-center gap-3 cursor-default glow-border"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold font-display"
                style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
              >
                {tech.name.slice(0, 2)}
              </div>
              <span className="text-sm font-medium text-foreground">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechSection;
