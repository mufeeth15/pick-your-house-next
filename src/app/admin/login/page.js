"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import { useUsers } from '@/context/UserContext';
import '@/styles/admin-login.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const router = useRouter();
    const form = useRef();
    const { users } = useUsers();

    // Clear form fields when component mounts (after logout)
    // Check if already authenticated
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (isAuthenticated) {
            router.replace('/admin');
        }

        // Clear form fields
        setEmail('');
        setPassword('');
        setError('');
        setSuccessMessage('');
    }, [router]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Find user with matching email and password
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            if (user.status !== 'Active') {
                setTimeout(() => {
                    setIsLoading(false);
                    setError('Your account is inactive. Please contact administrator.');
                }, 1000);
                return;
            }

            setTimeout(() => {
                setIsLoading(false);
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('lastLogin', new Date().toLocaleString());
                router.push('/admin');
            }, 1000);
        } else {
            setTimeout(() => {
                setIsLoading(false);
                setError('Invalid email or password');
            }, 1000);
        }
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsLoading(true);

        if (!email) {
            setError('Please enter your email address.');
            setIsLoading(false);
            return;
        }

        // EmailJS Configuration
        // EmailJS Configuration
        const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
        const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
        const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

        // Template parameters matches the variables in your EmailJS template
        const templateParams = {
            to_email: email,
            message: 'Click here to reset your password: http://localhost:5173/reset-password', // Example link
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                setSuccessMessage('Password reset link has been sent to your email.');
                setIsLoading(false);
            }, (error) => {
                console.log(error.text);
                // Fallback for demo purposes if keys aren't set
                if (SERVICE_ID === 'YOUR_SERVICE_ID') {
                    setSuccessMessage('Simulation: Password reset link sent (Configure EmailJS for real emails).');
                } else {
                    setError('Failed to send email. Please try again later.');
                }
                setIsLoading(false);
            });
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
                    <h2>{showForgotPassword ? 'Reset Password' : 'Admin Login'}</h2>
                    <p>{showForgotPassword ? 'Enter your email to receive a reset link.' : 'Welcome back! Please login to your account.'}</p>
                </div>

                {!showForgotPassword ? (
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
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <i className="las la-envelope"></i>
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email"
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

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <button
                                type="button"
                                className="forgot-password"
                                onClick={() => {
                                    setShowForgotPassword(true);
                                    setError('');
                                    setSuccessMessage('');
                                }}
                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button type="submit" className="login-button" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    Logging in...
                                </>
                            ) : (
                                'Login to Dashboard'
                            )}
                        </button>
                    </form>
                ) : (
                    <form ref={form} onSubmit={handleForgotPasswordSubmit} className="login-form">
                        {error && (
                            <div className="error-message">
                                <span className="error-icon">
                                    <i className="las la-exclamation-triangle"></i>
                                </span>
                                {error}
                            </div>
                        )}
                        {successMessage && (
                            <div className="success-message" style={{
                                background: '#d1fae5',
                                color: '#065f46',
                                padding: '1rem 1.25rem',
                                borderRadius: '12px',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                fontSize: '0.95rem',
                                fontWeight: '500'
                            }}>
                                <span className="success-icon">
                                    <i className="las la-check-circle"></i>
                                </span>
                                {successMessage}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="reset-email">Email Address</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <i className="las la-envelope"></i>
                                </span>
                                <input
                                    type="email"
                                    name="to_email"
                                    id="reset-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email"
                                    required
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <button type="submit" className="login-button" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    Sending Link...
                                </>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForgotPassword(false);
                                    setError('');
                                    setSuccessMessage('');
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#6b7280',
                                    cursor: 'pointer',
                                    fontSize: '0.95rem',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    margin: '0 auto'
                                }}
                            >
                                <i className="las la-arrow-left"></i> Back to Login
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
