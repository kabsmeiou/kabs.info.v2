"use client";
import { useEffect, useState } from "react";
import GithubChart from "@/components/Github";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import ExperienceCard from "@/components/ExperienceCard";
import { Experience } from "@/components/ExperienceCard";
import { Project } from "@/components/ProjectCard";

import fetchList from "@/api/contentApi";

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  
  // fetch experiences from experiences.json
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const experiencesData = await fetchList<Experience>('https://raw.githubusercontent.com/kabsmeiou/kabsmeiou.github.io/refs/heads/main/content/experiences.json');
        setExperiences(experiencesData);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };
    fetchExperiences();
  }, []);

  // fetch 2 recent projects from projects.json
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        const projectsData = await fetchList<Project>('https://raw.githubusercontent.com/kabsmeiou/kabsmeiou.github.io/refs/heads/main/content/projects.json');
        setRecentProjects(projectsData.slice(0, 2)); // get first 2 projects
      } catch (error) {
        console.error("Error fetching recent projects:", error);
      }
    };
    fetchRecentProjects();
  }, []);

  return (
      <main className="flex w-full max-w-4xl flex-col bg-white dark:bg-black">
        <Navigation />
        {/* hero: (until the github chart) */}
        <section className="flex min-h-screen flex-col items-center sm:items-start space-y-16 px-4 py-32 sm:px-16">
          <Header />
          {/* GitHub Chart - mt-auto pushes this to the bottom of the section */}
          <div className="w-full sm:mt-auto sm:pt-12">
            <GithubChart />
          </div>
        </section>

        {/* SECTION 2: Below the fold */}
        <section className="flex flex-col gap-y-8 py-16 px-4 sm:px-16">
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
          {recentProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>

        {/* Experiences section */}
        <section className="flex flex-col gap-8 py-16 px-4 sm:px-16">
          <h2 className="text-3xl font-semibold mb-4 text-black dark:text-zinc-50">
            Experience
          </h2>
          {experiences.map(experience => (
            <ExperienceCard key={experience.company} experience={experience} />
          ))}
        </section>

        {/* about me */}
        <section className="flex flex-col gap-8 py-16 px-4 sm:px-16">
          <h2 className="text-3xl font-semibold mb-4 text-black dark:text-zinc-50">
              Why I do what I do
          </h2>
          <div className="px-4 border-l ">

          </div>
        </section>
      </main>
  );
}