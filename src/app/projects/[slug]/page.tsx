"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";

import { Project } from "@/components/ProjectCard";

export default function ProjectView() {
    const id = useParams<{ id: string }>().slug;
    const [content, setContent] = useState<string>("");
    const [metadata, setMetadata] = useState<Project | null>(null);

    useEffect(() => {
        const fetchProject = async() =>  {
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
            // fetch project metadata
            try {
                const response = await fetch(
                    `https://raw.githubusercontent.com/kabsmeiou/kabsmeiou.github.io/refs/heads/main/content/projects.json`
                );
                if (!response.ok) throw new Error("Failed to fetch project metadata");
                const metadata: Project[] = await response.json();
                const projectMetadata = metadata.find((project) => project.id === id) || null;
                setMetadata(projectMetadata);
            } catch (error) {
                console.error("Failed to fetch project metadata:", error);
                return;
            }
        };
        if (id) fetchProject();
        else console.error("No project ID provided in URL.");
    }, [id]);

    return (
        <>
            <section className="flex flex-col gap-y-8 py-16 px-4 sm:px-16 max-w-4xl mx-auto">
                <h1 className="text-4xl font-semibold text-black dark:text-zinc-50 text-center">
                    {metadata ? metadata.name : "Loading..."}
                </h1>
                <MarkdownRenderer content={content} />
            </section>
        </>
    );
}