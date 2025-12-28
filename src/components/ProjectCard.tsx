import Image from 'next/image';
import { useRef, useState, type MouseEvent } from 'react';
import ImageSlider from './ImageSlider';
import ice from "@/assets/ice.png";
import heart from "@/assets/heart.png";
import neko from "@/assets/neko.png";
import InteractButton from './InteractButton';
import { Inter } from 'next/font/google';

export interface Project {
    id: string;
    name: string;
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
    const cardRef = useRef<HTMLDivElement | null>(null);

    // pop up +1 fading animation on click of interact buttons
    const [pops, setPops] = useState<Array<{ id: string; x: number; y: number; text: string }>>([]);
    
    // interact counts (dummy state for now)
    const [likeCount, setLikeCount] = useState(0);
    const [catproveCount, setCatproveCount] = useState(0);
    const [coolCount, setCoolCount] = useState(0);

    const handleInteractClick = (type: string, e: MouseEvent) => {
        // compute click position relative to card so we can position the +1
        const rect = cardRef.current?.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;

        const x = rect ? clientX - rect.left : 0;
        const y = rect ? clientY - rect.top : 0;

        const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const newPop = { id, x, y, text: '+1' };

        setPops((s) => [...s, newPop]);

        // remove after animation (matches globals.css 700ms)
        setTimeout(() => {
            setPops((s) => s.filter((p) => p.id !== id));
        }, 750);

        // update interact counts (dummy logic for now)
        if (type === 'like') setLikeCount((c) => c + 1);
        else if (type === 'catprove') setCatproveCount((c) => c + 1);
        else if (type === 'cool') setCoolCount((c) => c + 1);
    };

    return (
        // card container
        <div ref={cardRef} className="flex md:flex-row flex-col rounded-lg overflow-hidden transition-shadow duration-300 relative hover:shadow-lg hover:border border-zinc-200 dark:border-zinc-800 cursor-pointer">
            {/* animated +1 pops */}
            {pops.map((p) => (
                <span
                    key={p.id}
                    className="pop-up pop-text text-[var(--color-primary)] dark:text-white z-40"
                    style={{ left: `${p.x}px`, top: `${p.y}px` }}
                >
                    {p.text}
                </span>
            ))}
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
                            interactCount={likeCount}
                            handleInteractClick={handleInteractClick}
                        />
                        <InteractButton
                            buttonType='catprove'
                            interactCount={catproveCount}
                            handleInteractClick={handleInteractClick}
                        />
                        <InteractButton
                            buttonType='cool'
                            interactCount={coolCount}
                            handleInteractClick={handleInteractClick}
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