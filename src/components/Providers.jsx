"use client";

import React from 'react';
import { ContactProvider } from '../context/ContactContext';
import { UserProvider } from '../context/UserContext';
import { PropertyProvider } from '../context/PropertyContext';
import { BlogProvider } from '../context/BlogContext';

export default function Providers({ children }) {
    return (
        <ContactProvider>
            <UserProvider>
                <PropertyProvider>
                    <BlogProvider>
                        {children}
                    </BlogProvider>
                </PropertyProvider>
            </UserProvider>
        </ContactProvider>
    );
}
