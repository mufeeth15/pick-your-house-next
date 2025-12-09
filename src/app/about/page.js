"use client";

import React, { useState } from 'react';
import { useContacts } from '@/context/ContactContext';

const About = () => {
    const { addContact } = useContacts();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        property: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const nameParts = formData.name.trim().split(' ');
            const firstName = nameParts[0] || ' ';
            const lastName = nameParts.slice(1).join(' ') || '';

            const contactData = {
                firstName,
                lastName,
                email: formData.email,
                phone: formData.phone,
                property: formData.property, // Using property input as service/subject
                message: formData.message
            };

            const res = await fetch('/api/about', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            });

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.error || 'Something went wrong');
            }

            alert('Message sent successfully!');
            setFormData({
                name: '',
                email: '',
                phone: '',
                property: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to send message. Please try again later.');
        }
    };

    return (
        <section className="info-page-content">
            {/* Why Choose Us Section */}
            <section className="why-choose-us-section">
                <div className="container">
                    <div className="why-choose-us-image">
                        <img src="/1183405_20-350x350.jpg" alt="Tall residential buildings" />
                    </div>
                    <div className="why-choose-us-text">
                        <h2>Why should you choose us?</h2>
                        <div className="reason-list">
                            <div className="reason-item-1">
                                <i className="fas fa-map-marker-alt"></i>
                                <div>
                                    <h4>Local Expertise</h4>
                                    <p>We know the local market and get the best deals for you.</p>
                                </div>
                            </div>
                            <div className="reason-item">
                                <i className="fas fa-check-circle"></i>
                                <div>
                                    <h4>Verified Homes</h4>
                                    <p>Every home is inspected and verified by our professional team.</p>
                                </div>
                            </div>
                            <div className="reason-item">
                                <i className="fas fa-user"></i>
                                <div>
                                    <h4>Personalized Support</h4>
                                    <p>We provide personalized property options.</p>
                                </div>
                            </div>
                            <div className="reason-item">
                                <i className="fas fa-tachometer-alt"></i>
                                <div>
                                    <h4>Faster Deals</h4>
                                    <p>We help you speed up the process of buying and selling.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="who-we-are-section">
                <div className="container">
                    <div className="section-title">
                        <h2>Who We Are</h2>
                        <p>At PICKYOURHOUSE, we bring you the latest in property management and more. We offer years of real estate experience for both residential and commercial property management. We're here to help you get the best deal.</p>
                    </div>
                    <div className="mission-vision-container">
                        <div className="mission-block">
                            <h3>Our Mission</h3>
                            <p>At PICKYOURHOUSE, finding the right home should be simple, seamless, and stress-free. We strive to provide accurate, up-to-date information and dedicated support to empower you to make informed decisions and get the best value.</p>
                        </div>
                        <div className="vision-block">
                            <h3>Our Vision</h3>
                            <p>To be the most trusted and customer-centric real estate platform, revolutionizing the way people buy, sell, and rent properties through innovation, transparency, and excellence.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Simple Real Estate Section */}
            <section className="simple-real-estate-section">
                <div className="container">
                    <h2>How we make real estate simple for you</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <i className="fas fa-trophy"></i>
                            <h4>Excellence</h4>
                            <p>We provide award-winning services backed by experience and commitment.</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-chart-line"></i>
                            <h4>Achievement</h4>
                            <p>We help you reach your investment goals with strategic planning and smart property selection.</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-star"></i>
                            <h4>Quality</h4>
                            <p>Our commitment to excellence ensures every property meets our high standards for your satisfaction.</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-search"></i>
                            <h4>Transparency</h4>
                            <p>We provide clarity in every step, ensuring you are fully informed and confident in your decision.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Get Consultation Section */}
            <section className="get-consultation-section">
                <div className="container">
                    <div className="consultation-info">
                        <h3>Get free consultation</h3>
                        <p>We will support you in getting a good deal.</p>
                        <div className="contact-detail-list">
                            <div className="contact-detail-item">
                                <i className="fas fa-phone-alt"></i>
                                <div>
                                    <strong>Call:</strong>
                                    <p>+91 81478 18655</p>
                                </div>
                            </div>
                            <div className="contact-detail-item">
                                <i className="fas fa-envelope"></i>
                                <div>
                                    <strong>Email:</strong>
                                    <p>info@pickyourhouse.co.in</p>
                                </div>
                            </div>
                            <div className="contact-detail-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <div>
                                    <strong>Address:</strong>
                                    <p className="contact-detail-item-2">Navi Mumbai</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="consultation-form-block">
                        <h2>Contact Us</h2>
                        <form onSubmit={handleSubmit} className="consultation-form">
                            <div className="form-row">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone No."
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="property"
                                    placeholder="Property Inquiry"
                                    value={formData.property}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <textarea
                                name="message"
                                rows="4"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                            <button type="submit" className="submit-button">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default About;
