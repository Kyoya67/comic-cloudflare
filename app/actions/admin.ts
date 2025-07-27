"use server";

import { revalidatePath } from "next/cache";
import { comics } from "@/db/schema";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";

let memoizedDb: ReturnType<typeof drizzle> | null = null;

function getDatabase() {
    if (!memoizedDb) {
        memoizedDb = drizzle(
            (getCloudflareContext().env as any).DB as unknown as D1Database
        );
    }
    return memoizedDb;
}

export async function uploadComicAction(formData: FormData) {
    const titleValue = formData.get("title");
    const fileValue = formData.get("file");

    if (!titleValue || typeof titleValue !== "string") {
        return { error: "タイトルを入力してください" };
    }
    if (titleValue.trim() === "") {
        return { error: "タイトルを入力してください" };
    }
    const title = titleValue.trim();

    if (!fileValue || !(fileValue instanceof File)) {
        return { error: "ファイルを選択してください" };
    }
    if (fileValue.size === 0) {
        return { error: "有効なファイルを選択してください" };
    }
    const file = fileValue;

    try {
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${Date.now()}-${sanitizedName}`;

        const context = getCloudflareContext();
        if (!context?.env?.R2) {
            throw new Error("R2 storage not available");
        }
        const r2 = context.env.R2 as R2Bucket;

        await r2.put(fileName, file);

        let fileUploaded = true;

        try {
            const db = getDatabase();
            await db.insert(comics).values({
                title: title,
                order: sql`(SELECT COALESCE(MAX("order"), 0) + 1 FROM ${comics})`,
                imageUrl: fileName,
                updatedAt: new Date().toISOString(),
            });

            revalidatePath("/admin");
            return { success: true };
        } catch (dbError) {
            if (fileUploaded) {
                try {
                    await r2.delete(fileName);
                } catch (deleteError) {
                    console.error("Failed to cleanup uploaded file:", deleteError);
                }
            }

            const errorMessage = dbError instanceof Error ? dbError.message : "データベースエラーが発生しました";
            return { error: `データベース操作に失敗しました: ${errorMessage}` };
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "不明なエラー";
        if (errorMessage.includes("R2")) {
            return { error: `ファイルアップロードに失敗しました: ${errorMessage}` };
        }
        return { error: `アップロードに失敗しました: ${errorMessage}` };
    }
}