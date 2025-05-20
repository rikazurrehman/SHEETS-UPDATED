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
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would send the data to your backend
      console.log('Form submitted:', formData);
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      // Reset form
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
        <h2 className="section-title text-center">Connect With Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-orbitron font-semibold mb-6 text-white">Let's Work Together</h3>
            
            <p className="text-white/80 mb-8">
              Have a project in mind or want to discuss a potential collaboration?
              Feel free to reach out to me through any of the following channels:
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gaming-purple/20 flex items-center justify-center mr-4">
                  <Phone className="text-gaming-purple h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm text-white/60 mb-1">Phone</h4>
                  <a href="tel:7010956992" className="text-white text-lg hover:neon-text transition-colors font-semibold">+91 7010956992</a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gaming-blue/20 flex items-center justify-center mr-4">
                  <Mail className="text-gaming-blue h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm text-white/60 mb-1">Email</h4>
                  <a href="mailto:rikaz.154@gmail.com" className="text-white text-lg hover:neon-text-blue transition-colors font-semibold">rikaz.154@gmail.com</a>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-10">
                <h4 className="text-xl font-orbitron mb-4 text-white">Social Profiles</h4>
                <div className="flex space-x-4">
                  <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gaming-darker border border-white/10 flex items-center justify-center hover:border-gaming-purple hover:text-gaming-purple transition-all">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gaming-darker border border-white/10 flex items-center justify-center hover:border-gaming-purple hover:text-gaming-purple transition-all">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gaming-darker border border-white/10 flex items-center justify-center hover:border-gaming-purple hover:text-gaming-purple transition-all">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-gaming-darker/40 backdrop-blur-sm p-8 rounded-lg border border-white/10">
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
                className="w-full btn-glow text-center py-4"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
