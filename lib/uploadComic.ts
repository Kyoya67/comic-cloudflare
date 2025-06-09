import { apiFetch } from './apiClient';

export async function uploadComic({ title, file }: { title: string, file: File }) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    const res = await apiFetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) throw new Error('アップロードに失敗しました');
    return res.json();
}