import { Mail, ArrowUp, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-24 border-t border-[#E6E6E6]/5 pt-12 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Copyright & Brand */}
                <div className="text-center md:text-left space-y-2">
                    <h3 className="text-xl font-bold text-[#E6E6E6] tracking-tight">Rikaz<span className="text-[#FF7441]">.</span></h3>
                    <p className="text-xs text-[#E6E6E6]/40">© 2026 Rikaz. All Rights Reserved.</p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-6">
                    <a
                        href="https://www.instagram.com/r1kaz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#E6E6E6]/5 flex items-center justify-center text-[#E6E6E6]/60 hover:bg-[#FF7441] hover:text-[#0D0D0D] transition-all hover:-translate-y-1"
                    >
                        <Instagram size={18} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/rikaz-/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#E6E6E6]/5 flex items-center justify-center text-[#E6E6E6]/60 hover:bg-[#FF7441] hover:text-[#0D0D0D] transition-all hover:-translate-y-1"
                    >
                        <Linkedin size={18} />
                    </a>
                    <a
                        href="mailto:rikaz.154@gmail.com"
                        className="w-10 h-10 rounded-full bg-[#E6E6E6]/5 flex items-center justify-center text-[#E6E6E6]/60 hover:bg-[#FF7441] hover:text-[#0D0D0D] transition-all hover:-translate-y-1"
                    >
                        <Mail size={18} />
                    </a>
                </div>

                {/* Links & Back to Top */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    <div className="flex gap-6 text-xs font-medium text-[#E6E6E6]/40 uppercase tracking-wider">
                        <a href="#" className="hover:text-[#FF7441] transition-colors">Imprint</a>
                        <a href="#" className="hover:text-[#FF7441] transition-colors">Privacy</a>
                    </div>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group flex items-center gap-2 text-xs font-bold text-[#E6E6E6] hover:text-[#FF7441] transition-colors uppercase tracking-widest"
                    >
                        Back to Top
                        <div className="w-8 h-8 rounded-full border border-[#E6E6E6]/20 flex items-center justify-center group-hover:border-[#FF7441] transition-colors">
                            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
