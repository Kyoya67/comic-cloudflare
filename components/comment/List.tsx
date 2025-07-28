'use client';

import Item from './Item';
import type { Comment } from '../../lib/commentApi';

// OptComment型を定義（Section.tsxと同じ）
type OptComment = Comment & { sending?: boolean };

interface ListProps {
    comments: OptComment[];
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
                <Item key={comment.id} comment={comment} />
            ))}
        </div>
    );
} 