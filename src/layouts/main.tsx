import React, { ReactNode } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="main-layout ">
            <Header />
            <main>
                {children}
            </main>
          
            <Footer />
        </div>
    );
};

export default MainLayout;
