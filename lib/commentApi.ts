import { apiFetch } from './apiClient';

export interface Comment {
    id: string;
    content: string;
    createdAt: string;
}

export async function getComments(comicId: string): Promise<Comment[]> {
    const res = await apiFetch(`/api/comics/${comicId}/comments`, {
        cache: "no-store",
    });

    const result = await res.json() as Comment[];
    return result;
}

export async function postComment(comicId: string, content: string): Promise<void> {
    await apiFetch(`/api/comics/${comicId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content.trim() }),
    });
} 