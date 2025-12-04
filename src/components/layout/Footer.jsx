import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-container">

                <div className="footer-col logo-col">
                    <div className="footer-logo">
                        <img src="/PYH-e1756471072799.webp" alt="Pick Your House Logo" />
                    </div>
                    <p className="footer-about-text">
                        Pick Your House connects you with the right property through verified listings, expert guidance, and hassle-free real estate services—because your dream home deserves the best.
                    </p>
                </div>

                <div className="footer-col menu-col">
                    <h3>Quick Menu</h3>
                    <ul className="footer-links">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/services">Properties</Link></li>
                        <li><Link href="/blogs">Blogs</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                <div className="footer-col contact-col">
                    <h3>Contact Us</h3>
                    <div className="contact-item">
                        <i className="fas fa-phone-alt"></i>
                        <span>+91 81476 16555</span>
                    </div>
                    <div className="contact-item">
                        <i className="fas fa-envelope"></i>
                        <span>Info@pickyourhouse.in</span>
                    </div>
                    <div className="social-links">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>

                <div className="footer-col newsletter-col">
                    <h3>News Letter</h3>
                    <p>Subscribe our newsletter to get the latest news & updates.</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Enter your mail..." aria-label="Enter your email" />
                        <button type="submit" aria-label="Subscribe button">
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

            </div>
            <div className="footer-bottom-line">copyright © 2024 Pick Your House. All rights reserved.</div>
        </footer>
    );
};

export default Footer;
