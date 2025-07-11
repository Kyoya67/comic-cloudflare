'use client';

import { useState } from 'react';
import { Button } from '../controls';
import { createComment } from '@/app/actions/comment';

interface FormProps {
    comicId: string;
}

export default function Form({ comicId }: FormProps) {
    const [newComment, setNewComment] = useState('');

    const handleAction = async () => {
        if (!newComment.trim()) return;

        try {
            const result = await createComment(comicId, newComment);
            if (result?.error) {
                alert('コメントの投稿に失敗しました。もう一度お試しください。');
                return;
            }
            setNewComment('');
        } catch (error) {
            console.error('Failed to create comment:', error);
            alert('コメントの投稿に失敗しました。もう一度お試しください。');
            return;
        }
    };

    const isDisabled = !newComment.trim() || newComment.length > 500;

    return (
        <form action={handleAction} className="mb-6">
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="コメントを入力してください..."
                className="w-full p-3 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
            />
            <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                    {newComment.length}/500文字
                </span>
                <Button
                    type="submit"
                    disabled={isDisabled}
                >
                    投稿する
                </Button>
            </div>
        </form>
    );
} 