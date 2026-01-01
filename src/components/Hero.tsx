import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.jpg';
import heroBg2 from '@/assets/hero-chatgpt-1.png';
import heroBg3 from '@/assets/hero-chatgpt-2.png';
import heroBg4 from '@/assets/hero-chatgpt-3.png';
import heroBg5 from '@/assets/hero_bg.png';

const Hero = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const backgrounds = [heroBg, heroBg2, heroBg3, heroBg4, heroBg5];

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

  // Mouse Parallax Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  // Typewriter effect logic
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ['Space ', 'Sanctuary', 'Harmony', 'Practice', 'Journey'];
  const typingSpeed = isDeleting ? 100 : 150;
  const pauseTime = 2000;

  useEffect(() => {
    const currentWord = words[wordIndex];
    const updateText = () => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(updateText, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000"
    >
      {/* Background Layer (Deeper Parallax) */}
      <motion.div
        style={{
          y: backgroundY,
          rotateX,
          rotateY,
          scale: 1.1
        }}
        className="absolute inset-0 z-0"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/20 to-background" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
      </motion.div>

      {/* 3D Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0.5, 1.5, 0.5],
              rotate: [0, 180, 360],
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
            }}
            transition={{
              duration: 7 + Math.random() * 7,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
            className="absolute hidden md:block"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles
              className="text-gold w-4 h-4"
              style={{ filter: "drop-shadow(0 0 10px rgba(212,175,55,0.5))" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Content Layer */}
      <motion.div
        style={{
          y: textY,
          opacity,
          rotateX: useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]),
          rotateY: useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]),
          transformStyle: "preserve-3d"
        }}
        className="relative z-20 container-custom text-left md:text-center flex flex-col items-start md:items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, translateZ: 50 }}
          animate={{ opacity: 1, y: 0, translateZ: 50 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <span className="inline-block px-5 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold text-[10px] tracking-[0.4em] uppercase font-bold backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            Premium Yoga Experience
          </span>
        </motion.div>

        <h1
          className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-medium text-white mb-10 leading-[0.9] tracking-tighter overflow-visible"
          style={{ transform: "translateZ(100px)" }}
        >
          <div className="flex flex-col md:items-center">
            <div className="flex flex-wrap md:justify-center">
              {["Your", "Perfect", "Yoga"].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0, rotateX: 45 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ duration: 1.2, delay: 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block mr-[0.2em] origin-bottom"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, translateZ: -50 }}
              animate={{ opacity: 1, scale: 1, translateZ: 0 }}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              className="text-gradient-gold block mt-2 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] min-h-[1.2em] relative"
            >
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[4px] h-[0.8em] bg-gold ml-2 align-middle"
              />
            </motion.div>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20, translateZ: 30 }}
          animate={{ opacity: 1, y: 0, translateZ: 30 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-lg md:text-2xl text-white/70 max-w-2xl mb-14 font-light leading-relaxed tracking-wide italic"
        >
          Premium studio space for instructors and practitioners
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, translateZ: 50 }}
          animate={{ opacity: 1, scale: 1, translateZ: 50 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, translateZ: 20 }}
            whileTap={{ scale: 0.98 }}
            className="perspective-500"
          >
            <Link to="/booking" className="btn-primary text-sm font-bold tracking-[0.2em] px-10 py-5 bg-gold text-gold-foreground block shadow-[0_10px_20px_-5px_rgba(212,175,55,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.6)] transition-all">
              BOOK SPACE NOW
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, translateZ: 20 }}
            whileTap={{ scale: 0.98 }}
            className="perspective-500"
          >
            <a href="#studios" className="btn-outline border-white/30 text-white hover:bg-white hover:text-forest text-sm font-bold tracking-[0.2em] px-10 py-5 backdrop-blur-sm block transition-all shadow-lg">
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

