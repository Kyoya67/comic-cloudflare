interface CloseButtonProps {
    onClick: () => void;
    className?: string;
}

export default function CloseButton({ onClick, className = '' }: CloseButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`absolute top-4 right-4 z-10 w-12 h-12 text-white ${className}`}
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    );
} 