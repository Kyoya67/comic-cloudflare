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
        if (mainComicId) {
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
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-lg">読み込み中...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
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
        </div>
    );
} 