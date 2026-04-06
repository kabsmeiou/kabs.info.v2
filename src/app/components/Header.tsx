"use client";

import Image from "next/image";
import github from "@/app/assets/github.webp";
import { useState } from "react";

function CopyIcon({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="relative group">
            <button onClick={handleClick} className="cursor-pointer flex items-center">
                {children}
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-zinc-800 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {copied ? "Copied!" : label}
            </div>
        </div>
    );
}

export default function Header() {
    return (
        <div className="flex flex-col gap-8 justify-between w-full">
            <div className="flex flex-col items-center w-full gap-4 text-center sm:items-start sm:text-left">
              <h1 className="font-code text-left text-xl sm:text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                ˚˖𓍢ִ໋❀ kabsmeiou ⟡ ݁₊ .
              </h1>
              <p className="text-sm sm:text-lg text-justify leading-8 text-zinc-600 font-bold dark:text-zinc-100">
                &gt; I was supposed to be a 4 ft tall wizard wearing an inconceivably large pointy hat with a black cat living in a mushroom-shaped house in a forest that goes by the name of Altheragea or something of the sort, but I ended up being a software engineer in an era of code-writing machines.
              </p>
              <p className="text-sm sm:text-lg text-justify leading-8 text-zinc-600 font-bold dark:text-zinc-100">
                &gt; In any case, feel free to reach out if you want to play with me, build something cool, or research on alchemy for eternal life. ⋆˚࿔
              </p>
            </div>
            {/* some links  */}
            <div className="flex items-center justify-center gap-x-4">
                <a href="https://github.com/kabsmeiou" target="_blank" rel="noopener noreferrer">
                  <Image src={github} alt="GitHub Profile" width={32} height={32} className="rounded-md object-cover" />
                </a>
                <a href="https://instagram.com/_akabears" target="_blank" rel="noopener noreferrer">
                  <Image src="/insta.png" alt="Instagram Profile" width={32} height={32} className="rounded-md object-cover" />
                </a>
                <CopyIcon label="kabsmeiou" value="kabsmeiou">
                  <Image src="/discord.png" alt="Discord" width={32} height={32} className="rounded-md object-cover" />
                </CopyIcon>
                <a href="https://steamcommunity.com/id/kabsmeiou/" target="_blank" rel="noopener noreferrer">
                  <Image src="/steam.png" alt="Steam Profile" width={32} height={32} className="rounded-md object-cover" />
                </a>
                <a href="https://twitter.com/chtn_113" target="_blank" rel="noopener noreferrer">
                  <Image src="/twitter.png" alt="Twitter Profile" width={32} height={32} className="rounded-md object-cover" />
                </a>
                <CopyIcon label="kabs#meiou" value="kabs#meiou">
                  <Image src="/riot.png" alt="Riot Games" width={32} height={32} className="rounded-md object-cover" />
                </CopyIcon>
                <a href="https://open.spotify.com/user/qspsjuuiws83ilgixjmdol2qj" target="_blank" rel="noopener noreferrer">
                  <Image src="/spotify.png" alt="Spotify" width={32} height={32} className="rounded-md object-cover" />
                </a>
            </div>
        </div>
    );
}
