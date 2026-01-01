import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhatWeOffer from '@/components/WhatWeOffer';
import Studios from '@/components/Studios';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import Location from '@/components/Location';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Background3D from '@/components/Background3D';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Background3D />
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <WhatWeOffer />
        <Studios />
        <Services />
        <Testimonials />
        <About />
        <Location />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
