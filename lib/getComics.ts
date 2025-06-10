import { apiFetch } from './apiClient';
import type { Comic } from '../types/comic';

export async function getComics(): Promise<Comic[]> {
    console.log('🔵 getComics called');
    const res = await apiFetch('/api/comics', {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch comics");
    const result = await res.json() as Comic[];
    console.log('✅ getComics completed');
    return result;
} 