import type { Comic } from '../types/comic';

export async function getComics(): Promise<Comic[]> {
    const res = await fetch(`http://localhost:3000/api/comics`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch comics");
    return res.json();
} 