'use client';

import { useState, useEffect } from 'react';
import { getComments, type Comment } from '@/lib/commentApi';
import Form from './Form';
import List from './List';

interface SectionProps {
    comicId: string;
}

export default function Section({ comicId }: SectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);

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
                <Form comicId={comicId} onCommentAdded={fetchComments} />
                <List comments={comments} />
            </div>
        </div>
    );
} 