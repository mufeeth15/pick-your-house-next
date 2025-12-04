"use client";

import React from 'react';
import { useUsers } from '@/context/UserContext';
import { useProperties } from '@/context/PropertyContext';
import { useContacts } from '@/context/ContactContext';
import { useBlogs } from '@/context/BlogContext';

const AdminOverview = () => {
    const { users } = useUsers();
    const { properties } = useProperties();
    const { contacts } = useContacts();
    const { blogs } = useBlogs();

    const stats = {
        totalProperties: properties.length,
        activeListings: properties.filter(p => p.status === 'Active').length,
        soldProperties: properties.filter(p => p.status === 'Sold').length,
        totalUsers: users.length,
        newUsers: 156,
        contactForms: contacts.length,
        totalBlogs: blogs.length,
    };

    return (
        <div className="admin-overview">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
                <div className="stat-card stat-primary">
                    <div className="stat-icon"><i className="las la-home"></i></div>
                    <div className="stat-content">
                        <h3>{stats.totalProperties}</h3>
                        <p>Total Properties</p>
                    </div>
                </div>
                <div className="stat-card stat-success">
                    <div className="stat-icon"><i className="las la-newspaper"></i></div>
                    <div className="stat-content">
                        <h3>{stats.totalBlogs}</h3>
                        <p>Total Blogs</p>
                    </div>
                </div>
                <div className="stat-card stat-warning">
                    <div className="stat-icon"><i className="las la-users"></i></div>
                    <div className="stat-content">
                        <h3>{stats.totalUsers}</h3>
                        <p>Total Users</p>
                    </div>
                </div>
            </div>
            <div className="dashboard-charts">
                <div className="chart-container">
                    <div className="chart-header">
                        <h3>Activity</h3>
                        <div className="chart-legend">
                            <div className="legend-item">
                                <span className="dot in-progress"></span>
                                <span>In Progress</span>
                            </div>
                            <div className="legend-item">
                                <span className="dot complete"></span>
                                <span>Complete</span>
                            </div>
                        </div>
                    </div>
                    <div className="bar-chart">
                        <div className="y-axis">
                            <span>50</span>
                            <span>40</span>
                            <span>30</span>
                            <span>20</span>
                            <span>10</span>
                            <span>0</span>
                        </div>
                        <div className="chart-grid">
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="bars-area">
                                <div className="bar-group">
                                    <div className="bars">
                                        <div className="bar in-progress" style={{ height: '78%' }} data-value="39"></div>
                                        <div className="bar complete" style={{ height: '58%' }} data-value="29"></div>
                                    </div>
                                    <span className="x-label">Jan</span>
                                </div>
                                <div className="bar-group">
                                    <div className="bars">
                                        <div className="bar in-progress" style={{ height: '54%' }} data-value="27"></div>
                                        <div className="bar complete" style={{ height: '38%' }} data-value="19"></div>
                                    </div>
                                    <span className="x-label">Feb</span>
                                </div>
                                <div className="bar-group">
                                    <div className="bars">
                                        <div className="bar in-progress" style={{ height: '92%' }} data-value="46"></div>
                                        <div className="bar complete" style={{ height: '72%' }} data-value="36"></div>
                                    </div>
                                    <span className="x-label">Mar</span>
                                </div>
                                <div className="bar-group">
                                    <div className="bars">
                                        <div className="bar in-progress" style={{ height: '42%' }} data-value="21"></div>
                                        <div className="bar complete" style={{ height: '20%' }} data-value="10"></div>
                                    </div>
                                    <span className="x-label">Apr</span>
                                </div>
                                <div className="bar-group">
                                    <div className="bars">
                                        <div className="bar in-progress" style={{ height: '66%' }} data-value="33"></div>
                                        <div className="bar complete" style={{ height: '54%' }} data-value="27"></div>
                                    </div>
                                    <span className="x-label">May</span>
                                </div>
                                <div className="bar-group">
                                    <div className="bars">
                                        <div className="bar in-progress" style={{ height: '50%' }} data-value="25"></div>
                                        <div className="bar complete" style={{ height: '22%' }} data-value="11"></div>
                                    </div>
                                    <span className="x-label">Jun</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
