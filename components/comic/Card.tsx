import type { Comic } from '../../types/comic';

interface ComicCardProps extends Comic {
    main?: boolean;
    isSelected?: boolean;
    onClick?: () => void;
    onCommentClick?: () => void;
}

function formatDate(dateString: string) {
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}年${month}月${day}日`;
}

export default function Card({ title, updatedAt, main, order, isSelected, onClick, onCommentClick }: ComicCardProps) {
    const cardContent = (
        <div className={`${main ? 'p-6' : 'p-4'} ${main ? '' : isSelected ? 'bg-yellow-50' : 'bg-white xs500:hover:bg-gray-100'} transition-colors`}>
            <div className={`${main ? 'w-[79vw]' : 'w-full'} mx-auto`}>
                <div className="flex items-end">
                    <div className="flex-1">
                        <p className={`${main ? 'text-base' : 'text-sm'} text-gray-500 mb-1`}>{formatDate(updatedAt)}</p>
                        <h3 className={`${main ? 'text-2xl font-bold ml-[-0.9rem]' : 'text-lg font-semibold ml-[-0.7rem]'} text-gray-900`}>【第{order}話】{title}</h3>
                    </div>
                    {main && onCommentClick && (
                        <div className="ml-10 mb-[-0.25rem]">
                            <button
                                onClick={onCommentClick}
                                className="flex items-center gap-1 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                                aria-label="コメントを表示"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                <span className="text-sm text-gray-500">コメント</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    if (main) {
        return (
            <div>
                {cardContent}
            </div>
        );
    }

    return (
        <div onClick={onClick} className="cursor-pointer">
            {cardContent}
        </div>
    );
} 