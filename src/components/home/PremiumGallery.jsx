"use client";

import React, { useState, useEffect, useRef } from 'react';
import './PremiumGallery.css';

const houseData = [
    {
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
        title: "Experience the Epitome of Refinement",
        desc: "Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum.",
        stats: ["4", "4", "950"],
        tag: "Contemporary Living"
    },
    {
        img: "https://images.unsplash.com/photo-1600596542815-22b48533b418?q=80&w=1000&auto=format&fit=crop",
        title: "Modern Architecture Nature Views",
        desc: "Discover a home that blends seamlessly with the surrounding landscape.",
        stats: ["5", "3", "1,200"],
        tag: "Nature & Design"
    },
    {
        img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
        title: "Classic Estate with Private Pool",
        desc: "A timeless masterpiece offering privacy and luxury with resort-style backyard.",
        stats: ["6", "5", "2,500"],
        tag: "Luxury Estate"
    },
    {
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
        title: "Urban Villa with Smart Features",
        desc: "State-of-the-art technology meets comfort. Fully automated.",
        stats: ["3", "2", "850"],
        tag: "Smart Home"
    },
    {
        img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1000&auto=format&fit=crop",
        title: "Secluded Minimalist Retreat",
        desc: "Escape to this architectural gem hidden in the hills.",
        stats: ["2", "2", "600"],
        tag: "Minimalist"
    },
    {
        img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
        title: "Grand Colonial Mansion",
        desc: "Historic charm meets modern luxury in this expansive estate.",
        stats: ["8", "7", "4,000"],
        tag: "Historic Charm"
    },
];

const PremiumGallery = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const timerRef = useRef(null);

    useEffect(() => {
        startAutoPlay();
        return () => clearInterval(timerRef.current);
    }, []);

    const startAutoPlay = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            handleAutoChange();
        }, 5000);
    };

    const handleAutoChange = () => {
        setActiveIndex(prev => {
            const next = prev + 1 >= houseData.length ? 0 : prev + 1;
            return prev;
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating) {
                changeSlide(activeIndex + 1);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex, isAnimating]);


    const changeSlide = (newIndex) => {
        if (isAnimating) return;

        let index = newIndex;
        if (index < 0) index = houseData.length - 1;
        if (index >= houseData.length) index = 0;

        setIsAnimating(true);

        setTimeout(() => {
            setActiveIndex(index);
            setIsAnimating(false);

        }, 400);
    };

    const manualChange = (direction) => {
        changeSlide(activeIndex + direction);
    };

    const handleThumbClick = (index) => {
        if (index !== activeIndex) {
            changeSlide(index);
        }
    };

    const data = houseData[activeIndex];

    const viewportRef = useRef(null);
    const itemWidth = 95;
    let translateX = -(activeIndex * itemWidth);

    return (
        <section className="premium-gallery-section">
            <div className="pg-section-header">
                <h4 className="sub-heading-1">Featured Listings</h4>
                <h2 className="heading-2">Property Highlight</h2>
            </div>
            <div className="pg-container">
                <div className="pg-image-display">
                    <img
                        src={data.img}
                        alt={data.title}
                        className={`pg-main-img ${isAnimating ? 'fade-out' : ''}`}
                    />
                </div>

                <div className="pg-content-section">
                    <div className={`pg-text-wrapper ${isAnimating ? 'slide-out' : ''}`}>
                        <div className="pg-tag">{data.tag || "Premium Property"}</div>
                        <h2>{data.title}</h2>
                        <p className="pg-description">{data.desc}</p>

                        <div className="pg-stats-row">
                            <div className="pg-stat-item">
                                <div className="pg-stat-icon pg-draw-anim" key={`bed-${activeIndex}`}>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"></path>
                                        <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"></path>
                                        <path d="M12 4v6"></path>
                                    </svg>
                                </div>
                                <div className="pg-stat-text">
                                    <h4>{data.stats[0]}</h4>
                                    <span>Bedrooms</span>
                                </div>
                            </div>
                            <div className="pg-stat-item">
                                <div className="pg-stat-icon pg-draw-anim" key={`bath-${activeIndex}`}>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1Z"></path>
                                        <path d="M6 12V7a2 2 0 0 1 2-2h3"></path>
                                    </svg>
                                </div>
                                <div className="pg-stat-text">
                                    <h4>{data.stats[1]}</h4>
                                    <span>Bathrooms</span>
                                </div>
                            </div>
                            <div className="pg-stat-item">
                                <div className="pg-stat-icon pg-draw-anim" key={`area-${activeIndex}`}>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M3 3v18h18"></path>
                                        <path d="M18.4 5.6 5.6 18.4"></path>
                                    </svg>
                                </div>
                                <div className="pg-stat-text">
                                    <h4>{data.stats[2]}</h4>
                                    <span>sqft</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pg-carousel-container">
                        <button className="pg-nav-btn prev-btn" onClick={() => manualChange(-1)}>
                            &#10094;
                        </button>
                        <div className="pg-carousel-viewport" ref={viewportRef}>
                            <div
                                className="pg-carousel-track"
                                style={{ transform: `translateX(${translateX}px)` }}
                            >
                                {houseData.map((house, index) => (
                                    <div
                                        key={index}
                                        className={`pg-thumb ${index === activeIndex ? 'active' : ''}`}
                                        onClick={() => handleThumbClick(index)}
                                    >
                                        <img src={house.img} alt={`House ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="pg-nav-btn next-btn" onClick={() => manualChange(1)}>
                            &#10095;
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PremiumGallery;
