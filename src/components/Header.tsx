import Image from "next/image";

export default function Header() {
    return (
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
    );
}