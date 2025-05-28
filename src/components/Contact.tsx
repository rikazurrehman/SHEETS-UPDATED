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
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gaming-purple/10 blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gaming-blue/10 blur-[120px]"></div>
        <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-gaming-green/5 blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-orbitron font-bold text-center mb-4 gaming-gradient-text">Connect With Me</h2>
        <p className="text-white/60 text-center max-w-xl mx-auto mb-16 text-sm tracking-wider">Let's collaborate on something amazing. Reach out through the form or direct channels below.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Contact Form - LEFT SIDE (larger) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6 bg-gaming-darker/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-gaming-purple/30 shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-orbitron text-white/90 mb-6 pb-2 border-b border-white/10">Drop a Message</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white/70 mb-2 text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-gaming-darker/80 px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-white/5'} focus:border-gaming-purple outline-none transition-all duration-300 text-white placeholder:text-white/30`}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white/70 mb-2 text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-gaming-darker/80 px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-white/5'} focus:border-gaming-purple outline-none transition-all duration-300 text-white placeholder:text-white/30`}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-white/70 mb-2 text-sm font-medium">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full bg-gaming-darker/80 px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-white/5'} focus:border-gaming-purple outline-none transition-all duration-300 text-white resize-none placeholder:text-white/30`}
                  placeholder="How can I help you?"
                  disabled={isSubmitting}
                />
                {errors.message && <p className="mt-1 text-red-500 text-xs">{errors.message}</p>}
              </div>
              
              {/* Math CAPTCHA */}
              <div className="bg-gaming-darker/60 rounded-xl border border-white/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="text-gaming-purple h-4 w-4" />
                  <span className="text-white/70 text-sm font-medium">Quick Verification</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-gaming-darker/80 rounded-xl p-3 flex items-center justify-center flex-1">
                    <span className="text-gaming-purple text-lg font-medium mr-2">{mathProblem.num1}</span>
                    <span className="text-white/70 mx-1">+</span>
                    <span className="text-gaming-blue text-lg font-medium mr-2">{mathProblem.num2}</span>
                    <span className="text-white/70 mx-1">=</span>
                  </div>
                  
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={handleMathCaptchaChange}
                    className={`w-20 bg-gaming-darker/80 px-4 py-3 rounded-xl border ${errors.mathCaptcha ? 'border-red-500' : 'border-white/5'} focus:border-gaming-purple outline-none transition-all duration-300 text-white text-center`}
                    placeholder="?"
                    disabled={isSubmitting}
                  />
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
                className="w-full bg-gradient-to-r from-gaming-purple to-gaming-blue text-white text-center py-4 rounded-xl transition-all shadow-lg hover:shadow-gaming-purple/20 hover:translate-y-[-2px] font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
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

          {/* Contact Info Cards - RIGHT SIDE (smaller) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct contact card */}
            <div className="bg-gaming-darker/40 backdrop-blur-md rounded-2xl border border-white/5 p-6 hover:border-gaming-blue/30 transition-all duration-300">
              <h3 className="text-xl font-orbitron text-white/90 mb-4 pb-2 border-b border-white/10">Direct Contact</h3>
              
              <div className="space-y-4">
                <a 
                  href="tel:7010956992"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gaming-darker/60 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gaming-purple/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="text-gaming-purple h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs group-hover:text-white/60 transition-colors">Phone</p>
                    <p className="text-white/90 font-medium">+91 7010956992</p>
                  </div>
                </a>

                <a 
                  href="mailto:rikaz.154@gmail.com"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gaming-darker/60 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gaming-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="text-gaming-blue h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs group-hover:text-white/60 transition-colors">Email</p>
                    <p className="text-white/90 font-medium">rikaz.154@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gaming-darker/40 backdrop-blur-md rounded-2xl border border-white/5 p-6 hover:border-gaming-purple/20 transition-all duration-300">
              <h3 className="text-xl font-orbitron text-white/90 mb-4 pb-2 border-b border-white/10">Find Me On</h3>
              
              <div className="grid grid-cols-3 gap-2">
                <a 
                  href="https://www.linkedin.com/in/rikaz-/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-3 rounded-xl bg-gaming-darker/20 hover:bg-gaming-darker/60 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gaming-purple/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Linkedin className="h-5 w-5 text-gaming-purple" />
                  </div>
                  <span className="text-white/60 text-xs group-hover:text-white transition-colors">LinkedIn</span>
                </a>

                <a 
                  href="https://www.instagram.com/rikazvisuals/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-3 rounded-xl bg-gaming-darker/20 hover:bg-gaming-darker/60 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gaming-blue/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Instagram className="h-5 w-5 text-gaming-blue" />
                  </div>
                  <span className="text-white/60 text-xs group-hover:text-white transition-colors">Instagram</span>
                </a>

                <a 
                  href="https://github.com/rikazurrehman" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-3 rounded-xl bg-gaming-darker/20 hover:bg-gaming-darker/60 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gaming-green/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Github className="h-5 w-5 text-gaming-green" />
                  </div>
                  <span className="text-white/60 text-xs group-hover:text-white transition-colors">GitHub</span>
                </a>
              </div>
            </div>

            {/* Let's Connect Soon Box */}
            <div className="bg-gaming-darker/40 backdrop-blur-md rounded-2xl border border-white/5 p-6 relative overflow-hidden group hover:border-gaming-purple/20 transition-all duration-300">
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="text-gaming-purple h-5 w-5" />
                  <h3 className="text-xl font-orbitron gaming-gradient-text">Let's Connect Soon</h3>
                </div>
                
                <p className="text-white/70 text-sm">
                  Have a project in mind? I'm available for freelance work.
                </p>
                
                <div className="w-full h-[1px] bg-white/10 my-3"></div>
                
                <div className="flex items-center text-white/80 text-sm">
                  <Mail className="h-4 w-4 text-gaming-purple mr-2" />
                  <span>rikaz.154@gmail.com</span>
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
