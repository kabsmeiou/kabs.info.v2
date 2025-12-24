"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function ProjectView() {
    const id = useParams<{ id: string }>().slug;
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const fetchProject = async() =>  {
            console.log("Fetching project data for ID:", id);
            try {
                const response = await fetch(
                    `https://raw.githubusercontent.com/kabsmeiou/kabsmeiou.github.io/refs/heads/main/content/projects/${id}.md`
                );
                if (!response.ok) throw new Error("Failed to fetch project data");
                const contentData = await response.text();
                setContent(contentData);
            } catch (error) {
                console.error("Failed to fetch project data:", error);
                return;
            }
        };
        if (id) fetchProject();
        else console.error("No project ID provided in URL.");
    }, [id]);

    return (
        <>
            <section className="flex flex-col gap-y-8 py-16 px-4 sm:px-16 max-w-4xl mx-auto">
                <h1 className="text-4xl font-semibold text-black dark:text-zinc-50">
                    Project Title Here
                </h1>
                <MarkdownRenderer content={content} />
            </section>
        </>
    );
}