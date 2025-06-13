import { useEffect } from 'react';

export function useFullscreenEffect(isFullscreen: boolean) {
    useEffect(() => {
        if (isFullscreen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isFullscreen]);
} 