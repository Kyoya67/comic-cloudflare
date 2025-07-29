"use client";

import React, { RefObject, useState } from "react";
import { Button } from "../controls";
import FileUploadArea from "./FileUploadArea";

interface AddComicModalProps {
  isOpen: boolean;
  onClose: () => void;
  formRef: RefObject<HTMLFormElement | null>;
  formAction: (formData: FormData) => Promise<void>;
}

export default function AddComicModal({ isOpen, onClose, formRef, formAction }: AddComicModalProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  // モーダルが開く時に状態をリセット
  React.useEffect(() => {
    if (isOpen) {
      setFileName(null);
      if (formRef.current) {
        formRef.current.reset();
      }
      // ファイルinputも明示的にリセット
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }, [isOpen, formRef]);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
  };

  const handleClose = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    setFileName(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            新規コミック追加
          </h2>
        </div>

        <form ref={formRef} action={formAction} className="p-6 space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-900 text-sm">
              タイトル
            </label>
            <input
              type="text"
              name="title"
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-900 text-sm">
              画像
            </label>
            <FileUploadArea 
              fileName={fileName}
              onFileChange={handleFileChange}
            />
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
