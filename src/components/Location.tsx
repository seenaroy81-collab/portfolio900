import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Navigation, Car, Leaf, Clock } from 'lucide-react';

const Location = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    const features = [
        { icon: Navigation, text: 'Easy access from main road' },
        { icon: Car, text: 'Free parking available' },
        { icon: Leaf, text: 'Surrounded by greenery' },
        { icon: Clock, text: '10 minutes from nearest town' },
    ];

    return (
        <section id="location" ref={sectionRef} className="section-padding bg-secondary/30">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm tracking-widest uppercase font-medium mb-4">
                            Find Us
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
                            Location & <span className="text-gradient-sage">Directions</span>
                        </h2>

                        <div className="flex items-start gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-lg font-medium text-foreground">📍 Chamundi Hill Palace Ayurvedic Resort</p>
                                <p className="text-muted-foreground">Kottayam, Kerala, India</p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6 mb-10">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-primary/20">
                                        <feature.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="text-muted-foreground">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        <a
                            href="https://maps.google.com/?q=Kottayam,Kerala,India"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            Get Directions
                        </a>
                    </motion.div>

                    {/* Map Embed */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative rounded-2xl overflow-hidden shadow-elevated aspect-[4/3] lg:aspect-square bg-card"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125745.31976077594!2d76.45262799342747!3d9.59156683501712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062ba16c6b3511%3A0x261ca7818ed93043!2sKottayam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1709289291234!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Chamundi Hill Palace Ayurvedic Resort Location"
                            className="grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                        ></iframe>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Location;
