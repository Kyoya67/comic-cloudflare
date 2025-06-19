'use client';

import { useState } from 'react';
import Slider from './Slider';
import Card from './Card';
import PreloadImages from '../PreloadImages';
import { useComics } from '../../context/ComicsContext';
import type { Comic } from '../../types/comic';

export default function MainDisplay() {
    const { comics, selectedComic, setSelectedComic } = useComics();
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    if (!selectedComic) {
        return (
            <div className="bg-gray-900 h-[500px] flex items-center justify-center">
                <div className="text-white">選択されたコミックがありません</div>
            </div>
        );
    }

    const currentIndex = comics.findIndex(comic => comic.id === selectedComic.id);

    const handleComicSelect = (comic: Comic) => {
        setSelectedComic(comic);
    };

    const handleCommentClick = () => {
        setIsCommentsOpen(!isCommentsOpen);
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
                        onCommentClick={handleCommentClick}
                    />
                    {isCommentsOpen && (
                        <div className="bg-white border-t border-gray-200 p-4">
                            <h3 className="text-lg font-semibold mb-4">コメント</h3>
                            {/* TODO: ここにコメントコンポーネントを追加 */}
                            <div className="text-gray-500">
                                コメント機能は準備中です（コミックID: {selectedComic.id}）
                            </div>
                        </div>
                    )}
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