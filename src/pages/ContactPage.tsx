import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Background3D from '@/components/Background3D';
import { motion } from 'framer-motion';
import Contact from '@/components/Contact';
import Location from '@/components/Location';

const ContactPage = () => {
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
                            Connect <span className="text-gradient-gold">With Us</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                            We're here to guide you on your journey to wellness. Reach out to us for any inquiries or bookings.
                        </p>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-border/50">
                                <h3 className="text-gold font-serif text-xl mb-4">Location</h3>
                                <p className="text-muted-foreground">📍 Kerala Ayurveda Yoga, Kottayam, Kerala, India</p>
                                <p className="text-sm text-muted-foreground mt-2">• Easy access from main road</p>
                                <p className="text-sm text-muted-foreground">• Free parking available</p>
                                <p className="text-sm text-muted-foreground">• 10 minutes from nearest town</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-border/50">
                                <h3 className="text-gold font-serif text-xl mb-4">Contact Info</h3>
                                <p className="text-muted-foreground">📞 Phone: +91-XXXXXXXXXX</p>
                                <p className="text-muted-foreground">📧 Email: info@keralayogaspaces.com</p>
                                <div className="mt-4 flex gap-4">
                                    <span className="text-xs uppercase tracking-widest text-muted-foreground">IG: @keralayogaspaces</span>
                                </div>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-border/50">
                                <h3 className="text-gold font-serif text-xl mb-4">Business Hours</h3>
                                <p className="text-muted-foreground">🕒 7:00 AM – 8:00 PM</p>
                                <p className="text-muted-foreground text-sm mt-1">(All days)</p>
                                <button className="mt-4 text-xs uppercase tracking-widest font-bold text-gold hover:text-white transition-colors">Schedule a Tour</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <Contact />
                <Location />
                <div className="container-custom py-24">
                    <div className="p-12 rounded-3xl bg-secondary/30 backdrop-blur-md border border-border/50">
                        <h2 className="text-3xl font-serif font-bold mb-8 text-center">Rules & <span className="text-gradient-gold">Guidelines</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                "Respect the silence and cleanliness of the space",
                                "Arrive 10 minutes early for sessions",
                                "No outside food or loud music",
                                "Keep mobile phones silent inside studios"
                            ].map((rule, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/30">
                                    <div className="w-2 h-2 rounded-full bg-gold" />
                                    <p className="text-muted-foreground">{rule}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactPage;
