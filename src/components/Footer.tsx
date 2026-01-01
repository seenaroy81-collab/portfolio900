import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.jpg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: 'Our Studios', href: '#studios' },
      { name: 'Services', href: '#services' },
      { name: 'About Us', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ],
    services: [
      { name: 'Yoga Classes', href: '#' },
      { name: 'Ayurveda Treatments', href: '#' },
      { name: 'Meditation Retreats', href: '#' },
      { name: 'Teacher Training', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cancellation Policy', href: '#' },
    ],
  };

  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="container-custom section-padding pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6 group cursor-default">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center ring-2 ring-white/10 group-hover:ring-gold/30"
              >
                <img src={logo} alt="Chamundi Hill Palace Logo" className="w-full h-full object-cover scale-110" />
              </motion.div>
              <div>
                <h3 className="text-lg font-serif font-semibold leading-tight text-white group-hover:text-gold transition-colors">
                  Chamundi Hill Palace
                </h3>
                <p className="text-[10px] text-forest-foreground/60 tracking-widest uppercase">
                  Ayurvedic Resort
                </p>
              </div>
            </div>
            <p className="text-forest-foreground/70 text-sm leading-relaxed">
              Experience authentic Ayurvedic wellness and traditional yoga practices
              in the serene backwaters of Kerala. Your journey to balance begins here.
            </p>
          </motion.div>

          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-gold font-medium mb-6 tracking-wider uppercase text-sm">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link, idx) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: "#ffffff" }}
                    className="text-forest-foreground/70 transition-all text-sm block"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-gold font-medium mb-6 tracking-wider uppercase text-sm">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: "#ffffff" }}
                    className="text-forest-foreground/70 transition-all text-sm block"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-gold font-medium mb-6 tracking-wider uppercase text-sm">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: "#ffffff" }}
                    className="text-forest-foreground/70 transition-all text-sm block"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-forest-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-forest-foreground/50 text-sm">
            © {currentYear} RENO. All rights reserved.
          </p>
          <p className="text-forest-foreground/50 text-sm flex items-center gap-1">
            Made by RENO EBENEZER ROY <Heart size={14} className="text-accent fill-accent" /> in Kerala, India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
