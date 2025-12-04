"use client";

import React, { useState } from 'react';
import { useUsers } from '@/context/UserContext';

const AdminUsers = ({ currentUser }) => {
    const { users, addUser, deleteUser, updateUser } = useUsers();

    // User Management States
    const [showUserModal, setShowUserModal] = useState(false);
    const [showUserDeleteConfirm, setShowUserDeleteConfirm] = useState(false);
    const [currentUserEdit, setCurrentUserEdit] = useState(null);
    const [isUserEditMode, setIsUserEditMode] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [deleteUsername, setDeleteUsername] = useState('');
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        role: 'Editor',
        status: 'Active',
        password: ''
    });

    // User Management Functions
    const handleAddUser = () => {
        if (currentUser.role !== 'Admin') {
            alert('Only Admin users can create new users!');
            return;
        }
        setIsUserEditMode(false);
        setUserForm({
            name: '',
            email: '',
            role: 'Editor',
            status: 'Active',
            password: ''
        });
        setShowUserModal(true);
    };

    const handleEditUser = (user) => {
        if (currentUser.role !== 'Admin') {
            alert('Only Admin users can edit users!');
            return;
        }
        if (user.email === 'admin@pickyourhouse.com') {
            alert('Cannot edit the main Admin user!');
            return;
        }
        setCurrentUserEdit(user);
        setIsUserEditMode(true);
        setUserForm({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            password: '' // Don't populate password for security, let them set new one if they want
        });
        setShowUserModal(true);
    };

    const handleDeleteUser = (user) => {
        if (currentUser.role !== 'Admin') {
            alert('Only Admin users can delete users!');
            return;
        }
        if (user.email === 'admin@pickyourhouse.com') {
            alert('Cannot delete the main Admin user!');
            return;
        }
        setUserToDelete(user);
        setDeleteUsername('');
        setDeletePassword('');
        setDeleteError('');
        setShowUserDeleteConfirm(true);
    };

    const confirmUserDelete = () => {
        if (deleteUsername !== currentUser.email || deletePassword !== currentUser.password) {
            setDeleteError('Invalid credentials. Please try again.');
            return;
        }

        if (userToDelete) {
            deleteUser(userToDelete.id);
            setShowUserDeleteConfirm(false);
            setUserToDelete(null);
            setDeleteUsername('');
            setDeletePassword('');
            setDeleteError('');
        }
    };

    const handleUserFormChange = (e) => {
        const { name, value } = e.target;
        setUserForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUserSubmit = (e) => {
        e.preventDefault();
        if (isUserEditMode && currentUserEdit) {
            const updates = { ...userForm };
            if (!updates.password) {
                delete updates.password; // Don't overwrite password if empty
            }
            updateUser(currentUserEdit.id, updates);
            alert('User updated successfully!');
        } else {
            addUser(userForm);
            alert('User added successfully!');
        }
        setShowUserModal(false);
    };

    return (
        <div className="admin-users">
            <div className="section-header">
                <h2>User Management</h2>
                {currentUser.role === 'Admin' && (
                    <button className="btn-primary" onClick={handleAddUser}>+ Add New User</button>
                )}
            </div>
            <div className="filters-bar">
                <input type="text" placeholder="Search users..." className="search-input" />
                <select className="filter-select">
                    <option>All Roles</option>
                    <option>Admin</option>
                    <option>Editor</option>
                </select>
            </div>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) && users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name || 'Unknown'}</td>
                                <td>{user.email || 'No Email'}</td>
                                <td><span className={`role-badge role-${(user.role || 'customer').toLowerCase()}`}>{user.role || 'Customer'}</span></td>
                                <td><span className={`status-badge status-${(user.status || 'active').toLowerCase()}`}>{user.status || 'Active'}</span></td>
                                <td>{user.joined || new Date().toISOString().split('T')[0]}</td>
                                <td>
                                    <button
                                        className="btn-action btn-edit"
                                        onClick={() => handleEditUser(user)}
                                        disabled={user.email === 'admin@pickyourhouse.com'}
                                        style={user.email === 'admin@pickyourhouse.com' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn-action btn-delete"
                                        onClick={() => handleDeleteUser(user)}
                                        disabled={user.email === 'admin@pickyourhouse.com'}
                                        style={user.email === 'admin@pickyourhouse.com' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Add/Edit User Modal */}
            {
                showUserModal && (
                    <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>{isUserEditMode ? 'Edit User' : 'Add New User'}</h2>
                                <button className="modal-close" onClick={() => setShowUserModal(false)}>
                                    <i className="las la-times"></i>
                                </button>
                            </div>
                            <form onSubmit={handleUserSubmit} className="property-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={userForm.name}
                                            onChange={handleUserFormChange}
                                            className="form-input"
                                            placeholder="Enter user name"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={userForm.email}
                                            onChange={handleUserFormChange}
                                            className="form-input"
                                            placeholder="Enter email address"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Password {isUserEditMode ? '(Leave blank to keep current)' : '*'}</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={userForm.password}
                                            onChange={handleUserFormChange}
                                            className="form-input"
                                            placeholder={isUserEditMode ? "Enter new password" : "Enter password"}
                                            required={!isUserEditMode}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Role *</label>
                                        <select
                                            name="role"
                                            value={userForm.role}
                                            onChange={handleUserFormChange}
                                            className="form-input"
                                            required
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Editor">Editor</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Status *</label>
                                        <select
                                            name="status"
                                            value={userForm.status}
                                            onChange={handleUserFormChange}
                                            className="form-input"
                                            required
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn-secondary" onClick={() => setShowUserModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-primary">
                                        {isUserEditMode ? 'Update User' : 'Add User'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* Delete User Confirmation Modal */}
            {
                showUserDeleteConfirm && userToDelete && (
                    <div className="modal-overlay" onClick={() => setShowUserDeleteConfirm(false)}>
                        <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Confirm Delete</h2>
                                <button className="modal-close" onClick={() => setShowUserDeleteConfirm(false)}>
                                    <i className="las la-times"></i>
                                </button>
                            </div>
                            <div className="delete-modal-content">
                                <div className="delete-icon">
                                    <i className="las la-exclamation-triangle"></i>
                                </div>
                                <h3>Are you sure you want to delete this user?</h3>
                                <p className="property-name">{userToDelete.name}</p>
                                <p className="warning-text">This action cannot be undone.</p>
                                <div className="secure-delete-form" style={{ marginTop: '1.5rem', textAlign: 'left' }}>
                                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                                        Please enter your admin credentials to confirm deletion.
                                    </p>
                                    {deleteError && (
                                        <div style={{ color: '#dc2626', background: '#fee2e2', padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                            {deleteError}
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Admin Email</label>
                                        <input
                                            type="email"
                                            className="form-input"
                                            value={deleteUsername}
                                            onChange={(e) => setDeleteUsername(e.target.value)}
                                            placeholder="Enter admin email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
                                        <input
                                            type="password"
                                            className="form-input"
                                            value={deletePassword}
                                            onChange={(e) => setDeletePassword(e.target.value)}
                                            placeholder="Enter admin password"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button className="btn-secondary" onClick={() => setShowUserDeleteConfirm(false)}>
                                    Cancel
                                </button>
                                <button className="btn-danger" onClick={confirmUserDelete}>
                                    <i className="las la-trash"></i> Confirm Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default AdminUsers;
