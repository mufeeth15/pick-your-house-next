"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/admin-dashboard.css';
import '@/styles/admin-dashboard-chart.css';
import '@/styles/admin-dashboard-mobile.css';
import '@/styles/admin-dashboard-modals.css';
import '@/styles/admin-dashboard-dropdowns.css';

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminProperties from '@/components/admin/AdminProperties';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminContacts from '@/components/admin/AdminContacts';
import AdminBlogs from '@/components/admin/AdminBlogs';
import AdminSettings from '@/components/admin/AdminSettings';

const AdminDashboard = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    // Initialize with a dummy user to bypass auth requirement for rendering
    const [currentUser, setCurrentUser] = useState({ name: 'Start Admin' });
    // Initialize loading to false to render immediately
    const [isLoading, setIsLoading] = useState(false);

    // Settings State
    const [generalSettings, setGeneralSettings] = useState({
        siteName: 'Pick Your House',
        contactEmail: 'admin@pickyourhouse.com',
        currency: '$',
        notifications: {
            email: true,
            newUsers: true,
            updates: false,
            comments: true
        }
    });
    const [isEditingNotifications, setIsEditingNotifications] = useState(false);
    const [isEditingGeneral, setIsEditingGeneral] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, icon: 'las la-home', color: 'bg-primary', text: 'New property listed: <strong>Modern Villa</strong>', time: '2 mins ago', unread: true },
        { id: 2, icon: 'las la-user-plus', color: 'bg-success', text: 'New user registered: <strong>John Doe</strong>', time: '1 hour ago', unread: true }
    ]);
    const profileRef = useRef(null);
    const notificationRef = useRef(null);

    // Restored UI interaction logic
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    useEffect(() => {
        const checkAuth = () => {
            const auth = localStorage.getItem('isAuthenticated');
            const user = JSON.parse(localStorage.getItem('currentUser'));

            if (auth !== 'true' || !user) {
                router.push('/admin/login');
            } else {
                setCurrentUser(user);
                setIsLoading(false);
            }
        };
        checkAuth();

        // Load settings
        const savedSettings = localStorage.getItem('adminSettings');
        if (savedSettings) {
            setGeneralSettings(JSON.parse(savedSettings));
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        router.push('/admin/login');
        console.log('Logout');
    };

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
                <p>Loading Dashboard...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-container">
            <AdminSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isMobileSidebarOpen={isMobileSidebarOpen}
                setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                handleLogout={handleLogout}
                siteName={generalSettings.siteName}
            />

            <div className="admin-content">
                <header className="admin-header">
                    <div className="header-left">
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMobileSidebarOpen(true)}
                        >
                            <i className="las la-bars"></i>
                        </button>
                        <div>
                            {/* <h1>Welcome back, {currentUser.name.split(' ')[0]}!</h1> */}
                            <p>Here's what's happening with your properties today.</p>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="notification-wrapper" ref={notificationRef} style={{ position: 'relative' }}>
                            <button
                                className="notification-btn"
                                onClick={() => setShowNotifications(!showNotifications)}
                            >
                                <i className="las la-bell"></i>
                                {notifications.some(n => n.unread) && <span className="notification-badge">{notifications.filter(n => n.unread).length}</span>}
                            </button>
                            {showNotifications && (
                                <div className="dropdown-menu notifications-dropdown">
                                    <div className="dropdown-header">
                                        <h3>Notifications</h3>
                                        <button className="mark-read" onClick={markAllAsRead}>Mark all as read</button>
                                    </div>
                                    <div className="dropdown-content">
                                        {notifications.map(notification => (
                                            <div key={notification.id} className={`notification-item ${notification.unread ? 'unread' : ''}`}>
                                                <div className={`notification-icon ${notification.color}`}>
                                                    <i className={notification.icon}></i>
                                                </div>
                                                <div className="notification-info">
                                                    <p dangerouslySetInnerHTML={{ __html: notification.text }}></p>
                                                    <span>{notification.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                        {notifications.length === 0 && (
                                            <div className="notification-item">
                                                <p>No notifications</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="profile-wrapper" ref={profileRef} style={{ position: 'relative' }}>
                            <div
                                className="admin-profile"
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                style={{ padding: 0, background: 'none', border: 'none' }}
                            >
                                <img
                                    src={`https://ui-avatars.com/api/?name=${currentUser.name}&background=ffd700&color=fff`}
                                    alt="Admin"
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}
                                />
                            </div>
                            {showProfileMenu && (
                                <div className="dropdown-menu profile-dropdown" style={{ width: '200px' }}>
                                    <ul className="profile-menu">
                                        <li onClick={handleLogout} className="text-danger">
                                            <i className="las la-sign-out-alt"></i> Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="admin-main-content">
                    {activeTab === 'overview' && <AdminOverview />}
                    {activeTab === 'properties' && <AdminProperties />}
                    {activeTab === 'users' && <AdminUsers currentUser={currentUser} />}
                    {activeTab === 'contacts' && <AdminContacts />}
                    {activeTab === 'blogs' && <AdminBlogs currentUser={currentUser} />}
                    {activeTab === 'settings' && (
                        <AdminSettings
                            generalSettings={generalSettings}
                            setGeneralSettings={setGeneralSettings}
                            isEditingNotifications={isEditingNotifications}
                            setIsEditingNotifications={setIsEditingNotifications}
                            isEditingGeneral={isEditingGeneral}
                            setIsEditingGeneral={setIsEditingGeneral}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
