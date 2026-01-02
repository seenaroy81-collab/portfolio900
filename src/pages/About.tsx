import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Background3D from '@/components/Background3D';
import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <div className="min-h-screen relative">
            <Background3D />
            <Navbar />
            <div className="relative z-10 pt-32 pb-20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
                            About <span className="text-gradient-gold">Us</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                            Kerala Ayurveda Yoga was created as a peaceful sanctuary for yoga, meditation, and wellness.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-serif font-bold text-foreground">Our Story</h2>
                            <p className="text-lg text-muted-foreground font-light leading-relaxed">
                                Our goal is to provide yoga teachers, travelers, and practitioners a serene environment to connect deeply with their practice — surrounded by nature and calm energy.
                            </p>
                            <div className="space-y-4 pt-4">
                                <h3 className="text-2xl font-serif font-semibold text-gold">Our Commitment</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Maintaining a clean, peaceful, energy-filled environment",
                                        "Supporting local and international yoga communities",
                                        "Providing accessible, high-quality spaces for practice and retreats"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-muted-foreground">
                                            <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2.5 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop"
                                alt="Kerala Yoga"
                                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutPage;
