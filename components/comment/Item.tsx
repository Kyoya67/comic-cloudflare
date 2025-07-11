'use client';

import type { Comment } from '../../lib/commentApi';

interface ItemProps {
    comment: Comment;
}

export default function Item({ comment }: ItemProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
            <div className="p-3">
                <p className="text-gray-900 whitespace-pre-wrap break-words bg-gray-100 p-3">
                    {comment.content}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                    {formatDate(comment.createdAt)}
                </div>
            </div>
        </div>
    );
} 