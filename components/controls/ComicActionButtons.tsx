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
            console.log('Edit comic:', comicId);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(comicId);
        } else {
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