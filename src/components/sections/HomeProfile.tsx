import { MapPin, Mail, Linkedin, Twitter, Instagram, Github, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeProfile = () => {
    return (
        <div className="flex flex-col items-center text-center space-y-6 mb-12 animate-fade-in-down w-full">
            {/* Profile Image */}
            <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-[#E6E6E6]/10 p-1 bg-[#0D0D0D] shadow-2xl relative z-10">
                    <img
                        src="/assets/DSC09562 (3).png"
                        alt="Rikaz"
                        className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500 will-change-transform grayscale group-hover:grayscale-0"
                    />
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-[#FF7441] rounded-full blur-[40px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

                {/* Status Indicator */}
                <div className="absolute bottom-2 right-2 z-20 bg-[#0D0D0D] rounded-full p-1 border border-[#E6E6E6]/10">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#FF7441]/10 border border-[#FF7441]/20 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7441] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7441]"></span>
                        </span>
                        <span className="text-[10px] uppercase font-bold text-[#FF7441] tracking-wider hidden sm:block">Available</span>
                    </div>
                </div>
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#E6E6E6]">
                    Rikaz<span className="text-[#FF7441]">.</span>
                </h1>
                <p className="text-[#E6E6E6]/60 text-base md:text-lg max-w-md mx-auto leading-relaxed font-light">
                    CGI Artist & Social Media Specialist crafting digital realities that stop the scroll.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-[#E6E6E6]/40 uppercase tracking-widest font-medium pt-2">
                    <MapPin width={14} /> Dubai, UAE
                </div>
            </div>

            {/* Navigation - Centered for Home */}
            <nav className="flex items-center gap-6 pt-4">
                <Link to="/" className="text-[#E6E6E6] font-medium border-b border-[#FF7441]">About</Link>
                <Link to="/works" className="text-[#E6E6E6]/60 hover:text-[#E6E6E6] transition-colors">Works</Link>
                <a href="#contact" className="text-[#E6E6E6]/60 hover:text-[#E6E6E6] transition-colors">Contact</a>
            </nav>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
                <a href="#" className="p-2 text-[#E6E6E6]/40 hover:text-[#FF7441] hover:bg-[#FF7441]/10 rounded-lg transition-all duration-300">
                    <Instagram width={18} />
                </a>
                <a href="#" className="p-2 text-[#E6E6E6]/40 hover:text-[#FF7441] hover:bg-[#FF7441]/10 rounded-lg transition-all duration-300">
                    <Twitter width={18} />
                </a>
                <a href="#" className="p-2 text-[#E6E6E6]/40 hover:text-[#FF7441] hover:bg-[#FF7441]/10 rounded-lg transition-all duration-300">
                    <Linkedin width={18} />
                </a>
                <a href="mailto:hello@rikaz.com" className="p-2 text-[#E6E6E6]/40 hover:text-[#FF7441] hover:bg-[#FF7441]/10 rounded-lg transition-all duration-300">
                    <Mail width={18} />
                </a>
            </div>
        </div>
    );
};

export default HomeProfile;
