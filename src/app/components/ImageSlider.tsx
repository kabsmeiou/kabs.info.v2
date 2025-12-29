'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";

interface ImageSliderProps {
    images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || images.length === 0) return;

        let scrollPosition = 0;
        const scrollSpeed = 1; // pixels per frame
        let animationFrameId: number;

        const scroll = () => {
            if (scrollContainer) {
                scrollPosition += scrollSpeed;
                
                // Reset scroll position when reaching the middle (where duplication starts)
                const maxScroll = scrollContainer.scrollWidth / 2;
                if (scrollPosition >= maxScroll) {
                    scrollPosition = 0;
                }
                
                scrollContainer.scrollLeft = scrollPosition;
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [images]);

    if (!images || images.length === 0) return null;

    // Duplicate images for seamless loop
    const duplicatedImages = [...images, ...images];

    return (
        <div className="relative w-full md:w-80 h-48 overflow-hidden rounded-lg">
            <div 
                ref={scrollRef}
                className="flex flex-row overflow-x-hidden h-full"
                style={{ scrollBehavior: 'auto' }}
            >
                {duplicatedImages.map((src, index) => (
                    <div key={index} className="flex-shrink-0 w-80 h-full relative">
                        <Image 
                            src={src} 
                            alt={`Project Image ${(index % images.length) + 1}`} 
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>  
    );
}