export const dynamic = 'force-dynamic';

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Card from '../../components/comic/Card';
import AdminHeader from '../../components/AdminHeader';
import { ComicActionButtons } from '../../components/controls';
import { getComics } from '../../lib/getComics';
import type { Comic } from '../../types/comic';

export default async function AdminPage() {
    const session = await getServerSession();

    if (!session) {
        redirect('/api/auth/signin');
    }

    const comics: Comic[] = await getComics();

    return (
        <div className="min-h-screen bg-gray-900">
            <AdminHeader />

            <div className="bg-gray-800 p-4 mb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-white">
                        管理者: {session.user?.name} ({session.user?.email})
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {comics.map((comic) => (
                        <div key={comic.id} className="relative">
                            <Card
                                id={comic.id}
                                title={comic.title}
                                updatedAt={comic.updatedAt}
                                imageUrl={comic.imageUrl}
                                order={comic.order}
                            />
                            <ComicActionButtons comicId={comic.id} />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}