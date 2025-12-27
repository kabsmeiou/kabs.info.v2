import Navigation from '@/components/Navigation';


export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex w-full max-w-7xl flex-col">
            <Navigation />
            <section className="flex flex-col gap-y-8 py-16 px-4 md:px-16">
                {children}
            </section>
        </main>
    );
}
