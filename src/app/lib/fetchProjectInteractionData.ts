import fetchList from "@/app/lib/fetchList";

import { Project } from "@/app/components/ProjectCard";

export async function fetchProjectsWithInteractions(
    limit?: number,
) {
    // fetch base projects
    const projectsData = await fetchList<Project>(
        "https://raw.githubusercontent.com/kabsmeiou/kabsmeiou.github.io/refs/heads/main/content/projects.json"
    );

    // build query
    const ids = projectsData.map(project => project.id);
    const limitedIds = limit ? ids.slice(0, limit) : ids;
    const query = limitedIds.map(id => `id=${id}`).join("&");

    // fetch interactions
    const res = await fetch(`/api/supabase?${query}`);
    if (!res.ok) throw new Error("Failed to fetch interactions data");

    const interactionsData = await res.json();

    // normalize by card_id
    const interactionMap: Record<string, any> = {};
        interactionsData.forEach((row: any) => {
        interactionMap[row.card_id] = row;
    });

    // remove unneeded projects if limit is set before mapping
    if (limit) {
        projectsData.splice(limit);
    }
    return projectsData.map(project => {
        const interaction = interactionMap[project.id];

        return {
            ...project,
            likeCount: interaction?.like_count ?? 0,
            catproveCount: interaction?.catprove_count ?? 0,
            coolCount: interaction?.cool_count ?? 0,
        };
    });
}