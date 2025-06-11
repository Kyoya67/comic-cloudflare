'use client';

import { useEffect } from 'react';
import type { Comic } from '../types/comic';

interface PreloadImagesProps {
    comics: Comic[];
    currentIndex: number;
    preloadRange?: number;
}

export default function PreloadImages({ comics, currentIndex, preloadRange = 1 }: PreloadImagesProps) {
    useEffect(() => {
        const start = Math.max(0, currentIndex - preloadRange);
        const end = Math.min(comics.length, currentIndex + preloadRange + 1);

        comics.slice(start, end).forEach((comic) => {
            if (comic.imageUrl) {
                const img = new window.Image();
                img.src = `/api/image/${comic.imageUrl}`;
            }
        });
    }, [comics, currentIndex, preloadRange]);

    return null;
} 