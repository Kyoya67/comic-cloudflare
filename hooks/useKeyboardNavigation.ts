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

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowLeft':
                    onPrevious();
                    break;
                case 'ArrowRight':
                    onNext();
                    break;
                case 'Escape':
                    if (onEscape) {
                        onEscape();
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onPrevious, onNext, onEscape, isEnabled]);
} 