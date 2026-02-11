import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';

const projects = [
  {
    id: 1, title: 'ServeHub – Home Service Booking App', category: 'Flutter',
    description: 'Built a multi-role Flutter app for customers and service providers. Integrated Firebase for real-time data sync and authentication. Included 6+ service categories and smooth booking management.',
    tech: ['Flutter', 'Firebase', 'Dart'],
    live: '#', github: '#',
  },
  {
    id: 2, title: 'BookTrack - Library Management System', category: 'Python',
    description: 'Designed a full-featured system for tracking book checkouts, returns, and fines. Created an intuitive admin interface and automated reminders.',
    tech: ['Python', 'Django', 'MySQL'],
    live: '#', github: '#',
  },
  {
    id: 3, title: 'TeamTrack - Employee Management System', category: 'Python',
    description: 'Developed a dashboard for managing employee records and reports. Enhanced productivity through easy data access and CRUD operations.',
    tech: ['Python', 'Django', 'SQLite'],
    live: '#', github: '#',
  },
  {
    id: 4, title: 'GameZone – Gaming Website', category: 'Web',
    description: 'Created an interactive gaming site with multiple games and review features. Integrated a simple UI for rating, reviewing, and exploring games seamlessly.',
    tech: ['HTML', 'CSS', 'Flask', 'SQLite'],
    live: '#', github: '#',
  },
  {
    id: 5, title: 'Portfolio Website', category: 'Web',
    description: 'Modern and interactive portfolio website showcasing projects, skills, and experience. Features 3D animations, smooth scrolling, and responsive design.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
    live: '#', github: '#',
  },
  {
    id: 6, title: 'Profile Finder', category: 'Web',
    description: 'Web application to search and discover GitHub profiles with detailed information. Displays repositories, followers, and contribution statistics.',
    tech: ['JavaScript', 'HTML', 'CSS', 'GitHub API'],
    live: '#', github: '#',
  },
];

const filters = ['All', 'Flutter', 'Python', 'Web'];

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
