import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "Studios", href: "/#studios" },
    { name: "Services", href: "/#services" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm py-3"
        : "bg-gradient-to-b from-black/40 via-black/10 to-transparent py-8"
        }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center transition-all duration-500"
          >
            <img src={logo} alt="Chamundi Hill Palace Logo" className="w-full h-full object-cover scale-110" />
          </motion.div>
          <div className="hidden sm:block">
            <h1 className={`text-xl font-serif font-bold tracking-[0.05em] leading-tight transition-all duration-500 ${!isScrolled ? 'text-white' : 'text-foreground'
              }`}>
              Chamundi <span className="text-gradient-gold">Hill Palace</span>
            </h1>
            <p className={`text-[10px] tracking-[0.3em] font-light uppercase transition-all duration-500 ${!isScrolled ? 'text-white/80' : 'text-muted-foreground'
              }`}>
              Ayurvedic Resort
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-500 hover:opacity-100 ${isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white"
                }`}
            >
              {link.name}
              <motion.span
                className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gold"
                whileHover={{ width: "100%", left: 0 }}
                transition={{ duration: 0.3 }}
              />
            </a>
          ))}
          <Link to="/booking" className={`btn-primary text-xs px-8 py-3 font-bold tracking-widest uppercase transition-all duration-500 ${!isScrolled ? "bg-white text-primary hover:bg-gold hover:text-gold-foreground" : ""
            }`}>
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/98 backdrop-blur-lg border-t border-border"
          >
            <div className="container-custom py-6 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground py-2 border-b border-border/50"
                >
                  {link.name}
                </motion.a>
              ))}
              <Link
                to="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary text-center mt-4"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
