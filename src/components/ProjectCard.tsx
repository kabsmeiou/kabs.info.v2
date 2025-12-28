import { useRef, useState } from 'react';
import ImageSlider from './ImageSlider';
import InteractButton from './InteractButton';


export interface Project {
    id: string;
    name: string;
    description: string;
    tags: string[];
    githubLink?: string;
    sampleImages?: string[];
    likeCount?: number;
    catproveCount?: number;
    coolCount?: number;
}

interface ProjectCardProps {
    project: Project;
}


const ProjectCard = ({
    project
}: ProjectCardProps) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [likeCount, setLikeCount] = useState(project.likeCount ?? 0);
    const [catproveCount, setCatproveCount] = useState(project.catproveCount ?? 0);
    const [coolCount, setCoolCount] = useState(project.coolCount ?? 0);

    return (
        // card container
        <div ref={cardRef} className="flex md:flex-row flex-col rounded-lg overflow-hidden transition-shadow duration-300 relative hover:shadow-lg hover:border border-zinc-200 dark:border-zinc-800 cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full opacity-50 z-20 pointer-events-none">
            </div>
            {/* Image Slider */}
            {project.sampleImages && project.sampleImages.length > 0 && (
                <ImageSlider images={project.sampleImages} />
            )}
            <div className='flex flex-col relative z-30'>
                {/* Content Container */}
                <div className="flex flex-col p-6">
                    
                    {/* Project Title */}
                    <a href={`/projects/${project.id}`} className="text-xl font-semibold mb-2 text-black dark:text-zinc-50">
                        {project.name}
                    </a>

                    {/* Project Description */}
                    <a href={`/projects/${project.id}`} className="text-zinc-600 dark:text-zinc-400 mb-4">
                        {project.description}
                    </a>

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
                        {/* interact buttons (heart, cat, cool) */}
                        <InteractButton
                            buttonType='like'
                            cardRef={cardRef}
                            cardId={project.id}
                            setCount={setLikeCount}
                            count={likeCount}
                        />
                        <InteractButton
                            buttonType='catprove'
                            cardRef={cardRef}
                            cardId={project.id}
                            setCount={setCatproveCount}
                            count={catproveCount}
                        />
                        <InteractButton
                            buttonType='cool'
                            cardRef={cardRef}
                            cardId={project.id}
                            setCount={setCoolCount}
                            count={coolCount}
                        />
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