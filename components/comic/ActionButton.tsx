interface ActionButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
    text: string;
    className?: string;
}

export default function ActionButton({ onClick, icon, text, className = '' }: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center sm:gap-2 px-2 sm:px-3 py-2 bg-gray-800 bg-opacity-80 hover:bg-opacity-90 text-white text-xs sm:text-sm font-medium border border-gray-600 transition-all ${className}`}
        >
            {icon}
            <span className="hidden sm:inline">{text}</span>
        </button>
    );
} 