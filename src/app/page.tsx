import GithubChart from "@/components/Github";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import ExperienceCard from "@/components/ExperienceCard";


import { Project } from "@/components/ProjectCard";


// sample project
const sampleProject: Project = {
    title: "Sample Project",
    description: "This is a sample project description. This project showcases the use of React and TypeScript in building a modern web application.",
    tags: ["React", "TypeScript", "TailwindCSS"],
    githubLink: "https://github.com/sample/sample-project",
    sampleImages: ["/image1.jpg", "/image1.jpg"]
};

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-4xl flex-col bg-white dark:bg-black">
        <Navigation />
        {/* hero: (until the github chart) */}
        <section className="flex min-h-screen flex-col items-center sm:items-start px-4 py-32 sm:px-16">
          <Header />
          {/* Resume Link */}
          <a
            href="/Christian_Cabral_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 rounded-lg px-4 py-2 dark:text-white text-black border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            resume.pdf
          </a>
          {/* GitHub Chart - mt-auto pushes this to the bottom of the section */}
          <div className="w-full mt-4 sm:mt-auto sm:pt-12">
            <GithubChart />
          </div>
        </section>

        {/* SECTION 2: Below the fold */}
        <section className="flex flex-col gap-y-8 py-32 px-16 border-t border-zinc-100 dark:border-zinc-900">
          <div className="flex flex-row justify-between">
            <h2 className="text-3xl font-semibold text-black dark:text-zinc-50">
              Current Projects
            </h2>
            <span className="self-center bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-full text-sm hover:bg-zinc-300 dark:hover:bg-zinc-700 transition text-xs">
              <a href="#projects" className="text-zinc-700 dark:text-zinc-300 hover:text-[var(--color-primary)] transition-colors">See all -&gt;</a>
            </span>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            I like working on interesting and cool projects, but I also tackle not so glamorous tasks as I believe they are essential for my growth as a software engineer! I write code as a way to express my desire to make my ideas come to life and appreciate the time I have in this world. If you find my work helpful in any way, do give it a like or two!
          </p>
          <ProjectCard project={sampleProject} />
        </section>

        {/* Experiences section */}
        <section className="flex flex-col gap-8 py-32 px-16 border-t border-zinc-100 dark:border-zinc-900">
          <h2 className="text-3xl font-semibold mb-4 text-black dark:text-zinc-50">
            Experience
          </h2>
          <ExperienceCard 
            experience={{
              role: "Software Engineer",
              company: "Tech Corp",
              duration: "Jan 2020 - Present",
              description: "Working on various web development projects using modern technologies.",
              companyLogo: "https://via.placeholder.com/100",
              companyLink: "https://techcorp.com"
            }} 
          />
        </section>

        {/* about me */}
        <section className="flex flex-col gap-8 py-32 px-16 border-t border-zinc-100 dark:border-zinc-900">
          <h2 className="text-3xl font-semibold mb-4 text-black dark:text-zinc-50">
              Why I do what I do
          </h2>
          <div className="px-4 border-l ">

          </div>
        </section>
      </main>
    </div>
  );
}