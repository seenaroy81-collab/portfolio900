import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Users, Wifi, Wind, Dumbbell, Music, Snowflake, DoorOpen, Lock, ShowerHead, Car } from 'lucide-react';
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

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden rounded-2xl group ${isReversed ? 'lg:order-2' : ''}`}>
        <motion.div
          style={{ y: imageY }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="aspect-square cursor-pointer overflow-hidden"
        >
          <img
            src={studio.image}
            alt={studio.name}
            className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-125"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent pointer-events-none" />

        {/* Floating badge */}
        <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-gold text-gold-foreground text-sm font-medium shadow-lg">
          Studio {studio.id}
        </div>
      </div>

      {/* Content */}
      <div className={isReversed ? 'lg:order-1' : ''}>
        <span className="text-sm text-gold tracking-widest uppercase font-medium">
          {studio.subtitle}
        </span>
        <h3 className="text-3xl md:text-4xl font-serif font-medium text-foreground mt-2 mb-4">
          {studio.name}
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          {studio.description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-4 mb-8">
          {studio.amenities.map((amenity) => (
            <motion.div
              key={amenity.label}
              whileHover={{ x: 5, backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm transition-colors duration-300 cursor-default"
            >
              <amenity.icon size={16} />
              <span>{amenity.label}</span>
            </motion.div>
          ))}
        </div>

        <Link to="/booking" className="btn-primary inline-block">
          Book This Space
        </Link>
      </div>
    </motion.div>
  );
};

const Studios = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="studios" ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03] pointer-events-none" />

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-32"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-8"
          >
            Sacred Spaces
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-serif text-foreground mb-8 tracking-tight">
            Serene <span className="text-gradient-sage">Studios</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed italic border-l-2 border-gold/30 pl-8 ml-auto mr-auto">
            Two unique sanctuaries architected to nurture your practice and deepen your connection with the divine rhythm of nature.
          </p>
        </motion.div>

        <div className="space-y-24 lg:space-y-32 mb-32">
          {studios.map((studio, index) => (
            <StudioCard key={studio.id} studio={studio} index={index} />
          ))}
        </div>

        {/* Amenities Included Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-secondary/20 rounded-3xl p-10 md:p-14 border border-border/50 mb-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif mb-4">Amenities Included</h3>
            <div className="w-16 h-1 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <amenity.icon size={20} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{amenity.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Virtual Tour Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center p-12 rounded-3xl bg-forest/5 border border-forest/10"
        >
          <div className="inline-block mb-4 text-3xl animate-pulse">🌀</div>
          <h3 className="text-2xl font-serif mb-2">360° Virtual Tour</h3>
          <p className="text-muted-foreground italic">Coming soon – explore our sanctuaries from anywhere.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Studios;
