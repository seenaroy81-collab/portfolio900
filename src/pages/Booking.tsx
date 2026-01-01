import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    Check,
    ChevronRight,
    HelpCircle,
    Info,
    Users,
    Clock,
    Calendar as CalendarIcon,
    BookOpen,
    Download,
    PartyPopper,
    ArrowLeft
} from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const bookingSchema = z.object({
    studio: z.enum(['1', '2'], { required_error: 'Please select a studio' }),
    date: z.date({ required_error: 'Please select a date' }),
    time: z.string().min(1, { message: 'Please select a time' }),
    duration: z.string().min(1, { message: 'Please select duration' }),
    participants: z.string().min(1, { message: 'Please enter number of participants' }),
    purpose: z.string().min(1, { message: 'Please select purpose' }),
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
    requirements: z.string().optional(),
});

type BookingValues = z.infer<typeof bookingSchema>;

const Booking = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [submittedData, setSubmittedData] = useState<BookingValues | null>(null);
    const [bookingId, setBookingId] = useState<string>('');

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<BookingValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            date: new Date(),
            studio: '1',
            duration: '1h',
            participants: '1',
        },
    });

    // Manually register fields that don't have standard input tags
    useEffect(() => {
        register('date');
        register('time');
        register('studio');
    }, [register]);

    const selectedStudio = watch('studio');
    const selectedTime = watch('time');

    const onSubmit = async (data: BookingValues) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const id = `KAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            setBookingId(id);
            setSubmittedData(data);
            toast.success('Booking request submitted! We will contact you shortly to confirm.');
        } catch (error) {
            toast.error('Submission failed. Please try again.');
        }
    };

    const downloadReceipt = () => {
        if (!submittedData) return;

        const content = `
========================================
    KERALA AYURVEDA YOGA RECEIPT
========================================
Booking ID: ${bookingId}
Date: ${submittedData.date.toLocaleDateString()}
Time: ${submittedData.time}
Studio: Studio ${submittedData.studio} (${submittedData.studio === '1' ? 'The Lotus' : 'Garden Pavilion'})
----------------------------------------
Duration: ${submittedData.duration}
Participants: ${submittedData.participants}
Purpose: ${submittedData.purpose}
----------------------------------------
Name: ${submittedData.firstName} ${submittedData.lastName}
Email: ${submittedData.email}
Phone: ${submittedData.phone}
----------------------------------------
Special Requirements: 
${submittedData.requirements || 'None'}
========================================
Thank you for booking with us!
Namaste.
========================================
    `;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Booking_Receipt_${bookingId}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleReset = () => {
        setSubmittedData(null);
        setBookingId('');
        reset();
    };

    const timeSlots = [
        '06:00 AM', '08:00 AM', '10:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'
    ];

    const faqs = [
        {
            q: 'How far in advance should I book?',
            a: 'We recommend booking at least 48 hours in advance to ensure your preferred time slot and studio are available.'
        },
        {
            q: 'Can I book recurring slots?',
            a: 'Yes! Please mention your preferred schedule in the special requirements field, and we will set up recurring sessions for you.'
        },
        {
            q: 'What if I cancel?',
            a: 'Cancellations made 24 hours before the session are fully refundable. Later cancellations may incur a 50% fee.'
        },
        {
            q: 'Is there a minimum time?',
            a: 'The minimum booking duration is 1 hour.'
        },
        {
            q: 'Can I extend my booking on the day?',
            a: 'If there is no immediate booking following yours, extensions can be made at the studio reception.'
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-20 bg-forest text-forest-foreground">
                <div className="container-custom text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-serif mb-6"
                    >
                        {submittedData ? 'Booking ' : 'Book Your '}<span className="text-gradient-gold">{submittedData ? 'Confirmed' : 'Space'}</span>
                    </motion.h1>
                    <p className="text-lg text-forest-foreground/80 max-w-2xl mx-auto">
                        {submittedData
                            ? "Your request has been received. Please download your receipt for your records."
                            : "Reserve your sanctuary for practice, teaching, or reflection in the heart of Kerala."}
                    </p>
                </div>
            </section>

            <div className="container-custom py-20 text-foreground">
                <AnimatePresence mode="wait">
                    {!submittedData ? (
                        <motion.div
                            key="booking-form-view"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="grid lg:grid-cols-3 gap-12"
                        >
                            {/* Main Content: Calendar & Form */}
                            <div className="lg:col-span-2 space-y-16">

                                {/* Live Availability */}
                                <section id="availability">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <CalendarIcon className="w-5 h-5 text-primary" />
                                        </div>
                                        <h2 className="text-3xl font-serif">Live Availability</h2>
                                    </div>

                                    <div className={`grid md:grid-cols-2 gap-8 bg-card rounded-2xl p-6 shadow-elevated border transition-colors ${errors.date || errors.time ? 'border-destructive' : 'border-border'}`}>
                                        <div>
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={(date) => {
                                                    setSelectedDate(date);
                                                    if (date) {
                                                        setValue('date', date);
                                                        trigger('date');
                                                    }
                                                }}
                                                className="rounded-md border shadow-none bg-background"
                                            />
                                            {errors.date && <p className="text-xs text-destructive mt-2">{errors.date.message}</p>}
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <p className="font-medium">Status Legend</p>
                                                <div className="flex items-center gap-6 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                                        <span>Available</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full bg-destructive/50" />
                                                        <span>Booked</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <p className="font-medium text-foreground">Available Slots for {selectedDate?.toLocaleDateString()}</p>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {timeSlots.map((slot) => (
                                                        <button
                                                            key={slot}
                                                            type="button"
                                                            onClick={() => {
                                                                setValue('time', slot);
                                                                trigger('time');
                                                            }}
                                                            className={`px-4 py-2 rounded-lg text-sm transition-all border ${selectedTime === slot
                                                                    ? 'bg-primary text-primary-foreground border-primary'
                                                                    : 'bg-background hover:bg-secondary border-input'
                                                                }`}
                                                        >
                                                            {slot}
                                                        </button>
                                                    ))}
                                                </div>
                                                {errors.time && (
                                                    <p className="text-xs text-destructive mt-1">{errors.time.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Booking Form */}
                                <section id="booking-form">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-primary" />
                                        </div>
                                        <h2 className="text-3xl font-serif">Booking Details</h2>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-2xl p-8 shadow-elevated space-y-8 border border-border">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Studio Selection */}
                                            <div className="space-y-3">
                                                <label className="text-sm font-medium">Select Studio</label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div
                                                        onClick={() => {
                                                            setValue('studio', '1');
                                                            trigger('studio');
                                                        }}
                                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedStudio === '1' ? 'border-primary bg-primary/5' : 'border-input hover:border-primary/50'
                                                            }`}
                                                    >
                                                        <p className="font-serif font-medium">Studio 1</p>
                                                        <p className="text-xs text-muted-foreground">The Lotus</p>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            setValue('studio', '2');
                                                            trigger('studio');
                                                        }}
                                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedStudio === '2' ? 'border-primary bg-primary/5' : 'border-input hover:border-primary/50'
                                                            }`}
                                                    >
                                                        <p className="font-serif font-medium">Studio 2</p>
                                                        <p className="text-xs text-muted-foreground">Garden Pavilion</p>
                                                    </div>
                                                </div>
                                                {errors.studio && <p className="text-xs text-destructive">{errors.studio.message}</p>}
                                            </div>

                                            {/* Participants & Duration */}
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Duration</label>
                                                    <select {...register('duration')} className="w-full px-4 py-3 rounded-lg border bg-background">
                                                        <option value="1h">1 Hour</option>
                                                        <option value="2h">2 Hours</option>
                                                        <option value="4h">4 Hours</option>
                                                        <option value="day">Full Day</option>
                                                    </select>
                                                    {errors.duration && <p className="text-xs text-destructive">{errors.duration.message}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Participants</label>
                                                    <input {...register('participants')} type="number" placeholder="1-20" className="w-full px-4 py-3 rounded-lg border bg-background" />
                                                    {errors.participants && <p className="text-xs text-destructive">{errors.participants.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Purpose of Booking</label>
                                            <select {...register('purpose')} className="w-full px-4 py-3 rounded-lg border bg-background">
                                                <option value="">Select purpose</option>
                                                <option value="class">Group Class</option>
                                                <option value="workshop">Workshop</option>
                                                <option value="private">Private Practice</option>
                                                <option value="other">Other</option>
                                            </select>
                                            {errors.purpose && <p className="text-xs text-destructive">{errors.purpose.message}</p>}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">First Name</label>
                                                <input {...register('firstName')} placeholder="Enter first name" className="w-full px-4 py-3 rounded-lg border bg-background" />
                                                {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Last Name</label>
                                                <input {...register('lastName')} placeholder="Enter last name" className="w-full px-4 py-3 rounded-lg border bg-background" />
                                                {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Email</label>
                                                <input {...register('email')} type="email" placeholder="your@email.com" className="w-full px-4 py-3 rounded-lg border bg-background" />
                                                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Phone Number</label>
                                                <input {...register('phone')} placeholder="+91 ..." className="w-full px-4 py-3 rounded-lg border bg-background" />
                                                {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Special Requirements</label>
                                            <textarea {...register('requirements')} rows={3} className="w-full px-4 py-3 rounded-lg border bg-background resize-none" placeholder="Any specific equipment or setup needed?" />
                                        </div>

                                        <div className="space-y-4">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="btn-primary w-full disabled:opacity-50 flex items-center justify-center gap-2 h-14"
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Confirm Request'}
                                            </button>
                                            {Object.keys(errors).length > 0 && (
                                                <p className="text-sm text-destructive text-center">Please fill in all required fields marked in red.</p>
                                            )}
                                        </div>
                                    </form>
                                </section>
                            </div>

                            {/* Sidebar: Info & Steps */}
                            <aside className="space-y-12">
                                {/* How to Book */}
                                <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                                    <h3 className="text-2xl font-serif mb-6">How to Book</h3>
                                    <div className="space-y-6">
                                        {[
                                            'Choose your studio and preferred time',
                                            'Submit the booking form with details',
                                            'Receive confirmation by email or phone',
                                            'Make payment to secure your slot'
                                        ].map((step, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                                                    {i + 1}
                                                </div>
                                                <p className="text-foreground/80">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Policies */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4 text-primary">
                                        <Info size={20} />
                                        <h3 className="font-serif font-medium text-lg">Booking Policies</h3>
                                    </div>
                                    <ul className="space-y-3 text-sm text-muted-foreground">
                                        <li className="flex gap-2">
                                            <Check size={14} className="mt-1 text-primary" />
                                            Advance booking of 48 hours is mandatory.
                                        </li>
                                        <li className="flex gap-2">
                                            <Check size={14} className="mt-1 text-primary" />
                                            Full payment is required to confirm high-season slots.
                                        </li>
                                        <li className="flex gap-2">
                                            <Check size={14} className="mt-1 text-primary" />
                                            Cancellations within 24h are non-refundable.
                                        </li>
                                    </ul>
                                </div>

                                {/* FAQs */}
                                <div>
                                    <div className="flex items-center gap-2 mb-6 text-primary">
                                        <HelpCircle size={20} />
                                        <h3 className="font-serif font-medium text-lg">Common Questions</h3>
                                    </div>
                                    <Accordion type="single" collapsible className="w-full">
                                        {faqs.map((faq, i) => (
                                            <AccordionItem key={i} value={`item-${i}`} className="border-border">
                                                <AccordionTrigger className="text-left font-serif text-sm">
                                                    {faq.q}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground text-sm">
                                                    {faq.a}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </aside>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success-view"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="bg-card rounded-2xl shadow-elevated border border-border p-8 md:p-12 text-center">
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
                                    <PartyPopper className="w-10 h-10 text-primary" />
                                </div>

                                <h2 className="text-3xl font-serif mb-4">Request Successful!</h2>
                                <p className="text-muted-foreground mb-10">
                                    Your booking request has been sent to our team. We've assigned you ID <span className="text-primary font-mono font-bold">{bookingId}</span>.
                                    A confirmation email will be sent shortly.
                                </p>

                                {/* Receipt Card */}
                                <div className="bg-background rounded-xl p-8 text-left border border-border mb-10 space-y-6">
                                    <div className="flex justify-between items-center border-b border-border pb-4">
                                        <h3 className="font-serif text-xl">Booking Receipt</h3>
                                        <span className="text-xs text-muted-foreground font-mono">{bookingId}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Session Date</p>
                                            <p className="font-medium">{submittedData.date.toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Time Slot</p>
                                            <p className="font-medium">{submittedData.time}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Studio Location</p>
                                            <p className="font-medium">Studio {submittedData.studio} ({submittedData.studio === '1' ? 'Lotus' : 'Pavilion'})</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Duration</p>
                                            <p className="font-medium capitalize">{submittedData.duration}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Participants</p>
                                            <p className="font-medium">{submittedData.participants}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Purpose</p>
                                            <p className="font-medium capitalize">{submittedData.purpose}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <button
                                        onClick={downloadReceipt}
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium"
                                    >
                                        <Download size={18} />
                                        Download Receipt
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-secondary transition-all font-medium"
                                    >
                                        <ArrowLeft size={18} />
                                        Book Another
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Footer />
        </div>
    );
};

export default Booking;
