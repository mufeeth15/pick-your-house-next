import React, { createContext, useState, useContext, useEffect } from 'react';

const BlogContext = createContext();

export const useBlogs = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
    const defaultBlogs = [
        {
            id: 1,
            tag: 'SaaS',
            date: 'Nov 11, 2025',
            title: 'Top 11 No-Code SaaS Tools for Your SaaS in 2025',
            author: 'FAHMI DANI',
            role: 'PRODUCT DESIGNER @JIMO',
            image: '/1183405_20-350x350.jpg',
            status: 'Published',
            content: 'Detailed content about No-Code SaaS Tools...'
        },
        {
            id: 2,
            tag: 'SaaS',
            date: 'Oct 20, 2025',
            title: 'In-App Guidance as the New Help Desk by Leveraging Zero-Click Search Behavior',
            author: 'FAHMI DANI',
            role: 'PRODUCT DESIGNER @JIMO',
            image: '/1183405_20-350x350.jpg',
            status: 'Published',
            content: 'Detailed content about In-App Guidance...'
        },
        {
            id: 3,
            tag: 'SaaS',
            date: 'Oct 8, 2025',
            title: 'How to Select the Perfect Digital Adoption Platform (Your 2025 Guide)',
            author: 'RAPHAËL ALEXANDRE',
            role: 'CPO @JIMO',
            image: '/1183405_20-350x350.jpg',
            status: 'Published',
            content: 'Detailed content about Digital Adoption Platforms...'
        }
    ];

    const defaultCategories = [
        'Real Estate', 'Investment', 'Tips & Tricks', 'Market Trends', 'Interior Design', 'SaaS'
    ];

    const [blogs, setBlogs] = useState(defaultBlogs);
    const [categories, setCategories] = useState(defaultCategories);

    useEffect(() => {
        try {
            const savedBlogs = localStorage.getItem('blogs');
            if (savedBlogs) {
                setBlogs(JSON.parse(savedBlogs));
            }
            const savedCategories = localStorage.getItem('blogCategories');
            if (savedCategories) {
                setCategories(JSON.parse(savedCategories));
            }
        } catch (error) {
            console.error('Error loading blogs from localStorage:', error);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('blogs', JSON.stringify(blogs));
    }, [blogs]);

    useEffect(() => {
        localStorage.setItem('blogCategories', JSON.stringify(categories));
    }, [categories]);

    const addBlog = (newBlog) => {
        setBlogs(prev => [{ ...newBlog, id: Date.now() }, ...prev]);
    };

    const updateBlog = (id, updatedBlog) => {
        setBlogs(prev => prev.map(blog => blog.id === id ? { ...blog, ...updatedBlog } : blog));
    };

    const deleteBlog = (id) => {
        setBlogs(prev => prev.filter(blog => blog.id !== id));
    };

    const addCategory = (category) => {
        if (!categories.includes(category)) {
            setCategories(prev => [...prev, category]);
        }
    };

    const deleteCategory = (categoryToDelete) => {
        setCategories(prev => prev.filter(category => category !== categoryToDelete));
    };

    return (
        <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog, categories, addCategory, deleteCategory }}>
            {children}
        </BlogContext.Provider>
    );
};
