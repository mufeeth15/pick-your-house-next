"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchFilter = () => {
    const [activeTab, setActiveTab] = useState('flat-sale');
    const router = useRouter();

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const params = new URLSearchParams();

        const keywords = formData.get('keywords');
        const propertyType = formData.get('property-type');
        const location = formData.get('neighbourhood');

        if (keywords) params.append('keywords', keywords);
        // Use activeTab for the type filter
        params.append('type', activeTab);
        if (location) params.append('location', location);

        router.push(`/services?${params.toString()}`);
    };

    return (
        <section className="search-filter-section">
            <div className="search-tabs">
                <button
                    className={`tab-btn ${activeTab === 'flat-sale' ? 'active' : ''}`}
                    onClick={() => handleTabClick('flat-sale')}
                >
                    Buy a property
                </button>
                <button
                    className={`tab-btn ${activeTab === 'commercial' ? 'active' : ''}`}
                    onClick={() => handleTabClick('commercial')}
                >
                    Sell a property
                </button>
                <button
                    className={`tab-btn ${activeTab === 'flat-rent' ? 'active' : ''}`}
                    onClick={() => handleTabClick('flat-rent')}
                >
                    Rent a property
                </button>
            </div>
            <div className="search-form-container">
                <form id="property-search-form" onSubmit={handleSubmit}>
                    <div className="search-input-group">
                        <input type="text" name="keywords" placeholder="Enter Keywords" />
                    </div>

                    <div className="search-input-group">
                        <select name="neighbourhood">
                            <option value="">Location</option>
                            <option value="vashi">Vashi</option>
                            <option value="ghansoli">Ghansoli</option>
                            <option value="kopar_khairane">Kopar Khairane</option>
                        </select>
                    </div>
                    <button type="submit" className="search-btn">
                        <i className="fas fa-search"></i> Search
                    </button>
                </form>
            </div>
            <div id="search-results-container"></div>
        </section>
    );
};

export default SearchFilter;
