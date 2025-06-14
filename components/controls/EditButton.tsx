interface EditButtonProps {
    onClick: () => void;
    className?: string;
}

export default function EditButton({ onClick, className = '' }: EditButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`text-blue-500 hover:text-blue-600 transition-colors ${className}`}
        >
            編集
        </button>
    );
} 