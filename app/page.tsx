import Link from 'next/link';
import ComicCard from '../components/ComicCard';
import { getComics } from '../lib/getComics';
import type { Comic } from '../types/comic';

export default async function Home() {
  let comics: Comic[] = await getComics();
  comics = [...comics].reverse(); // 新しい順に並べ替え
  const latest = comics[0];
  const past = comics.slice(1);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Real Fight</h1>
            <Link
              href="/admin"
              className="text-gray-600 hover:text-gray-900"
            >
              管理画面
            </Link>
          </div>
        </div>
      </header>

      {/* メインコンテンツ（最新話） */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {latest && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">最新話</h2>
            <ComicCard
              id={latest.id}
              title={latest.title}
              updatedAt={latest.updatedAt}
              imageUrl={latest.imageUrl}
              main
              order={latest.order}
            />
          </div>
        )}

        {/* 過去の話一覧 */}
        <div>
          <h2 className="text-2xl font-bold mb-6">過去の話</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {past.map((comic) => (
              <ComicCard
                key={comic.id}
                id={comic.id}
                title={comic.title}
                updatedAt={comic.updatedAt}
                imageUrl={comic.imageUrl}
                order={comic.order}
              />
            ))}
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">© 2024 real-fight</p>
        </div>
      </footer>
    </div>
  );
}
