'use client';

import { useState } from 'react';
import { Button } from '../controls';

interface FormProps {
    onSubmit: (content: string) => Promise<void>;
    isPosting: boolean;
}

export default function Form({ onSubmit, isPosting }: FormProps) {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || isPosting) return;

        await onSubmit(newComment.trim());
        setNewComment('');
    };

    const isDisabled = !newComment.trim() || isPosting || newComment.length > 500;

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="コメントを入力してください..."
                className="w-full p-3 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                disabled={isPosting}
            />
            <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                    {newComment.length}/500文字
                </span>
                <Button
                    type="submit"
                    disabled={isDisabled}
                >
                    {isPosting ? '投稿中...' : '投稿する'}
                </Button>
            </div>
        </form>
    );
} 