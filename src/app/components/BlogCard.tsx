export interface Blog {
    id: string;
    title: string;
    content: string;
    coverImage?: string;
    publishedDate: string;
    lastUpdatedDate: string;
    tags?: string[];
    readTimeInMinutes?: number;
}


export default function BlogCard(props: Blog) {
    return (
        <div className="relative flex flex-col gap-y-4 rounded-xl rounded-bl-[3rem] rounded-br-[3rem] px-2 pb-4 pt-2 overflow-hidden hover:shadow-lg hover:dark:shadow-lg transition-all duration-300 cursor-pointer group">
            <a href={`/blogs/${props.id}`} className="absolute inset-0 z-20"></a>
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent transition-opacity duration-600 opacity-50 group-hover:opacity-0 pointer-events-none rounded-xl rounded-bl-[3rem] rounded-br-[3rem]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent transition-opacity duration-600 opacity-0 group-hover:opacity-50 pointer-events-none rounded-xl rounded-bl-[3rem] rounded-br-[3rem]"></div>
            <div className="relative flex flex-col box-content gap-y-2 p-4 rounded-xl z-10">
                <h3 className="font-code text-2xl font-semibold text-black dark:text-zinc-50">{props.title}</h3>
                <p className="text-zinc-700 dark:text-zinc-300">
                    {props.content.slice(0, 150)}...
                </p>
                <a href="#" className="text-[var(--color-primary)] hover:underline">
                    Read More
                </a>
                <div className="flex flex-wrap">
                    {props.tags && props.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="text-sm bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-full mr-2 mt-2"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex flex-row justify-center">
                {/* read time */}
                {props.readTimeInMinutes ? `${props.readTimeInMinutes} min read` : ''}
            </div>
        </div>
    );
}