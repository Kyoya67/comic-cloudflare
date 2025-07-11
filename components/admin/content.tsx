'use client';

import { useState } from 'react';
import Card from '../comic/Card';
import AddComicModal from '../comic/AddComicModal';
import AdminHeader from './header';
import { ComicActionButtons } from '../controls';
import type { Comic } from '../../types/comic';

interface AdminContentProps {
    comics: Comic[];
}

export default function AdminContent({ comics }: AdminContentProps) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsAddModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <AdminHeader onAddClick={() => setIsAddModalOpen(true)} />
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

            <AddComicModal
                isOpen={isAddModalOpen}
                onClose={handleModalClose}
            />
        </div>
    );
} 