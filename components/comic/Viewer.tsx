'use client';

import { useEffect, useState } from 'react';
import MainDisplay from './MainDisplay';
import List from './List';
import CommentSection from './CommentSection';
import NavigationTabs from './NavigationTabs';
import { useComics } from '../../context/ComicsContext';
import type { Comic } from '../../types/comic';

interface ComicViewerProps {
    mainComicId?: string;
}

export default function Viewer({ mainComicId }: ComicViewerProps) {
    const { comics, selectedComic, setSelectedComic } = useComics();
    const [activeTab, setActiveTab] = useState<'list' | 'comments'>('list');

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
        setActiveTab('list'); // コミック切り替え時はリスト表示に戻る
    };

    const handleTabChange = (tab: 'list' | 'comments') => {
        setActiveTab(tab);
    };

    if (!selectedComic) {
        return (
            <div className="bg-gray-900 flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-lg text-white">読み込み中...</div>
                </div>
            </div>
        );
    }

    return (
        <>
            <main className="mx-auto mb-6">
                <MainDisplay
                    comics={comics}
                    selectedComic={selectedComic}
                    onComicSelect={handleComicSelect}
                />
                <NavigationTabs
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                >
                    {activeTab === 'comments' ? (
                        <CommentSection
                            comicId={selectedComic.id}
                        />
                    ) : (
                        <List
                            comics={comics}
                            selectedComicId={selectedComic.id}
                            onComicSelect={handleComicSelect}
                        />
                    )}
                </NavigationTabs>
            </main>
        </>
    );
} 
