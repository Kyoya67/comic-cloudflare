import Image from 'next/image';
import ImageSlide from './ImageSlide';
import type { Comic } from '../../types/comic';

interface SliderContentProps {
    comics: Comic[];
    currentIndex: number;
    isTransitioning: boolean;
    swipeHandlers: Record<string, any>;
    variant: 'fullscreen' | 'normal';
}

export default function SliderContent({
    comics,
    currentIndex,
    isTransitioning,
    swipeHandlers,
    variant,
}: SliderContentProps) {
    return (
        <div
            className="flex h-full will-change-transform"
            style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: isTransitioning ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            }}
            {...swipeHandlers}
        >
            {comics.map((comic, index) => (
                <div
                    key={comic.id}
                    className={`w-full h-full flex-shrink-0 ${variant === 'fullscreen'
                        ? 'flex items-center justify-center p-4'
                        : ''
                        }`}
                >
                    {variant === 'fullscreen' ? (
                        comic.imageUrl && (
                            <Image
                                src={`/api/image/${comic.imageUrl}`}
                                alt={comic.title}
                                width={1920}
                                height={1080}
                                className="max-w-full max-h-full object-contain pointer-events-none"
                                unoptimized
                                priority
                            />
                        )
                    ) : (
                        <ImageSlide
                            comic={comic}
                            isSelected={index === currentIndex}
                        />
                    )}
                </div>
            ))}
        </div>
    );
} 