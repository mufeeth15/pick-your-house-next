"use client";

import React, { useState } from 'react';
import { useBlogs } from '@/context/BlogContext';
import { Editor, EditorProvider, Toolbar, BtnBold, BtnItalic, BtnUnderline, BtnStrikeThrough, BtnBulletList, BtnNumberedList, BtnLink, BtnClearFormatting } from 'react-simple-wysiwyg';
import DOMPurify from 'dompurify';

const AdminBlogs = ({ currentUser }) => {
    const { blogs, addBlog, updateBlog, deleteBlog, categories, addCategory, deleteCategory } = useBlogs();

    // Blog Management States
    const [showBlogModal, setShowBlogModal] = useState(false);
    const [showBlogViewModal, setShowBlogViewModal] = useState(false);
    const [showBlogDeleteConfirm, setShowBlogDeleteConfirm] = useState(false);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [isBlogEditMode, setIsBlogEditMode] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const [blogForm, setBlogForm] = useState({
        title: '',
        author: '',
        role: '',
        tag: 'Real Estate',
        date: '',
        status: 'Published',
        content: '',
        image: null
    });
    const [newCategory, setNewCategory] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [isManagingCategories, setIsManagingCategories] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    // Blog Management Functions
    const handleAddBlog = () => {
        setIsBlogEditMode(false);
        setBlogForm({
            title: '',
            author: currentUser.name || 'Admin',
            role: 'Admin',
            tag: 'Real Estate',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'Published',
            content: '',
            image: null
        });
        setShowBlogModal(true);
    };

    const handleEditBlog = (blog) => {
        setIsBlogEditMode(true);
        setCurrentBlog(blog);
        setBlogForm({
            title: blog.title,
            author: blog.author,
            role: blog.role,
            tag: blog.tag,
            date: blog.date,
            status: blog.status || 'Published',
            content: blog.content || '',
            image: blog.image || null
        });
        setShowBlogModal(true);
    };

    const handleViewBlog = (blog) => {
        setCurrentBlog(blog);
        setShowBlogViewModal(true);
    };

    const handleDeleteBlog = (blog) => {
        setBlogToDelete(blog);
        setShowBlogDeleteConfirm(true);
    };

    const confirmDeleteBlog = () => {
        if (blogToDelete) {
            deleteBlog(blogToDelete.id);
            setShowBlogDeleteConfirm(false);
            setBlogToDelete(null);
            alert('Blog post deleted successfully!');
        }
    };

    const handleDuplicateBlog = (blog) => {
        const duplicatedBlog = {
            ...blog,
            title: `${blog.title} (Copy)`,
            status: 'Published', // Set duplicated blog to Published so it shows immediately
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        };
        // Remove id to let addBlog generate a new one
        const { id, ...blogData } = duplicatedBlog;
        addBlog(blogData);
        alert('Blog duplicated successfully!');
    };

    const handleBlogFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setBlogForm(prev => ({
                        ...prev,
                        image: reader.result
                    }));
                };
                reader.readAsDataURL(file);
            }
        } else {
            setBlogForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleRemoveBlogImage = () => {
        setBlogForm(prev => ({
            ...prev,
            image: null
        }));
        const fileInput = document.getElementById('blog-image');
        if (fileInput) fileInput.value = '';
    };

    const handleBlogSubmit = (e) => {
        e.preventDefault();
        if (isBlogEditMode && currentBlog) {
            updateBlog(currentBlog.id, blogForm);
            alert('Blog updated successfully!');
        } else {
            addBlog(blogForm);
            alert('Blog published successfully!');
        }
        setShowBlogModal(false);
    };

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            addCategory(newCategory.trim());
            setBlogForm(prev => ({ ...prev, tag: newCategory.trim() }));
            setNewCategory('');
            setIsAddingCategory(false);
        }
    };

    return (
        <div className="admin-blogs">
            <div className="section-header">
                <h2>Blog Management</h2>
                <button className="btn-primary" onClick={handleAddBlog}>+ Create New Post</button>
            </div>

            <div className="blog-management-layout">
                {/* Left Column: Blog List */}
                <div className="blog-list-section">
                    <div className="filters-bar">
                        <input type="text" placeholder="Search blogs..." className="search-input" />
                        <select className="filter-select">
                            <option>All Status</option>
                            <option>Published</option>
                            <option>Draft</option>
                            <option>Scheduled</option>
                        </select>
                    </div>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.length > 0 ? (
                                blogs.map(blog => (
                                    <tr key={blog.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                {blog.image && <img src={blog.image} alt="thumb" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />}
                                                <span title={blog.title}>{blog.title.length > 30 ? blog.title.substring(0, 30) + '...' : blog.title}</span>
                                            </div>
                                        </td>
                                        <td>{blog.author}</td>
                                        <td>{blog.tag}</td>
                                        <td><span className={`status-badge status-${(blog.status || 'published').toLowerCase()}`}>{blog.status || 'Published'}</span></td>
                                        <td>{blog.date}</td>
                                        <td>
                                            <button className="btn-action btn-view" onClick={() => handleViewBlog(blog)}>View</button>
                                            <button className="btn-action btn-edit" onClick={() => handleEditBlog(blog)}>Edit</button>
                                            <button className="btn-action btn-edit" onClick={() => handleDuplicateBlog(blog)} style={{ background: '#d1fae5', color: '#065f46' }}>Duplicate</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No blog posts found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* Add/Edit Blog Modal */}
            {showBlogModal && (
                <div className="modal-overlay" onClick={() => setShowBlogModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{isBlogEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
                            <button className="modal-close" onClick={() => setShowBlogModal(false)}>
                                <i className="las la-times"></i>
                            </button>
                        </div>
                        <form onSubmit={handleBlogSubmit} className="property-form">
                            <div className="form-row">
                                <div className="form-group full-width">
                                    <label>Blog Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={blogForm.title}
                                        onChange={handleBlogFormChange}
                                        className="form-input"
                                        placeholder="Enter blog title"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group full-width">
                                    <label>Cover Image</label>
                                    <div className="image-upload-container">
                                        <input
                                            type="file"
                                            name="image"
                                            id="blog-image"
                                            accept="image/*"
                                            onChange={handleBlogFormChange}
                                            className="file-input"
                                            style={{ display: 'none' }}
                                        />
                                        <label htmlFor="blog-image" className="file-upload-label">
                                            <i className="las la-cloud-upload-alt"></i>
                                            <span>Click to upload cover image</span>
                                        </label>
                                        {blogForm.image && (
                                            <div className="image-preview">
                                                <img src={blogForm.image} alt="Preview" />
                                                <button type="button" className="remove-image-btn" onClick={handleRemoveBlogImage}>
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
                                    {isManagingCategories ? (
                                        <div className="category-manager" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px', background: '#f9fafb' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                                <label style={{ fontWeight: '600', fontSize: '0.9rem', color: '#374151' }}>Manage Categories</label>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsManagingCategories(false)}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
                                                >
                                                    <i className="las la-times"></i>
                                                </button>
                                            </div>
                                            <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '10px', background: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                                                {categories.length > 0 ? (
                                                    categories.map((cat, index) => (
                                                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderBottom: index !== categories.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                                                            <span style={{ fontSize: '0.9rem' }}>{cat}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    if (window.confirm(`Delete category "${cat}"?`)) {
                                                                        deleteCategory(cat);
                                                                        if (blogForm.tag === cat) {
                                                                            setBlogForm(prev => ({ ...prev, tag: categories.find(c => c !== cat) || '' }));
                                                                        }
                                                                    }
                                                                }}
                                                                style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                                                                title="Delete"
                                                            >
                                                                <i className="las la-trash"></i>
                                                            </button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div style={{ padding: '10px', textAlign: 'center', color: '#9ca3af', fontSize: '0.9rem' }}>No categories found</div>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                className="btn-secondary"
                                                onClick={() => setIsManagingCategories(false)}
                                                style={{ width: '100%', padding: '6px', fontSize: '0.9rem' }}
                                            >
                                                Done
                                            </button>
                                        </div>
                                    ) : !isAddingCategory ? (
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <select
                                                name="tag"
                                                value={blogForm.tag}
                                                onChange={handleBlogFormChange}
                                                className="form-input"
                                                required
                                            >
                                                {categories.map((cat, index) => (
                                                    <option key={index} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                className="btn-secondary"
                                                onClick={() => setIsAddingCategory(true)}
                                                style={{ padding: '0 15px', whiteSpace: 'nowrap' }}
                                                title="Add New Category"
                                            >
                                                + New
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-secondary"
                                                onClick={() => setIsManagingCategories(true)}
                                                style={{ padding: '0 10px', color: '#4b5563' }}
                                                title="Manage Categories"
                                            >
                                                <i className="las la-cog"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="New Category Name"
                                                value={newCategory}
                                                onChange={(e) => setNewCategory(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="btn-primary"
                                                onClick={handleAddCategory}
                                                style={{ padding: '0 15px' }}
                                            >
                                                Add
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-secondary"
                                                onClick={() => setIsAddingCategory(false)}
                                                style={{ padding: '0 15px' }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        name="status"
                                        value={blogForm.status}
                                        onChange={handleBlogFormChange}
                                        className="form-input"
                                    >
                                        <option value="Published">Published</option>
                                        <option value="Draft">Draft</option>
                                        <option value="Scheduled">Scheduled</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Author</label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={blogForm.author}
                                        onChange={handleBlogFormChange}
                                        className="form-input"
                                        placeholder="Author Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Role</label>
                                    <input
                                        type="text"
                                        name="role"
                                        value={blogForm.role}
                                        onChange={handleBlogFormChange}
                                        className="form-input"
                                        placeholder="Author Role"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Content</label>
                                <EditorProvider>
                                    <Editor
                                        value={blogForm.content}
                                        onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                                        containerProps={{ style: { height: '200px', borderRadius: '12px', border: '2px solid #e5e7eb' } }}
                                    >
                                        <Toolbar>
                                            <BtnBold />
                                            <BtnItalic />
                                            <BtnUnderline />
                                            <BtnStrikeThrough />
                                            <BtnBulletList />
                                            <BtnNumberedList />
                                            <BtnLink />
                                            <BtnClearFormatting />
                                        </Toolbar>
                                    </Editor>
                                </EditorProvider>
                            </div>
                            <div className="modal-actions">
                                {isBlogEditMode && (
                                    <button
                                        type="button"
                                        className="btn-danger"
                                        onClick={() => {
                                            setShowBlogModal(false);
                                            handleDeleteBlog(currentBlog);
                                        }}
                                        style={{ marginRight: 'auto' }}
                                    >
                                        <i className="las la-trash"></i> Delete
                                    </button>
                                )}
                                <button type="button" className="btn-secondary" onClick={() => setShowBlogModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    {isBlogEditMode ? 'Update Post' : 'Publish Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Blog Modal */}
            {showBlogViewModal && currentBlog && (
                <div className="modal-overlay" onClick={() => setShowBlogViewModal(false)}>
                    <div className="modal-content view-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{currentBlog.title}</h2>
                            <button className="modal-close" onClick={() => setShowBlogViewModal(false)}>
                                <i className="las la-times"></i>
                            </button>
                        </div>
                        <div className="property-view-content">
                            <div className="property-view-image">
                                {currentBlog.image ? (
                                    <img src={currentBlog.image} alt={currentBlog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '200px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
                                        <i className="las la-image" style={{ fontSize: '4rem', color: '#ccc' }}></i>
                                    </div>
                                )}
                            </div>
                            <div className="property-view-details">
                                <div className="property-view-meta">
                                    <span className="badge-tag">{currentBlog.tag}</span>
                                    <span style={{ color: '#666' }}>{currentBlog.date}</span>
                                </div>
                                <div className="author-info" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '1rem 0' }}>
                                    <div style={{ width: '40px', height: '40px', background: '#e0e7ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', fontWeight: 'bold' }}>
                                        {currentBlog.author.charAt(0)}
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: '600', margin: 0 }}>{currentBlog.author}</p>
                                        <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>{currentBlog.role}</p>
                                    </div>
                                </div>
                                <div className="property-description">
                                    {currentBlog.content ? (
                                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentBlog.content) }} />
                                    ) : (
                                        <p>No content available.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowBlogViewModal(false)}>
                                Close
                            </button>
                            <button className="btn-primary" onClick={() => {
                                setShowBlogViewModal(false);
                                handleEditBlog(currentBlog);
                            }}>
                                <i className="las la-edit"></i> Edit Post
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Blog Confirmation Modal */}
            {showBlogDeleteConfirm && blogToDelete && (
                <div className="modal-overlay" onClick={() => setShowBlogDeleteConfirm(false)}>
                    <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Confirm Delete</h2>
                            <button className="modal-close" onClick={() => setShowBlogDeleteConfirm(false)}>
                                <i className="las la-times"></i>
                            </button>
                        </div>
                        <div className="delete-modal-content">
                            <div className="delete-icon">
                                <i className="las la-exclamation-triangle"></i>
                            </div>
                            <h3>Are you sure you want to delete this blog post?</h3>
                            <p className="property-name">{blogToDelete.title}</p>
                            <p className="warning-text">This action cannot be undone.</p>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowBlogDeleteConfirm(false)}>
                                Cancel
                            </button>
                            <button className="btn-danger" onClick={confirmDeleteBlog}>
                                <i className="las la-trash"></i> Delete Post
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Manage Categories Modal */}
            {showCategoryModal && (
                <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <div className="modal-header">
                            <h2>Manage Categories</h2>
                            <button className="modal-close" onClick={() => setShowCategoryModal(false)}>
                                <i className="las la-times"></i>
                            </button>
                        </div>
                        <div className="categories-management">
                            <div className="add-category-row" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="New Category Name"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                />
                                <button
                                    className="btn-primary"
                                    onClick={() => {
                                        if (newCategory.trim()) {
                                            addCategory(newCategory.trim());
                                            setNewCategory('');
                                        }
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                            <ul className="categories-list-admin" style={{ listStyle: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
                                {categories.map((category, index) => (
                                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
                                        <span>{category}</span>
                                        <button
                                            className="btn-action btn-delete"
                                            onClick={() => {
                                                if (window.confirm(`Are you sure you want to delete category "${category}"?`)) {
                                                    deleteCategory(category);
                                                }
                                            }}
                                            style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                                        >
                                            <i className="las la-trash"></i>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowCategoryModal(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBlogs;
