import Navigation from '@/components/Navigation';


export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex w-full max-w-6xl flex-col bg-white dark:bg-black">
            <Navigation />
            <section className="flex flex-col gap-y-8 py-16 px-4 sm:px-16">
                {children}
            </section>
        </main>
    );
}
