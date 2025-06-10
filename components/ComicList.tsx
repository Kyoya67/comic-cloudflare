import ComicCard from './ComicCard';
import type { Comic } from '../types/comic';

interface ComicListProps {
    comics: Comic[];
    selectedComicId: string | null;
}

export default function ComicList({ comics, selectedComicId }: ComicListProps) {
    const sortedComicsForList = [...comics].sort((a, b) => b.order - a.order);

    return (
        <div>
            <div className="border-b border-black mb-6"></div>
            <div className="bg-white">
                {sortedComicsForList.map((comic, index) => {
                    const isSelected = comic.id === selectedComicId;
                    return (
                        <div key={comic.id}>
                            <ComicCard
                                id={comic.id}
                                title={comic.title}
                                updatedAt={comic.updatedAt}
                                imageUrl={comic.imageUrl}
                                order={comic.order}
                                isSelected={isSelected}
                                listMode={true}
                            />
                            {index < sortedComicsForList.length - 1 && (
                                <div className="border-b border-gray-200"></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 