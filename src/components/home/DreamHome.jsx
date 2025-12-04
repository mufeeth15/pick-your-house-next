import React from 'react';

const DreamHome = () => {
    return (
        <section className="dream-home-section">
            <div className="trust-score-box">
                <div className="score">4.9</div>
                <div className="stars">★★★★★</div>
                <p>Trust score</p>
            </div>
            <div className="text-content">
                <h2>With us help you find your dream home</h2>
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="number">20+</span>
                        <p>Turning dreams into address</p>
                    </div>
                    <div className="stat-item">
                        <span className="number">168+</span>
                        <p>Every home tells a story</p>
                    </div>
                    <div className="stat-item">
                        <span className="number">10+</span>
                        <p>Real estate success</p>
                    </div>
                </div>
            </div>
            <div className="image-hover-box">
                <img src="/1183405_20-350x350.jpg" alt="Parkside residential" />
                <div className="image-overlay">Parkside residential</div>
            </div>
        </section>
    );
};

export default DreamHome;
