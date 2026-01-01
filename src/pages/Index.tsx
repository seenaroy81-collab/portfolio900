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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
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
  );
};

export default Index;
