import Navigation from '@/components/Navigation';
import ProjectCard from '@/components/ProjectCard';

import { Project } from "@/components/ProjectCard";

const sampleProject: Project[] = [
    {
        title: "Sample Project",
        description: "This is a sample project description. This project showcases the use of React and TypeScript in building a modern web application.",
        tags: ["React", "TypeScript", "TailwindCSS"],
        githubLink: ""
    }, {
        title: "Another Project",
        description: "This is another sample project description. This project focuses on backend development using Node.js and Express.",
        tags: ["Node.js", "Express", "MongoDB"],
        githubLink: ""
    }
];

export default function Projects() {
    return (
        <main className="flex w-full max-w-6xl flex-col bg-white dark:bg-black">
            <Navigation />
            <section className="flex flex-col gap-y-8 py-16 px-4 sm:px-16">
                {/* filter button */}
                <div className="flex flex-row justify-between">
                    <h2 className="text-3xl font-semibold text-black dark:text-zinc-50">
                        All Projects
                    </h2>
                    <span className="self-center bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-full text-sm hover:bg-zinc-300 dark:hover:bg-zinc-700 transition text-xs">
                        {/* filter component here */}
                        filter
                    </span>
                </div>
                {/* loop over project and use ProjectCard on grid with 2 cols*/}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {sampleProject.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </section>
        </main>
    );
}