'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ComicMainDisplay from './ComicMainDisplay';
import ComicList from './ComicList';
import { useComics } from '../context/ComicsContext';
import type { Comic } from '../types/comic';

interface ComicViewerProps {
    mainComicId?: string;
}

export default function ComicViewer({ mainComicId }: ComicViewerProps) {
    const router = useRouter();
    const { comics, selectedComic, setSelectedComic } = useComics();

    useEffect(() => {
        if (mainComicId && comics.length > 0) {
            const targetComic = comics.find(comic => comic.id === mainComicId);
            if (targetComic) {
                setSelectedComic(targetComic);
            }
        } else if (comics.length > 0 && !selectedComic) {
            setSelectedComic(comics[0]);
        }
    }, [mainComicId, comics, selectedComic, setSelectedComic]);

    const handleComicSelect = (comic: Comic) => {
        setSelectedComic(comic);
        router.push(`/${comic.id}`);
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
            <main className="mx-auto">
                <ComicMainDisplay
                    selectedComic={selectedComic}
                    comics={comics}
                    onComicSelect={handleComicSelect}
                />
                <ComicList
                    comics={comics}
                    selectedComicId={selectedComic.id}
                    onComicSelect={handleComicSelect}
                />
            </main>
        </>
    );
} 