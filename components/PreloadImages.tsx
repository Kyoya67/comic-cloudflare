'use client';

import { useEffect, useRef } from 'react';
import type { Comic } from '../types/comic';

interface PreloadImagesProps {
    comics: Comic[];
    currentIndex: number;
    preloadRange?: number;
}

export default function PreloadImages({ comics, currentIndex, preloadRange = 2 }: PreloadImagesProps) {
    const preloadedImages = useRef<Set<string>>(new Set());

    useEffect(() => {
        const start = Math.max(0, currentIndex - preloadRange);
        const end = Math.min(comics.length, currentIndex + preloadRange + 1);

        comics.slice(start, end).forEach((comic, index) => {
            if (comic.imageUrl && !preloadedImages.current.has(comic.imageUrl)) {
                const img = new window.Image();

                if (start + index === currentIndex) {
                    img.loading = 'eager';
                }

                img.onload = () => {
                    if (comic.imageUrl) {
                        preloadedImages.current.add(comic.imageUrl);
                    }
                };
                img.onerror = () => {
                    console.warn(`Failed to preload image: ${comic.imageUrl}`);
                };

                img.src = `/api/image/${comic.imageUrl}`;
            }
        });
    }, [comics, currentIndex, preloadRange]);

    return null;
} 