import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.jpg';
import heroBg2 from '@/assets/hero-chatgpt-1.png';
import heroBg3 from '@/assets/hero-chatgpt-2.png';
import heroBg4 from '@/assets/hero-chatgpt-3.png';


const Hero = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const backgrounds = [heroBg, heroBg2, heroBg3, heroBg4];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Slider */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
              style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/20 to-background" />
        {/* Organic Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 container-custom text-left md:text-center flex flex-col items-start md:items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <span className="inline-block px-5 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold text-[10px] tracking-[0.4em] uppercase font-bold backdrop-blur-sm">
            Premium Yoga Experience
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-medium text-white mb-10 leading-[0.9] tracking-tighter overflow-hidden">
          {["Your", "Perfect", "Yoga"].map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.2em]"
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
            className="text-gradient-gold block mt-2"
          >
            Space Awaits
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-lg md:text-2xl text-white/70 max-w-2xl mb-14 font-light leading-relaxed tracking-wide italic"
        >
          Premium studio space for instructors and practitioners
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link to="/booking" className="btn-primary text-sm font-bold tracking-[0.2em] px-10 py-5 bg-gold text-gold-foreground">
              BOOK SPACE NOW
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <a href="#studios" className="btn-outline border-white/30 text-white hover:bg-white hover:text-forest text-sm font-bold tracking-[0.2em] px-10 py-5 backdrop-blur-sm">
              VIEW STUDIOS
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-primary-foreground/60"
        >
          <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
