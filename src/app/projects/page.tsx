'use client';
import ProjectCard from '@/components/ProjectCard';
import { Project } from "@/components/ProjectCard";
import { useEffect, useState } from 'react';
import FilterButton from '@/components/FilterButton';
import fetchList from '@/api/contentApi';

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[] | null>(null);

    useEffect(() => {
    const fetchProjects = async () => {
        try {
            const projectsData = await fetchList<Project>(
                'https://raw.githubusercontent.com/kabsmeiou/kabsmeiou.github.io/refs/heads/main/content/projects.json'
            );

            const ids = projectsData.map(project => project.id);
            const query = ids.map(id => `id=${id}`).join('&');

            const res = await fetch(`/api/supabase?${query}`);
            if (!res.ok) throw new Error("Failed to fetch interactions data");

            const interactionsData = await res.json();

            // normalize then merge with content data
            const interactionMap: Record<string, any> = {};
            interactionsData.forEach((row: any) => {
                interactionMap[row.card_id] = row;
            });

            const mergedProjects = projectsData.map(project => {
                const interaction = interactionMap[project.id];

                return {
                ...project,
                likeCount: interaction?.like_count ?? 0,
                catproveCount: interaction?.catprove_count ?? 0,
                coolCount: interaction?.cool_count ?? 0,
                };
            });

            setProjects(mergedProjects);
        } catch (error) {
            console.error("Error fetching projects/interactions:", error);
        }
    };

    fetchProjects();
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