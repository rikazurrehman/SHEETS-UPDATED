import { useState } from 'react';
import { Phone, Mail, Github, Linkedin, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  const validateForm = () => {
    const newErrors: typeof errors = { name: '', email: '', message: '' };
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
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      formIsValid = false;
    }
    
    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gaming-darker to-gaming-dark relative">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-orbitron font-bold text-center mb-16 gaming-gradient-text">Connect With Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="space-y-8">
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
            <div className="bg-gaming-darker/50 backdrop-blur-sm border border-gaming-purple/20 p-8 rounded-lg">
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

            {/* Quote Section */}
            <div className="text-center mt-12 mb-8">
              <p className="text-2xl font-orbitron text-white/90">
                Let's Connect Soon!
              </p>
              <div className="w-24 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-gaming-purple to-transparent"></div>
            </div>

          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-gaming-darker/50 backdrop-blur-sm p-8 rounded-lg border border-gaming-purple/20 shadow-glow hover:shadow-glow-strong transition-all">
            <div className="mb-6">
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
                placeholder="Enter your name"
              />
              {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
            </div>
            
            <div className="mb-6">
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
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-white/80 mb-2 text-sm">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full bg-gaming-darker px-4 py-3 rounded-md border ${errors.message ? 'border-red-500' : 'border-white/10'} focus:border-gaming-purple outline-none transition-colors text-white resize-none`}
                placeholder="What would you like to discuss?"
              ></textarea>
              {errors.message && <p className="mt-1 text-red-500 text-xs">{errors.message}</p>}
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-gaming-purple text-black text-center py-4 rounded-md hover:bg-gaming-purple/90 transition-all shadow-glow-strong hover:shadow-glow-purple border border-gaming-purple/50 hover:border-gaming-purple font-medium"
            >
              Send Message
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
