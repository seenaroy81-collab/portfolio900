import { Heart } from 'lucide-react';
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
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                <img src={logo} alt="Chamundi Hill Palace Logo" className="w-full h-full object-cover scale-110" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold leading-tight text-white">
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
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-gold font-medium mb-6 tracking-wider uppercase text-sm">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-forest-foreground/70 hover:text-forest-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold font-medium mb-6 tracking-wider uppercase text-sm">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-forest-foreground/70 hover:text-forest-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gold font-medium mb-6 tracking-wider uppercase text-sm">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-forest-foreground/70 hover:text-forest-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
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
