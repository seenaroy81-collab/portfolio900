import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Background3D from '@/components/Background3D';
import { motion } from 'framer-motion';
import Services from '@/components/Services';

const ClassesPage = () => {
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
                            Yoga <span className="text-gradient-gold">Classes</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                            Find the perfect class for your journey, from beginners to advanced practitioners.
                        </p>
                    </motion.div>
                </div>
                <Services />
                <div className="container-custom py-24">
                    <div className="bg-white/5 backdrop-blur-md border border-border/50 rounded-3xl p-12 text-center">
                        <h2 className="text-4xl font-serif font-bold mb-6">Ready to start?</h2>
                        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light">
                            Join our community and experience the transformative power of Kerala yoga.
                        </p>
                        <button className="btn-primary text-xl px-12 py-4">
                            View Schedule
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ClassesPage;
