'use client';

import type { Comic } from '../types/comic';

interface ComicNavigationProps {
    direction: 'prev' | 'next';
    canNavigate: boolean;
    onClick: () => void;
}

export default function ComicNavigation({ direction, canNavigate, onClick }: ComicNavigationProps) {
    const arrow = direction === 'prev' ? '&#8249;' : '&#8250;';
    const position = direction === 'prev' ? 'left-4' : 'right-4';

    return (
        <button
            onClick={onClick}
            disabled={!canNavigate}
            className={`absolute ${position} top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white text-2xl font-bold ${canNavigate
                    ? 'hover:bg-gray-700 cursor-pointer'
                    : 'opacity-30 cursor-not-allowed'
                }`}
            dangerouslySetInnerHTML={{ __html: arrow }}
        />
    );
} 