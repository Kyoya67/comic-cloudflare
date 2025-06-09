import Link from 'next/link';
import type { Comic } from '../types/comic';

interface ComicCardProps extends Comic {
    main?: boolean;
}

function formatDate(dateString: string) {
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}年${month}月${day}日`;
}

export default function ComicCard({ id, title, updatedAt, imageUrl, main, order }: ComicCardProps) {
    return (
        <Link href={`/comics/${id}`} className="block">
            <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                <div className={main ? "aspect-w-16 aspect-h-9 bg-blue-100" : "aspect-w-16 aspect-h-9 bg-gray-200"}>
                    {main ? (
                        <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
                    ) : null}
                </div>
                <div className={main ? "p-6" : "p-4"}>
                    <h3 className={main ? "text-2xl font-bold text-gray-900" : "text-lg font-semibold text-gray-900"}>【第{order}話】 {title}</h3>
                    <p className={main ? "text-base text-gray-600" : "text-sm text-gray-600"}>{formatDate(updatedAt)}</p>
                </div>
            </div>
        </Link>
    );
} 