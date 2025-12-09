"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/admin-login.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Check if already authenticated
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (isAuthenticated) {
            router.replace('/admin');
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setIsLoading(false);
                setError(data.message || "Login failed");
                return;
            }

            // Successful login
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('lastLogin', new Date().toLocaleString());
            router.push('/admin');

        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="login-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="login-card">
                <div className="login-header">
                    <h2>Admin Login</h2>
                    <p>Please enter your credentials to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="error-message">
                            <span className="error-icon">
                                <i className="las la-exclamation-triangle"></i>
                            </span>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <i className="las la-user"></i>
                            </span>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <i className="las la-lock"></i>
                            </span>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="form-input"
                            />
                        </div>
                    </div>

                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Logging in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
