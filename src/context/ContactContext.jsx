import React, { createContext, useContext, useState } from 'react';

// Create Context
const ContactContext = createContext();

// Custom hook to use the contact context
export const useContacts = () => {
    const context = useContext(ContactContext);
    if (!context) {
        throw new Error('useContacts must be used within a ContactProvider');
    }
    return context;
};

// Provider Component
export const ContactProvider = ({ children }) => {
    const defaultContacts = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1 234 567 8900',
            subject: 'Property Inquiry',
            message: 'Interested in 2BHK flat',
            service: '2BHK Flat',
            date: new Date().toISOString().split('T')[0],
            status: 'New'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+1 234 567 8901',
            subject: 'Viewing Request',
            message: 'Want to schedule a viewing',
            service: '3BHK Flat',
            date: new Date().toISOString().split('T')[0],
            status: 'New'
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike@example.com',
            phone: '+1 234 567 8902',
            subject: 'General Question',
            message: 'Questions about pricing',
            service: '1BHK Flat',
            date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            status: 'New'
        },
        {
            id: 4,
            name: 'Sarah Williams',
            email: 'sarah@example.com',
            phone: '+1 234 567 8903',
            subject: 'Investment Inquiry',
            message: 'Looking for investment opportunities',
            service: 'Other',
            date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            status: 'New'
        }
    ];

    const [contacts, setContacts] = useState(defaultContacts);

    // Load from localStorage on mount
    React.useEffect(() => {
        try {
            const savedContacts = localStorage.getItem('contacts');
            if (savedContacts) {
                setContacts(JSON.parse(savedContacts));
            }
        } catch (error) {
            console.error('Error loading contacts from localStorage:', error);
        }
    }, []);

    // Save to localStorage whenever contacts change
    React.useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    // Add new contact
    const addContact = (contactData) => {
        const newContact = {
            id: contacts.length + 1,
            name: `${contactData.firstName} ${contactData.lastName}`,
            email: contactData.email,
            phone: contactData.phone,
            subject: 'Property Inquiry',
            message: contactData.message,
            service: getServiceLabel(contactData.service),
            date: new Date().toISOString().split('T')[0],
            status: 'New'
        };

        setContacts(prevContacts => [newContact, ...prevContacts]);
        return newContact;
    };

    // Helper function to convert service value to label
    const getServiceLabel = (service) => {
        const serviceMap = {
            'web-design': '1BHK Flat',
            'web-development': '2BHK Flat',
            'logo-design': '3BHK Flat',
            'other': 'Other'
        };
        return serviceMap[service] || service;
    };

    // Delete contact
    const deleteContact = (id) => {
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    };

    // Update contact status
    const updateContactStatus = (id, status) => {
        setContacts(prevContacts =>
            prevContacts.map(contact =>
                contact.id === id ? { ...contact, status } : contact
            )
        );
    };

    const value = {
        contacts,
        addContact,
        deleteContact,
        updateContactStatus
    };

    return (
        <ContactContext.Provider value={value}>
            {children}
        </ContactContext.Provider>
    );
};
