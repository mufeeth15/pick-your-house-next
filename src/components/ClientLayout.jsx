"use client";

import { usePathname } from 'next/navigation';
import Header from './layout/Header';
import Footer from './layout/Footer';

import ScrollToTop from './ScrollToTop';

export default function ClientLayout({ children }) {
    const pathname = usePathname();
    // Check if route is admin but NOT admin login (if admin login should have header/footer, check original App.jsx)
    // Original App.jsx: !isAdminRoute && <Header /> where isAdminRoute = pathname.startsWith('/admin')
    // So /admin/login also hides header/footer.
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <>
            <ScrollToTop />
            {!isAdminRoute && <Header />}
            <main>
                {children}
            </main>
            {!isAdminRoute && <Footer />}
        </>
    );
}
