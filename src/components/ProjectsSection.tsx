import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';

const projects = [
  {
    id: 1, title: 'E-Commerce Platform', category: 'MERN',
    description: 'Full-stack e-commerce platform with payment integration, user authentication, and admin dashboard.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    live: '#', github: '#',
  },
  {
    id: 2, title: 'Task Manager App', category: 'MERN',
    description: 'Collaborative task management tool with real-time updates and team features.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    live: '#', github: '#',
  },
  {
    id: 3, title: 'Weather App', category: 'Flutter',
    description: 'Cross-platform weather application with beautiful UI and location-based forecasts.',
    tech: ['Flutter', 'Dart', 'OpenWeather API'],
    live: '#', github: '#',
  },
  {
    id: 4, title: 'AI Chatbot', category: 'AI',
    description: 'Intelligent chatbot powered by machine learning for customer support automation.',
    tech: ['Python', 'TensorFlow', 'React', 'Flask'],
    live: '#', github: '#',
  },
  {
    id: 5, title: 'Portfolio 3D', category: 'MERN',
    description: 'Interactive 3D portfolio website built with Three.js and React.',
    tech: ['React', 'Three.js', 'Framer Motion'],
    live: '#', github: '#',
  },
  {
    id: 6, title: 'Fitness Tracker', category: 'Flutter',
    description: 'Mobile fitness tracking app with workout plans and progress analytics.',
    tech: ['Flutter', 'Firebase', 'Dart'],
    live: '#', github: '#',
  },
];

const filters = ['All', 'MERN', 'Flutter', 'AI'];

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filtered = activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-display text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          My <span className="gradient-text">Projects</span>
        </motion.h2>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium font-display transition-all duration-300
                ${activeFilter === f
                  ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(185,100%,50%,0.3)]'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8, rotateY: 3, rotateX: 2 }}
                style={{ perspective: 1000 }}
                className="glass rounded-xl overflow-hidden cursor-pointer group glow-card"
                onClick={() => setSelectedProject(project)}
              >
                <div className="h-40 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, hsl(185, 100%, 50%, 0.15), hsl(265, 90%, 65%, 0.15))` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-50 group-hover:opacity-80 transition-opacity">🚀</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="glass rounded-2xl p-6 md:p-8 max-w-lg w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold font-display">{selectedProject.title}</h3>
                  <button onClick={() => setSelectedProject(null)} className="text-muted-foreground hover:text-foreground">
                    <X size={20} />
                  </button>
                </div>
                <p className="text-muted-foreground mb-4">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">{t}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href={selectedProject.live} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:scale-105 transition-transform">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                  <a href={selectedProject.github} className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg text-sm font-semibold hover:bg-secondary transition-colors">
                    <Github size={16} /> GitHub
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
