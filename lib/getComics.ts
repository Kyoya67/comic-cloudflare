import { apiFetch } from './apiClient';
import type { Comic } from '../types/comic';

export async function getComics(): Promise<Comic[]> {
    const res = await apiFetch('/api/comics', {
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 12,
        },
    });
    if (!res.ok) throw new Error("Failed to fetch comics");
    const result = await res.json() as Comic[];

    return result;
} 