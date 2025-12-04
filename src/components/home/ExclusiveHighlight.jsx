import React from 'react';
import Link from 'next/link';

const ExclusiveHighlight = () => {
    return (
        <section className="exclusive-highlight-section">
            <div className="section-header">
                <h2>Exclusive Property Highlight</h2>
            </div>
            <div className="highlight-content">
                <div className="highlight-card-wrapper" id="highlight-wrapper">
                    <div className="highlight-card for-rent">
                        <div className="card-image-box">
                            <img src="/1183405_20-350x350.jpg" alt="Exclusive 3 BHK" />
                            <span className="feature-tag">FEATURED</span>
                            <span className="type-tag">For Rent</span>
                        </div>
                        <div className="card-text">
                            <h3>3 BHK Row</h3>
                            <p className="location">Kopar Khairane, Navi Mumbai, Maharashtra</p>
                            <p className="description">Discover the perfect blend of comfort and elegance with this spacious 3 BHK row house. Wake up to...</p>
                            <div className="highlight-details">
                                <div><i className="fas fa-bed"></i> Bedrooms 4</div>
                                <div><i className="fas fa-bath"></i> Bathrooms 3</div>
                                <div><i className="fas fa-ruler-combined"></i> Living Area 500SqFt</div>
                            </div>
                            <div className="card-footer">
                                <span className="price">₹55,000K/-</span>
                                <Link href="/services" className="view-details-2">View Details</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExclusiveHighlight;
