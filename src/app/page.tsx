"use client";

import { useEffect, useState } from "react";

import { fetchProjectsWithInteractions } from "./lib/fetchProjectInteractionData";
import GithubChart from "@/app/components/Github";
import Header from "@/app/components/Header";
import Navigation from "@/app/components/Navigation";
import ProjectCard from "@/app/components/ProjectCard";
import Loading from "@/app/components/Loading";

import { type Project } from "@/app/components/ProjectCard";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        const projectsData = await fetchProjectsWithInteractions(2); // sliced to 2 recent projects
        setRecentProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
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
          <div className="font-code grid grid-cols-2 sm:grid-cols-2 gap-4 mt-12 w-full">
            <p className="text-zinc-600 dark:text-zinc-400">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">Main Interests</span><br></br>
              &gt; cool stuff (and space things) / reading / gaming
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">Sports</span><br></br>
              &gt; basketball / running / afternoon walks
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">Video Games I play (last 30 days)</span>
              <br></br>
              &gt; valorant / apex legends / marvel rivals / osu!
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">Languages</span><br></br>
              &gt; English / Filipino / Bicol / Japanese (Hiragana / Basic Conversation)
              <br></br>
              &gt; currently learning Japanese (Katakana)
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">Others</span>
              <br></br>
              &gt; chess peak ratings | blitz 1600 | bullet 1700 | rapid 1500
              <br></br>
              &gt; competitive programming | codeforces 1200
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">Music</span><br></br>
              &gt; piano / chopin / rhythm games (osu!)
            </p>
          </div>  
        </section>
        {/* <div className="w-full sm:mt-auto">
          <GithubChart />
        </div> */}
        {/* SECTION 2: Below the fold */}
        <section className="flex flex-col gap-y-8 py-16 px-4 sm:px-16">
          <div className="flex flex-row justify-between">
            <h2 className="font-code text-3xl font-semibold text-black dark:text-zinc-50">
              recent workshop affairs
            </h2>
            <span className="self-center bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-full text-sm hover:bg-zinc-300 dark:hover:bg-zinc-700 transition text-xs">
              <a href="#projects" className="text-zinc-700 dark:text-zinc-300 hover:text-[var(--color-primary)] transition-colors">peek ⊱  ۫ ׅ ✧</a>
            </span>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            &gt; I like working on interesting and cool projects, but I also keep myself busy with trivial tasks as I believe they are essential for my growth as a software engineer - that's what my dreams have told me. I write code as a way to express my desire to make my ideas come to life and possibly make it a career to fund my research for the elixir of eternal life. If you find my work helpful in any way, do give it a like or two! or pay me to write some magic for you ⋆✴︎˚｡⋆
          </p>
          { isLoading && 
            <Loading />
          }
          {recentProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
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