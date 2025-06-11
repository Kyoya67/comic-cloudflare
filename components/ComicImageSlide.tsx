'use client';

import Image from 'next/image';
import type { Comic } from '../types/comic';

interface ComicImageSlideProps {
    comic: Comic;
    isSelected: boolean;
}

export default function ComicImageSlide({ comic, isSelected }: ComicImageSlideProps) {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-full h-[480px] flex items-center justify-center">
                {comic.imageUrl && (
                    <Image
                        src={`/api/image/${comic.imageUrl}`}
                        alt={comic.title}
                        width={800}
                        height={480}
                        className="object-contain max-w-full max-h-full"
                        priority={isSelected}
                        unoptimized
                    />
                )}
            </div>
        </div>
    );
} 