import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const UserContext = createContext();

// Custom hook to use the user context
export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context;
};

// Provider Component
export const UserProvider = ({ children }) => {
    // Initialize state from localStorage or default to Admin user
    // Initialize state with default values
    const [users, setUsers] = useState([{
        id: 1,
        name: 'Admin User',
        email: 'admin@pickyourhouse.com',
        role: 'Admin',
        status: 'Active',
        password: 'admin123',
        joined: new Date().toISOString().split('T')[0]
    }]);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const savedUsers = localStorage.getItem('users');
            if (savedUsers) {
                const parsedUsers = JSON.parse(savedUsers);
                if (Array.isArray(parsedUsers)) {
                    // Migration: Ensure users have passwords
                    const migratedUsers = parsedUsers.map(user => {
                        if (user.email === 'admin@pickyourhouse.com' && !user.password) {
                            return { ...user, password: 'admin123' };
                        }
                        if (!user.password) {
                            return { ...user, password: '123456' };
                        }
                        return user;
                    });
                    setUsers(migratedUsers);
                }
            }
        } catch (error) {
            console.error('Error parsing users from localStorage:', error);
        }
    }, []);

    // Update localStorage whenever users state changes
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    // Add new user
    const addUser = (userData) => {
        const newUser = {
            id: Date.now(), // Use timestamp for unique ID
            name: userData.name,
            email: userData.email,
            role: userData.role || 'Editor',
            status: userData.status || 'Active',
            password: userData.password || '123456',
            joined: new Date().toISOString().split('T')[0]
        };

        setUsers(prevUsers => [...prevUsers, newUser]);
        return newUser;
    };

    // Delete user
    const deleteUser = (id) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    };

    // Update user
    const updateUser = (id, updatedData) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === id ? { ...user, ...updatedData } : user
            )
        );
    };

    const value = {
        users,
        addUser,
        deleteUser,
        updateUser
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
