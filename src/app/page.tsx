"use client";

import { useEffect, useState } from "react";

import ExperienceCard from "@/app/components/ExperienceCard";
import { fetchProjectsWithInteractions } from "./lib/fetchProjectInteractionData";
import fetchList from "@/app/lib/fetchList";
import GithubChart from "@/app/components/Github";
import Header from "@/app/components/Header";
import Navigation from "@/app/components/Navigation";
import ProjectCard from "@/app/components/ProjectCard";

import { type Experience } from "@/app/components/ExperienceCard";
import { type Project } from "@/app/components/ProjectCard";

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

  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        const projectsData = await fetchProjectsWithInteractions(2); // sliced to 2 recent projects
        setRecentProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchRecentProjects();
  }, []);

  return (
      <main className="flex w-full max-w-4xl flex-col">
        <Navigation />
        {/* hero: (until the github chart) */}
        <section className="flex min-h-screen flex-col items-center sm:items-start px-4 py-24 md:py-28 sm:px-16">
          <Header />
          <div className="font-code grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12 w-full">
            <p className="text-zinc-600 dark:text-zinc-400">
              &gt; python / fastapi / django
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              &gt; typescript / nextjs / react
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              &gt; ml / pytorch / tensorflow
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              &gt; docker / aws / k8s
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              &gt; llms / mcp / rag
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              &gt; cpp / c# / c major♪
            </p>
          </div>
        </section>
        <div className="w-full sm:mt-auto">
          <GithubChart />
        </div>
        {/* SECTION 2: Below the fold */}
        <section className="flex flex-col gap-y-8 py-16 px-4 sm:px-16">
          <div className="flex flex-row justify-between">
            <h2 className="font-code text-3xl font-semibold text-black dark:text-zinc-50">
              ongoing workshop affairs
            </h2>
            <span className="self-center bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-full text-sm hover:bg-zinc-300 dark:hover:bg-zinc-700 transition text-xs">
              <a href="#projects" className="text-zinc-700 dark:text-zinc-300 hover:text-[var(--color-primary)] transition-colors">peek ⊱  ۫ ׅ ✧</a>
            </span>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            &gt; I like working on interesting and cool projects, but I also keep myself busy with trivial tasks as I believe they are essential for my growth as a software engineer - that's what my dreams have told me. I write code as a way to express my desire to make my ideas come to life and possibly make it a career to fund my research for the elixir of eternal life. If you find my work helpful in any way, do give it a like or two! or pay me to write some magic for you ⋆✴︎˚｡⋆
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
        {/* <section className="flex flex-col gap-8 py-16 px-4 sm:px-16">
          <h2 className="text-3xl font-semibold mb-4 text-black dark:text-zinc-50">
              Why I do what I do
          </h2>
          <div className="px-4 border-l ">

          </div>
        </section> */}
      </main>
  );
}