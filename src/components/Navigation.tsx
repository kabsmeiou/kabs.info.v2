'use client';

import { useEffect, useState } from 'react';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`sticky top-0 mx-auto max-w-4xl w-full pt-6 px-8 flex justify-center items-center rounded-lg z-50 transition-all duration-300`}>
            <div className={`flex space-x-12 items-center px-6 py-2 rounded-full ${
            isScrolled 
                ? 'backdrop-blur-sm bg-zinc-200/70 dark:bg-zinc-900/70 shadow-lg border-b border-zinc-200/50 dark:border-zinc-800/50' 
                : ''
        }`}>
                <a href="/" className="text-xl font-semibold text-black dark:text-zinc-50">
                Kabs.info
                </a>
                <a href="/projects" className="text-zinc-700 dark:text-zinc-300 hover:text-[var(--color-primary)] transition-colors">
                    Projects
                </a>
                <a href="/blogs" className="text-zinc-700 dark:text-zinc-300 hover:text-[var(--color-primary)] transition-colors">
                    Blog
                </a>
            </div>
        </nav>
    );
}