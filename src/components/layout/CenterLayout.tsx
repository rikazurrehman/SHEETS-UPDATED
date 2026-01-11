import { ReactNode } from 'react';
import MobileNav from '@/components/sections/MobileNav';

interface CenterLayoutProps {
    children: ReactNode;
}

const CenterLayout = ({ children }: CenterLayoutProps) => {
    return (
        <div className="antialiased selection:bg-[#FF7441] selection:text-[#0D0D0D] min-h-screen bg-background text-foreground flex flex-col items-center">
            {/* Noise Overlay */}
            <div className="bg-noise"></div>

            <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col items-center">
                {children}
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
        </div>
    );
};

export default CenterLayout;
