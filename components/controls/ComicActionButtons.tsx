'use client';

import { EditButton, DeleteButton } from './';

interface ComicActionButtonsProps {
    comicId: string;
    onEdit?: (comicId: string) => void;
    onDelete?: (comicId: string) => void;
}

export default function ComicActionButtons({
    comicId,
    onEdit,
    onDelete
}: ComicActionButtonsProps) {
    const handleEdit = () => {
        if (onEdit) {
            onEdit(comicId);
        } else {
            // TODO: 編集機能の実装
            console.log('Edit comic:', comicId);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(comicId);
        } else {
            // TODO: 削除機能の実装
            console.log('Delete comic:', comicId);
        }
    };

    return (
        <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
            <EditButton onClick={handleEdit} />
            <DeleteButton onClick={handleDelete} />
        </div>
    );
} 