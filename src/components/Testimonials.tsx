import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Anjali',
    location: 'Yoga Instructor',
    text: 'The energy here is beautiful — my students loved every session.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Laura',
    location: 'Yoga Teacher from Spain',
    text: 'A peaceful retreat space with everything we needed.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="section-padding bg-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-20 text-primary/5">
        <Quote size={300} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm tracking-widest uppercase font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
            Guest <span className="text-gradient-sage">Experiences</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Rating */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <Star key={i} size={24} className="fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground leading-relaxed mb-10 italic">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center justify-center">
                <p className="font-serif font-medium text-foreground text-lg">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {testimonials[currentIndex].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full border border-border hover:bg-secondary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-primary' : 'bg-border hover:bg-primary/50'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full border border-border hover:bg-secondary transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
