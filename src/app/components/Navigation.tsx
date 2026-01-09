'use client';

import { useEffect, useState } from 'react';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Initialize dark mode from localStorage or system preference
    useEffect(() => {
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = stored === 'dark' || (!stored && prefersDark);
        
        setIsDark(shouldBeDark);
        document.documentElement.classList.remove('dark', 'light');
        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.add('light');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !isDark;
        setIsDark(newDarkMode);
        
        document.documentElement.classList.remove('dark', 'light');
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <nav className={`sticky top-0 mx-auto max-w-4xl w-full pt-6 px-8 flex justify-center items-center rounded-lg z-50 transition-all duration-300`}>
            <div className={`flex space-x-12 items-center px-6 py-2 rounded-full ${
            isScrolled 
                ? 'backdrop-blur-sm bg-zinc-200/60 dark:bg-zinc-900/70 shadow-lg border-b border-zinc-200/50 dark:border-zinc-800/50' 
                : ''
        }`}>
                <a href="/" className="text-xl font-semibold text-black dark:text-zinc-50">
                Kabs / カブス
                </a>
                <a href="/projects" className="text-zinc-700 dark:text-zinc-300 hover:text-[var(--color-primary)] transition-colors">
                    graveyard / 墓地
                </a>
                <a href="/blogs" className="text-zinc-700 dark:text-zinc-300 hover:text-[var(--color-primary)] transition-colors">
                    notes / メモ
                </a>
                {/* <p>.ᐟ .ᐟ .𖥔 ݁ ˖</p> */}
                {/* dark mode / light mode button */}
                <button
                    onClick={toggleDarkMode}
                    className="cursor-pointer text-zinc-700 dark:text-zinc-300 hover:text-[var(--color-primary)] transition-colors"
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {isDark ? '.𖥔 ݁ ˖白' : ' ࣪˖ ִֶ♱ ྀིྀ黒'}
                </button>
            </div>
        </nav>
    );
}