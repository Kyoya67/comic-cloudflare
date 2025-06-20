import { apiFetch } from './apiClient';
import type { Comic } from '../types/comic';

export async function getComic(id: string): Promise<Comic | null> {

    try {
        const res = await apiFetch(`/api/comics/${id}`, {
            cache: "force-cache",
            next: {
                revalidate: 60 * 60 * 12,
            },
        });
        if (!res.ok) {
            if (res.status === 404) {

                return null;
            }
            throw new Error("Failed to fetch comic");
        }
        const result = await res.json() as Comic;

        return result;
    } catch (error) {
        console.error('Failed to fetch comic:', error);
        return null;
    }
} 