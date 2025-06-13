import { useState, useCallback, useMemo } from 'react';

interface UseSliderNavigationProps<T> {
    items: T[];
    selectedItemId: string;
    onItemSelect: (item: T) => void;
    getItemId: (item: T) => string;
}

export function useSliderNavigation<T>({
    items,
    selectedItemId,
    onItemSelect,
    getItemId
}: UseSliderNavigationProps<T>) {
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentIndex = useMemo(() =>
        items.findIndex(item => getItemId(item) === selectedItemId),
        [items, selectedItemId, getItemId]
    );

    const goToSlide = useCallback((index: number) => {
        if (index < 0 || index >= items.length || isTransitioning) return;

        setIsTransitioning(true);
        onItemSelect(items[index]);

        setTimeout(() => setIsTransitioning(false), 300);
    }, [items, onItemSelect, isTransitioning]);

    const goToPrevious = useCallback(() => {
        goToSlide(currentIndex - 1);
    }, [currentIndex, goToSlide]);

    const goToNext = useCallback(() => {
        goToSlide(currentIndex + 1);
    }, [currentIndex, goToSlide]);

    const canGoPrevious = currentIndex > 0;
    const canGoNext = currentIndex < items.length - 1;

    return {
        currentIndex,
        isTransitioning,
        goToSlide,
        goToPrevious,
        goToNext,
        canGoPrevious,
        canGoNext,
    };
} 