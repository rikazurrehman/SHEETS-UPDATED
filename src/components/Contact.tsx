import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Send, Phone, Mail, Github, Linkedin, Instagram, Star, Award, Sparkles, Shield, Zap, ChevronRight } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
    mathCaptcha: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Generate a new math problem
  const generateMathProblem = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    setMathProblem({ num1, num2, answer });
    setUserAnswer('');
  };

  // Generate a math problem when component mounts
  useEffect(() => {
    generateMathProblem();
    
    // Trigger animation after mount
    setIsVisible(true);
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

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

  const handleMathCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
    if (errors.mathCaptcha) {
      setErrors(prev => ({
        ...prev,
        mathCaptcha: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = { 
      name: '', 
      email: '', 
      message: '',
      mathCaptcha: '' 
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
    
    if (userAnswer.trim() === '') {
      newErrors.mathCaptcha = 'Please solve the math problem';
      formIsValid = false;
    } else if (parseInt(userAnswer) !== mathProblem.answer) {
      newErrors.mathCaptcha = 'Incorrect answer, please try again';
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
        formBody.append("captchaVerified", "true"); // Indicates math captcha was solved correctly
        formBody.append("timestamp", new Date().toISOString());

        // Using no-cors mode to avoid CORS issues with Google Apps Script
        await fetch(scriptUrl, {
          method: "POST",
          mode: "cors", // Add this to fix CORS issues
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
    
    // Generate a new math problem
    generateMathProblem();
  };

  return (
    <section id="contact" className="py-16 bg-gaming-darker relative scroll-mt-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gaming-darker/60 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-gaming-purple/10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-gaming-blue/10 blur-3xl animate-pulse-slow animation-delay-2000"></div>
      
      {/* Digital circuit pattern */}
      <div className="absolute top-1/4 right-10 w-20 h-20 border border-white/5 rounded-md rotate-12 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-purple/30"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-blue/30"></div>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gaming-purple rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-gaming-blue rounded-full"></div>
      </div>
      
      <div className="absolute bottom-1/4 left-10 w-16 h-16 border border-white/5 rounded-md -rotate-12 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-blue/30"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-purple/30"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-gaming-blue rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-gaming-purple rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative flex flex-col items-center">
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-gaming-purple/50 blur-lg"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight">Get in <span className="gaming-gradient-text">Touch</span></h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gaming-purple to-gaming-blue rounded-full mx-auto mb-4 opacity-80"></div>
            <p className="text-center text-white/70 max-w-xl mx-auto mb-12">
              Let's build something amazing together. Feel free to reach out with questions, project inquiries, 
              or just to say hello!
            </p>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact form */}
            <div className="md:col-span-2 scroll-reveal">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 border border-white/5 rounded-md rotate-12 opacity-20 pointer-events-none"></div>
                <div className="absolute -bottom-10 -right-10 w-16 h-16 border border-white/5 rounded-md -rotate-12 opacity-20 pointer-events-none"></div>
                
                <div className="space-y-6 bg-black/10 backdrop-blur-sm rounded-2xl p-8 border border-white/5 relative overflow-hidden shadow-lg">
                  {/* Background glow effect */}
                  <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(147,51,234,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gaming-purple/20 to-transparent"></div>
                  
                  {/* Response message */}
                  {responseMsg && (
                    <div className="mb-6 p-4 rounded-lg bg-gaming-purple/10 border border-gaming-purple/30 text-white relative">
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(147,51,234,0.15),transparent_70%)]"></div>
                      <div className="flex items-start">
                        <Shield className="w-5 h-5 text-gaming-purple mr-3 mt-0.5" />
                        <p>{responseMsg}</p>
                      </div>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-white/80 text-sm mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/40 text-white placeholder-white/40 rounded-lg border border-white/10 focus:border-gaming-purple/40 focus:outline-none transition-colors"
                        placeholder="Enter your name"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-white/80 text-sm mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/40 text-white placeholder-white/40 rounded-lg border border-white/10 focus:border-gaming-purple/40 focus:outline-none transition-colors"
                        placeholder="Enter your email"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-white/80 text-sm mb-2">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 bg-black/40 text-white placeholder-white/40 rounded-lg border border-white/10 focus:border-gaming-purple/40 focus:outline-none resize-none transition-colors"
                        placeholder="Tell me about your project or inquiry"
                      ></textarea>
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                    </div>
                    
                    {/* Math Captcha */}
                    <div>
                      <label htmlFor="mathCaptcha" className="block text-white/80 text-sm mb-2">Verify you're human</label>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 px-4 py-3 bg-black/60 rounded-lg border border-white/10 text-white/90 flex items-center justify-center">
                          <span>{mathProblem.num1} + {mathProblem.num2} = ?</span>
                        </div>
                        <input
                          type="text"
                          id="mathCaptcha"
                          name="mathCaptcha"
                          value={userAnswer}
                          onChange={handleMathCaptchaChange}
                          className="flex-1 px-4 py-3 bg-black/40 text-white placeholder-white/40 rounded-lg border border-white/10 focus:border-gaming-purple/40 focus:outline-none"
                          placeholder="Answer"
                        />
                      </div>
                      {errors.mathCaptcha && <p className="text-red-400 text-xs mt-1">{errors.mathCaptcha}</p>}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative overflow-hidden flex items-center justify-center w-full py-3 px-6 rounded-lg bg-black/40 text-white border border-white/10 hover:border-gaming-purple/30 transition-all"
                    >
                      {/* Button background effects */}
                      <div className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,white_0%,transparent_50%)]"></div>
                        <div className="absolute -inset-x-1/4 top-0 h-px w-[150%] bg-gradient-to-r from-transparent via-gaming-purple/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-opacity"></div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        {isSubmitting ? (
                          <div className="animate-spin w-5 h-5 border-2 border-white/20 border-t-white rounded-full mr-2"></div>
                        ) : (
                          <Send className="w-5 h-5 mr-2 relative z-10" />
                        )}
                        <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      </div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
            
            {/* Contact info */}
            <div className="space-y-6 scroll-reveal">
              {/* Contact Details Card */}
              <div className="group relative bg-black/20 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden transition-all hover:border-white/10 hover:shadow-lg p-6">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-gaming-purple to-gaming-blue opacity-0 group-hover:opacity-5 transition-opacity"></div>
                
                <h3 className="text-lg font-medium mb-5 flex items-center gap-2">
                  Contact Details
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                </h3>
                
                <div className="space-y-4">
                  <a 
                    href="tel:+917010956992" 
                    className="flex items-start group"
                  >
                    <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gaming-blue/10 mr-3 border border-white/5 shadow-lg group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4 text-gaming-blue" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60 text-xs">Phone</p>
                      <p className="text-white group-hover:text-gaming-blue transition-colors">+91 7010956992</p>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:info@youremail.com" 
                    className="flex items-start group"
                  >
                    <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gaming-purple/10 mr-3 border border-white/5 shadow-lg group-hover:scale-110 transition-transform">
                      <Mail className="w-4 h-4 text-gaming-purple" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60 text-xs">Email</p>
                      <p className="text-white group-hover:text-gaming-purple transition-colors break-all">rikaz.154@gmail.com</p>
                    </div>
                  </a>
                </div>
              </div>
              
              {/* Social Links Card */}
              <div className="group relative bg-black/20 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden transition-all hover:border-white/10 hover:shadow-lg p-6">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-gaming-blue to-gaming-purple opacity-0 group-hover:opacity-5 transition-opacity"></div>
                
                <h3 className="text-lg font-medium mb-5 flex items-center gap-2">
                  Connect With Me
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                </h3>
                
                <div className="flex justify-center gap-4">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group relative bg-black/40 border border-white/5 hover:border-gaming-purple/20 rounded-xl overflow-hidden transition-all p-5 hover:shadow-lg"
                  >
                    <div className="absolute -z-10 inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]"></div>
                    <Github className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                  </a>
                  
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group relative bg-black/40 border border-white/5 hover:border-gaming-blue/20 rounded-xl overflow-hidden transition-all p-5 hover:shadow-lg"
                  >
                    <div className="absolute -z-10 inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]"></div>
                    <Linkedin className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                  </a>
                  
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group relative bg-black/40 border border-white/5 hover:border-gaming-purple/20 rounded-xl overflow-hidden transition-all p-5 hover:shadow-lg"
                  >
                    <div className="absolute -z-10 inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]"></div>
                    <Instagram className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                  </a>
                </div>
                
                <div className="flex justify-center mt-6">
                  <blockquote className="text-sm text-white/70 leading-relaxed italic relative max-w-lg mx-auto px-4 py-3 bg-black/30 rounded-xl border-l-2 border-gaming-purple/50">
                    <div className="absolute top-0 right-0 opacity-20 text-gaming-purple transform -translate-y-1/2 translate-x-1/4">
                      <Zap size={24} />
                    </div>
                    <p>Let's create something amazing together!</p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
