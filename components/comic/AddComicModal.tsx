'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../controls';
import { uploadComicAction } from '@/app/admin/action';
import { useBlobUrl } from '@/hooks/useBlobUrl';

interface AddComicModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddComicModal({ isOpen, onClose }: AddComicModalProps) {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const blobUrl = useBlobUrl(file);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false,
    });

    const handleAction = async (formData: FormData) => {
        formData.append('title', title);
        formData.append('file', file as File);

        try {
            await uploadComicAction(formData);
            setTitle('');
            setFile(null);
            onClose();
        } catch (error) {
            console.error('Failed to upload comic:', error);
        }
    };

    const handleClose = () => {
        setTitle('');
        setFile(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">新規コミック追加</h2>
                </div>

                <form action={handleAction} className="p-6 space-y-6">
                    <div>
                        <label className="block mb-2 font-semibold text-gray-900 text-sm">タイトル</label>
                        <input
                            type="text"
                            name="title"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold text-gray-900 text-sm">画像</label>
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded p-6 text-center cursor-pointer min-h-[160px] transition-colors ${isDragActive
                                ? 'border-blue-400 bg-blue-50'
                                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                                }`}
                        >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p className="text-sm text-blue-600">ここに画像をドロップしてください...</p>
                            ) : file ? (
                                <div>
                                    <p className="text-sm text-gray-700 mb-2">選択されたファイル: {file.name}</p>
                                    <img
                                        src={blobUrl || undefined}
                                        alt="preview"
                                        className="max-h-48 mx-auto mt-2 rounded"
                                    />
                                </div>
                            ) : (
                                <div className="text-gray-500">
                                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="text-sm">ここに画像をドラッグ＆ドロップ、またはクリックして選択</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        >
                            キャンセル
                        </Button>
                        <Button
                            type="submit"
                            disabled={!title.trim() || !file}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            アップロード
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
} 