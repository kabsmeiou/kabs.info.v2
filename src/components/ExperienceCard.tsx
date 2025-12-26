import MarkdownRenderer from "./MarkdownRenderer";

export interface Experience {
    role: string;
    company: string;
    duration: string;
    description: string;
    companyLogo?: string;
    companyLink?: string;
}

export default function ExperienceCard({ experience }: { experience: Experience }) {
    return (
        <div className="flex flex-row hover:border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 mb-6 gap-8">
            <div className="flex flex-col w-1/4 gap-2 items-center justify-center">
                {experience.companyLogo && (
                    <a href={experience.companyLink} target="_blank" rel="noopener noreferrer">
                        <img 
                            src={experience.companyLogo} 
                            alt={`${experience.company} Logo`} 
                            className="h-24 w-24 object-contain rounded-full"
                        />
                    </a>
                )}
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">{experience.duration}</p>   
            </div>
            <div className="flex flex-col w-3/4 gap-y-2">
                <h3 className="text-xl font-semibold text-black dark:text-zinc-50">
                    {experience.company}
                </h3>
                <h5 className="text-zinc-700 dark:text-zinc-300">
                    {experience.role}
                </h5>
                <MarkdownRenderer content={experience.description} />
                <div className="flex flex-wrap gap-2">
                    <span
                        className="text-sm bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
                    >
                        <a href={experience.companyLink} target="_blank" rel="noopener noreferrer">View website -&gt;</a>
                    </span>
                </div>
            </div>
        </div>
    );
}