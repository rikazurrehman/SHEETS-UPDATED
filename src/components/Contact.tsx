import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Send, Phone, Mail, Github, Linkedin, Instagram, Star, Award, Sparkles, Shield } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact = () => {
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
    recaptcha: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);

  // ReCAPTCHA site key - replace with your actual site key
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Testing key

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRecaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    if (value) {
      setErrors(prev => ({
        ...prev,
        recaptcha: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = { 
      name: '', 
      email: '', 
      message: '',
      recaptcha: '' 
    };
    let formIsValid = true;
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      formIsValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      formIsValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      formIsValid = false;
    }
    
    if (!captchaValue) {
      newErrors.recaptcha = 'Please complete the CAPTCHA';
      formIsValid = false;
    }
    
    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMsg(null);
    
    // Debugging - to verify which URL is being used
    console.log("Contact form submission started");
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Replace with your deployed Google Apps Script web app URL
        const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbx52c-DWaP-6Z9246E015BIlXM3m8bRSFrDaZshdDhVjTCz1zebmRuSb1qbdacjg64CyQ/exec';
        
        console.log("Sending form data to:", scriptUrl);
        
        // Create form data object using URLSearchParams
        const formBody = new URLSearchParams();
        formBody.append("name", formData.name);
        formBody.append("email", formData.email);
        formBody.append("message", formData.message);
        formBody.append("captchaResponse", captchaValue || '');
        formBody.append("timestamp", new Date().toISOString());

        // Using no-cors mode to avoid CORS issues with Google Apps Script
        await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors", // Add this to fix CORS issues
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formBody,
        });
        
        // Since we're using no-cors, we can't access the response
        // So we assume success if no error is thrown
        setResponseMsg(`Thank you, ${formData.name}! Your message was sent.`);
        toast({
          title: "Message submitted successfully",
          description: "Thanks for reaching out!",
        });
        resetForm();
      } catch (error) {
        console.error('Form submission error:', error);
        setResponseMsg("Something went wrong. Please try again.");
        toast({
          title: "Submission failed",
          description: "Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  // Helper function to reset the form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    // Reset the reCAPTCHA
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setCaptchaValue(null);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gaming-darker to-gaming-dark relative">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-orbitron font-bold text-center mb-16 gaming-gradient-text">Connect With Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Cards - LEFT SIDE */}
          <div>
            {/* Quick Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="tel:7010956992"
                className="bg-gaming-darker/50 backdrop-blur-sm border border-gaming-purple/20 p-6 rounded-lg shadow-glow hover:shadow-glow-strong transition-all group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gaming-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="text-gaming-purple h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Call Me</p>
                    <p className="text-white font-semibold">+91 7010956992</p>
                  </div>
                </div>
              </a>

              <a 
                href="mailto:rikaz.154@gmail.com"
                className="bg-gaming-darker/50 backdrop-blur-sm border border-gaming-blue/20 p-6 rounded-lg shadow-glow-blue hover:shadow-glow-strong transition-all group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gaming-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="text-gaming-blue h-6 w-6 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">Email Me</p>
                    <p className="text-white font-semibold group-hover:text-white transition-colors">rikaz.154@gmail.com</p>
                  </div>
                </div>
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h3 className="text-2xl font-orbitron font-semibold mb-6 gaming-gradient-text">Find Me On</h3>
              <div className="grid grid-cols-3 gap-4">
                <a 
                  href="https://www.linkedin.com/in/rikaz-/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 bg-gaming-darker/50 rounded-lg border border-white/10 hover:border-gaming-purple transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gaming-purple/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Linkedin className="h-6 w-6 text-gaming-purple" />
                  </div>
                  <span className="text-white/60 text-sm group-hover:text-white transition-colors">LinkedIn</span>
                </a>

                <a 
                  href="https://www.instagram.com/rikazvisuals/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 bg-gaming-darker/50 rounded-lg border border-white/10 hover:border-gaming-blue transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gaming-blue/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Instagram className="h-6 w-6 text-gaming-blue" />
                  </div>
                  <span className="text-white/60 text-sm group-hover:text-white transition-colors">Instagram</span>
                </a>

                <a 
                  href="https://github.com/rikazurrehman" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 bg-gaming-darker/50 rounded-lg border border-white/10 hover:border-gaming-green transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gaming-green/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Github className="h-6 w-6 text-gaming-green" />
                  </div>
                  <span className="text-white/60 text-sm group-hover:text-white transition-colors">GitHub</span>
                </a>
              </div>
            </div>

            {/* Stylish Quote/Status Section */}
            <div className="mt-10 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gaming-purple/10 via-gaming-blue/10 to-gaming-green/10 blur-xl opacity-30 rounded-lg"></div>
              <div className="relative bg-gaming-darker/70 backdrop-blur-sm border border-white/5 p-6 rounded-lg overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gaming-purple/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gaming-blue/10 rounded-full blur-2xl"></div>
                
                <div className="flex items-center mb-4">
                  <Sparkles className="text-gaming-purple h-5 w-5 mr-2" />
                  <h3 className="text-lg font-medium text-white/90">Current Status</h3>
                </div>
                
                <p className="text-white/70 italic text-sm mb-3">
                  "Creating digital experiences that combine art and technology."
                </p>
                
                <div className="flex flex-wrap gap-3 mt-5">
                  <span className="text-xs py-1 px-3 bg-gaming-purple/20 text-gaming-purple rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1" /> Open to Collaboration
                  </span>
                  <span className="text-xs py-1 px-3 bg-gaming-blue/20 text-gaming-blue rounded-full flex items-center">
                    <Award className="h-3 w-3 mr-1" /> 3D Design Expert
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - RIGHT SIDE */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-gaming-darker/50 backdrop-blur-sm p-8 rounded-lg border border-gaming-purple/20 shadow-glow hover:shadow-glow-strong transition-all">
            <div>
              <label htmlFor="name" className="block text-white/80 mb-2 text-sm">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-gaming-darker px-4 py-3 rounded-md border ${errors.name ? 'border-red-500' : 'border-white/10'} focus:border-gaming-purple outline-none transition-colors text-white`}
                placeholder="John Doe"
                disabled={isSubmitting}
              />
              {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-white/80 mb-2 text-sm">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-gaming-darker px-4 py-3 rounded-md border ${errors.email ? 'border-red-500' : 'border-white/10'} focus:border-gaming-purple outline-none transition-colors text-white`}
                placeholder="john@example.com"
                disabled={isSubmitting}
              />
              {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-white/80 mb-2 text-sm">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full bg-gaming-darker px-4 py-3 rounded-md border ${errors.message ? 'border-red-500' : 'border-white/10'} focus:border-gaming-purple outline-none transition-colors text-white resize-none`}
                placeholder="How can I help you?"
                disabled={isSubmitting}
              />
              {errors.message && <p className="mt-1 text-red-500 text-xs">{errors.message}</p>}
            </div>
            
            {/* ReCAPTCHA */}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="text-gaming-purple h-4 w-4" />
                <span className="text-white/80 text-sm">Security Verification</span>
              </div>
              
              <div className="flex justify-center bg-gaming-darker/80 p-4 rounded-md border border-white/5">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={handleRecaptchaChange}
                  theme="dark"
                  size="normal"
                />
              </div>
              {errors.recaptcha && (
                <p className="mt-2 text-red-500 text-xs text-center">{errors.recaptcha}</p>
              )}
            </div>
            
            {/* Response message */}
            {responseMsg && (
              <div className={`p-3 rounded-md ${responseMsg.includes('Error') ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
                <p className="text-sm">{responseMsg}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-gaming-purple text-black text-center py-4 rounded-md hover:bg-gaming-purple/90 transition-all shadow-glow-strong hover:shadow-glow-purple border border-gaming-purple/50 hover:border-gaming-purple font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-5 left-0 w-full h-20 bg-gradient-to-r from-gaming-purple/20 via-gaming-blue/10 to-gaming-purple/20 blur-3xl opacity-30"></div>
      <div className="absolute -bottom-5 left-0 w-full h-20 bg-gradient-to-r from-gaming-blue/20 via-gaming-purple/10 to-gaming-blue/20 blur-3xl opacity-30"></div>
    </section>
  );
};

export default Contact;
