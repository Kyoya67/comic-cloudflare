"use server";

import { revalidateTag } from "next/cache";
import { comments } from "@/db/schema";
import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { randomUUID } from "crypto";
import { errors, handleError, handleSuccess } from "./state";
import type { FormState } from "./state";
import type { Comment } from "@/types/comment";

let memoizedDb: ReturnType<typeof drizzle> | null = null;

function getDatabase() {
    if (!memoizedDb) {
        try {
            const context = getCloudflareContext();
            if (!context?.env?.DB) {
                throw new Error('Database not available in Cloudflare context');
            }
            memoizedDb = drizzle(context.env.DB as D1Database);
        } catch (error) {
            throw new Error('Failed to initialize database connection');
        }
    }
    return memoizedDb;
}

function validateFormData(formData: FormData) {
    const comicId = formData.get("comicId") as string;
    const content = formData.get("comment") as string;

    if (!comicId || !content) {
        throw new Error('Required fields are missing');
    }

    if (content.trim() === '') {
        throw new Error('コメント内容を入力してください');
    }

    if (content.length > 500) {
        throw new Error('コメントは500文字以内で入力してください');
    }

    return { comicId, content: content.trim() };
}

export async function createComment(formData: FormData): Promise<FormState> {
    try {
        const { comicId, content } = validateFormData(formData);
        const id = randomUUID();

        const db = getDatabase();
        const result = await db.insert(comments).values({
            id,
            comicId,
            content,
            createdAt: new Date().toISOString(),
        }).returning();

        const comment: Comment = {
            id: result[0].id,
            comicId: result[0].comicId,
            content: result[0].content,
            createdAt: result[0].createdAt,
        };

        revalidateTag(`comments-${comicId}`);
        return handleSuccess(comment);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'コメントの投稿に失敗しました';
        return handleError({ message: errorMessage, status: 500 });
    }
} 