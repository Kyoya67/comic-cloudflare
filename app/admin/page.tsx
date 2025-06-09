import Link from 'next/link';
import ComicCard from '../../components/ComicCard';
import { getComics } from '../../lib/getComics';
import type { Comic } from '../../types/comic';

export default async function AdminPage() {
    const comics: Comic[] = await getComics();
    return (
        <div className="min-h-screen bg-gray-100">
            {/* ヘッダー */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-900">管理画面</h1>
                        <div className="flex space-x-4">
                            <Link
                                href="/admin/add"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                新規追加
                            </Link>
                            <Link
                                href="/"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                戻る
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* メインコンテンツ */}
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {comics.map((comic) => (
                        <div key={comic.id} className="relative">
                            <ComicCard
                                id={comic.id}
                                title={comic.title}
                                updatedAt={comic.updatedAt}
                                imageUrl={comic.imageUrl}
                                order={comic.order}
                            />
                            <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
                                <button className="text-blue-500 hover:text-blue-600">編集</button>
                                <button className="text-red-500 hover:text-red-600">削除</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}