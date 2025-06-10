import { apiFetch } from './apiClient';
import type { Comic } from '../types/comic';

export async function getComic(id: string): Promise<Comic | null> {
    console.log(`🟡 getComic called for id: ${id}`);
    try {
        const res = await apiFetch(`/api/comics/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) {
            if (res.status === 404) {
                console.log(`❌ getComic: Comic ${id} not found`);
                return null;
            }
            throw new Error("Failed to fetch comic");
        }
        const result = await res.json() as Comic;
        console.log(`✅ getComic completed for id: ${id}`);
        return result;
    } catch (error) {
        console.error('Failed to fetch comic:', error);
        return null;
    }
} 