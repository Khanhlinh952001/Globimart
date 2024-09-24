import React, { ReactNode } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="main-layout">
            <Header />
            <main>
                {children}
            </main>
            <button 
                className="fixed  bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition duration-300 z-50"
            >
                Help
            </button>
            <Footer />
        </div>
    );
};

export default MainLayout;
