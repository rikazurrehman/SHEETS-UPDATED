import { Link } from 'react-router-dom';

const MobileNav = () => {
    return (
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="glass-card rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl">
                <Link to="/" className="text-[#E6E6E6] hover:text-[#FF7441] transition-colors text-sm font-medium">Home</Link>
                <Link to="/works" className="text-[#E6E6E6] hover:text-[#FF7441] transition-colors text-sm font-medium">Work</Link>
                <a href="/#contact" className="text-[#E6E6E6] hover:text-[#FF7441] transition-colors text-sm font-medium">Contact</a>
            </div>
        </div>
    );
};

export default MobileNav;
