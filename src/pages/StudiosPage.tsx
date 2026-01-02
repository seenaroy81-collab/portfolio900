import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Background3D from '@/components/Background3D';
import { motion } from 'framer-motion';
import Studios from '@/components/Studios';

const StudiosPage = () => {
    return (
        <div className="min-h-screen relative">
            <Background3D />
            <Navbar />
            <div className="relative z-10 pt-32">
                <div className="container-custom mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
                            Our <span className="text-gradient-gold">Studios</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                            Explore our world-class yoga studios and Ayurvedic centers across Kerala.
                        </p>
                        <div className="mt-12 p-8 rounded-3xl bg-gold/10 border border-gold/20 max-w-4xl mx-auto">
                            <h3 className="text-2xl font-serif font-bold text-gold mb-4">Yoga + Ayurveda Retreats</h3>
                            <p className="text-muted-foreground mb-6">
                                We specialize in hosting holistic "Yoga + Ayurveda" retreats, creating a unique identity for instructors and an unforgettable experience for global travelers.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold uppercase tracking-widest text-gold text-center">
                                <p>✓ High Profit Margin</p>
                                <p>✓ Unique Identity</p>
                                <p>✓ Global Attraction</p>
                                <p>✓ Brand Excellence</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <Studios />
                <div className="container-custom py-24">
                    <h2 className="text-3xl font-serif font-bold mb-12 text-center">World-Class Amenities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { title: "Serene Environment", desc: "Located in the heart of nature for absolute peace." },
                            { title: "Expert Practitioners", desc: "Certified instructors and Ayurvedic doctors." },
                            { title: "Personalized Care", desc: "Tailored treatments and yoga sessions for your needs." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-border/50"
                            >
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-muted-foreground font-light">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default StudiosPage;
