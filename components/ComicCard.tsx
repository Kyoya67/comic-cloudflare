import Link from 'next/link';
import type { Comic } from '../types/comic';

interface ComicCardProps extends Comic {
    main?: boolean;
    isSelected?: boolean;
    onClick?: () => void;
}

function formatDate(dateString: string) {
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}年${month}月${day}日`;
}

export default function ComicCard({ id, title, updatedAt, main, order, isSelected, onClick }: ComicCardProps) {
    const cardContent = (
        <div className={`${main ? 'p-6' : 'p-4'} ${isSelected ? 'bg-yellow-50' : 'bg-white hover:bg-gray-100'} transition-colors`}>
            <div className={`${main ? 'w-[79vw]' : 'w-full'} mx-auto`}>
                <div className="flex items-center">
                    <div className="flex-grow">
                        <p className={`${main ? 'text-base' : 'text-sm'} text-gray-500 mb-1`}>{formatDate(updatedAt)}</p>
                        <h3 className={`${main ? 'text-2xl font-bold ml-[-0.9rem]' : 'text-lg font-semibold ml-[-0.7rem]'} text-gray-900`}>【第{order}話】{title}</h3>
                    </div>
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

    if (onClick) {
        return (
            <div onClick={onClick} className="cursor-pointer">
                {cardContent}
            </div>
        );
    }

    return (
        <Link href={`/${id}`}>
            {cardContent}
        </Link>
    );
}