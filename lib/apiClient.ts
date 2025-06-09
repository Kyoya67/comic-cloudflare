export function getBaseUrl(): string {
    // ブラウザ実行時（Window が存在）→ 相対パスで自己呼び出し
    if (typeof window !== 'undefined') return '';

    // それ以外（preview／ビルド／SSR）→ 127.0.0.1:8787 固定
    return 'http://127.0.0.1:8787';
}

export async function apiFetch(path: string, init?: RequestInit) {
    const res = await fetch(`${getBaseUrl()}${path}`, init);

    if (!res.ok) {
        const msg = await res.text().catch(() => '');
        throw new Error(`API fetch failed (${res.status}) ${msg}`);
    }
    return res;
}