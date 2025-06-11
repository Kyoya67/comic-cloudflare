'use client';

import { useState, useEffect } from 'react';
import ComicCard from './ComicCard';
import { getComics } from '../lib/getComics';
import type { Comic } from '../types/comic';

interface ComicViewerProps {
    initialComicId?: string;
}

export default function ComicViewer({ initialComicId }: ComicViewerProps) {
    const [comics, setComics] = useState<Comic[]>([]);
    const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadComics() {
            try {
                const data = await getComics();
                const sortedComics = data.sort((a, b) => a.order - b.order);
                setComics(sortedComics);

                if (initialComicId) {
                    const targetComic = sortedComics.find(comic => comic.id === initialComicId);
                    setSelectedComic(targetComic || sortedComics[0]);
                } else {
                    setSelectedComic(sortedComics[0]);
                }
            } catch (error) {
                console.error('Failed to load comics:', error);
            } finally {
                setLoading(false);
            }
        }
        loadComics();
    }, [initialComicId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-lg">読み込み中...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {selectedComic && (
                    <div className="mb-12">
                        <ComicCard
                            id={selectedComic.id}
                            title={selectedComic.title}
                            updatedAt={selectedComic.updatedAt}
                            imageUrl={selectedComic.imageUrl}
                            main
                            order={selectedComic.order}
                        />
                    </div>
                )}
                <div>
                    <div className="border-b border-black mb-6"></div>
                    <div className="bg-white">
                        {comics.map((comic, index) => {
                            const isSelected = comic.id === selectedComic?.id;
                            return (
                                <div key={comic.id}>
                                    <ComicCard
                                        id={comic.id}
                                        title={comic.title}
                                        updatedAt={comic.updatedAt}
                                        imageUrl={comic.imageUrl}
                                        order={comic.order}
                                        isSelected={isSelected}
                                        listMode={true}
                                    />
                                    {index < comics.length - 1 && (
                                        <div className="border-b border-gray-200"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
} 