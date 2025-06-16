'use client';

export const dynamic = 'force-dynamic';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import AdminHeader from '../../../components/AdminHeader';
import { Button } from '../../../components/controls';

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
        <div className="min-h-screen bg-gray-900">
            <AdminHeader showAddButton={false} />

            <main className="max-w-xl mx-auto py-6 px-4 sm:py-10 sm:px-0">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                        <label className="block mb-2 font-semibold text-white text-sm sm:text-base">タイトル</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div {...getRootProps()} className="border-2 border-dashed rounded p-4 sm:p-6 text-center cursor-pointer bg-gray-50 min-h-[120px] sm:min-h-[160px]">
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p className="text-sm sm:text-base">ここに画像をドロップしてください...</p>
                        ) : file ? (
                            <div>
                                <p className="text-sm sm:text-base mb-2">選択されたファイル: {file.name}</p>
                                <img src={URL.createObjectURL(file)} alt="preview" className="max-h-32 sm:max-h-48 mx-auto mt-2 rounded" />
                            </div>
                        ) : (
                            <p className="text-sm sm:text-base">ここに画像をドラッグ＆ドロップ、またはクリックして選択</p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        アップロード
                    </Button>
                </form>
            </main>
        </div>
    );
}