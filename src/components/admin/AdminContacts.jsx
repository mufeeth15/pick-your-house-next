"use client";

import React, { useState } from 'react';
import { useContacts } from '@/context/ContactContext';

const AdminContacts = () => {
    const { contacts, deleteContact, updateContactStatus } = useContacts();

    // Contact Management States
    const [showContactViewModal, setShowContactViewModal] = useState(false);
    const [showRespondModal, setShowRespondModal] = useState(false);
    const [showContactDeleteConfirm, setShowContactDeleteConfirm] = useState(false);
    const [currentContact, setCurrentContact] = useState(null);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');

    // Contact Management Functions
    const handleViewContact = (contact) => {
        setCurrentContact(contact);
        setShowContactViewModal(true);
    };

    const handleDeleteContact = (contact) => {
        setContactToDelete(contact);
        setShowContactDeleteConfirm(true);
    };

    const confirmDeleteContact = () => {
        if (contactToDelete) {
            deleteContact(contactToDelete.id);
            setShowContactDeleteConfirm(false);
            setContactToDelete(null);
            alert('Contact form deleted successfully!');
        }
    };

    const handleRespondContact = (contact) => {
        setCurrentContact(contact);
        setResponseMessage('');
        setShowRespondModal(true);
    };

    const submitResponse = (e) => {
        e.preventDefault();
        if (currentContact) {
            // In a real app, this would send an email
            console.log(`Sending response to ${currentContact.email}: ${responseMessage}`);
            updateContactStatus(currentContact.id, 'Responded');
            setShowRespondModal(false);
            setResponseMessage('');
            alert(`Response sent to ${currentContact.name} successfully!`);
        }
    };

    return (
        <div className="admin-contacts">
            <h2>Recent Contact Forms</h2>
            <div className="filters-bar">
                <input type="text" placeholder="Search contacts..." className="search-input" />
                <select className="filter-select">
                    <option>All Status</option>
                    <option>New</option>
                    <option>Responded</option>
                    <option>Archived</option>
                </select>
            </div>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.subject}</td>
                            <td>{contact.date}</td>
                            <td><span className="status-badge status-active">New</span></td>
                            <td>
                                <button className="btn-action btn-view" onClick={() => handleViewContact(contact)}>View</button>
                                <button className="btn-action btn-edit" onClick={() => handleRespondContact(contact)}>Respond</button>
                                <button className="btn-action btn-delete" onClick={() => handleDeleteContact(contact)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* View Contact Modal */}
            {showContactViewModal && currentContact && (
                <div className="modal-overlay" onClick={() => setShowContactViewModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Contact Details</h2>
                            <button className="modal-close" onClick={() => setShowContactViewModal(false)}>
                                <i className="las la-times"></i>
                            </button>
                        </div>
                        <div className="view-property-content">
                            <div className="property-info-grid">
                                <div className="info-item">
                                    <i className="las la-user"></i>
                                    <div>
                                        <strong>Name</strong>
                                        <p>{currentContact.name}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <i className="las la-envelope"></i>
                                    <div>
                                        <strong>Email</strong>
                                        <p>{currentContact.email}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <i className="las la-phone"></i>
                                    <div>
                                        <strong>Phone</strong>
                                        <p>{currentContact.phone}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <i className="las la-calendar"></i>
                                    <div>
                                        <strong>Date</strong>
                                        <p>{currentContact.date}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <i className="las la-tag"></i>
                                    <div>
                                        <strong>Subject</strong>
                                        <p>{currentContact.subject}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <i className="las la-info-circle"></i>
                                    <div>
                                        <strong>Status</strong>
                                        <p><span className={`status-badge status-${currentContact.status.toLowerCase()}`}>{currentContact.status}</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="property-description" style={{ marginTop: '1.5rem' }}>
                                <strong>Message</strong>
                                <p style={{ background: '#f9fafb', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem' }}>{currentContact.message}</p>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowContactViewModal(false)}>
                                Close
                            </button>
                            <button className="btn-primary" onClick={() => {
                                setShowContactViewModal(false);
                                handleRespondContact(currentContact);
                            }}>
                                <i className="las la-reply"></i> Respond
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Respond Contact Modal */}
            {showRespondModal && currentContact && (
                <div className="modal-overlay" onClick={() => setShowRespondModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Respond to {currentContact.name}</h2>
                            <button className="modal-close" onClick={() => setShowRespondModal(false)}>
                                <i className="las la-times"></i>
                            </button>
                        </div>
                        <form onSubmit={submitResponse} className="property-form">
                            <div className="form-group">
                                <label>To</label>
                                <input type="text" value={currentContact.email} disabled className="form-input" style={{ background: '#f3f4f6' }} />
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input type="text" value={`Re: ${currentContact.subject}`} disabled className="form-input" style={{ background: '#f3f4f6' }} />
                            </div>
                            <div className="form-group">
                                <label>Message *</label>
                                <textarea
                                    className="form-input"
                                    rows="6"
                                    value={responseMessage}
                                    onChange={(e) => setResponseMessage(e.target.value)}
                                    placeholder="Type your response here..."
                                    required
                                    style={{ resize: 'vertical' }}
                                ></textarea>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setShowRespondModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    <i className="las la-paper-plane"></i> Send Response
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Contact Confirmation Modal */}
            {showContactDeleteConfirm && contactToDelete && (
                <div className="modal-overlay" onClick={() => setShowContactDeleteConfirm(false)}>
                    <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Confirm Delete</h2>
                            <button className="modal-close" onClick={() => setShowContactDeleteConfirm(false)}>
                                <i className="las la-times"></i>
                            </button>
                        </div>
                        <div className="delete-modal-content">
                            <div className="delete-icon">
                                <i className="las la-exclamation-triangle"></i>
                            </div>
                            <h3>Are you sure you want to delete this contact form?</h3>
                            <p className="property-name">From: {contactToDelete.name}</p>
                            <p className="warning-text">This action cannot be undone.</p>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowContactDeleteConfirm(false)}>
                                Cancel
                            </button>
                            <button className="btn-danger" onClick={confirmDeleteContact}>
                                <i className="las la-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminContacts;
