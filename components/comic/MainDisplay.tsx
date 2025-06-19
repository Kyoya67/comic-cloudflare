'use client';

import { useState } from 'react';
import Slider from './Slider';
import Card from './Card';
import PreloadImages from '../PreloadImages';
import type { Comic } from '../../types/comic';

interface MainDisplayProps {
    comics: Comic[];
    selectedComic: Comic;
    onComicSelect: (comic: Comic) => void;
}

export default function MainDisplay({ comics, selectedComic, onComicSelect }: MainDisplayProps) {
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

    if (!selectedComic) {
        return (
            <div className="bg-gray-900 h-[500px] flex items-center justify-center">
                <div className="text-white">選択されたコミックがありません</div>
            </div>
        );
    }

    const currentIndex = comics.findIndex(comic => comic.id === selectedComic.id);

    const handleComicSelect = (comic: Comic) => {
        onComicSelect(comic);
    };

    return (
        <>
            {!isFullscreenOpen && (
                <>
                    <Slider
                        comics={comics}
                        selectedComicId={selectedComic.id}
                        onComicSelect={handleComicSelect}
                        onOpen={() => setIsFullscreenOpen(true)}
                    />
                    <Card
                        id={selectedComic.id}
                        title={selectedComic.title}
                        updatedAt={selectedComic.updatedAt}
                        imageUrl={selectedComic.imageUrl}
                        order={selectedComic.order}
                        main
                    />

                </>
            )}
            <PreloadImages
                comics={comics}
                currentIndex={currentIndex}
                preloadRange={2}
            />
            {isFullscreenOpen && (
                <Slider
                    comics={comics}
                    selectedComicId={selectedComic.id}
                    onComicSelect={handleComicSelect}
                    isFullscreen={true}
                    onClose={() => setIsFullscreenOpen(false)}
                />
            )}
        </>
    );
} 