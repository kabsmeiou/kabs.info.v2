'use client';
import ProjectCard from '@/components/ProjectCard';

import { Project } from "@/components/ProjectCard";
import { useEffect, useState } from 'react';

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch(
            "https://raw.githubusercontent.com/kabsmeiou/kabsmeiou.github.io/refs/heads/main/content/projects.json"
        )
        .then((res) => res.json())
        .then((data) => {
            try {
                setProjects(data as Project[]);
            } catch (error) {
                console.error("Failed to load projects:", error);
            }
        })
    }, []);
    
    return (
        <section className="flex flex-col gap-y-8 py-16 px-4">
            {/* filter button */}
            <div className="flex flex-row justify-between">
                <h2 className="text-4xl font-semibold text-black dark:text-zinc-50">
                    graveyard
                </h2>
                <span className="self-center bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-full text-sm hover:bg-zinc-300 dark:hover:bg-zinc-700 transition text-xs">
                    {/* filter component here */}
                    filter
                </span>
            </div>
            {/* loop over project and use ProjectCard on grid with 2 cols*/}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* if projects.lenght > 0 */}

                {projects != undefined && projects.length > 0 ? (
                    projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))
                ) : (
                    <p className="text-zinc-600 dark:text-zinc-400">
                        Loading projects...
                    </p>
                )}
            </div>
        </section>
    );
}