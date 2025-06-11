'use client';

import { useState } from 'react';
import ComicSlider from './ComicSlider';
import ComicCard from './ComicCard';
import PreloadImages from './PreloadImages';
import FullscreenView from './FullscreenView';
import { useComics } from '../context/ComicsContext';

export default function ComicMainDisplay() {
    const { comics, selectedComic, setSelectedComic } = useComics();
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

    if (!selectedComic) {
        return (
            <div className="bg-gray-900 h-[500px] flex items-center justify-center">
                <div className="text-white">選択されたコミックがありません</div>
            </div>
        );
    }

    const sortedComics = [...comics].sort((a, b) => b.order - a.order);
    const currentIndex = sortedComics.findIndex(comic => comic.id === selectedComic.id);

    const handleComicSelect = (comic: any) => {
        setSelectedComic(comic);
    };

    return (
        <>
            <ComicSlider
                comics={comics}
                selectedComic={selectedComic}
                onComicSelect={handleComicSelect}
                onOpenModal={() => setIsFullscreenOpen(true)}
            />
            <PreloadImages
                comics={sortedComics}
                currentIndex={currentIndex}
                preloadRange={2}
            />

            <div className="bg-white">
                <ComicCard
                    id={selectedComic.id}
                    title={selectedComic.title}
                    updatedAt={selectedComic.updatedAt}
                    imageUrl={selectedComic.imageUrl}
                    order={selectedComic.order}
                    main
                />
            </div>

            <FullscreenView
                comic={selectedComic}
                comics={sortedComics}
                currentIndex={currentIndex}
                isOpen={isFullscreenOpen}
                onClose={() => setIsFullscreenOpen(false)}
                onComicSelect={handleComicSelect}
            />
        </>
    );
} 