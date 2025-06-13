import { useEffect } from 'react';

interface UseKeyboardNavigationProps {
    onPrevious: () => void;
    onNext: () => void;
    onEscape?: () => void;
    isEnabled?: boolean;
}

export function useKeyboardNavigation({
    onPrevious,
    onNext,
    onEscape,
    isEnabled = true
}: UseKeyboardNavigationProps) {
    useEffect(() => {
        if (!isEnabled) return;

        let isKeyPressed = false;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isKeyPressed) return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    isKeyPressed = true;
                    onPrevious();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    isKeyPressed = true;
                    onNext();
                    break;
                case 'Escape':
                    e.preventDefault();
                    if (onEscape) {
                        onEscape();
                    }
                    break;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                isKeyPressed = false;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [onPrevious, onNext, onEscape, isEnabled]);
} 