import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import emailjs from '@emailjs/browser';

const socials = [
  { icon: Github, href: 'https://github.com/dhananjaya0013', label: 'GitHub' },
  { icon: Instagram, href: 'https://www.instagram.com/dhananjaya_poojary24?igsh=MXdtYzJnbm4weTV0cA==', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/dhananjaya-poojary-232057379', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:dhananjayapoojary.official@gmail.com', label: 'Email' },
];

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize EmailJS only once when component mounts
  useEffect(() => {
    emailjs.init('1LRcY7982yGR2XylP');
    
    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (formRef.current) {
      emailjs
        .sendForm('service_wsypaot', 'template_4ir6kbp', formRef.current)
        .then(
          () => {
            setStatusMessage('✅ Message sent successfully!');
            formRef.current?.reset();
            // Clear message after 5 seconds
            timeoutRef.current = setTimeout(() => setStatusMessage(''), 5000);
          },
          (error) => {
            console.error('EmailJS Error:', error);
            setStatusMessage('❌ Error! Please try again later.');
            // Clear error message after 5 seconds
            timeoutRef.current = setTimeout(() => setStatusMessage(''), 5000);
          }
        )
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-display text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get In <span className="gradient-text">Touch</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <input
                type="text"
                name="from_name"
                placeholder="Name"
                required
                className="w-full px-4 py-3 bg-secondary rounded-lg border border-border text-foreground
                  placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_15px_hsl(185,100%,50%,0.15)]
                  transition-all duration-300"
              />
            </div>
            <div>
              <input
                type="email"
                name="from_email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 bg-secondary rounded-lg border border-border text-foreground
                  placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_15px_hsl(185,100%,50%,0.15)]
                  transition-all duration-300"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-secondary rounded-lg border border-border text-foreground
                  placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_15px_hsl(185,100%,50%,0.15)]
                  transition-all duration-300 resize-none"
              />
            </div>
            
            {statusMessage && (
              <motion.p
                className={`text-sm text-center ${statusMessage.includes('✅') ? 'text-primary' : 'text-destructive'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {statusMessage}
              </motion.p>
            )}
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold font-display
                flex items-center justify-center gap-2 hover:shadow-[0_0_30px_hsl(185,100%,50%,0.3)] transition-shadow
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} /> {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>

          {/* Info */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold font-display mb-4">Let's work together</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 glass rounded-lg flex items-center justify-center text-muted-foreground
                    hover:text-primary hover:shadow-[0_0_20px_hsl(185,100%,50%,0.2)] transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
