'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import ComicImageSlide from './ComicImageSlide';
import type { Comic } from '../types/comic';
import { useRouter } from 'next/navigation';

interface ComicSwiperProps {
    comics: Comic[];
    selectedComic: Comic;
    onComicSelect: (comic: Comic) => void;
    onOpenModal: () => void;
}

export default function ComicSlider({ comics, selectedComic, onComicSelect, onOpenModal }: ComicSwiperProps) {
    const sortedComics = [...comics].sort((a, b) => b.order - a.order);
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(
        sortedComics.findIndex(comic => comic.id === selectedComic.id)
    );
    const [isTransitioning, setIsTransitioning] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const isDragging = useRef(false);

    useEffect(() => {
        const newIndex = sortedComics.findIndex(comic => comic.id === selectedComic.id);
        if (newIndex !== -1 && newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
        }
    }, [selectedComic.id, sortedComics, currentIndex]);

    const goToSlide = useCallback((index: number) => {
        if (index < 0 || index >= sortedComics.length || isTransitioning) return;

        setIsTransitioning(true);
        setCurrentIndex(index);
        onComicSelect(sortedComics[index]);

        setTimeout(() => setIsTransitioning(false), 300);
    }, [sortedComics, onComicSelect, isTransitioning]);

    const goToPrevious = useCallback(() => {
        goToSlide(currentIndex - 1);
    }, [currentIndex, goToSlide]);

    const goToNext = useCallback(() => {
        goToSlide(currentIndex + 1);
    }, [currentIndex, goToSlide]);

    const handleTouchStart = (e: React.TouchEvent) => {
        e.preventDefault();
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        isDragging.current = true;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current) return;
        e.preventDefault();
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!isDragging.current) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchStartX.current - touchEndX;
        const diffY = Math.abs(touchStartY.current - touchEndY);

        if (Math.abs(diffX) > 30 && diffY < 150) {
            if (diffX > 0) {
                goToNext();
            } else {
                goToPrevious();
            }
        }

        isDragging.current = false;
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowLeft':
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    goToNext();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToNext, goToPrevious]);

    return (
        <div className="bg-gray-900 relative h-[500px] overflow-hidden">
            <div
                ref={sliderRef}
                className="flex h-full will-change-transform"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: isTransitioning ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {sortedComics.map((comic, index) => (
                    <div
                        key={comic.id}
                        className="w-full h-full flex-shrink-0"
                    >
                        <ComicImageSlide
                            comic={comic}
                            isSelected={index === currentIndex}
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={goToPrevious}
                disabled={currentIndex <= 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={goToNext}
                disabled={currentIndex >= sortedComics.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                <button
                    onClick={onOpenModal}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-800 bg-opacity-80 hover:bg-opacity-90 text-white text-sm font-medium  border border-gray-600 transition-all"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
                        <path strokeWidth={2} d="M9 9h6v6H9z" />
                    </svg>
                    全画面
                </button>
                <button
                    onClick={() => {
                        router.push('/admin');
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-800 bg-opacity-80 hover:bg-opacity-90 text-white text-sm font-medium  border border-gray-600 transition-all"
                >
                    管理画面
                </button>
            </div>
        </div>
    );
} 