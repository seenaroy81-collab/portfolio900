import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Check,
  Users,
  User,
  Users2,
  Calendar,
  Briefcase,
  Clock,
  Home,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ayurvedaImg from '@/assets/ayurveda.jpg';

const audiences = [
  { icon: User, title: 'Yoga Instructors', desc: 'Host your retreats or workshops' },
  { icon: Users, title: 'Individual Practitioners', desc: 'Personal practice sessions' },
  { icon: Users2, title: 'Small Groups', desc: 'Friends or communities' },
  { icon: Calendar, title: 'Workshops & Events', desc: 'Trainings & wellness programs' },
  { icon: Briefcase, title: 'Corporate Teams', desc: 'Relaxation & mindfulness' },
];

const packages = [
  {
    name: 'Space-Only Package',
    type: '1',
    description: 'Chamundi provides just the yoga space for teachers who manage everything else independently.',
    includes: [
      'Indoor/outdoor yoga hall',
      'Mats, sound system & lighting',
      'Access to washrooms',
      'Gardens for meditation',
      'Tea/water setup'
    ],
    bestFor: 'Experienced teachers with their own logistics setup.',
    whyGood: [
      'No extra management needed',
      'Steady income in off-season',
      'Attracts independent trainers'
    ],
    highlight: false,
  },
  {
    name: 'With Accommodation',
    type: '2',
    description: 'Yoga space + rooms + meals. Organizer focuses on sessions while we handle hospitality.',
    includes: [
      'Yoga hall',
      'Comfortable single/twin rooms',
      'Satvik Ayurvedic meals (3 per day)',
      'Wi-Fi & housekeeping',
      'Smooth guest experience'
    ],
    bestFor: 'Teachers wanting a ready-made experience without logistics stress.',
    whyGood: [
      'Higher revenue per booking',
      'Longer stays (7–14 days)',
      'Strong reviews & return clients'
    ],
    highlight: true,
  },
  {
    name: 'Ayurveda Treatments',
    type: '3',
    description: 'A full Yoga + Ayurveda wellness retreat experience, perfect for wellness tourists.',
    includes: [
      'Everything from Package 2',
      'Ayurvedic treatments (Abhyangam, etc.)',
      'Doctor consultation',
      'Optional Panchakarma add-ons',
      'Holistic approach'
    ],
    bestFor: 'Teachers offering premium "Yoga + Ayurveda" holistic retreats.',
    whyGood: [
      'Highest profit margin',
      'Unique retreat identity',
      'Attracts global travelers (EU/US)'
    ],
    highlight: false,
  },
];

const pricingInfo = {
  options: ['Hourly Rental', 'Half-Day or Full-Day', 'Weekly Packages', 'Monthly Membership'],
  tiers: ['Peak vs. Off-peak hours', 'Weekday vs. Weekend rates', 'Single vs. Package deals', 'Instructor membership plans', 'Student discounts'],
  included: ['Studio space', 'Basic yoga equipment', 'Changing facilities', 'Parking'],
  additional: ['Extended hours on request', 'Extra equipment rental', 'Reception / Check-in support', 'Marketing support']
};

const TiltCard = ({ children, className, highlight }: { children: React.ReactNode, className: string, highlight?: boolean }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-all duration-200 ${className}`}
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        {children}
      </div>
      {highlight && (
        <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-primary/20 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      )}
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-forest relative overflow-hidden perspective-2000">
      {/* Dynamic Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Parallax Background with refined overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `url(${ayurvedaImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
        initial={{ scale: 1.1 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 2 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest via-transparent to-forest pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 20 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-32"
        >
          <motion.span
            initial={{ opacity: 0, translateZ: -20 }}
            animate={isInView ? { opacity: 1, translateZ: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="inline-block px-5 py-2 rounded-full border border-gold/20 bg-gold/5 text-gold text-[10px] tracking-[0.4em] uppercase font-bold mb-8"
          >
            A Holistic Journey
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-serif text-white mb-10 tracking-tight leading-none">
            The <span className="text-gradient-gold">Chamundi</span> Experience
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed italic">
            Flexible packages and serene spaces designed with intentionality for instructors,
            practitioners, and wellness groups seeking spiritual resonance.
          </p>
        </motion.div>

        {/* Who Can Book */}
        <div className="mb-32">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="text-2xl font-serif text-forest-foreground mb-12 flex items-center gap-4"
          >
            <Users className="text-gold" /> Who Can Book Our Space
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {audiences.map((aud, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                whileHover={{ y: -10, translateZ: 20, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                className="p-6 rounded-2xl bg-forest-foreground/5 border border-forest-foreground/10 backdrop-blur-sm cursor-default transition-all duration-300 preserve-3d shadow-xl"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                  className="mb-4"
                >
                  <aud.icon className="w-8 h-8 text-gold" style={{ filter: "drop-shadow(0 5px 15px rgba(212,175,55,0.3))" }} />
                </motion.div>
                <h4 className="text-forest-foreground font-medium mb-2">{aud.title}</h4>
                <p className="text-xs text-forest-foreground/60 leading-relaxed">{aud.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Retreat Packages */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <Sparkles className="text-gold" />
            <h3 className="text-2xl font-serif text-forest-foreground">Retreat Packages for Yoga Instructors</h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {packages.map((pkg, index) => (
              <TiltCard
                key={pkg.name}
                className="group"
                highlight={pkg.highlight}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2 }}
                  className={`relative h-full rounded-3xl p-8 flex flex-col transition-all duration-500 shadow-2xl ${pkg.highlight
                    ? 'bg-gold text-gold-foreground border-2 border-white/20'
                    : 'bg-forest-foreground/10 text-forest-foreground border border-forest-foreground/10 group-hover:border-gold/30'
                    }`}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-forest text-forest-foreground text-xs font-medium tracking-wider uppercase shadow-xl" style={{ transform: "translateZ(30px)" }}>
                      Recommended
                    </div>
                  )}

                  <div className="mb-8" style={{ transform: "translateZ(40px)" }}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${pkg.highlight ? 'bg-forest/10' : 'bg-gold/10'}`}>
                      <span className="text-2xl font-serif font-bold text-gold">{pkg.type}</span>
                    </div>
                    <h4 className="text-2xl font-serif mb-3 tracking-tight">{pkg.name}</h4>
                    <p className={`text-sm leading-relaxed ${pkg.highlight ? 'text-gold-foreground/80' : 'text-forest-foreground/60'}`}>
                      {pkg.description}
                    </p>
                  </div>

                  <div className="space-y-8 flex-grow" style={{ transform: "translateZ(30px)" }}>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${pkg.highlight ? 'text-forest' : 'text-gold'}`}>Includes</p>
                      <ul className="space-y-2.5">
                        {pkg.includes.map((item, i) => (
                          <li key={i} className="flex gap-3 text-sm">
                            <Check size={16} className={`flex-shrink-0 mt-0.5 ${pkg.highlight ? 'text-forest' : 'text-gold'}`} />
                            <span className={pkg.highlight ? 'text-gold-foreground/90' : 'text-forest-foreground/80'}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${pkg.highlight ? 'text-forest' : 'text-gold'}`}>Best For</p>
                      <p className="text-sm italic">{pkg.bestFor}</p>
                    </div>

                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${pkg.highlight ? 'text-forest' : 'text-gold'}`}>Why it's good</p>
                      <ul className="space-y-2.5">
                        {pkg.whyGood.map((item, i) => (
                          <li key={i} className="flex gap-3 text-sm">
                            <Check size={16} className={`flex-shrink-0 mt-0.5 ${pkg.highlight ? 'text-forest' : 'text-gold'}`} />
                            <span className={pkg.highlight ? 'text-gold-foreground/90' : 'text-forest-foreground/80'}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    to="/booking"
                    style={{ transform: "translateZ(50px)" }}
                    className={`mt-10 flex items-center justify-center gap-2 w-full py-4 rounded-xl font-medium transition-all shadow-lg hover:shadow-2xl group/btn ${pkg.highlight
                      ? 'bg-forest text-forest-foreground hover:bg-forest/90'
                      : 'bg-gold text-gold-foreground hover:bg-gold/90'
                      }`}
                  >
                    Book This Package
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pt-20 border-t border-forest-foreground/10">
          {[
            { icon: Clock, title: 'Booking Options', data: pricingInfo.options },
            { icon: ShieldCheck, title: 'Pricing Tiers', data: pricingInfo.tiers },
            { icon: Home, title: "What's Included", data: pricingInfo.included },
            { icon: Plus, title: 'Additional Services', data: pricingInfo.additional }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6 text-gold group">
                <item.icon size={20} className="group-hover:rotate-12 transition-transform" />
                <h4 className="font-serif text-lg text-forest-foreground">{item.title}</h4>
              </div>
              <ul className="space-y-4">
                {item.data.map((text, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5, color: "#d4af37" }}
                    className="text-forest-foreground/70 text-sm flex items-center gap-2 cursor-default transition-colors"
                  >
                    <div className="w-1 h-1 rounded-full bg-gold" /> {text}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

