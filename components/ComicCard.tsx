import Link from 'next/link';
import type { Comic } from '../types/comic';

interface ComicCardProps extends Comic {
    main?: boolean;
    isSelected?: boolean;
    listMode?: boolean;
    onClick?: () => void;
}

function formatDate(dateString: string) {
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}年${month}月${day}日`;
}

export default function ComicCard({ id, title, updatedAt, imageUrl, main, order, isSelected, listMode, onClick }: ComicCardProps) {
    if (listMode) {
        const cardContent = (
            <div className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors ${isSelected ? 'bg-yellow-50' : 'bg-white'
                }`}>
                <div className="w-4/5 max-w-[80vw] mx-auto">
                    <div className="flex items-center">
                        <div className="w-20 h-20 bg-gray-200 flex-shrink-0 mr-4">
                            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                            <p className="text-sm text-gray-500 mb-1">{formatDate(updatedAt)}</p>
                            <h3 className="text-lg font-semibold text-gray-900">【第{order}話】{title}</h3>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <Link href={`/${id}`}>
                {cardContent}
            </Link>
        );
    }

    const cardContent = (
        <div className={`bg-white overflow-hidden ${isSelected ? 'bg-yellow-50' : ''
            }`}>
            <div className={main ? "w-4/5 max-w-[80vw] mx-auto bg-blue-100" : "aspect-w-16 aspect-h-9 bg-gray-200"}>
                {main ? (
                    <img src={imageUrl} alt={title} className="w-full h-auto object-contain" />
                ) : null}
            </div>
            <div className={main ? "p-6 w-4/5 max-w-[80vw] mx-auto" : "p-4"}>
                <h3 className={main ? "text-2xl font-bold text-gray-900" : "text-lg font-semibold text-gray-900 ml-[-0.7rem]"}>【第{order}話】 {title}</h3>
                <p className={main ? "text-base text-gray-600" : "text-sm text-gray-600"}>{formatDate(updatedAt)}</p>
            </div>
        </div>
    );

    // onClickがある場合はクリッカブル、ない場合はLink
    if (onClick) {
        return (
            <div onClick={onClick} className="block cursor-pointer">
                {cardContent}
            </div>
        );
    }

    return (
        <Link href={`/${id}`} className="block">
            {cardContent}
        </Link>
    );
} 