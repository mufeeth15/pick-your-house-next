"use client";

import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I search for properties on PickYourHouse?",
            answer: "You can search for properties by using the search bar at the top of the homepage. You can filter your results by location, price range, property type, and more."
        },
        {
            question: "Are the listings verified?",
            answer: "Yes, we employ a rigorous verification process for all property listings, ensuring the information provided is accurate and up-to-date."
        },
        {
            question: "Do you provide loan assistance?",
            answer: "We offer dedicated assistance and connect you with trusted financial partners to help you secure the best home loan options available."
        }
    ];

    return (
        <section className="faq-section">
            <div className="faq-container">
                <h1>Frequently asked questions</h1>

                <div className="faq-group-header">
                    <div className="faq-icon">
                        <span style={{ color: '#e30421', fontSize: '24px' }}>&#x1F46A;</span>
                        <span style={{ color: '#e30421', fontSize: '10px', verticalAlign: 'top' }}>$</span>
                    </div>
                    <h2>For Buyers</h2>
                </div>

                {faqs.map((faq, index) => (
                    <div className="faq-item" key={index}>
                        <button
                            className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <span className="toggle-icon">+</span>
                        </button>
                        <div
                            className={`faq-answer-container ${activeIndex === index ? 'show' : ''}`}
                            style={{ maxHeight: activeIndex === index ? '200px' : '0' }} // Simple approximation, or use scrollHeight ref
                        >
                            <p className="faq-answer">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default FAQ;
