"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check authentication status (e.g., from localStorage)
        const auth = localStorage.getItem('isAuthenticated') === 'true';

        if (!auth) {
            // Redirect to login if not authenticated
            router.push(`/admin/login?from=${encodeURIComponent(pathname)}`);
        } else {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, [router, pathname]);

    if (loading) {
        return null; // Or return a loading spinner
    }

    if (!isAuthenticated) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
