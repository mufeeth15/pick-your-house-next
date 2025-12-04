"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

const FeaturedSell = () => {
    const containerRef = useRef(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };



    return (
        <section className="featured-sell-section">
            <div className="section-header">
                <h4>FEATURED LISTING</h4>
                <h2>Property for sell</h2>
            </div>
            <div className="sell-cards-wrapper">
                <button className="scroll-btn prev-btn" onClick={scrollLeft}>←</button>
                <div className="sell-card-container" ref={containerRef}>

                    <div className="sell-card">
                        <div className="card-image-box">
                            <img src="/1183405_20-350x350.jpg" alt="Featured 2 BHK" />
                            <span className="feature-tag">FEATURED</span>
                        </div>
                        <h3>2 BHK Sea-View</h3>
                        <p className="location">Navi Mumbai, Maharashtra</p>
                        <div className="details">
                            <div><i className="fas fa-bed"></i> 4 Bedrooms</div>
                            <div><i className="fas fa-bath"></i> 3 Bathrooms</div>
                            <div><i className="fas fa-ruler-combined"></i> 950 SqFt</div>
                        </div>
                        <div className="card-footer">
                            <span className="price">₹35,000 / Month</span>
                            <Link href="/services" className="view-details">View Details</Link>
                        </div>
                    </div>

                    <div className="sell-card">
                        <div className="card-image-box">
                            <img src="/1183405_20-350x350.jpg" alt="Featured 2 BHK" />
                            <span className="feature-tag">FEATURED</span>
                        </div>
                        <h3>2 BHK Sea-View</h3>
                        <p className="location">Navi Mumbai, Maharashtra</p>
                        <div className="details">
                            <div><i className="fas fa-bed"></i> 4 Bedrooms</div>
                            <div><i className="fas fa-bath"></i> 3 Bathrooms</div>
                            <div><i className="fas fa-ruler-combined"></i> 950 SqFt</div>
                        </div>
                        <div className="card-footer">
                            <span className="price">₹66,00,000/-</span>
                            <Link href="/services" className="view-details">View Details</Link>
                        </div>
                    </div>

                    <div className="sell-card">
                        <div className="card-image-box">
                            <img src="/1183405_20-350x350.jpg" alt="Featured 3 BHK" />
                            <span className="feature-tag">FEATURED</span>
                        </div>
                        <h3>3 BHK Flat</h3>
                        <p className="location">Vashi, Navi Mumbai</p>
                        <div className="details">
                            <div><i className="fas fa-bed"></i> 4 Bedrooms</div>
                            <div><i className="fas fa-bath"></i> 3 Bathrooms</div>
                            <div><i className="fas fa-ruler-combined"></i> 1100 SqFt</div>
                        </div>
                        <div className="card-footer">
                            <span className="price">₹1,00,00,000/-</span>
                            <Link href="/services" className="view-details">View Details</Link>
                        </div>
                    </div>

                    <div className="sell-card">
                        <div className="card-image-box">
                            <img src="/1183405_20-350x350.jpg" alt="Luxury Villa" />
                            <span className="feature-tag">FEATURED</span>
                        </div>
                        <h3>Luxury 3 BHK Villa</h3>
                        <p className="location">Panvel, Navi Mumbai</p>
                        <div className="details">
                            <div><i className="fas fa-bed"></i> 4 Bedrooms</div>
                            <div><i className="fas fa-bath"></i> 4 Bathrooms</div>
                            <div><i className="fas fa-ruler-combined"></i> 2000 SqFt</div>
                        </div>
                        <div className="card-footer">
                            <span className="price">₹1,50,00,000/-</span>
                            <Link href="/services" className="view-details">View Details</Link>
                        </div>
                    </div>

                    <div className="sell-card">
                        <div className="card-image-box">
                            <img src="/1183405_20-350x350.jpg" alt="Luxury Villa" />
                            <span className="feature-tag">FEATURED</span>
                        </div>
                        <h3>Luxury 4 BHK Villa</h3>
                        <p className="location">Panvel, Navi Mumbai</p>
                        <div className="details">
                            <div><i className="fas fa-bed"></i> 4 Bedrooms</div>
                            <div><i className="fas fa-bath"></i> 4 Bathrooms</div>
                            <div><i className="fas fa-ruler-combined"></i> 2000 SqFt</div>
                        </div>
                        <div className="card-footer">
                            <span className="price">₹2,50,00,000/-</span>
                            <Link href="/services" className="view-details">View Details</Link>
                        </div>
                    </div>

                </div>
                <button className="scroll-btn next-btn" onClick={scrollRight}>→</button>
            </div>
        </section>
    );
};

export default FeaturedSell;
