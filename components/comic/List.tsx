'use client';

import Card from './Card';
import type { Comic } from '../../types/comic';

interface ComicListProps {
    comics: Comic[];
    selectedComicId: string | null;
    onComicSelect: (comic: Comic) => void;
}

export default function List({ comics, selectedComicId, onComicSelect }: ComicListProps) {
    return (
        <div>
            <div className="border-b border-gray-400 mb-6"></div>
            <div className="bg-white">
                {comics.map((comic) => {
                    const isSelected = comic.id === selectedComicId;
                    return (
                        <div
                            key={comic.id}
                            onClick={() => onComicSelect(comic)}
                            className="max-w-[80vw] mx-auto"
                        >
                            <div className="border-t border-gray-200"></div>
                            <Card
                                id={comic.id}
                                title={comic.title}
                                updatedAt={comic.updatedAt}
                                imageUrl={comic.imageUrl}
                                order={comic.order}
                                isSelected={isSelected}
                            />
                            <div className="border-t border-gray-200"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
