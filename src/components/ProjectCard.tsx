

import ImageSlider from './ImageSlider';

export interface Project {
    title: string;
    description: string;
    tags: string[];
    githubLink?: string;
    sampleImages?: string[];
}

interface ProjectCardProps {
    project: Project;
}


const ProjectCard = ({
    project
}: ProjectCardProps) => {
    return (
        // card container
        <div className="flex md:flex-row flex-col rounded-lg overflow-hidden transition-shadow duration-300 relative hover:shadow-lg hover:border border-zinc-200 dark:border-zinc-800 cursor-pointer">
            <div className="absolute bottom-0 md:top-0 right-0 w-32 h-32 
                bg-gradient-to-tl md:bg-gradient-to-bl from-primary/20 to-transparent 
                rounded-tl-full md:rounded-bl-full opacity-50">
            </div>
            {/* Image Slider */}
            {project.sampleImages && project.sampleImages.length > 0 && (
                <ImageSlider images={project.sampleImages} />
            )}
            <div className='flex flex-col'>
                {/* Content Container */}
                <div className="p-6">
                    {/* Project Title */}
                    <h3 className="text-xl font-semibold mb-2 text-black dark:text-zinc-50">
                        {project.title}
                    </h3>

                    {/* Project Description */}
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-sm bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    <div className="w-full flex flex-row gap-x-8 py-2">
                        {/* interact buttons (like, cat, clap) */}
                        <span>Like</span>
                        <span>Cat</span>
                        <span>Clap </span>
                    </div>

                    {/* GitHub Link */}
                    {project.githubLink && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[var(--color-primary)] transition-colors font-medium"
                        >
                            GitHub
                        </a>
                    )}
                </div>
            </div>
            
        </div>
    );
}

export default ProjectCard;