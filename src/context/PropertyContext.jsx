import React, { createContext, useContext, useState } from 'react';

// Create Context
const PropertyContext = createContext();

// Custom hook to use the property context
export const useProperties = () => {
    const context = useContext(PropertyContext);
    if (!context) {
        throw new Error('useProperties must be used within a PropertyProvider');
    }
    return context;
};

// Provider Component
export const PropertyProvider = ({ children }) => {
    // Default properties data
    const defaultProperties = [
        {
            id: 1,
            category: 'flat-sale',
            title: '2 BHK New Launch Project for Sale',
            location: 'Thane West, Mumbai',
            price: '₹ 95 Lakh',
            description: 'Under construction property with excellent return on investment potential. 900 Sq.Ft.',
            badge: 'Direct Builder',
            status: 'Active',
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        },
        {
            id: 2,
            category: 'flat-sale',
            title: '3 BHK Ready to Move Flat for Sale',
            location: 'Powai, Mumbai',
            price: '₹ 2.5 Crore',
            description: 'Luxury amenities and prime location. Near IIT Bombay. Contact for viewing. 1650 Sq.Ft.',
            badge: 'Negotiable Price',
            status: 'Active',
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        },
        {
            id: 3,
            category: 'commercial',
            title: '3BHK Flat Furnished Flat',
            location: 'Nariman Point, Mumbai',
            price: '₹ 1,50,000 / month',
            description: 'Premium office space, high foot traffic area. Excellent connectivity. 2000 Sq.Ft.',
            badge: 'Direct Owner Listing',
            status: 'Active',
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        },
        {
            id: 4,
            category: 'flat-rent',
            title: '1 RK Compact Flat for Rent',
            location: 'Andheri East, Mumbai',
            price: '₹ 18,000 / month',
            description: 'Ideal for bachelors or small family. Close to metro station. Low maintenance. 500 Sq.Ft.',
            badge: 'Brokerage Applicable',
            status: 'Active',
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        },
        {
            id: 5,
            category: 'flat-rent',
            title: '4 BHK Sea-View Penthouse for Rent',
            location: 'Malabar Hill, Mumbai',
            price: '₹ 1,50,000 / month',
            description: 'Stunning panoramic sea view. Ultra-luxury living. Private terrace included. 3500 Sq.Ft.',
            badge: 'Brokerage Applicable',
            status: 'Active',
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        },
        {
            id: 6,
            category: 'flat-sale',
            title: '2 BHK New Launch Project for Sale',
            location: 'Thane West, Mumbai',
            price: '₹ 95 Lakh',
            description: 'Under construction property with excellent return on investment potential. 900 Sq.Ft.',
            badge: 'Direct Builder',
            status: 'Pending',
            date: new Date(Date.now() - 86400000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        },
        {
            id: 7,
            category: 'flat-rent',
            title: '2 BHK Furnished Flat for Rent',
            location: 'Bandra West, Mumbai',
            price: '₹ 65,000 / month',
            description: 'Fully furnished flat in prime location. Modern amenities and 24/7 security. 1100 Sq.Ft.',
            badge: 'Zero Brokerage',
            status: 'Active',
            date: new Date(Date.now() - 172800000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        },
        {
            id: 8,
            category: 'commercial',
            title: 'Commercial Office Space',
            location: 'BKC, Mumbai',
            price: '₹ 2,00,000 / month',
            description: 'Premium office space in business district. High-speed internet and parking. 2500 Sq.Ft.',
            badge: 'Direct Owner',
            status: 'Active',
            date: new Date(Date.now() - 259200000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        },
        {
            id: 9,
            category: 'flat-sale',
            title: '4 BHK Luxury Villa for Sale',
            location: 'Juhu, Mumbai',
            price: '₹ 5 Crore',
            description: 'Luxurious villa with private pool and garden. Premium location near beach. 3000 Sq.Ft.',
            badge: 'Premium Property',
            status: 'Active',
            date: new Date(Date.now() - 345600000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        }
    ];

    // Initialize state with default data
    const [properties, setProperties] = useState(defaultProperties);

    // Load from localStorage on mount
    React.useEffect(() => {
        try {
            const savedProperties = localStorage.getItem('properties');
            if (savedProperties) {
                setProperties(JSON.parse(savedProperties));
            }
        } catch (error) {
            console.error('Error loading properties from localStorage:', error);
        }
    }, []);

    // Save to localStorage whenever properties change
    React.useEffect(() => {
        localStorage.setItem('properties', JSON.stringify(properties));
    }, [properties]);

    // Add new property
    const addProperty = (propertyData) => {
        const newProperty = {
            id: properties.length + 1,
            ...propertyData,
            status: 'Active',
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        };

        setProperties(prevProperties => [newProperty, ...prevProperties]);
        return newProperty;
    };

    // Delete property
    const deleteProperty = (id) => {
        setProperties(prevProperties => prevProperties.filter(property => property.id !== id));
    };

    // Update property
    const updateProperty = (id, updatedData) => {
        setProperties(prevProperties =>
            prevProperties.map(property =>
                property.id === id ? { ...property, ...updatedData } : property
            )
        );
    };

    // Update property status
    const updatePropertyStatus = (id, status) => {
        setProperties(prevProperties =>
            prevProperties.map(property =>
                property.id === id ? { ...property, status } : property
            )
        );
    };

    const value = {
        properties,
        addProperty,
        deleteProperty,
        updateProperty,
        updatePropertyStatus
    };

    return (
        <PropertyContext.Provider value={value}>
            {children}
        </PropertyContext.Provider>
    );
};
