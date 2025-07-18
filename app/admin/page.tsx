export const dynamic = 'force-dynamic';

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Card from '../../components/comic/Card';
import AdminHeader from '../../components/AdminHeader';
import { ComicActionButtons } from '../../components/controls';
import { getComics } from '../../lib/getComics';
import type { Comic } from '../../types/comic';

export default async function AdminPage() {
    const session = await auth();

    if (!session) {
        redirect('/auth/signin');
    }

    const comics: Comic[] = await getComics();

    return (
        <div className="min-h-screen bg-gray-900">
            <AdminHeader />

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