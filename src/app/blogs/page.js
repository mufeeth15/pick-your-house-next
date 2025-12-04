"use client";

import React, { useState } from 'react';
import { useBlogs } from '@/context/BlogContext';
import Link from 'next/link';

const Blogs = () => {
    const { blogs, categories } = useBlogs();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Filter blogs based on status, search query, and category
    const filteredBlogs = blogs.filter(blog => {
        const isPublished = blog.status === 'Published';
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || blog.tag === selectedCategory;

        return isPublished && matchesSearch && matchesCategory;
    });

    return (
        <section className="blog-section">
            <h1 className="text-wrapper">All Blogs</h1>
            <div className="blog-page-content">
                <div className="blog-main-list">
                    {filteredBlogs.length > 0 ? (
                        <div className="blog-container">
                            {filteredBlogs.map((post) => (
                                <Link href={`/blogs/${post.id}`} key={post.id} className="blog-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="card-image-wrapper">
                                        {post.image ? (
                                            <img src={post.image} alt={post.title} className="card-image" />
                                        ) : (
                                            <div className="card-image-placeholder" style={{ width: '100%', height: '100%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <i className="las la-image" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-content">
                                        <div className="card-meta-top">
                                            <span className="card-tag">{post.tag}</span>
                                            <span className="card-date">{post.date}</span>
                                        </div>
                                        <h3 className="card-title">{post.title}</h3>
                                        <div className="card-author">
                                            <div className="author-avatar-placeholder" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', fontWeight: 'bold', marginRight: '10px' }}>
                                                {post.author.charAt(0)}
                                            </div>
                                            <div className="author-info">
                                                <p className="author-name">{post.author}</p>
                                                <p className="author-role">{post.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="no-blogs-message" style={{ textAlign: 'center', width: '100%', padding: '4rem 0' }}>
                            <i className="las la-newspaper" style={{ fontSize: '4rem', color: '#ccc', marginBottom: '1rem' }}></i>
                            <h3>No blog posts found.</h3>
                            <p>Try adjusting your search or category filter.</p>
                        </div>
                    )}
                </div>

                <aside className="blog-sidebar">
                    <div className="sidebar-widget search-widget">
                        <h3>Search</h3>
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search blogs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button><i className="las la-search"></i></button>
                        </div>
                    </div>

                    <div className="sidebar-widget categories-widget">
                        <h3>Categories</h3>
                        <ul className="categories-list">
                            <li
                                className={selectedCategory === 'All' ? 'active' : ''}
                                onClick={() => setSelectedCategory('All')}
                            >
                                All
                            </li>
                            {categories.map((category, index) => (
                                <li
                                    key={index}
                                    className={selectedCategory === category ? 'active' : ''}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default Blogs;
