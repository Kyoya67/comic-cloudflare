'use client';

import ComicCard from './ComicCard';
import ComicSwiper from './ComicSwiper';
import PreloadImages from './PreloadImages';
import type { Comic } from '../types/comic';

interface ComicMainDisplayProps {
    selectedComic: Comic;
    comics: Comic[];
    onComicSelect: (comic: Comic) => void;
}

export default function ComicMainDisplay({ selectedComic, comics, onComicSelect }: ComicMainDisplayProps) {
    const sortedComics = [...comics].sort((a, b) => b.order - a.order);
    const currentIndex = sortedComics.findIndex(comic => comic.id === selectedComic.id);

    return (
        <>
            <PreloadImages comics={sortedComics} currentIndex={currentIndex} />
            <ComicSwiper
                comics={comics}
                selectedComic={selectedComic}
                onComicSelect={onComicSelect}
            />
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