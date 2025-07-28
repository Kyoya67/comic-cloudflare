'use client';

import { useState, useEffect, useOptimistic } from 'react';
import { getComments, type Comment } from '@/lib/commentApi';
import { createComment } from '@/app/actions/comment';
import Form from './Form';
import List from './List';
import { randomUUID } from 'crypto';

type SectionProps = {
    comicId: string;
}

export default function Section({ comicId }: SectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);

    const [optimisticComments, addOptimisticComment] = useOptimistic(
        comments,
        (prevComments, newComment: Comment) => {
            if (prevComments.length <= 1) return [newComment];
            return [{ ...newComment, sending: true }, ...prevComments];
        }
    )

    async function formAction(formData: FormData) {
        const id = randomUUID();
        const comicId = formData.get('comicId') as string;
        const content = formData.get('comment') as string;
        const createdAt = new Date().toISOString();

        addOptimisticComment({
            id: id,
            comicId: comicId,
            content: content,
            createdAt: createdAt,
        })

        try {
            const result = await createComment(formData);
            if (result?.error) {
                alert('コメントの投稿に失敗しました。もう一度お試しください。');
                return;
            }
            setComments([result.comment, ...comments]);
            fetchComments();
        } catch (error) {
            console.error('Failed to create comment:', error);
            alert('コメントの投稿に失敗しました。もう一度お試しください。');
            return;
        }
    }

    useEffect(() => {
        fetchComments();
    }, [comicId]);

    const fetchComments = async () => {
        try {
            const data = await getComments(comicId);
            setComments(data);
        } catch (error) {
            console.error('コメント取得エラー:', error);
        }
    };

    return (
        <div className="bg-white">
            <div className="p-4">
                <Form formAction={formAction} comicId={comicId} />
                <List comments={comments} />
            </div>
        </div>
    );
} 