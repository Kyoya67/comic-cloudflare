'use client';

interface NavigationButtonProps {
    direction: 'left' | 'right';
    onClick: () => void;
    disabled?: boolean;
    variant?: 'fullscreen' | 'normal';
    className?: string;
}

export default function NavigationButton({
    direction,
    onClick,
    disabled = false,
    variant = 'normal',
    className = ''
}: NavigationButtonProps) {
    const isLeft = direction === 'left';

    const baseClasses = "flex items-center justify-center w-12 h-12 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed hidden-mobile";

    const positionClasses = isLeft
        ? "absolute left-4 top-1/2 -translate-y-1/2"
        : "absolute right-4 top-1/2 -translate-y-1/2";

    const combinedClasses = `${baseClasses} ${positionClasses} ${variant === 'fullscreen' ? 'z-10' : ''} ${className}`.trim();

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={combinedClasses}
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                />
            </svg>
        </button>
    );
} 