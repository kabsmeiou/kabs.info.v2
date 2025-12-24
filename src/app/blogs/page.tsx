import BlogCard from "@/components/BlogCard";

import { type Blog } from "@/components/BlogCard";

const sampleBlogCard: Blog[] = [
    {
    id: "1",
    title: "Sample Blog Post",
    content: "This is a sample blog post content. It provides insights into various topics related to software development, technology trends, and personal experiences in the tech industry.",
    publishedDate: "2024-01-01",
    lastUpdatedDate: "2024-01-02",
    tags: ["Tech", "Development", "Personal"],
    readTimeInMinutes: 5
    },
    {
    id: "2",
    title: "Another Blog Post",
    content: "This is another sample blog post content. It delves into advanced programming concepts, best practices, and tips for aspiring developers looking to enhance their skills.",
    publishedDate: "2024-02-15",
    lastUpdatedDate: "2024-02-16",
    tags: ["Programming", "Best Practices"],
    readTimeInMinutes: 8
    }
];


export default function Blog() {
    return (
        <>
            <h1 className="text-4xl font-bold text-black dark:text-zinc-50">i might write here, sometimes.</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleBlogCard.map((blog, index) => (
                    <BlogCard key={index} {...blog} />
                ))}
            </div>
        </>
    );
}