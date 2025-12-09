"use client";

import React, { useState } from 'react';
import { useContacts } from '@/context/ContactContext';
import '@/styles/contact-locations.css';

const Contact = () => {
    const { addContact } = useContacts();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '1bhk',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log("-------> CHANGED THE STATE OF THE form -------->")
        // console.log(name, value);
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.error || 'Something went wrong');
            }
            alert('Message sent successfully!');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                service: '1bhk',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting contact form:', error);
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="contact-page-container">
            <div className="contact-locations-section">
                <div className="location-card">
                    <h3>Navi Mumbai</h3>
                    <p className="address">
                        401 Broadway, Navi Mumbai<br />
                        Mumbai, Maharashtra,<br />
                        India.
                    </p>
                    <div className="contact-details">
                        <div className="detail-item">
                            <i className="fas fa-phone-alt"></i>
                            <span>+91 81476 16555</span>
                        </div>
                        <div className="detail-item">
                            <i className="fas fa-envelope"></i>
                            <span>contact@pickyourhouse.in</span>
                        </div>
                    </div>
                </div>

                <div className="location-card">
                    <h3>Bangalore</h3>
                    <p className="address">
                        3rd Floor Cavalier Tower, 7th Main Rd, HRBR<br />
                        Layout 1st Block HRBR Layout, Banaswadi,<br />
                        Kalyan Nagar, Bengaluru, Karnataka 560043
                    </p>
                    <div className="contact-details">
                        <div className="detail-item">
                            <i className="fas fa-phone-alt"></i>
                            <span>+91 81476 16555</span>
                        </div>
                        <div className="detail-item">
                            <i className="fas fa-envelope"></i>
                            <span>contact@pickyourhouse.in</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-box">
                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p>Fill up the form and our Team will get back to you within 24 hours.</p>

                    <div className="info-item">
                        <i className="fas fa-phone-alt"></i>
                        <span>+91 81478 18655</span>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-envelope"></i>
                        <span>info@pickyourhouse.co.in</span>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-map-marker"></i>
                        <span>Navi Mumbai, Maharashtra, India</span>
                    </div>

                    <div className="social-links">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="email">Mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="example@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="+90 543 779 94 64"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="service-selection">
                        <label>What Discover Your Next Property you need?</label>
                        <div className="checkbox-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="service"
                                    value="1bhk"
                                    checked={formData.service === '1bhk'}
                                    onChange={handleChange}
                                />
                                1BHK Flat
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="service"
                                    value="2bhk"
                                    checked={formData.service === '2bhk'}
                                    onChange={handleChange}
                                />
                                2BHK Flat
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="service"
                                    value="3bhk"
                                    checked={formData.service === '3bhk'}
                                    onChange={handleChange}
                                />
                                3BHK Flat
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="service"
                                    value="other"
                                    checked={formData.service === 'other'}
                                    onChange={handleChange}
                                />
                                Other
                            </label>
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="3"
                            placeholder="Write your message.."
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-button">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
