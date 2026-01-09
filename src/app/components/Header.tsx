import Image from "next/image";

import linkedin from "@/app/assets/linkedin.webp";
import github from "@/app/assets/github.webp";

export default function Header() {
    return (
        <div className="flex flex-col gap-8 justify-between w-full">
            <div className="flex flex-col items-center w-full gap-4 text-center sm:items-start sm:text-left">
              <h1 className="font-code text-left text-xl sm:text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                ˚˖𓍢ִ໋❀ Christian Cabral ⟡ ݁₊ .
              </h1>
              <p className="text-sm sm:text-lg text-justify leading-8 text-zinc-600 font-bold dark:text-zinc-100">
                &gt; I was supposed to be a 4 ft tall wizard wearing an inconceivably large pointy hat with a helper black cat living in a mushroom-shaped house in a forest that goes by the name of Altheragea or something of the sort, but I ended up being a software engineer in an era of code-writing machines. 
              </p>
              <p className="text-sm sm:text-lg text-justify leading-8 text-zinc-900 font-bold dark:text-zinc-100">
                &gt; In any case, feel free to send an electronic mail for collaborations, projects, or research on alchemy for eternal life. ⋆˚࿔
              </p>
            </div>
            {/* some links  */}
            <div className="flex items-center justify-center md:justify-start gap-x-4">
                {/* Resume Link */}
                <a
                    href="https://kabsmeiou.github.io/content/pdf/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-code font-bold rounded-lg px-4 py-2 dark:text-white text-black border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                >
                    tale_of_service.resume
                </a>
                <a href="https://github.com/kabsmeiou" target="_blank" rel="noopener noreferrer">
                  <Image src={github} alt="GitHub Profile" width={32} height={32} className="rounded-md object-cover" />
                  
                </a>
                <a href="https://ph.linkedin.com/in/cvcabral" target="_blank" rel="noopener noreferrer">
                  <Image src={linkedin} alt="LinkedIn Profile" width={32} height={32} className="rounded-md object-cover" />
                </a>
            </div>
        </div>
    );
}