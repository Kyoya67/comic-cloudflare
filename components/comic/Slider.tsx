'use client';

import SliderActions from './SliderActions';
import SliderContent from './SliderContent';
import { NavigationButton } from '../controls';
import type { Comic } from '../../types/comic';
import { useSliderNavigation } from '../../hooks/useSliderNavigation';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { useFullscreenEffect } from '../../hooks/useFullscreenEffect';

export interface ComicSliderProps {
    comics: Comic[];
    selectedComicId: string;
    onComicSelect: (comic: Comic) => void;
    isFullscreen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    disableKeyboard?: boolean;
}

export default function Slider({
    comics,
    selectedComicId,
    onComicSelect,
    isFullscreen = false,
    onOpen,
    onClose,
    disableKeyboard = false
}: ComicSliderProps) {

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
        getItemId: (item) => item.id,
    });

    const swipeHandlers = useSwipeGesture({
        onSwipeLeft: goToNext,
        onSwipeRight: goToPrevious,
    });

    useKeyboardNavigation({
        onPrevious: goToPrevious,
        onNext: goToNext,
        onEscape: isFullscreen ? onClose : undefined,
        isEnabled: !disableKeyboard,
    });

    useFullscreenEffect(isFullscreen);

    if (isFullscreen) {
        return (
            <div className="fixed inset-0 bg-gray-900 z-50" onClick={onClose}>

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

                <div className="w-full h-full overflow-hidden relative">
                    <SliderContent
                        comics={comics}
                        currentIndex={currentIndex}
                        isTransitioning={isTransitioning}
                        swipeHandlers={swipeHandlers}
                        variant="fullscreen"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 relative h-[32rem] overflow-hidden">
            <SliderContent
                comics={comics}
                currentIndex={currentIndex}
                isTransitioning={isTransitioning}
                swipeHandlers={swipeHandlers}
                variant="normal"
            />

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

            {onOpen && (
                <SliderActions onOpenModal={onOpen} />
            )}
        </div>
    );
} 