"use client";

import React from 'react';

const AdminSettings = ({
    generalSettings,
    setGeneralSettings,
    isEditingNotifications,
    setIsEditingNotifications,
    isEditingGeneral,
    setIsEditingGeneral
}) => {

    const handleGeneralSettingsChange = (e) => {
        const { name, value } = e.target;
        setGeneralSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNotificationToggle = (key) => {
        setGeneralSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key]
            }
        }));
    };

    const handleSaveSettings = () => {
        localStorage.setItem('adminSettings', JSON.stringify(generalSettings));
        setIsEditingGeneral(false);
        alert('Settings saved successfully!');
    };

    return (
        <div className="admin-settings">
            <h2>Settings</h2>
            <div className="settings-sections">
                <div className="settings-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3>Admin User</h3>
                        <button
                            className="btn-secondary"
                            onClick={() => setIsEditingGeneral(!isEditingGeneral)}
                            style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                        >
                            {isEditingGeneral ? 'Cancel' : 'Edit'}
                        </button>
                    </div>
                    <div className="form-group">
                        <label>Site Name</label>
                        <input
                            type="text"
                            name="siteName"
                            value={generalSettings.siteName}
                            onChange={handleGeneralSettingsChange}
                            className="form-input"
                            disabled={!isEditingGeneral}
                        />
                    </div>
                    <div className="form-group">
                        <label>Contact Email</label>
                        <input
                            type="email"
                            name="contactEmail"
                            value={generalSettings.contactEmail}
                            onChange={handleGeneralSettingsChange}
                            className="form-input"
                            disabled={true}
                            style={{ opacity: 0.7, cursor: 'not-allowed' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Currency Symbol</label>
                        <input
                            type="text"
                            name="currency"
                            value={generalSettings.currency}
                            onChange={handleGeneralSettingsChange}
                            className="form-input"
                            disabled={!isEditingGeneral}
                        />
                    </div>
                    {isEditingGeneral && (
                        <button className="btn-primary" onClick={handleSaveSettings} style={{ marginTop: '1rem' }}>
                            Save Changes
                        </button>
                    )}
                </div>
                <div className="settings-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3>Notifications</h3>
                        <button
                            className="btn-secondary"
                            onClick={() => setIsEditingNotifications(!isEditingNotifications)}
                            style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                        >
                            {isEditingNotifications ? 'Done' : 'Edit'}
                        </button>
                    </div>
                    <div className="notification-settings">
                        <div className="setting-item">
                            <div>
                                <h4>Email Notifications</h4>
                                <p>Receive emails for new inquiries</p>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={generalSettings.notifications.email}
                                    onChange={() => handleNotificationToggle('email')}
                                    disabled={!isEditingNotifications}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="setting-item">
                            <div>
                                <h4>New User Alerts</h4>
                                <p>Notify when a new user registers</p>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={generalSettings.notifications.newUsers}
                                    onChange={() => handleNotificationToggle('newUsers')}
                                    disabled={!isEditingNotifications}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="setting-item">
                            <div>
                                <h4>Property Updates</h4>
                                <p>Notify when a property status changes</p>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={generalSettings.notifications.updates}
                                    onChange={() => handleNotificationToggle('updates')}
                                    disabled={!isEditingNotifications}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="setting-item">
                            <div>
                                <h4>Blog Comments</h4>
                                <p>Notify on new blog comments</p>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={generalSettings.notifications.comments}
                                    onChange={() => handleNotificationToggle('comments')}
                                    disabled={!isEditingNotifications}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
