'use client';

import { useEffect } from 'react';
import MainDisplay from './MainDisplay';
import List from './List';
import { useComics } from '../../context/ComicsContext';
import type { Comic } from '../../types/comic';

interface ComicViewerProps {
    mainComicId?: string;
}

export default function Viewer({ mainComicId }: ComicViewerProps) {
    const { comics, selectedComic, setSelectedComic } = useComics();

    useEffect(() => {
        if (mainComicId && comics.length > 0) {
            const targetComic = comics.find(comic => comic.id === mainComicId);
            if (targetComic) {
                setSelectedComic(targetComic);
            } else {
                setSelectedComic(comics[comics.length - 1]);
            }
        } else if (comics.length > 0 && !selectedComic) {
            setSelectedComic(comics[comics.length - 1]);
        }
    }, [mainComicId, comics, selectedComic, setSelectedComic]);

    const handleComicSelect = (comic: Comic) => {
        setSelectedComic(comic);
    };

    if (!selectedComic) {
        return (
            <div className="bg-gray-100 flex items-center justify-center min-h-screen">
                <div className="text-lg">読み込み中...</div>
            </div>
        );
    }

    return (
        <>
            <main className="mx-auto mb-6">
                <MainDisplay />
                <List
                    comics={comics}
                    selectedComicId={selectedComic.id}
                    onComicSelect={handleComicSelect}
                />
            </main>
        </>
    );
} 
