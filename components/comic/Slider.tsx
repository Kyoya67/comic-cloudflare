'use client';

import ImageSlide from './ImageSlide';
import SliderActions from './SliderActions';
import { NavigationButton, CloseButton } from '../controls';
import type { Comic } from '../../types/comic';
import Image from 'next/image';
import { useSliderNavigation } from '../../hooks/useSliderNavigation';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { useFullscreenEffect } from '../../hooks/useFullscreenEffect';

export interface ComicSliderProps {
    comics: Comic[];
    selectedComicId: string;
    onComicSelect: (comic: Comic) => void;
    onOpenModal?: () => void;
    isFullscreen?: boolean;
    onClose?: () => void;
}

export default function Slider({ comics, selectedComicId, onComicSelect, onOpenModal, isFullscreen = false, onClose }: ComicSliderProps) {

    const {
        currentIndex,
        isTransitioning,
        goToPrevious,
        goToNext,
        canGoPrevious,
        canGoNext,
    } = useSliderNavigation({
        items: comics,
        selectedItemId: selectedComicId,
        onItemSelect: onComicSelect,
        getItemId: (comic) => comic.id,
    });

    const swipeHandlers = useSwipeGesture({
        onSwipeLeft: goToNext,
        onSwipeRight: goToPrevious,
    });

    useKeyboardNavigation({
        onPrevious: goToPrevious,
        onNext: goToNext,
        onEscape: onClose,
        isEnabled: true,
    });

    useFullscreenEffect(isFullscreen);

    if (isFullscreen) {
        return (
            <div className="fixed inset-0 bg-gray-900 z-50" {...swipeHandlers}>
                <div
                    className="absolute inset-0 z-10"
                    onClick={onClose}
                />

                {onClose && <CloseButton onClick={onClose} />}

                <NavigationButton
                    direction="left"
                    onClick={goToPrevious}
                    disabled={!canGoPrevious}
                    variant="fullscreen"
                />

                <NavigationButton
                    direction="right"
                    onClick={goToNext}
                    disabled={!canGoNext}
                    variant="fullscreen"
                />

                <div className="w-full h-full overflow-hidden relative z-0">
                    <div
                        className="flex h-full will-change-transform"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                            transition: isTransitioning ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                        }}
                    >
                        {comics.map((comic) => (
                            <div
                                key={comic.id}
                                className="w-full h-full flex-shrink-0 flex items-center justify-center p-4 cursor-not-allowed"
                                onClick={onClose}
                            >
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
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 relative h-[32rem] overflow-hidden">
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
                        className="w-full h-full flex-shrink-0"
                    >
                        <ImageSlide
                            comic={comic}
                            isSelected={index === currentIndex}
                        />
                    </div>
                ))}
            </div>

            <NavigationButton
                direction="left"
                onClick={goToPrevious}
                disabled={!canGoPrevious}
                variant="normal"
            />

            <NavigationButton
                direction="right"
                onClick={goToNext}
                disabled={!canGoNext}
                variant="normal"
            />

            {onOpenModal && (
                <SliderActions onOpenModal={onOpenModal} />
            )}
        </div>
    );
} 