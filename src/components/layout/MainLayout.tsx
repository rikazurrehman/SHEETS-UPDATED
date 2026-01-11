import { ReactNode } from 'react';
import MobileNav from '@/components/sections/MobileNav';
import ProfileSidebar from '@/components/sections/ProfileSidebar';
import Footer from './Footer';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="antialiased selection:bg-[#FF7441] selection:text-[#0D0D0D] min-h-screen bg-background text-foreground">
            {/* Noise Overlay */}
            <div className="bg-noise"></div>

            <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">

                    {/* LEFT COLUMN: Sticky Info & Nav */}
                    <aside className="lg:col-span-5 xl:col-span-4 relative z-20">
                        <div className="lg:sticky lg:top-8 flex flex-col justify-between lg:h-[calc(100vh-4rem)] space-y-8">
                            <ProfileSidebar />
                        </div>
                    </aside>

                    {/* RIGHT COLUMN: Scrollable Content */}
                    <main className="lg:col-span-7 xl:col-span-8 space-y-6 relative z-10 pb-20">
                        {children}
                        <Footer />
                    </main>

                </div>
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
        </div>
    );
};

export default MainLayout;
