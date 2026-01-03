import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    const [activeLink, setActiveLink] = useState('/');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setActiveLink(pathname);
        // Close mobile menu when route changes
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-one">
                <div className="logo-group">
                    <Link href="/">
                        <img src="/PYH-e1756471072799.webp" alt="Pick Your House Logo" className="main-logo" />
                    </Link>
                </div>

                {/* Mobile Menu Toggle Button */}
                <button
                    className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>

                {/* Desktop Navigation */}
                <nav className="main-nav">
                    <ul>
                        <li>
                            <Link
                                href="/"
                                className={activeLink === '/' ? 'active' : ''}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className={activeLink === '/about' ? 'active' : ''}
                            >
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/services"
                                className={activeLink === '/services' ? 'active' : ''}
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/blogs"
                                className={activeLink === '/blogs' ? 'active' : ''}
                            >
                                Blogs
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className={activeLink === '/contact' ? 'active' : ''}
                            >
                                Contact us
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="header-actions">
                    <Link href="/contact">Enquiry</Link>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                        <Link
                            href="/"
                            className={activeLink === '/' ? 'active' : ''}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={activeLink === '/about' ? 'active' : ''}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About us
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/services"
                            className={activeLink === '/services' ? 'active' : ''}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/blogs"
                            className={activeLink === '/blogs' ? 'active' : ''}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Blogs
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className={activeLink === '/contact' ? 'active' : ''}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact us
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className="mobile-enquiry-btn"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Enquiry
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
