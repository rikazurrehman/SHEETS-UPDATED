import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Check, AlertCircle, Loader2, Phone } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Form Validation Schema
const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const ContactSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Placeholder: Replace with actual Google Apps Script URL later if found or provided
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_XXXXXXXXX/exec';

            // Simulating for now since URL is missing to avoid crashing. 
            // In real scenario, uncomment fetch.
            /*
           const response = await fetch(SCRIPT_URL, {
               method: 'POST',
               // Google Apps Script requires no-cors for simple posts usually, or use FormData
               // But typically for JSON data receiving:
               body: JSON.stringify(data),
           });
           */

            // Mock success for UI verification
            await new Promise(resolve => setTimeout(resolve, 1500));

            setIsSuccess(true);
            reset();
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err) {
            setError("Something went wrong. Please try again or email directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="pt-24 pb-20 w-full max-w-5xl mx-auto">
            <div className="glass-card rounded-3xl p-8 md:p-16 text-center relative overflow-hidden group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF7441] rounded-full blur-[120px] opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"></div>

                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#E6E6E6] mb-6">Have an idea?</h2>
                    <p className="text-[#E6E6E6]/60 font-light mb-12 max-w-xl mx-auto text-lg">
                        I'm currently accepting new projects. Let's create something extraordinary together.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 text-[#E6E6E6]/80 text-sm md:text-base">
                        <a href="mailto:rikaz.154@gmail.com" className="flex items-center gap-2 hover:text-[#FF7441] transition-colors">
                            <Mail size={18} />
                            <span>rikaz.154@gmail.com</span>
                        </a>
                        <a href="tel:+917010956992" className="flex items-center gap-2 hover:text-[#FF7441] transition-colors">
                            <Phone size={18} />
                            <span>+91 70109 56992</span>
                        </a>
                    </div>

                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-fade-in-up">
                            <div className="w-16 h-16 bg-[#FF7441]/20 rounded-full flex items-center justify-center text-[#FF7441]">
                                <Check size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#E6E6E6]">Message Sent!</h3>
                            <p className="text-[#E6E6E6]/60">I'll get back to you as soon as possible.</p>
                            <button onClick={() => setIsSuccess(false)} className="mt-4 text-[#FF7441] text-sm hover:underline">Send another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-4 text-left">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <input
                                        {...register("name")}
                                        placeholder="Name"
                                        className="w-full bg-[#E6E6E6]/5 border border-[#E6E6E6]/10 rounded-xl px-4 py-3 text-[#E6E6E6] placeholder:text-[#E6E6E6]/30 focus:outline-none focus:border-[#FF7441]/50 focus:bg-[#E6E6E6]/10 transition-all"
                                    />
                                    {errors.name && <span className="text-xs text-red-400 pl-2 flex items-center gap-1"><AlertCircle size={10} /> {errors.name.message}</span>}
                                </div>
                                <div className="space-y-1">
                                    <input
                                        {...register("email")}
                                        placeholder="Email"
                                        className="w-full bg-[#E6E6E6]/5 border border-[#E6E6E6]/10 rounded-xl px-4 py-3 text-[#E6E6E6] placeholder:text-[#E6E6E6]/30 focus:outline-none focus:border-[#FF7441]/50 focus:bg-[#E6E6E6]/10 transition-all"
                                    />
                                    {errors.email && <span className="text-xs text-red-400 pl-2 flex items-center gap-1"><AlertCircle size={10} /> {errors.email.message}</span>}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <input
                                    {...register("subject")}
                                    placeholder="Subject"
                                    className="w-full bg-[#E6E6E6]/5 border border-[#E6E6E6]/10 rounded-xl px-4 py-3 text-[#E6E6E6] placeholder:text-[#E6E6E6]/30 focus:outline-none focus:border-[#FF7441]/50 focus:bg-[#E6E6E6]/10 transition-all"
                                />
                                {errors.subject && <span className="text-xs text-red-400 pl-2 flex items-center gap-1"><AlertCircle size={10} /> {errors.subject.message}</span>}
                            </div>
                            <div className="space-y-1">
                                <textarea
                                    {...register("message")}
                                    placeholder="Tell me about your project..."
                                    rows={4}
                                    className="w-full bg-[#E6E6E6]/5 border border-[#E6E6E6]/10 rounded-xl px-4 py-3 text-[#E6E6E6] placeholder:text-[#E6E6E6]/30 focus:outline-none focus:border-[#FF7441]/50 focus:bg-[#E6E6E6]/10 transition-all resize-none"
                                />
                                {errors.message && <span className="text-xs text-red-400 pl-2 flex items-center gap-1"><AlertCircle size={10} /> {errors.message.message}</span>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#E6E6E6] text-[#0D0D0D] font-bold rounded-xl py-4 hover:bg-[#FF7441] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" width={20} /> : <Mail width={20} />}
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                            {error && <p className="text-center text-red-400 text-sm mt-2">{error}</p>}
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
