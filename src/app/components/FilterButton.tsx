'use client';

import { useState } from 'react';

export default function FilterButton({ tags, selectedTags = [], onSelect }: { tags: string[]; selectedTags?: string[] | null; onSelect: (selected: string[]) => void }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // toggle a tag in the selectedTags array and notify parent
    const handleSelect = (tag: string) => {
        const current = new Set(selectedTags ?? []);
        if (current.has(tag)) current.delete(tag);
        else current.add(tag);

        const next = Array.from(current);
        onSelect(next);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-full text-sm hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
            >
                Filter
            </button>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-zinc-900 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                        {tags.map((tag) => {
                            const selected = (selectedTags ?? []).includes(tag);
                            return (
                                <button
                                    key={tag}
                                    onClick={() => handleSelect(tag)}
                                    aria-pressed={selected}
                                    className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm transition ${selected ? 'bg-primary text-white dark:bg-primary/80 dark:text-white' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                                >
                                    <span className="w-4 text-xs" aria-hidden>
                                        {selected ? '✓' : ''}
                                    </span>
                                    <span>{tag}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}