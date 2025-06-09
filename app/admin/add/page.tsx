'use client';

export const dynamic = 'force-dynamic';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';

import { uploadComic } from '../../../lib/uploadComic';

export default function NewComicPage() {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !file) {
            alert('タイトルとファイルを入力してください');
            return;
        }
        try {
            await uploadComic({ title, file });
            alert('アップロードが完了しました');
        } catch (error) {
            alert('アップロードに失敗しました');
        }
    };

    return (
        <div className="max-w-xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">最新話をアップロード</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 font-semibold">タイトル</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div {...getRootProps()} className="border-2 border-dashed rounded p-6 text-center cursor-pointer bg-gray-50">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>ここに画像をドロップしてください...</p>
                    ) : file ? (
                        <div>
                            <p>選択されたファイル: {file.name}</p>
                            <img src={URL.createObjectURL(file)} alt="preview" className="max-h-48 mx-auto mt-2" />
                        </div>
                    ) : (
                        <p>ここに画像をドラッグ＆ドロップ、またはクリックして選択</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                >
                    アップロード
                </button>
                <Link
                    href="/admin"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mx-4 rounded"
                >
                    戻る
                </Link>
            </form>
        </div>
    );
}