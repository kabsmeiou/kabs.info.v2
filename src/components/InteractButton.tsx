import Image from "next/image";
import heart from "@/assets/heart.png";
import neko from "@/assets/neko.png";
import ice from "@/assets/ice.png";

interface InteractButtonProps {
    buttonType: string;
    interactCount: number;
    handleInteractClick: (type: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// three interact buttons: like, catprove, cool. render counts next to each button
// and add tooltip on hover for each button
export default function InteractButton({
    buttonType,
    interactCount,
    handleInteractClick
}: InteractButtonProps) {

    // buttonType mapping to image and tooltip text
    const buttonData = {
        like: { image: heart, alt: "heart", tooltip: "Like"},
        catprove: { image: neko, alt: "catprove", tooltip: "Catprove" },
        cool: { image: ice, alt: "cool", tooltip: "Cool" }
    }[buttonType];

    return (
        <div className='flex flex-row gap-2 p-2 items-center select-none' onClick={(e) => handleInteractClick(buttonType, e)}>
            <div className="relative group inline-flex">
                <Image src={buttonData!.image} alt={buttonData!.alt} className='w-6 h-6' />
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs bg-zinc-900 text-white opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity dark:bg-zinc-100 dark:text-black">
                    {buttonData!.tooltip}
                </span>
            </div>
            <p>{interactCount > 1000 ? `1k+` : interactCount}</p>
        </div>
    );
}