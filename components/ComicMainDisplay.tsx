'use client';

import ComicCard from './ComicCard';
import ComicNavigation from './ComicNavigation';
import { useComicNavigation } from '../hooks/useComicNavigation';
import type { Comic } from '../types/comic';

interface ComicMainDisplayProps {
    selectedComic: Comic;
    comics: Comic[];
    onComicSelect: (comic: Comic) => void;
}

export default function ComicMainDisplay({ selectedComic, comics, onComicSelect }: ComicMainDisplayProps) {
    const { navigateToComic, canNavigatePrev, canNavigateNext } = useComicNavigation(
        comics,
        selectedComic,
        onComicSelect
    );

    return (
        <>
            <div className="bg-gray-800 relative h-[500px]">
                <ComicNavigation
                    direction="prev"
                    canNavigate={canNavigatePrev()}
                    onClick={() => navigateToComic('prev')}
                />
                <ComicNavigation
                    direction="next"
                    canNavigate={canNavigateNext()}
                    onClick={() => navigateToComic('next')}
                />
            </div>
            <div>
                <ComicCard
                    id={selectedComic.id}
                    title={selectedComic.title}
                    updatedAt={selectedComic.updatedAt}
                    imageUrl={selectedComic.imageUrl}
                    main
                    order={selectedComic.order}
                />
            </div>
        </>
    );
} 