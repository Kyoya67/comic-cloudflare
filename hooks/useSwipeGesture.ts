import { useRef } from 'react';

interface UseSwipeGestureProps {
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    threshold?: number;
    verticalThreshold?: number;
}

export function useSwipeGesture({
    onSwipeLeft,
    onSwipeRight,
    threshold = 30,
    verticalThreshold = 150
}: UseSwipeGestureProps) {
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const isDragging = useRef(false);

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

        if (Math.abs(diffX) > threshold && diffY < verticalThreshold) {
            if (diffX > 0) {
                onSwipeLeft();
            } else {
                onSwipeRight();
            }
        }

        isDragging.current = false;
    };

    return {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
    };
} 