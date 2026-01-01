import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Sparkles, Dumbbell, Banknote, ShieldCheck } from 'lucide-react';

const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    const commitments = [
        {
            icon: MapPin,
            title: 'Prime location',
            text: 'Surrounded by nature and serene landscapes'
        },
        {
            icon: Sparkles,
            title: 'Professional atmosphere',
            text: 'A peaceful environment dedicated to practice'
        },
        {
            icon: Dumbbell,
            title: 'Full Equipment',
            text: 'All necessary props and gear included'
        },
        {
            icon: Banknote,
            title: 'Affordable rates',
            text: 'Premium space at competitive pricing'
        },
        {
            icon: ShieldCheck,
            title: 'Well-maintained',
            text: 'Clean and hygienic facilities for everyone'
        }
    ];

    // Card Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section id="about" ref={sectionRef} className="section-padding bg-background overflow-hidden perspective-1000">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, rotateX: 10 }}
                        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <motion.span
                            initial={{ opacity: 0, translateZ: -20 }}
                            animate={isInView ? { opacity: 1, translateZ: 0 } : {}}
                            transition={{ delay: 0.3 }}
                            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-8 shadow-sm"
                        >
                            The Essence of Stillness
                        </motion.span>
                        <h2 className="text-5xl md:text-7xl font-serif text-foreground mb-10 leading-[1.1] tracking-tight">
                            About <span className="text-gradient-sage">Chamundi Hill Palace</span>
                        </h2>
                        <div className="space-y-8 text-xl text-muted-foreground/80 leading-relaxed font-light italic">
                            <motion.p
                                initial={{ opacity: 0, y: 20, translateZ: 20 }}
                                animate={isInView ? { opacity: 1, y: 0, translateZ: 0 } : {}}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                Chamundi Hill Palace Ayurvedic Resort was created as a peaceful sanctuary for yoga, meditation, and wellness.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20, translateZ: 20 }}
                                animate={isInView ? { opacity: 1, y: 0, translateZ: 0 } : {}}
                                transition={{ delay: 0.7, duration: 1 }}
                            >
                                Our goal is to provide yoga teachers, travelers, and practitioners a serene environment
                                to connect deeply with their practice — surrounded by nature and calm energy.
                            </motion.p>
                        </div>

                        <div className="mt-14 h-[2px] bg-gradient-to-r from-gold/50 to-transparent w-32" />
                    </motion.div>

                    {/* Commitments Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40, rotateY: 10 }}
                        animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d",
                        }}
                        className="bg-card rounded-4xl p-8 md:p-12 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] border border-border/50 relative transition-all duration-300 hover:shadow-2xl"
                    >
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                        <h3
                            className="text-2xl font-serif text-foreground mb-10 flex items-center gap-3"
                            style={{ transform: "translateZ(40px)" }}
                        >
                            <span className="w-10 h-0.5 bg-primary" />
                            Why Choose Our Space
                        </h3>

                        <div className="space-y-8" style={{ transform: "translateZ(30px)" }}>
                            {commitments.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20, x: -10 }}
                                    animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                                    whileHover={{ x: 10, translateZ: 20 }}
                                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                                    className="flex gap-5 group cursor-default preserve-3d"
                                >
                                    <motion.div
                                        animate={{
                                            y: [0, -5, 0],
                                            rotate: [0, index % 2 === 0 ? 5 : -5, 0],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            delay: index * 0.2,
                                            ease: "easeInOut"
                                        }}
                                        className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-primary/10 group-hover:shadow-lg shadow-sm"
                                    >
                                        <item.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                                    </motion.div>
                                    <div>
                                        <h4 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                                        <p className="text-muted-foreground text-sm">{item.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

