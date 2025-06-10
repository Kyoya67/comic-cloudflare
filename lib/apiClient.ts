
export function getBaseUrl(): string {
    if (typeof window !== 'undefined') return '';

    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3000';
    }

    if (process.env.MINIFLARE === 'true') {
        return 'http://127.0.0.1:8787';
    }

    if (process.env.NODE_ENV === 'production') {
        return `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
    }

    return '';
}

export async function apiFetch(path: string, init?: RequestInit) {
    const res = await fetch(`${getBaseUrl()}${path}`, init);
    if (!res.ok) {
        const msg = await res.text().catch(() => '');
        throw new Error(`API fetch failed (${res.status}) ${msg}`);
    }
    return res;
}