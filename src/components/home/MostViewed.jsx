"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './MostViewed.css';

// Placeholder data with Indian currency
const properties = [
    {
        id: 1,
        title: "Ocean Breeze Villa",
        location: "Kopar Khairane Navi Mumbai, Maharashtra",
        price: "₹ 55,000K",
        beds: 4,
        baths: 2,
        sqft: "1200",
        status: "For Rent",
        image: "/images/properties/modern_villa_ocean.png"
    },
    {
        id: 2,
        title: "Jakson House",
        location: "456 Oak Avenue, Mumbai, 400001",
        price: "₹ 7,50,00,000",
        beds: 3,
        baths: 2,
        sqft: "1850",
        status: "For Sale",
        image: "/images/properties/modern_house_garden.png"
    },
    {
        id: 3,
        title: "Lakeside Cottage",
        location: "789 Maple Lane, Delhi, 110001",
        price: "₹ 5,40,00,000",
        beds: 3,
        baths: 1,
        sqft: "950",
        status: "Buy",
        image: "/images/properties/luxury_apartment_balcony.png"
    },
    {
        id: 4,
        title: "Ocean Breeze Villa",
        location: "Kopar Khairane Navi Mumbai, Maharashtra",
        price: "₹ 55,000K",
        beds: 4,
        baths: 2,
        sqft: "1200",
        status: "For Rent",
        image: "/images/properties/modern_villa_ocean.png"
    },
    {
        id: 5,
        title: "Jakson House",
        location: "456 Oak Avenue, Mumbai, 400001",
        price: "₹ 7,50,00,000",
        beds: 3,
        baths: 2,
        sqft: "1850",
        status: "For Sale",
        image: "/images/properties/modern_house_garden.png"
    },
    {
        id: 6,
        title: "Lakeside Cottage",
        location: "789 Maple Lane, Delhi, 110001",
        price: "₹ 5,40,00,000",
        beds: 3,
        baths: 1,
        sqft: "950",
        status: "Buy",
        image: "/images/properties/luxury_apartment_balcony.png"
    },
];

const MostViewed = () => {
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollAmount = scrollContainer.scrollLeft;
        const speed = 0.5; // Adjust speed
        let animationFrameId;

        const animateScroll = () => {
            if (scrollContainer && !isPaused) {
                scrollAmount += speed;
                // If scrolled past half (assuming duplicates), reset
                if (scrollAmount >= scrollContainer.scrollWidth / 2) {
                    scrollAmount = 0;
                }
                scrollContainer.scrollLeft = scrollAmount;
                animationFrameId = requestAnimationFrame(animateScroll);
            } else if (isPaused) {
                scrollAmount = scrollContainer.scrollLeft;
                animationFrameId = requestAnimationFrame(animateScroll);
            }
        };

        animationFrameId = requestAnimationFrame(animateScroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
    };

    return (
        <section className="most-viewed-section" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <div className="mv-header-row">
                <div className="mv-header-text">
                    <h4>Featured Listings</h4>
                    <h2>Exclusive Property Highlight</h2>
                </div>

                <div className="mv-controls">
                    <Link href="/properties" className="view-all-btn">
                        View All Properties
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Link>
                    <div className="mv-nav-buttons">
                        <button className="nav-btn prev-btn" onClick={scrollLeft} aria-label="Scroll Left">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <button className="nav-btn next-btn" onClick={scrollRight} aria-label="Scroll Right">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mv-carousel-container" ref={scrollRef}>
                <div className="mv-track">
                    {[...properties, ...properties].map((property, index) => (
                        <div className="mv-card" key={`${property.id}-${index}`}>
                            <div className="mv-image-wrapper">
                                <Image
                                    src={property.image}
                                    alt={property.title}
                                    width={400}
                                    height={300}
                                    className="mv-card-image"
                                />
                                <div className={`property-tag ${property.status.toLowerCase().replace(' ', '-')}`}>
                                    {property.status}
                                </div>
                            </div>
                            <div className="mv-card-details">
                                <div className="mv-location">
                                    {property.location}
                                </div>
                                <div className="mv-amenities">
                                    <span className="amenity-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M15 3h6v18h-6M10 21V3M3 21h6V3H3"></path>
                                        </svg>
                                        {property.sqft} sq ft
                                    </span>
                                    <span className="amenity-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path>
                                        </svg>
                                        {property.beds} Beds
                                    </span>
                                    <span className="amenity-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"></path><path d="M7 13V5a3 3 0 0 1 6 0v8"></path>
                                        </svg>
                                        {property.baths} Bath
                                    </span>
                                </div>
                                <h3 className="mv-title">{property.title}</h3>
                                <p className="mv-price">{property.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MostViewed;
