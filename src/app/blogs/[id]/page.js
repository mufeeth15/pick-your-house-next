"use client";

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useBlogs } from '@/context/BlogContext';
import DOMPurify from 'dompurify';

const BlogDetails = () => {
    const params = useParams();
    const id = params?.id;
    const router = useRouter();
    const { blogs } = useBlogs();

    const blog = blogs.find(b => b.id === parseInt(id) || b.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!blog) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
                <h2>Blog Post Not Found</h2>
                <p>The blog post you are looking for does not exist or has been removed.</p>
                <button
                    onClick={() => router.push('/blogs')}
                    className="btn-primary"
                    style={{ marginTop: '20px' }}
                >
                    Back to Blogs
                </button>
            </div>
        );
    }

    return (
        <div className="blog-details-page">
            <div className="blog-hero" style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${blog.image || '/1183405_20-350x350.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
                padding: '0 20px'
            }}>
                <div className="container">
                    <span className="badge-tag" style={{ background: 'var(--primary-color)', color: 'white', marginBottom: '1rem', display: 'inline-block' }}>
                        {blog.tag}
                    </span>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', maxWidth: '800px', margin: '0 auto 1rem' }}>{blog.title}</h1>
                    <div className="blog-meta" style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.9rem' }}>
                        <span><i className="las la-user"></i> {blog.author}</span>
                        <span><i className="las la-calendar"></i> {blog.date}</span>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
                <div className="blog-content" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#374151' }}>
                    {blog.content ? (
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} />
                    ) : (
                        <p>No content available for this post.</p>
                    )}
                </div>

                <div className="blog-footer" style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid #e5e7eb' }}>
                    <div className="author-bio" style={{ display: 'flex', alignItems: 'center', gap: '20px', background: '#f9fafb', padding: '30px', borderRadius: '12px' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: '#e0e7ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            color: '#4f46e5',
                            fontWeight: 'bold',
                            flexShrink: 0
                        }}>
                            {blog.author.charAt(0)}
                        </div>
                        <div>
                            <h3 style={{ margin: '0 0 5px 0' }}>{blog.author}</h3>
                            <p style={{ margin: 0, color: '#6b7280' }}>{blog.role || 'Author'}</p>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <button
                        onClick={() => router.push('/blogs')}
                        className="btn-secondary"
                    >
                        <i className="las la-arrow-left"></i> Back to All Blogs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
