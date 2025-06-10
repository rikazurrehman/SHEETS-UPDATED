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
    <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-gaming-darker to-gaming-dark relative overflow-hidden">
      {/* Background elements - reduced for mobile */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 sm:opacity-40">
        <div className="absolute top-20 left-10 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-gaming-purple/20 blur-[100px] sm:blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gaming-blue/20 blur-[120px] sm:blur-[150px] animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-40 right-20 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-gaming-green/10 blur-[80px] sm:blur-[100px] animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-gaming-purple/10 blur-[100px] sm:blur-[130px] animate-pulse-slow animation-delay-3000"></div>
      </div>
      
      {/* Digital circuit pattern - hidden on mobile */}
      <div className="absolute top-1/4 right-10 w-20 h-20 border border-white/5 rounded-md rotate-12 opacity-30 hidden sm:block">
        <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-purple/30"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-blue/30"></div>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gaming-purple rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-gaming-blue rounded-full"></div>
      </div>
      
      <div className="absolute bottom-1/4 left-10 w-16 h-16 border border-white/5 rounded-md -rotate-12 opacity-30 hidden sm:block">
        <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-blue/30"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-purple/30"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-gaming-blue rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-gaming-purple rounded-full"></div>
      </div>
      
      {/* Main content container */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
            Get In <span className="gaming-gradient-text">Touch</span>
            <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-gaming-purple to-gaming-blue opacity-40"></div>
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto text-sm sm:text-base">
            Let's build something amazing together. Feel free to reach out with questions, project inquiries, 
            or just to say hello!
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact form */}
            <div className="md:col-span-2 bg-black/30 backdrop-blur-sm rounded-xl p-5 sm:p-8 border border-white/10 hover:border-gaming-purple/20 transition-all shadow-lg">
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
                  className="w-full relative overflow-hidden py-3 px-6 rounded-lg bg-black/50 text-white border border-white/10 hover:border-gaming-purple/30 transition-all group"
                >
                  {/* Button background effects */}
                  <div className="absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,white_0%,transparent_50%)]"></div>
                    <div className="absolute -inset-x-1/4 top-0 h-px w-[150%] bg-gradient-to-r from-transparent via-gaming-purple/50 to-transparent group-hover:animate-scan opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
            
            {/* Contact info */}
            <div className="space-y-6">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/10 hover:border-gaming-blue/20 transition-all shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
                
                <div className="space-y-4">
                  <a 
                    href="tel:+919840000000" 
                    className="flex items-start group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gaming-blue/10 flex items-center justify-center mr-3 border border-white/5 group-hover:border-gaming-blue/20 transition-all">
                      <Phone className="w-4 h-4 text-gaming-blue" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60 text-xs">Phone</p>
                      <p className="text-white group-hover:text-gaming-blue transition-colors">+91 98400 00000</p>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:info@youremail.com" 
                    className="flex items-start group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gaming-purple/10 flex items-center justify-center mr-3 border border-white/5 group-hover:border-gaming-purple/20 transition-all">
                      <Mail className="w-4 h-4 text-gaming-purple" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60 text-xs">Email</p>
                      <p className="text-white group-hover:text-gaming-purple transition-colors break-all">info@youremail.com</p>
                    </div>
                  </a>
                </div>
              </div>
              
              {/* Social links */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/10 hover:border-gaming-purple/20 transition-all shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
                
                <div className="flex gap-3">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-lg bg-black/40 border border-white/5 hover:border-gaming-purple/20 flex items-center justify-center hover:bg-black/60 transition-all"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5 text-white/80" />
                  </a>
                  
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-lg bg-black/40 border border-white/5 hover:border-gaming-blue/20 flex items-center justify-center hover:bg-black/60 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-white/80" />
                  </a>
                  
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-lg bg-black/40 border border-white/5 hover:border-gaming-purple/20 flex items-center justify-center hover:bg-black/60 transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-white/80" />
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
