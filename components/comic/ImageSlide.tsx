'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Comic } from '../../types/comic';

interface ComicImageSlideProps {
    comic: Comic;
    isSelected: boolean;
}

export default function ImageSlide({ comic, isSelected }: ComicImageSlideProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <div className="flex items-center justify-center h-full transform-gpu">
            <div className="w-full h-[480px] flex items-center justify-center transform-gpu">
                {comic.imageUrl ? (
                    <>
                        {imageError && (
                            <div className="text-white text-center">
                                <div className="text-red-400 mb-2">✕</div>
                                <div>画像の読み込みに失敗しました</div>
                            </div>
                        )}
                        <Image
                            src={`/api/image/${comic.imageUrl}`}
                            alt={comic.title}
                            width={800}
                            height={480}
                            className={`object-contain max-w-full max-h-full transform-gpu will-change-transform backface-hidden ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                } transition-opacity duration-300`}
                            priority={isSelected}
                            unoptimized
                            onLoad={() => {
                                setImageLoaded(true);
                                setImageError(false);
                            }}
                            onError={() => {
                                setImageError(true);
                                setImageLoaded(false);
                                console.error(`Failed to load image: ${comic.imageUrl}`);
                            }}
                            style={{
                                imageRendering: 'crisp-edges',
                            }}
                        />
                    </>
                ) : (
                    <div className="text-white text-center">
                        <div className="text-gray-400 mb-2">📷</div>
                        <div>画像がありません</div>
                    </div>
                )}
            </div>
        </div>
    );
} 