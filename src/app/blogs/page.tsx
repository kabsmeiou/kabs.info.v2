"use client";
import { useEffect, useState} from "react";
import fetchList from "@/api/contentApi";
import BlogCard from "@/components/BlogCard";


import { type Blog } from "@/components/BlogCard";


// to refactor fetching logic because its similar to projects fetching.
// todo: create a custom hook for fetching blogs and projects.
// params: either "blogs" or "projects" URL to determine which to fetch and the state setter functions

export default function Blog() {
    // call contentApi fetchList
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogsData = await fetchList<Blog>('https://raw.githubusercontent.com/kabsmeiou/kabsmeiou.github.io/refs/heads/main/content/blogs.json');
                setBlogs(blogsData);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <section className="flex flex-col gap-y-8 py-16 px-4">
            <h1 className="text-4xl font-bold text-black dark:text-zinc-50">i might write here, sometimes.</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {blogs.map((blog, index) => (
                    <BlogCard key={index} {...blog} />
                ))}
            </div>
        </section>

    );
}