"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProperties } from '@/context/PropertyContext';

const AdminProperties = () => {
    const { properties, addProperty, updateProperty, deleteProperty } = useProperties();
    const router = useRouter();

    // Property Management States
    const [showPropertyModal, setShowPropertyModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [currentProperty, setCurrentProperty] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null);

    const [propertyForm, setPropertyForm] = useState({
        title: '',
        category: 'flat-sale',
        location: '',
        price: '',
        status: 'Active',
        description: '',
        area: '',
        badge: 'Direct Owner',
        image: null
    });

    // Filter states for Properties section
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    // Property Management Functions
    const handleAddProperty = () => {
        setIsEditMode(false);
        setPropertyForm({
            title: '',
            category: 'flat-sale',
            location: '',
            price: '',
            status: 'Active',
            description: '',
            area: '',
            badge: 'Direct Owner',
            image: null
        });
        setShowPropertyModal(true);
    };

    const handleEditProperty = (property) => {
        setIsEditMode(true);
        setCurrentProperty(property);
        setPropertyForm({
            title: property.title,
            category: property.category,
            location: property.location,
            price: property.price,
            status: property.status,
            description: property.description,
            area: property.area,
            badge: property.badge,
            image: property.image || null
        });
        setShowPropertyModal(true);
    };

    const handleViewProperty = (property) => {
        setCurrentProperty(property);
        setShowViewModal(true);
    };

    const handleDeleteProperty = (property) => {
        setPropertyToDelete(property);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        deleteProperty(propertyToDelete.id);
        setShowDeleteConfirm(false);
        setPropertyToDelete(null);
        alert('Property deleted successfully!');
    };

    const handlePropertyFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPropertyForm(prev => ({
                        ...prev,
                        image: reader.result
                    }));
                };
                reader.readAsDataURL(file);
            }
        } else {
            setPropertyForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleRemoveImage = () => {
        setPropertyForm(prev => ({
            ...prev,
            image: null
        }));
        const fileInput = document.getElementById('property-image');
        if (fileInput) fileInput.value = '';
    };

    const handlePropertySubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            updateProperty(currentProperty.id, propertyForm);
            alert('Property updated successfully!');
        } else {
            addProperty(propertyForm);
            alert('Property added successfully!');
        }
        setShowPropertyModal(false);
        setPropertyForm({
            title: '',
            category: 'flat-sale',
            location: '',
            price: '',
            status: 'Active',
            description: '',
            area: '',
            badge: 'Direct Owner',
            image: null
        });
    };

    const filteredProperties = properties.filter(property => {
        const matchesSearch = searchQuery === '' ||
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.price.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' ||
            property.status.toLowerCase() === statusFilter.toLowerCase();
        const matchesType = typeFilter === 'all' ||
            (typeFilter === 'buy' && property.category === 'commercial') ||
            property.category === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <div className="admin-properties">
            <div className="section-header">
                <h2>Property Management</h2>
                <button className="btn-primary" onClick={handleAddProperty}>+ Add New Property</button>
            </div>
            <div className="filters-bar">
                <input
                    type="text"
                    placeholder="Search properties..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    className="filter-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="sold">Sold</option>
                </select>
                <select
                    className="filter-select"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                >
                    <option value="all">All Types</option>
                    <option value="flat-sale">Flat for Sale</option>
                    <option value="flat-rent">Flat for Rent</option>
                    <option value="buy">Buy</option>
                </select>
            </div>
            <div className="properties-grid">
                {filteredProperties.length > 0 ? (
                    filteredProperties.map(property => (
                        <div key={property.id} className="property-card-admin">
                            <div className="property-image-placeholder">
                                {property.image ? (
                                    <img src={property.image} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <i className="las la-home"></i>
                                )}
                            </div>
                            <div className="property-details">
                                <h3>{property.title}</h3>
                                <p className="property-location"><i className="las la-map-marker"></i> {property.location}</p>
                                <p className="property-price">{property.price}</p>
                                <div className="property-meta">
                                    <span className={`status-badge status-${property.status.toLowerCase()}`}>
                                        {property.status}
                                    </span>
                                    <span className="property-date">{property.date}</span>
                                </div>
                                <div className="property-actions">
                                    <button className="btn-action btn-edit" onClick={() => handleEditProperty(property)}>
                                        <i className="las la-edit"></i> Edit
                                    </button>
                                    <button className="btn-action btn-view" onClick={() => handleViewProperty(property)}>
                                        <i className="las la-eye"></i> View
                                    </button>
                                    <button className="btn-action btn-delete" onClick={() => handleDeleteProperty(property)}>
                                        <i className="las la-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-properties-message">
                        <i className="las la-search" style={{ fontSize: '4rem', color: '#ccc' }}></i>
                        <h3>No properties found</h3>
                        <p>Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button
                    className="btn-primary"
                    onClick={() => router.push('/services')}
                    style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
                >
                    <i className="las la-save"></i> Save & View in Services
                </button>
            </div>

            {/* Add/Edit Property Modal */}
            {
                showPropertyModal && (
                    <div className="modal-overlay" onClick={() => setShowPropertyModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>{isEditMode ? 'Edit Property' : 'Add New Property'}</h2>
                                <button className="modal-close" onClick={() => setShowPropertyModal(false)}>
                                    <i className="las la-times"></i>
                                </button>
                            </div>
                            <form onSubmit={handlePropertySubmit} className="property-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Property Title *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={propertyForm.title}
                                            onChange={handlePropertyFormChange}
                                            className="form-input"
                                            placeholder="Enter property title"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group full-width">
                                        <label>Property Image</label>
                                        <div className="image-upload-container">
                                            <input
                                                type="file"
                                                name="image"
                                                id="property-image"
                                                accept="image/*"
                                                onChange={handlePropertyFormChange}
                                                className="file-input"
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="property-image" className="file-upload-label">
                                                <i className="las la-cloud-upload-alt"></i>
                                                <span>Click to upload image</span>
                                            </label>
                                            {propertyForm.image && (
                                                <div className="image-preview">
                                                    <img src={propertyForm.image} alt="Preview" />
                                                    <button type="button" className="remove-image-btn" onClick={handleRemoveImage}>
                                                        <i className="las la-times"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Category *</label>
                                        <select
                                            name="category"
                                            value={propertyForm.category}
                                            onChange={handlePropertyFormChange}
                                            className="form-input"
                                            required
                                        >
                                            <option value="flat-sale">Flat for Sale</option>
                                            <option value="flat-rent">Flat for Rent</option>
                                            <option value="commercial">Commercial</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Status *</label>
                                        <select
                                            name="status"
                                            value={propertyForm.status}
                                            onChange={handlePropertyFormChange}
                                            className="form-input"
                                            required
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Sold">Sold</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Location *</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={propertyForm.location}
                                            onChange={handlePropertyFormChange}
                                            className="form-input"
                                            placeholder="Enter location"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Price *</label>
                                        <input
                                            type="text"
                                            name="price"
                                            value={propertyForm.price}
                                            onChange={handlePropertyFormChange}
                                            className="form-input"
                                            placeholder="e.g., $500,000 or ₹50 Lakh"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Area *</label>
                                        <input
                                            type="text"
                                            name="area"
                                            value={propertyForm.area}
                                            onChange={handlePropertyFormChange}
                                            className="form-input"
                                            placeholder="e.g., 2000 Sq.Ft."
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Badge *</label>
                                        <select
                                            name="badge"
                                            value={propertyForm.badge}
                                            onChange={handlePropertyFormChange}
                                            className="form-input"
                                            required
                                        >
                                            <option value="Direct Owner">Direct Owner</option>
                                            <option value="Direct Builder">Direct Builder</option>
                                            <option value="Zero Brokerage">Zero Brokerage</option>
                                            <option value="Brokerage Applicable">Brokerage Applicable</option>
                                            <option value="Premium Property">Premium Property</option>
                                            <option value="Negotiable Price">Negotiable Price</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Description *</label>
                                    <textarea
                                        name="description"
                                        value={propertyForm.description}
                                        onChange={handlePropertyFormChange}
                                        className="form-input"
                                        placeholder="Enter property description"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn-secondary" onClick={() => setShowPropertyModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-primary">
                                        {isEditMode ? 'Update Property' : 'Add Property'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* View Property Modal */}
            {
                showViewModal && currentProperty && (
                    <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
                        <div className="modal-content view-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Property Details</h2>
                                <button className="modal-close" onClick={() => setShowViewModal(false)}>
                                    <i className="las la-times"></i>
                                </button>
                            </div>
                            <div className="property-view-content">
                                <div className="property-view-image">
                                    {currentProperty.image ? (
                                        <img src={currentProperty.image} alt={currentProperty.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                                    ) : (
                                        <i className="las la-home"></i>
                                    )}
                                </div>
                                <div className="property-view-details">
                                    <h3>{currentProperty.title}</h3>
                                    <div className="property-view-meta">
                                        <span className={`status-badge status-${currentProperty.status.toLowerCase()}`}>
                                            {currentProperty.status}
                                        </span>
                                        <span className="badge-tag">{currentProperty.badge}</span>
                                    </div>
                                    <div className="property-info-grid">
                                        <div className="info-item">
                                            <i className="las la-map-marker"></i>
                                            <div>
                                                <strong>Location</strong>
                                                <p>{currentProperty.location}</p>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <i className="las la-dollar-sign"></i>
                                            <div>
                                                <strong>Price</strong>
                                                <p>{currentProperty.price}</p>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <i className="las la-ruler-combined"></i>
                                            <div>
                                                <strong>Area</strong>
                                                <p>{currentProperty.area}</p>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <i className="las la-tag"></i>
                                            <div>
                                                <strong>Category</strong>
                                                <p>{currentProperty.category === 'flat-sale' ? 'Flat for Sale' : currentProperty.category === 'flat-rent' ? 'Flat for Rent' : 'Commercial'}</p>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <i className="las la-calendar"></i>
                                            <div>
                                                <strong>Listed Date</strong>
                                                <p>{currentProperty.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="property-description">
                                        <strong>Description</strong>
                                        <p>{currentProperty.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button className="btn-secondary" onClick={() => setShowViewModal(false)}>
                                    Close
                                </button>
                                <button className="btn-primary" onClick={() => {
                                    setShowViewModal(false);
                                    handleEditProperty(currentProperty);
                                }}>
                                    <i className="las la-edit"></i> Edit Property
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Delete Confirmation Modal */}
            {
                showDeleteConfirm && propertyToDelete && (
                    <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
                        <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Confirm Delete</h2>
                                <button className="modal-close" onClick={() => setShowDeleteConfirm(false)}>
                                    <i className="las la-times"></i>
                                </button>
                            </div>
                            <div className="delete-modal-content">
                                <div className="delete-icon">
                                    <i className="las la-exclamation-triangle"></i>
                                </div>
                                <h3>Are you sure you want to delete this property?</h3>
                                <p className="property-name">{propertyToDelete.title}</p>
                                <p className="warning-text">This action cannot be undone.</p>
                            </div>
                            <div className="modal-actions">
                                <button className="btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                                    Cancel
                                </button>
                                <button className="btn-danger" onClick={confirmDelete}>
                                    <i className="las la-trash"></i> Delete Property
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default AdminProperties;
