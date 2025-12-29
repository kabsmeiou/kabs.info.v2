"use client";

import { useParams } from "next/navigation";

import MarkdownRenderer from "@/app/components/MarkdownRenderer";
import useContent from "@/app/hooks/useContent";

import { type Blog } from "@/app/components/BlogCard";

export default function BlogPostPage() {
    const id = useParams<{ id: string }>().slug;
    const { data: content, metadata, loading, error } = useContent<Blog>(`https://raw.githubusercontent.com/kabsmeiou/kabsmeiou.github.io/refs/heads/main/content/blogs/${id}.md`, `https://raw.githubusercontent.com/kabsmeiou/kabsmeiou.github.io/refs/heads/main/content/blogs.json`);

    return (
        <>
            <section className="flex flex-col gap-y-8 py-16 px-4 sm:px-16 max-w-4xl mx-auto">
                <h1 className="text-4xl font-semibold text-black dark:text-zinc-50 text-center">
                    {metadata ? metadata.title : "Loading..."}
                </h1>
                <MarkdownRenderer content={content} />
            </section>
        </>
    );
}