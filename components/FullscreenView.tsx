'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Comic } from '../types/comic';

interface FullscreenViewProps {
    comic: Comic;
    comics: Comic[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onComicSelect: (comic: Comic) => void;
}

export default function FullscreenView({ comic, comics, currentIndex, isOpen, onClose, onComicSelect }: FullscreenViewProps) {
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const isDragging = useRef(false);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

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

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const goToPrevious = () => {
        if (currentIndex > 0) {
            onComicSelect(comics[currentIndex - 1]);
        }
    };

    const goToNext = () => {
        if (currentIndex < comics.length - 1) {
            onComicSelect(comics[currentIndex + 1]);
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
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
                goToNext(); // Swipe left = next
            } else {
                goToPrevious(); // Swipe right = previous
            }
        }

        isDragging.current = false;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black z-50"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            <div
                className="absolute inset-0 z-10"
                onClick={onClose}
            />

            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {currentIndex > 0 && (
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full hidden md:flex items-center justify-center transition-all"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}

            {currentIndex < comics.length - 1 && (
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full hidden md:flex items-center justify-center transition-all"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}

            <div className="w-full h-full flex items-center justify-center p-4 relative z-0"
                onClick={onClose}>
                {comic.imageUrl && (
                    <Image
                        src={`/api/image/${comic.imageUrl}`}
                        alt={comic.title}
                        width={1920}
                        height={1080}
                        className="max-w-full max-h-full object-contain"
                        unoptimized
                        priority
                        onClick={(e) => e.stopPropagation()}
                    />
                )}
            </div>
        </div>
    );
} 