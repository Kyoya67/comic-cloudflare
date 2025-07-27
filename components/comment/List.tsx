'use client';

import CommentItem from './Item';
import type { Comment } from '../../lib/commentApi';

interface ListProps {
    comments: Comment[];
}

export default function List({ comments }: ListProps) {

    if (comments.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                まだコメントがありません。
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    );
} 