import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const bookingSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  package: z.string().min(1, { message: 'Please select a package' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      package: '',
      message: '',
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Booking submitted:', data);
      toast.success('Inquiry sent successfully! We will contact you soon.');
      reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kumarakom Road, Kottayam, Kerala 686001',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91977807678',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'hillpalace@gmail.com',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Daily 6:00 AM - 8:00 PM',
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      {/* Editorial Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.02] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-8"
            >
              The Path to Balance
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-serif text-foreground mb-10 tracking-tight leading-none">
              Visit Our <br /><span className="text-gradient-sage">Sanctuary</span>
            </h2>
            <p className="text-xl text-muted-foreground/80 mb-12 font-light leading-relaxed italic border-l-2 border-gold/30 pl-8">
              Located in the heart of Kerala's backwaters, our retreat offers easy access
              from Kottayam town while remaining immersed in nature's tranquility.
            </p>

            <div className="grid sm:grid-cols-2 gap-10 mb-12">
              {contactInfo.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20, x: -10 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.6 }}
                  className="flex items-start gap-5 group"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: idx * 0.3 }}
                    className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors duration-500"
                  >
                    <item.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  </motion.div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-foreground font-serif text-lg leading-tight">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-6 mt-12">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + idx * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -8, scale: 1.1, backgroundColor: "var(--gold)", color: "var(--gold-foreground)" }}
                  className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center transition-all duration-300 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            id="booking"
            className="bg-card glass-card rounded-[3rem] p-10 lg:p-14 shadow-elevated border border-white/40"
          >
            <h3 className="text-3xl font-serif text-foreground mb-8 text-center tracking-tight">
              Begin Your <span className="text-gradient-gold italic">Journey</span>
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    {...register('firstName')}
                    type="text"
                    id="firstName"
                    className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${errors.firstName ? 'border-destructive' : 'border-input'
                      }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    {...register('lastName')}
                    type="text"
                    id="lastName"
                    className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${errors.lastName ? 'border-destructive' : 'border-input'
                      }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${errors.email ? 'border-destructive' : 'border-input'
                    }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="package" className="block text-sm font-medium text-foreground mb-2">
                  Package Interest
                </label>
                <select
                  {...register('package')}
                  id="package"
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${errors.package ? 'border-destructive' : 'border-input'
                    }`}
                >
                  <option value="">Select a package</option>
                  <option value="space">Space Only</option>
                  <option value="accommodation">With Accommodation</option>
                  <option value="ayurveda">Ayurveda Wellness</option>
                </select>
                {errors.package && (
                  <p className="text-xs text-destructive mt-1">{errors.package.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none ${errors.message ? 'border-destructive' : 'border-input'
                    }`}
                  placeholder="Tell us about your wellness goals..."
                />
                {errors.message && (
                  <p className="text-xs text-destructive mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Inquiry'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
