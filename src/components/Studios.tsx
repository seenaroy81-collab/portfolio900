import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Users, Wifi, Wind, Dumbbell, Music, Snowflake, DoorOpen, Lock, ShowerHead, Car, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import studio1 from '@/assets/studio-1.jpg';
import studio2 from '@/assets/studio-2.jpg';

const studios = [
  {
    id: 1,
    name: 'Studio 1 – Main Yoga Hall',
    subtitle: 'Group Haven',
    image: studio1,
    description: 'Spacious, bright studio for group sessions (20–30 people). Features natural wood flooring and floor-to-ceiling windows. Equipped with mats, blocks, bolsters, and sound system. Ideal for workshops and teacher trainings.',
    amenities: [
      { icon: Users, label: 'Capacity 20–30' },
      { icon: Wind, label: 'Natural Lighting' },
      { icon: Dumbbell, label: 'Full Equipment' },
      { icon: Music, label: 'Sound System' },
    ],
  },
  {
    id: 2,
    name: 'Studio 2 – Private Studio',
    subtitle: 'Personal Sanctuary',
    image: studio2,
    description: 'Cozy and calm atmosphere, perfect for one-on-one or small classes (5–10 people). Equipped with essential yoga props to nurture your private practice.',
    amenities: [
      { icon: Users, label: 'Capacity 5–10' },
      { icon: Wind, label: 'Quiet Space' },
      { icon: Dumbbell, label: 'Essential Props' },
    ],
  },
];

const StudioCard = ({
  studio,
  index
}: {
  studio: typeof studios[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const isReversed = index % 2 === 1;

  // Mouse Parallax for Image
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-24 items-center perspective-1000 ${isReversed ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Image Layer */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative overflow-hidden rounded-3xl group shadow-2xl ${isReversed ? 'lg:order-2' : ''}`}
      >
        <motion.div
          style={{ y: imageY, scale: 1.1 }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.6 }}
          className="aspect-[4/3] cursor-pointer overflow-hidden"
        >
          <img
            src={studio.image}
            alt={studio.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent pointer-events-none" />

        {/* Floating badge */}
        <div
          className="absolute top-8 left-8 px-5 py-2 rounded-full bg-gold text-gold-foreground text-xs font-bold tracking-widest uppercase shadow-xl"
          style={{ transform: "translateZ(50px)" }}
        >
          Studio {studio.id}
        </div>
      </motion.div>

      {/* Content Layer */}
      <motion.div
        className={isReversed ? 'lg:order-1' : ''}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="text-sm text-gold tracking-[0.3em] uppercase font-bold block mb-4"
          style={{ transform: "translateZ(30px)" }}
        >
          {studio.subtitle}
        </motion.span>
        <h3
          className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-6 leading-tight"
          style={{ transform: "translateZ(50px)" }}
        >
          {studio.name}
        </h3>
        <p
          className="text-lg text-muted-foreground leading-relaxed mb-10 font-light italic"
          style={{ transform: "translateZ(20px)" }}
        >
          {studio.description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-4 mb-10" style={{ transform: "translateZ(40px)" }}>
          {studio.amenities.map((amenity) => (
            <motion.div
              key={amenity.label}
              whileHover={{
                scale: 1.1,
                rotate: 2,
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                translateZ: 20
              }}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium transition-all duration-300 cursor-default shadow-sm hover:shadow-lg border border-border/50"
            >
              <amenity.icon size={18} />
              <span>{amenity.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{ transform: "translateZ(60px)" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to="/booking" className="btn-primary inline-block px-10 py-4 shadow-xl hover:shadow-2xl transition-all">
            Book This Space
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Studios = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="studios" ref={sectionRef} className="section-padding bg-background relative overflow-hidden perspective-2000">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03] pointer-events-none" />

      {/* Ambient background elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 15 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-32"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.span
            initial={{ opacity: 0, translateZ: -20 }}
            animate={isInView ? { opacity: 1, translateZ: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-8 shadow-sm"
          >
            Sacred Spaces
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-serif text-foreground mb-8 tracking-tight">
            Serene <span className="text-gradient-sage">Studios</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed italic border-l-2 border-gold/30 pl-8 ml-auto mr-auto">
            Two unique sanctuaries architected to nurture your practice and deepen your connection with the divine rhythm of nature.
          </p>
        </motion.div>

        <div className="space-y-40 lg:space-y-56 mb-40">
          {studios.map((studio, index) => (
            <StudioCard key={studio.id} studio={studio} index={index} />
          ))}
        </div>

        {/* Amenities Included Section */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ transformStyle: "preserve-3d" }}
          className="bg-card/50 backdrop-blur-md rounded-[2.5rem] p-10 md:p-20 border border-border/50 mb-24 shadow-elevated relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Sparkles size={120} className="text-gold" />
          </div>

          <div className="text-center mb-16" style={{ transform: "translateZ(40px)" }}>
            <h3 className="text-4xl font-serif mb-6">Premium Amenities</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12" style={{ transform: "translateZ(30px)" }}>
            {[
              { icon: Dumbbell, label: 'Yoga mats, blocks, straps, bolsters' },
              { icon: Music, label: 'Sound system' },
              { icon: Snowflake, label: 'Air conditioning / heating' },
              { icon: DoorOpen, label: 'Changing rooms' },
              { icon: Lock, label: 'Storage lockers' },
              { icon: ShowerHead, label: 'Shower facilities' },
              { icon: Car, label: 'Parking space' },
              { icon: Wifi, label: 'Wi-Fi' },
            ].map((amenity, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10, translateZ: 20 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-sm">
                  <amenity.icon size={28} />
                </div>
                <span className="text-sm font-medium text-muted-foreground/80 group-hover:text-foreground transition-colors px-4">{amenity.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Virtual Tour Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true }}
          className="text-center p-16 rounded-[3rem] bg-forest/5 border border-forest/10 relative overflow-hidden group mb-20"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-8 text-5xl grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
          >
            🌀
          </motion.div>
          <h3 className="text-3xl font-serif mb-4" style={{ transform: "translateZ(40px)" }}>360° Virtual Tour</h3>
          <p className="text-lg text-muted-foreground italic max-w-md mx-auto" style={{ transform: "translateZ(20px)" }}>
            Coming soon – explore our sanctuaries from anywhere in the world with immersive 3D technology.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Studios;

