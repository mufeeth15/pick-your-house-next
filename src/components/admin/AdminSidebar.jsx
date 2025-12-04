"use client";

import React from 'react';

const AdminSidebar = ({
    activeTab,
    setActiveTab,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    handleLogout,
    siteName
}) => {
    return (
        <>
            {isMobileSidebarOpen && (
                <div
                    className="mobile-sidebar-overlay"
                    onClick={() => setIsMobileSidebarOpen(false)}
                ></div>
            )}

            <aside className={`admin-sidebar ${isMobileSidebarOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-header">
                    <h1>{siteName}</h1>
                    <div className="active-status">
                        <span className="status-dot"></span>
                        Active
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <button
                        className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('overview'); setIsMobileSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><i className="las la-chart-bar"></i></span>
                        Dashboard
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'properties' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('properties'); setIsMobileSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><i className="las la-home"></i></span>
                        Properties
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('users'); setIsMobileSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><i className="las la-users"></i></span>
                        Users
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'contacts' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('contacts'); setIsMobileSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><i className="las la-envelope"></i></span>
                        Contact Forms
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('blogs'); setIsMobileSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><i className="las la-edit"></i></span>
                        Blogs
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('settings'); setIsMobileSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><i className="las la-cog"></i></span>
                        Settings
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button className="nav-item logout-btn" onClick={handleLogout}>
                        <span className="nav-icon"><i className="las la-sign-out-alt"></i></span>
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
