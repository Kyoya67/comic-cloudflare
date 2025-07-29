"use client";

import { useState, useEffect, useRef, useOptimistic } from "react";

import { getComments, type Comment } from "@/lib/commentApi";
import { createComment } from "@/app/actions/comment/actions";

import Form from "./Form";
import List from "./List";

type SectionProps = {
  comicId: string;
};

type OptComment = Comment & { sending?: boolean };

export default function Section({ comicId }: SectionProps) {
  const [comments, setComments] = useState<OptComment[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (prevComments, newComment: OptComment) => {
      if (prevComments.length <= 1) return [newComment];
      return [{ ...newComment }, ...prevComments];
    },
  );

  async function formAction(formData: FormData) {
    const comicId = formData.get("comicId") as string;
    const content = formData.get("comment") as string;
    const createdAt = new Date().toISOString();

    addOptimisticComment({
      comicId: comicId,
      content: content,
      createdAt: createdAt,
      sending: true,
    });

    try {
      const result = await createComment(formData);
      if (result.error) {
        alert(
          result.error.message ||
            "コメントの投稿に失敗しました。もう一度お試しください。",
        );
        return;
      }
      if (result.comment) {
        setComments([result.comment, ...comments]);
        fetchComments();
      }
    } catch (error) {
      console.error("Failed to create comment:", error);
      alert("コメントの投稿に失敗しました。もう一度お試しください。");
      return;
    }

    formRef.current?.reset();
  }

  const fetchComments = async () => {
    try {
      const data = await getComments(comicId);
      // Comment型からOptComment型に変換（sendingプロパティは存在しない）
      setComments(data);
    } catch (error) {
      console.error("コメント取得エラー:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [comicId]);

  return (
    <div className="bg-white">
      <div className="p-4">
        <Form comicId={comicId} formRef={formRef} formAction={formAction} />
        <List comments={optimisticComments} />
      </div>
    </div>
  );
}
