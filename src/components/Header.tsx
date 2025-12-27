import Image from "next/image";

import github from "@/assets/github.png";
import linkedin from "@/assets/linkedin.png";

export default function Header() {
    return (
        <div className="flex flex-col gap-8 justify-between w-full">
            <div className="flex flex-col items-center w-full gap-4 text-center sm:items-start sm:text-left">
              <h1 className="text-left text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                Christian Cabral
              </h1>
              <p className="text-justify text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Your local software engineer that lives in the cloud. Feel free to send an email or message on LinkedIn for collaborations or projects! Nice to have you around.
              </p>
            </div>
            {/* some links  */}
            <div className="flex items-center justify-center md:justify-start gap-x-4">
                {/* Resume Link */}
                <a
                    href="/Christian_Cabral_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg px-4 py-2 dark:text-white text-black border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                >
                    resume.pdf
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