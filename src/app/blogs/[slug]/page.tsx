"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import MarkdownRenderer from "@/app/components/MarkdownRenderer";
import InteractButton from "@/app/components/InteractButton";
import useContent from "@/app/hooks/useContent";

import { type Blog } from "@/app/components/BlogCard";

export default function BlogPostPage() {
    const id = useParams<{
        slug: any; id: string
    }>().slug;
    const { data: content, metadata } = useContent<Blog>(`https://raw.githubusercontent.com/kabsmeiou/kabsmeiou.github.io/refs/heads/main/content/blogs/${id}.md`, `https://raw.githubusercontent.com/kabsmeiou/kabsmeiou.github.io/refs/heads/main/content/blogs.json`);

    const [likeCount, setLikeCount] = useState(0);
    const [catproveCount, setCatproveCount] = useState(0);
    const [coolCount, setCoolCount] = useState(0);

    useEffect(() => {
        if (!id) return;
        fetch(`/api/supabase?id=${id}`)
            .then(res => res.json())
            .then(data => {
                const row = data?.[0];
                if (row) {
                    setLikeCount(row.like_count ?? 0);
                    setCatproveCount(row.catprove_count ?? 0);
                    setCoolCount(row.cool_count ?? 0);
                }
            })
            .catch(() => {});
    }, [id]);

    return (
        <>
            <section className="flex flex-col gap-y-8 py-16 px-4 sm:px-16 w-full max-w-4xl mx-auto">
                <h1 className="text-4xl font-semibold text-black dark:text-zinc-50 text-center">
                    {metadata ? metadata.title : "Loading..."}
                </h1>
                <MarkdownRenderer content={content} />
                <div className="flex flex-wrap gap-x-8 gap-y-3 py-2 px-4 items-center">
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        Did you like this post? Let me know!
                    </p>
                    <InteractButton buttonType="like" cardId={id} setCount={setLikeCount} count={likeCount} />
                    <InteractButton buttonType="catprove" cardId={id} setCount={setCatproveCount} count={catproveCount} />
                    <InteractButton buttonType="cool" cardId={id} setCount={setCoolCount} count={coolCount} />
                </div>
            </section>
        </>
    );
}