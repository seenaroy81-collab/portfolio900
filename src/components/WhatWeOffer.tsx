import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Home, ShieldCheck, Users, Calendar } from 'lucide-react';

const offerings = [
  {
    icon: Home,
    title: 'Fully-equipped yoga studios',
    description: 'State-of-the-art facilities with all necessary props and equipment for your practice.',
  },
  {
    icon: ShieldCheck,
    title: 'Peaceful, dedicated environment',
    description: 'A serene and distraction-free space designed specifically for mindfulness and growth.',
  },
  {
    icon: Users,
    title: 'Ideal for yoga instructors & students',
    description: 'Perfect for private classes, group sessions, or personal practice at any level.',
  },
  {
    icon: Calendar,
    title: 'Flexible booking options',
    description: 'Easily book by the hour or reserve recurring slots to suit your schedule.',
  },
];

const WhatWeOffer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="section-padding bg-secondary/20 relative overflow-hidden">
      {/* Refined Background Aura */}
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-8"
          >
            Our Offerings
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-serif text-foreground mb-10 tracking-tight">
            What We <span className="text-gradient-sage">Offer</span>
          </h2>
          <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto font-light leading-relaxed italic border-r-2 border-gold/30 pr-8">
            A premium sanctuary designed for those who teach and those who practice.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {offerings.map((offering, index) => (
            <motion.div
              key={offering.title}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -12, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)", translateZ: 20 }}
                className="h-full p-8 rounded-2xl bg-card glass-card border border-transparent hover:border-primary/10 transition-all duration-500 preserve-3d"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-500">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                    whileHover={{ scale: 1.15 }}
                  >
                    <offering.icon className="w-7 h-7 text-primary group-hover:text-gold transition-colors duration-500" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-serif font-medium text-foreground mb-3">
                  {offering.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {offering.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
