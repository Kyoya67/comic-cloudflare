'use client';

import type { Comment } from '../../lib/commentApi';

interface CommentItemProps {
    comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
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
        <div className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
            <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-900 whitespace-pre-wrap break-words">
                    {comment.content}
                </p>
            </div>
            <div className="text-xs text-gray-500 mt-2">
                {formatDate(comment.createdAt)}
            </div>
        </div>
    );
} 