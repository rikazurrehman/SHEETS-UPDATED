import { MapPin, Mail, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileSidebar = () => {
    return (
        <>
            {/* Profile Header */}
            <div className="space-y-8">
                {/* Abstract Avatar */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden glass-card flex items-center justify-center group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7441]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <img src="/assets/DSC09562 (3).png" alt="Rikaz" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />

                </div>

                <div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-[#E6E6E6] leading-[0.9]">
                        Rikaz<span className="text-[#FF7441]">.</span>
                    </h1>
                    <p className="mt-4 text-lg text-[#E6E6E6]/50 font-light max-w-sm leading-relaxed">
                        CGI Artist & Social Media Specialist crafting digital realities that stop the scroll.
                    </p>
                </div>

                {/* Status */}
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border border-[#E6E6E6]/5 w-fit">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7441] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7441]"></span>
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-[#E6E6E6]/80">Available for work</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col space-y-4">
                <Link to="/" className="group flex items-center space-x-3 text-[#E6E6E6]/60 hover:text-[#E6E6E6] transition-colors">
                    <span className="w-8 h-[1px] bg-[#E6E6E6]/20 group-hover:bg-[#FF7441] transition-colors"></span>
                    <span className="text-sm font-medium uppercase tracking-widest">About</span>
                </Link>
                <Link to="/works" className="group flex items-center space-x-3 text-[#E6E6E6]/60 hover:text-[#E6E6E6] transition-colors">
                    <span className="w-8 h-[1px] bg-[#E6E6E6]/20 group-hover:bg-[#FF7441] transition-colors"></span>
                    <span className="text-sm font-medium uppercase tracking-widest">Selected Work</span>
                </Link>
                <a href="/#contact" className="group flex items-center space-x-3 text-[#E6E6E6]/60 hover:text-[#E6E6E6] transition-colors">
                    <span className="w-8 h-[1px] bg-[#E6E6E6]/20 group-hover:bg-[#FF7441] transition-colors"></span>
                    <span className="text-sm font-medium uppercase tracking-widest">Contact</span>
                </a>
            </nav>

            {/* Socials / Footer */}
            <div className="flex items-center gap-6 text-[#E6E6E6]/30">
                <a href="https://www.instagram.com/r1kaz/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF7441] transition-colors"><Instagram width={20} /></a>
                <a href="https://www.linkedin.com/in/rikaz-/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF7441] transition-colors"><Linkedin width={20} /></a>
                <a href="mailto:rikaz.154@gmail.com" className="hover:text-[#FF7441] transition-colors"><Mail width={20} /></a>
            </div>
        </>
    );
};

export default ProfileSidebar;
