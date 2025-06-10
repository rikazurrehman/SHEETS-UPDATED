import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Send, Phone, Mail, Github, Linkedin, Instagram, Star, Award, Sparkles, Shield } from 'lucide-react';

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
    <section id="contact" className="py-24 bg-gradient-to-b from-gaming-darker to-gaming-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40">
        <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-gaming-purple/20 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gaming-blue/20 blur-[150px] animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-40 right-20 w-64 h-64 rounded-full bg-gaming-green/10 blur-[100px] animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-72 h-72 rounded-full bg-gaming-purple/10 blur-[130px] animate-pulse-slow animation-delay-3000"></div>
      </div>
      
      {/* Digital circuit pattern */}
      <div className="absolute top-1/4 right-10 w-20 h-20 border border-white/5 rounded-md rotate-12 opacity-30">
        <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-purple/30"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-blue/30"></div>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gaming-purple rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-gaming-blue rounded-full"></div>
      </div>
      
      <div className="absolute bottom-1/4 left-10 w-16 h-16 border border-white/5 rounded-md -rotate-12 opacity-30">
        <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-blue/30"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-purple/30"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-gaming-blue rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-gaming-purple rounded-full"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-16 right-16 w-20 h-20 border border-white/5 rounded-lg rotate-12 opacity-20"></div>
      <div className="absolute bottom-16 left-16 w-16 h-16 border border-white/5 rounded-lg -rotate-12 opacity-20"></div>
      <div className="absolute top-32 left-1/3 w-3 h-3 bg-gaming-purple rounded-full opacity-50"></div>
      <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-gaming-blue rounded-full opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="relative flex flex-col items-center">
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-gaming-purple/50 blur-lg"></div>
            <h2 className="text-4xl font-orbitron font-bold text-center gaming-gradient-text">Connect With Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gaming-purple to-gaming-blue rounded-full mx-auto mb-8 opacity-80"></div>
            <p className="text-white/60 text-center max-w-xl mx-auto text-sm tracking-wider">Let's collaborate on something amazing. Reach out through the form or direct channels below.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Contact Form - LEFT SIDE (larger) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6 bg-gaming-darker/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-gaming-purple/30 shadow-lg transition-all duration-300 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gaming-purple/5 blur-3xl"></div>
              <div className="absolute -bottom-12 -left-12 w-24 h-24 rounded-full bg-gaming-blue/5 blur-3xl"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gaming-purple/20 to-gaming-blue/20"></div>
              <div className="absolute top-8 right-8 w-2 h-2 bg-gaming-purple/50 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 left-8 w-2 h-2 bg-gaming-blue/50 rounded-full animate-pulse animation-delay-1000"></div>
              
              <div className="relative flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gaming-darker border border-gaming-purple/20 flex items-center justify-center shadow-glow">
                  <Send className="text-gaming-purple h-5 w-5" />
                </div>
                <h3 className="text-2xl font-orbitron text-gaming-purple">Drop a Message</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white/70 mb-2 text-sm font-medium flex items-center gap-2">
                    <div className="w-1 h-4 bg-gaming-purple/80 rounded-full"></div>
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-gaming-darker/80 px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-white/5'} focus:border-gaming-purple outline-none transition-all duration-300 text-white placeholder:text-white/30 pr-10 shadow-inner shadow-black/20`}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/30 pointer-events-none transition-opacity opacity-50">
                      <div className="w-5 h-5 border-r-2 border-t-2 border-gaming-purple/40 rounded-tr-md"></div>
                    </div>
                  </div>
                  {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white/70 mb-2 text-sm font-medium flex items-center gap-2">
                    <div className="w-1 h-4 bg-gaming-blue/80 rounded-full"></div>
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-gaming-darker/80 px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-white/5'} focus:border-gaming-blue outline-none transition-all duration-300 text-white placeholder:text-white/30 pr-10 shadow-inner shadow-black/20`}
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/30 pointer-events-none transition-opacity opacity-50">
                      <div className="w-5 h-5 border-r-2 border-t-2 border-gaming-blue/40 rounded-tr-md"></div>
                    </div>
                  </div>
                  {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-white/70 mb-2 text-sm font-medium flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-gaming-purple/80 to-gaming-blue/80 rounded-full"></div>
                  Your Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full bg-gaming-darker/80 px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-white/5'} focus:border-gaming-purple outline-none transition-all duration-300 text-white resize-none placeholder:text-white/30 shadow-inner shadow-black/20`}
                    placeholder="How can I help you?"
                    disabled={isSubmitting}
                  />
                  <div className="absolute right-3 top-3 text-white/30 pointer-events-none transition-opacity opacity-50">
                    <div className="w-5 h-5 border-r-2 border-t-2 border-gaming-purple/40 rounded-tr-md"></div>
                  </div>
                </div>
                {errors.message && <p className="mt-1 text-red-500 text-xs">{errors.message}</p>}
              </div>
              
              {/* Math CAPTCHA */}
              <div className="bg-black/30 rounded-xl border border-white/5 p-5 relative overflow-hidden group">
                <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_70%)]"></div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="text-gaming-purple h-4 w-4" />
                  <span className="text-white/70 text-sm font-medium">Quick Verification</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-gaming-darker/80 rounded-xl p-3 flex items-center justify-center flex-1 border border-white/5 relative overflow-hidden group">
                    <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_at_top_left,rgba(147,51,234,0.08),transparent_70%)]"></div>
                    <span className="text-gaming-purple text-lg font-medium mr-2">{mathProblem.num1}</span>
                    <span className="text-white/70 mx-1">+</span>
                    <span className="text-gaming-blue text-lg font-medium mr-2">{mathProblem.num2}</span>
                    <span className="text-white/70 mx-1">=</span>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={handleMathCaptchaChange}
                      className={`w-20 bg-gaming-darker/80 px-4 py-3 rounded-xl border ${errors.mathCaptcha ? 'border-red-500' : 'border-white/5'} focus:border-gaming-purple outline-none transition-all duration-300 text-white text-center shadow-inner shadow-black/20`}
                      placeholder="?"
                      disabled={isSubmitting}
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-gaming-purple/40 rounded-br-md"></div>
                  </div>
                </div>
                
                {errors.mathCaptcha && (
                  <p className="mt-2 text-red-500 text-xs">{errors.mathCaptcha}</p>
                )}
              </div>
              
              {/* Response message */}
              {responseMsg && (
                <div className={`p-4 rounded-xl ${responseMsg.includes('Error') ? 'bg-red-500/10 text-red-200 border border-red-500/20' : 'bg-green-500/10 text-green-200 border border-green-500/20'}`}>
                  <p className="text-sm">{responseMsg}</p>
                </div>
              )}
              
              <button 
                type="submit" 
                className="w-full relative overflow-hidden group bg-gradient-to-r from-gaming-purple to-gaming-blue text-black font-extrabold text-center py-4 rounded-xl transition-all shadow-lg hover:shadow-gaming-purple/50 hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 border border-gaming-purple focus:outline-none focus:ring-2 focus:ring-gaming-purple/50 active:bg-gaming-purple active:text-white text-shadow-sm"
                disabled={isSubmitting}
                style={{ textShadow: "0px 0px 1px rgba(0,0,0,0.5)" }}
              >
                {/* Button background effects */}
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,white_0%,transparent_50%)]"></div>
                  <div className="absolute -inset-x-1/4 top-0 h-px w-[150%] bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover:animate-[scan_1.5s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Send className="h-5 w-5 text-black active:text-white" />
                    <span className="text-base">Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info Cards - RIGHT SIDE (smaller) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct contact card */}
            <div className="bg-gaming-darker/40 backdrop-blur-md rounded-2xl border border-white/5 p-6 hover:border-gaming-blue/30 transition-all duration-300 shadow-lg overflow-hidden relative group">
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gaming-blue/20 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gaming-blue/20 rounded-bl-2xl"></div>
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gaming-blue/20 to-transparent"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-white/10">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gaming-darker border border-gaming-blue/20 flex items-center justify-center shadow-glow">
                    <Phone className="text-gaming-blue h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-orbitron text-white/90">Direct Contact</h3>
                </div>
                
                <div className="space-y-4">
                  <a 
                    href="tel:7010956992"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gaming-darker/60 transition-all group bg-black/20 border border-white/5 hover:border-gaming-purple/20"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gaming-purple/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow">
                      <Phone className="text-gaming-purple h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs group-hover:text-white/60 transition-colors">Phone</p>
                      <p className="text-white/90 font-medium">+91 7010956992</p>
                    </div>
                  </a>

                  <a 
                    href="mailto:rikaz.154@gmail.com"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gaming-darker/60 transition-all group bg-black/20 border border-white/5 hover:border-gaming-blue/20"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gaming-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow">
                      <Mail className="text-gaming-blue h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs group-hover:text-white/60 transition-colors">Email</p>
                      <p className="text-white/90 font-medium">rikaz.154@gmail.com</p>
                    </div>
                  </a>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gaming-blue/5 blur-xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
            </div>

            {/* Social Links - REDESIGNED */}
            <div className="bg-gaming-darker/40 backdrop-blur-md rounded-2xl border border-white/5 p-6 hover:border-gaming-purple/20 transition-all duration-300 shadow-lg overflow-hidden relative group">
              {/* Decorative elements */}
              <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(147,51,234,0.1),transparent_70%)]"></div>
              <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-gaming-purple/10 blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gaming-darker border border-gaming-purple/20 flex items-center justify-center shadow-glow">
                    <Award className="text-gaming-purple h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-orbitron text-white/90">Find Me Online</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <a 
                    href="https://www.linkedin.com/in/rikaz-/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center p-4 rounded-xl bg-black/30 hover:bg-gaming-darker/60 transition-all border border-white/5 hover:border-gaming-purple/20 hover:scale-105 transform"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gaming-purple/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-glow animate-pulse-slow relative">
                      <Linkedin className="h-6 w-6 text-gaming-purple relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-br from-gaming-purple/20 to-transparent rounded-xl"></div>
                    </div>
                    <span className="text-white/60 text-xs group-hover:text-white transition-colors">LinkedIn</span>
                  </a>

                  <a 
                    href="https://www.instagram.com/rikazvisuals/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center p-4 rounded-xl bg-black/30 hover:bg-gaming-darker/60 transition-all border border-white/5 hover:border-gaming-blue/20 hover:scale-105 transform"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gaming-blue/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-glow animate-pulse-slow animation-delay-1000 relative">
                      <Instagram className="h-6 w-6 text-gaming-blue relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-br from-gaming-blue/20 to-transparent rounded-xl"></div>
                    </div>
                    <span className="text-white/60 text-xs group-hover:text-white transition-colors">Instagram</span>
                  </a>

                  <a 
                    href="https://github.com/rikazurrehman" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center p-4 rounded-xl bg-black/30 hover:bg-gaming-darker/60 transition-all border border-white/5 hover:border-gaming-green/20 hover:scale-105 transform"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gaming-green/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-glow animate-pulse-slow animation-delay-2000 relative">
                      <Github className="h-6 w-6 text-gaming-green relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-br from-gaming-green/20 to-transparent rounded-xl"></div>
                    </div>
                    <span className="text-white/60 text-xs group-hover:text-white transition-colors">GitHub</span>
                  </a>
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
