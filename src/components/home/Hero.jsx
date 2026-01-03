"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Hero = () => {
    const router = useRouter();
    const [location, setLocation] = useState('');
    const [type, setType] = useState('flat-sale');
    const [keywords, setKeywords] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (location) params.append('location', location);
        if (type) params.append('type', type);
        if (keywords) params.append('keywords', keywords);

        router.push(`/services?${params.toString()}`);
    };

    return (
        <section className="new-hero-section">
            <div className="hero-content-wrapper">
                <div className="hero-main-text">
                    <h1>The Key to Homes Comfort <br/> & Investment in Navi Mumbai</h1>
                    <p>Find your perfect flat or row house in Vashi, Ghansoli, and Kopar Khairane. We are your trusted partners for buying, selling, and renting properties.</p>

                    <div className="hero-search-input">
                        <input
                            type="text"
                            placeholder="Search by keywords..."
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                        />
                        <button className="hero-search-arrow" onClick={handleSearch} aria-label="Search">
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

                <div className="floating-filter-bar">
                    <div className="filter-item">
                        <div className="filter-content">
                            <span className="filter-label">City Street <i className="fas fa-chevron-down"></i></span>
                            <select
                                className="filter-value"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option value="">123Street</option> {/* Placeholder-like default */}
                                <option value="vashi">Vashi</option>
                                <option value="ghansoli">Ghansoli</option>
                                <option value="kopar_khairane">Kopar Khairane</option>
                            </select>
                        </div>
                    </div>

                    <div className="filter-separator"></div>

                    <div className="filter-item">
                        <div className="filter-content">
                            <span className="filter-label">Typology of rent <i className="fas fa-chevron-down"></i></span>
                            <select
                                className="filter-value"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="flat-sale">Villa</option>
                                <option value="flat-rent">Apartment</option>
                                <option value="commercial">Office</option>
                            </select>
                        </div>
                    </div>

                    <div className="filter-separator"></div>

                    <div className="filter-item">
                        <div className="filter-content">
                            <span className="filter-label">Price <i className="fas fa-chevron-down"></i></span>
                            <select className="filter-value">
                                <option value="">₹ 950.000,00</option>
                                <option value="low">Under ₹20L</option>
                                <option value="mid">₹20L - ₹50L</option>
                                <option value="high">Above ₹50L</option>
                            </select>
                        </div>
                    </div>

                    <button className="filter-search-btn" onClick={handleSearch}>
                        <i className="fas fa-search"></i> Search
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
