"use client";

import { useOptimistic, useRef, useState } from "react";

import { ComicActionButtons } from "../controls";
import { uploadComicAction } from "@/app/actions/admin";
import type { Comic } from "../../types/comic";

import AddComicModal from "./AddComicModal";
import AdminHeader from "./header";
import Card from "../comic/Card";

interface AdminContentProps {
  initialComics: Comic[];
}

export default function AdminContent({ initialComics }: AdminContentProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [comics, setComics] = useState(initialComics);

  const [optimisticComics, addOptimisticComics] = useOptimistic(
    comics,
    (prevComics: Comic[], newComics: Comic) => {
        return [newComics, ...prevComics];
    }
  )

  const formAction = async (formData: FormData) => {
    const title = formData.get("title") as string;

    addOptimisticComics({
        id: "",
        title,
        updatedAt: "",
        order: comics.length + 1,
    });

    try {
      const result = await uploadComicAction(formData);
      if (result.error) {
        alert(
            result.error.message ||
              "漫画の投稿に失敗しました。もう一度お試しください。",
        );
        return;
      }
      if (result.comic) {
        setComics([...comics, result.comic]);
      }
      
      setIsAddModalOpen(false);
    } catch (error) {
      alert("漫画の投稿に失敗しました。もう一度お試しください。");
      return;
    }
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminHeader onAddClick={() => setIsAddModalOpen(true)} />
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {optimisticComics.map((comic) => (
            <div key={comic.id} className="relative">
              <Card
                id={comic.id}
                title={comic.title}
                updatedAt={comic.updatedAt}
                imageUrl={comic.imageUrl}
                order={comic.order}
              />
              <ComicActionButtons comicId={comic.id} />
            </div>
          ))}
        </div>
      </main>

      <AddComicModal 
        isOpen={isAddModalOpen} 
        onClose={handleModalClose}
        formRef={formRef}
        formAction={formAction} 
        />
    </div>
  );
}
