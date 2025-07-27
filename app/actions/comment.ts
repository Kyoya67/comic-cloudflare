'use server';

import { revalidateTag } from "next/cache";
import { comments } from "@/db/schema";
import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { randomUUID } from "crypto";

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

export async function createComment(comicId: string, content: string) {
    if (!content || content.trim() === '') {
        return { error: 'コメント内容を入力してください' };
    }

    try {
        const db = getDatabase();
        await db.insert(comments).values({
            id: randomUUID(),
            comicId: comicId,
            content: content.trim(),
            createdAt: new Date().toISOString(),
        });

        revalidateTag(`comments-${comicId}`);
        return { success: true };
    } catch (error) {
        return { error: 'コメントの投稿に失敗しました' };
    }
}