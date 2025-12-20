import Image from "next/image";
import GithubChart from "../components/Github";


export default function Home() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-4xl flex-col bg-white dark:bg-black">
        
        {/* hero: (until the github chart) */}
        <section className="flex min-h-screen flex-col items-center sm:items-start py-32 px-16">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between w-full">
            <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left">
              <h1 className="max-w-xs text-left text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                Christian Cabral
              </h1>
              <p className="max-w-md text-justify text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Your local software engineer that lives in the cloud. Feel free to send an email or message on LinkedIn for collaborations or projects! Nice to have you around.
              </p>
            </div>
            
            {/* Profile Images */}
            <div className="flex items-center gap-2">
              <div className="relative h-20 w-20 shadow-inner rounded-md bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <Image src="/profile.jpg" alt="Profile Picture" width={80} height={80} className="rounded-md object-cover" />
              </div>
              <div className="relative h-20 w-20 shadow-inner rounded-md bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <Image src="/profile.jpg" alt="Profile Picture" width={80} height={80} className="rounded-md object-cover" />
              </div>  
            </div>
          </div>

          {/* Resume Link */}
          <div className="mt-8">
          <a
            href="/Christian_Cabral_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-4 py-2 dark:text-white text-black border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            resume.pdf
          </a>
          </div>

          {/* GitHub Chart - mt-auto pushes this to the bottom of the section */}
          <div className="w-full mt-auto pt-12">
            <GithubChart />
          </div>
        </section>

        {/* SECTION 2: Below the fold */}
        <section className="min-h-screen py-32 px-16 border-t border-zinc-100 dark:border-zinc-900">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
            Current Projects
          </h2>
          {/* Your project grid will go here */}
        </section>

      </main>
    </div>
  );
}