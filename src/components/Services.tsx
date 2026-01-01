import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-forest relative overflow-hidden">
      {/* Dynamic Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Parallax Background with refined overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `url(${ayurvedaImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest via-transparent to-forest pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-32"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
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
          <h3 className="text-2xl font-serif text-forest-foreground mb-12 flex items-center gap-4">
            <Users className="text-gold" /> Who Can Book Our Space
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {audiences.map((aud, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-forest-foreground/5 border border-forest-foreground/10 backdrop-blur-sm cursor-default transition-colors duration-300"
              >
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                  <aud.icon className="w-8 h-8 text-gold mb-4" />
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

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                whileHover={{ y: -10 }}
                className={`relative rounded-3xl p-8 flex flex-col transition-all duration-500 ${pkg.highlight
                  ? 'bg-gold text-gold-foreground shadow-2xl lg:scale-105 z-10'
                  : 'bg-forest-foreground/10 text-forest-foreground border border-forest-foreground/10 hover:border-gold/30'
                  }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-forest text-forest-foreground text-xs font-medium tracking-wider uppercase">
                    Recommended
                  </div>
                )}

                <div className="mb-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${pkg.highlight ? 'bg-forest/10' : 'bg-gold/10'}`}>
                    <span className="text-2xl font-serif font-bold text-gold">{pkg.type}</span>
                  </div>
                  <h4 className="text-2xl font-serif mb-3">{pkg.name}</h4>
                  <p className={`text-sm leading-relaxed ${pkg.highlight ? 'text-gold-foreground/80' : 'text-forest-foreground/60'}`}>
                    {pkg.description}
                  </p>
                </div>

                <div className="space-y-8 flex-grow">
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
                  className={`mt-10 flex items-center justify-center gap-2 w-full py-4 rounded-xl font-medium transition-all group ${pkg.highlight
                    ? 'bg-forest text-forest-foreground hover:bg-forest/90'
                    : 'bg-gold text-gold-foreground hover:bg-gold/90'
                    }`}
                >
                  Book This Package
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pt-20 border-t border-forest-foreground/10">
          {/* Booking Options */}
          <div>
            <div className="flex items-center gap-3 mb-6 text-gold">
              <Clock size={20} />
              <h4 className="font-serif text-lg text-forest-foreground">Booking Options</h4>
            </div>
            <ul className="space-y-4">
              {pricingInfo.options.map((opt, i) => (
                <li key={i} className="text-forest-foreground/70 text-sm flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold" /> {opt}
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing Tiers */}
          <div>
            <div className="flex items-center gap-3 mb-6 text-gold">
              <ShieldCheck size={20} />
              <h4 className="font-serif text-lg text-forest-foreground">Pricing Tiers</h4>
            </div>
            <ul className="space-y-4">
              {pricingInfo.tiers.map((tier, i) => (
                <li key={i} className="text-forest-foreground/70 text-sm flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold" /> {tier}
                </li>
              ))}
            </ul>
          </div>

          {/* What's Included */}
          <div>
            <div className="flex items-center gap-3 mb-6 text-gold">
              <Home size={20} />
              <h4 className="font-serif text-lg text-forest-foreground">What's Included</h4>
            </div>
            <ul className="space-y-4">
              {pricingInfo.included.map((item, i) => (
                <li key={i} className="text-forest-foreground/70 text-sm flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Services */}
          <div>
            <div className="flex items-center gap-3 mb-6 text-gold">
              <Plus size={20} />
              <h4 className="font-serif text-lg text-forest-foreground">Additional Services</h4>
            </div>
            <ul className="space-y-4">
              {pricingInfo.additional.map((item, i) => (
                <li key={i} className="text-forest-foreground/70 text-sm flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
