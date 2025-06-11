'use client';

import { useEffect } from 'react';
import ComicMainDisplay from './ComicMainDisplay';
import ComicList from './ComicList';
import { useComics } from '../context/ComicsContext';
import type { Comic } from '../types/comic';

interface ComicViewerProps {
    mainComicId?: string;
}

export default function ComicViewer({ mainComicId }: ComicViewerProps) {
    const { comics, selectedComic, setSelectedComic } = useComics();

    useEffect(() => {
        console.log('ComicViewer useEffect:', { mainComicId, comicsLength: comics.length, selectedComic });

        if (mainComicId && comics.length > 0) {
            const targetComic = comics.find(comic => comic.id === mainComicId);
            if (targetComic) {
                console.log('Setting target comic:', targetComic);
                setSelectedComic(targetComic);
            } else {
                console.log('Target comic not found, setting first comic');
                setSelectedComic(comics[0]);
            }
        } else if (comics.length > 0 && !selectedComic) {
            console.log('Setting first comic as selected');
            setSelectedComic(comics[0]);
        }
    }, [mainComicId, comics, selectedComic, setSelectedComic]);

    const handleComicSelect = (comic: Comic) => {
        setSelectedComic(comic);
        // ページ遷移はしない（状態のみ更新）
    };

    // より詳細なロード状態の確認
    if (comics.length === 0) {
        return (
            <div className="bg-gray-100 flex items-center justify-center min-h-screen">
                <div className="text-lg">コミックを読み込み中...</div>
            </div>
        );
    }

    if (!selectedComic) {
        return (
            <div className="bg-gray-100 flex items-center justify-center min-h-screen">
                <div className="text-lg">選択中...</div>
            </div>
        );
    }

    return (
        <>
            <main className="mx-auto">
                <ComicMainDisplay />
                <ComicList
                    comics={comics}
                    selectedComicId={selectedComic.id}
                    onComicSelect={handleComicSelect}
                />
            </main>
        </>
    );
} 