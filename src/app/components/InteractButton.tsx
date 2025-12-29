"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import heart from "@/app/assets/heart.webp";
import neko from "@/app/assets/neko.webp";
import ice from "@/app/assets/ice.webp";

interface InteractButtonProps {
    buttonType: string;
    cardRef?: React.RefObject<HTMLDivElement | null>;
    cardId: string;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    count: number;
}

// render once every card, remove the singular rendering for each button
// or find a way to call db only once per card
// call all stats for every project then just pass as props to render the project_id values

// three interact buttons: like, catprove, cool. render counts next to each button
// and add tooltip on hover for each button
export default function InteractButton({
    buttonType,
    cardRef,
    cardId,
    setCount,
    count
}: InteractButtonProps) {

    const handleInteractClick = async (type: string, e: React.MouseEvent<HTMLDivElement>) => {
        // compute click position relative to the clicked button so the pop positions correctly
        const targetRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;

        // position inside the button wrapper
        const x = clientX - targetRect.left;
        const y = clientY - targetRect.top;

        const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const newPop = { id, x, y, text: '+1' };

        setPops((s) => [...s, newPop]);

        // remove after animation (matches globals.css 700ms)
        setTimeout(() => {
            setPops((s) => s.filter((p) => p.id !== id));
        }, 750);

        // Optimistically update the state
        setCount((c) => c + 1);
        if (count >= 1001) return; // prevent further increments if already 1k+
        try {
            const res = await fetch('/api/supabase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cardId: cardId, // the current card
                    type,
                }),
            });

            if (!res.ok) {
            throw new Error('Failed to increment counter');
            }

            const data = await res.json();
            console.log('Updated counter:', data);
        } catch (error) {
            console.error(error);

            // Optional rollback
            setCount((c) => c - 1);
        }
    };

    // pop up +1 fading animation on click of interact buttons
    const [pops, setPops] = useState<Array<{ id: string; x: number; y: number; text: string }>>([]);
    
    // buttonType mapping to image and tooltip text
    const buttonData = {
        like: { image: heart, alt: "heart", tooltip: "Like" },
        catprove: { image: neko, alt: "catprove", tooltip: "Catprove" },
        cool: { image: ice, alt: "cool", tooltip: "Cool" }
    }[buttonType];

    return (
        // use cardRef 
        <div className='relative flex flex-row gap-2 p-2 items-center select-none' onClick={(e) => handleInteractClick(buttonType, e)}>
            {/* animated +1 pops */}
            {pops.map((p) => (
                <span
                    key={p.id}
                    className="pop-up pop-text text-[var(--color-primary)] dark:text-white z-40"
                    style={{ left: `${p.x}px`, top: `${p.y}px` }}
                >
                    {p.text}
                </span>
            ))} 
            <div className="relative group inline-flex">
                <Image src={buttonData!.image} alt={buttonData!.alt} className='w-6 h-6' />
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs bg-zinc-900 text-white opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity dark:bg-zinc-100 dark:text-black">
                    {buttonData!.tooltip}
                </span>
            </div>
            <p>{count > 1000 ? `1k+` : count}</p>
        </div>
    );
}