'use client';

import { useRouter } from 'next/navigation';
import ComicCard from './ComicCard';
import type { Comic } from '../types/comic';

interface ComicMainDisplayProps {
    selectedComic: Comic;
    comics: Comic[];
}

export default function ComicMainDisplay({ selectedComic, comics }: ComicMainDisplayProps) {
    const router = useRouter();

    const navigateToComic = (direction: 'prev' | 'next') => {
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
            router.push(`/${targetComic.id}`);
        }
    };

    const canNavigatePrev = () => {
        const sortedComics = [...comics].sort((a, b) => a.order - b.order);
        const currentIndex = sortedComics.findIndex(comic => comic.id === selectedComic.id);
        return currentIndex < sortedComics.length - 1;
    };

    const canNavigateNext = () => {
        const sortedComics = [...comics].sort((a, b) => a.order - b.order);
        const currentIndex = sortedComics.findIndex(comic => comic.id === selectedComic.id);
        return currentIndex > 0;
    };

    return (
        <div className="mb-12 bg-gray-800 relative">
            {/* 左矢印 */}
            <button
                onClick={() => navigateToComic('prev')}
                disabled={!canNavigatePrev()}
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white text-2xl font-bold ${canNavigatePrev()
                    ? 'hover:bg-gray-700 cursor-pointer'
                    : 'opacity-30 cursor-not-allowed'
                    }`}
            >
                &#8249;
            </button>

            {/* 右矢印 */}
            <button
                onClick={() => navigateToComic('next')}
                disabled={!canNavigateNext()}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white text-2xl font-bold ${canNavigateNext()
                    ? 'hover:bg-gray-700 cursor-pointer'
                    : 'opacity-30 cursor-not-allowed'
                    }`}
            >
                &#8250;
            </button>

            {/* メインコミック表示 */}
            <div className="py-8">
                <ComicCard
                    id={selectedComic.id}
                    title={selectedComic.title}
                    updatedAt={selectedComic.updatedAt}
                    imageUrl={selectedComic.imageUrl}
                    main
                    order={selectedComic.order}
                />
            </div>
        </div>
    );
} 