import { apiFetch } from './apiClient';

export type Comment = {
    id?: string;
    comicId: string;
    content: string;
    createdAt: string;
    sending?: boolean;
}

export async function getComments(comicId: string): Promise<Comment[]> {
    const res = await apiFetch(`/api/comics/${comicId}/comments`, {
        next: { tags: [`comments-${comicId}`] }
    });

    const result = await res.json() as Comment[];
    return result;
}