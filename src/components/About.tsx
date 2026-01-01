import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

    return (
        <section id="about" ref={sectionRef} className="section-padding bg-background overflow-hidden">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.3 }}
                            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-8"
                        >
                            The Essence of Stillness
                        </motion.span>
                        <h2 className="text-5xl md:text-7xl font-serif text-foreground mb-10 leading-[1.1] tracking-tight">
                            About <span className="text-gradient-sage">Chamundi Hill Palace</span>
                        </h2>
                        <div className="space-y-8 text-xl text-muted-foreground/80 leading-relaxed font-light italic">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                Chamundi Hill Palace Ayurvedic Resort was created as a peaceful sanctuary for yoga, meditation, and wellness.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
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
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="bg-card rounded-3xl p-8 md:p-12 shadow-elevated border border-border relative transition-colors duration-500 hover:border-primary/20"
                    >
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-3xl" />

                        <h3 className="text-2xl font-serif text-foreground mb-10 flex items-center gap-3">
                            <span className="w-10 h-0.5 bg-primary" />
                            Why Choose Our Space
                        </h3>

                        <div className="space-y-8">
                            {commitments.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    whileHover={{ x: 5 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="flex gap-5 group cursor-default"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/10"
                                    >
                                        <item.icon className="w-6 h-6 text-primary" />
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
