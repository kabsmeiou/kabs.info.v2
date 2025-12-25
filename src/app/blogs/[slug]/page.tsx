// /blog/[id] route
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";

import { Blog } from "@/components/BlogCard";

export default function BlogPostPage() {
    const id = useParams<{ id: string }>().slug;
    const [content, setContent] = useState<string>("");
    const [metadata, setMetadata] = useState<Blog | null>(null);

    useEffect(() => {
        const fetchBlog = async() =>  {
            console.log("Fetching blog data for ID:", id);
            try {
                const response = await fetch(
                    `https://raw.githubusercontent.com/kabsmeiou/kabsmeiou.github.io/refs/heads/main/content/blogs/${id}.md`
                );
                if (!response.ok) throw new Error("Failed to fetch blog data");
                const contentData = await response.text();
                setContent(contentData);
            } catch (error) {
                console.error("Failed to fetch blog data:", error);
                return;
            }
            // fetch blog metadata
            try {
                const response = await fetch(
                    `https://raw.githubusercontent.com/kabsmeiou/kabsmeiou.github.io/refs/heads/main/content/blogs.json`
                );
                if (!response.ok) throw new Error("Failed to fetch blog metadata");
                const metadata: Blog[] = await response.json();
                const blogMeta = metadata.find((blog) => blog.id === id) || null;
                setMetadata(blogMeta);
            } catch (error) {
                console.error("Failed to fetch blog metadata:", error);
                return;
            }
        };
        if (id) fetchBlog();
        else console.error("No blog ID provided in URL.");
    }, [id]);

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