

export default function Navigation() {
    return (
        <nav className="absolute sticky top-0 mx-auto max-w-4xl w-full py-4 px-8 border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
            <div className="text-xl font-semibold text-black dark:text-zinc-50">
                Kabs.info
            </div>
            <div className="flex space-x-12">
                <a href="/projects" className="text-zinc-700 dark:text-zinc-300 hover:text-[var(--color-primary)] transition-colors">
                    Projects
                </a>
                <a href="#contact" className="text-zinc-700 dark:text-zinc-300 hover:text-[var(--color-primary)] transition-colors">
                    Blog
                </a>
            </div>
        </nav>
    );
}