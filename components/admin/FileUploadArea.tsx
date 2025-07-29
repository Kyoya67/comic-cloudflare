"use client";

import React, { useCallback, useState } from "react";

interface FileUploadAreaProps {
  fileName: string | null;
  onFileChange: (file: File | null) => void;
}

export default function FileUploadArea({ fileName, onFileChange }: FileUploadAreaProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // プレビューURLのクリーンアップ
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(imageFile);
        fileInput.files = dataTransfer.files;
        onFileChange(imageFile);
        
        // プレビューURLを作成
        const url = URL.createObjectURL(imageFile);
        setPreviewUrl(url);
      }
    }
  }, [onFileChange]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed p-6 text-center cursor-pointer min-h-[160px] transition-colors ${
        isDragActive
          ? "border-blue-400 bg-blue-50"
          : "border-gray-300 bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <input 
        type="file"
        name="file" 
        accept="image/*" 
        required 
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          onFileChange(file);
          
          // プレビューURLを作成またはクリア
          if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
          } else {
            setPreviewUrl(null);
          }
        }}
        className="hidden"
        id="file-input"
      />
      <label htmlFor="file-input" className="cursor-pointer">
        {isDragActive ? (
          <p className="text-sm text-blue-600">
            ここに画像をドロップしてください...
          </p>
        ) : previewUrl ? (
          <div>
            <img
              src={previewUrl}
              alt="プレビュー"
              className="max-h-48 mx-auto rounded shadow-sm"
            />
          </div>
        ) : (
          <div className="text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm">
              ここに画像をドラッグ＆ドロップ、またはクリックして選択
            </p>
          </div>
        )}
      </label>
    </div>
  );
} 