import Navigation from "@/components/Navigation";
import BlogCard from "@/components/BlogCard";

import { type Blog } from "@/components/BlogCard";

const sampleBlogCard: Blog[] = [
    {
    title: "Sample Blog Post",
    content: "This is a sample blog post content. It provides insights into various topics related to software development, technology trends, and personal experiences in the tech industry.",
    publishedDate: "2024-01-01",
    lastUpdatedDate: "2024-01-02",
    tags: ["Tech", "Development", "Personal"],
    readTimeInMinutes: 5
    }
];


export default function Blog() {
    return (
        <main className="flex w-full max-w-6xl flex-col bg-white dark:bg-black">
            <Navigation />
            <section className="flex flex-col gap-y-8 py-16 px-4 sm:px-16">
                <h1 className="text-4xl font-bold text-black dark:text-zinc-50">i might write here, sometimes.</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sampleBlogCard.map((blog, index) => (
                        <BlogCard key={index} {...blog} />
                    ))}
                </div>
            </section>
        </main>
    );
}