interface DeleteButtonProps {
    onClick: () => void;
    className?: string;
}

export default function DeleteButton({ onClick, className = '' }: DeleteButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`text-red-500 hover:text-red-600 transition-colors ${className}`}
        >
            削除
        </button>
    );
} 