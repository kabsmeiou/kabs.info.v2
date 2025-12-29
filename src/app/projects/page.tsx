'use client';

import { useEffect, useState } from 'react';

import { fetchProjectsWithInteractions } from '../lib/fetchProjectInteractionData';
import FilterButton from '@/app/components/FilterButton';
import ProjectCard from '@/app/components/ProjectCard';

import { type Project } from "@/app/components/ProjectCard";

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[] | null>(null);

    // fetch projects with interactions on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsData = await fetchProjectsWithInteractions();
                setProjects(projectsData);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchData();
    }, []);
    

    const filteredProjects = selectedTags && selectedTags.length > 0
        ? projects.filter(project => selectedTags.every(tag => project.tags.includes(tag)))
        : projects;
    
    return (
        <section className="flex flex-col gap-y-8 py-16 px-4">
            {/* filter button */}
            <div className="flex flex-row justify-between">
                <h2 className="text-4xl font-semibold text-black dark:text-zinc-50">
                    graveyard
                </h2>
                <FilterButton
                    tags={Array.from(new Set(projects.flatMap(project => project.tags)))}
                    selectedTags={selectedTags}
                    onSelect={setSelectedTags} 
                />
            </div>

            {/* selected tags */}
            <div className="flex flex-wrap gap-2">
                {selectedTags && selectedTags.length > 0 && selectedTags.map((tag) => (
                    <span key={tag} className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                        {tag}
                    </span>
                ))}
            </div>

            {/* loop over project and use ProjectCard on grid with 2 cols*/}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* if projects.lenght > 0 */}
                {filteredProjects != undefined && filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
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