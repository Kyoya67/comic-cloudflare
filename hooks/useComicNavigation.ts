import { useCallback } from 'react';
import type { Comic } from '../types/comic';

export function useComicNavigation(comics: Comic[], selectedComic: Comic, onComicSelect: (comic: Comic) => void) {
    const navigateToComic = useCallback((direction: 'prev' | 'next') => {
        const sortedComics = [...comics].sort((a, b) => a.order - b.order);
        const currentIndex = sortedComics.findIndex(comic => comic.id === selectedComic.id);

        let targetIndex;
        if (direction === 'prev') {
            targetIndex = currentIndex + 1;
        } else {
            targetIndex = currentIndex - 1;
        }

        if (targetIndex >= 0 && targetIndex < sortedComics.length) {
            const targetComic = sortedComics[targetIndex];
            onComicSelect(targetComic);
        }
    }, [comics, selectedComic, onComicSelect]);

    const canNavigatePrev = useCallback(() => {
        const sortedComics = [...comics].sort((a, b) => a.order - b.order);
        const currentIndex = sortedComics.findIndex(comic => comic.id === selectedComic.id);
        return currentIndex < sortedComics.length - 1;
    }, [comics, selectedComic]);

    const canNavigateNext = useCallback(() => {
        const sortedComics = [...comics].sort((a, b) => a.order - b.order);
        const currentIndex = sortedComics.findIndex(comic => comic.id === selectedComic.id);
        return currentIndex > 0;
    }, [comics, selectedComic]);

    return {
        navigateToComic,
        canNavigatePrev,
        canNavigateNext
    };
} 