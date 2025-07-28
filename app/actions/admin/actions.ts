"use server";

import { revalidatePath } from "next/cache";
import { comics } from "@/db/schema";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { handleAdminError, handleAdminSuccess } from "./state";
import type { AdminFormState } from "./state";
import type { Comic } from "@/types/comic";

let memoizedDb: ReturnType<typeof drizzle> | null = null;

function getDatabase() {
    if (!memoizedDb) {
        memoizedDb = drizzle(
            (getCloudflareContext().env as any).DB as unknown as D1Database
        );
    }
    return memoizedDb;
}

export async function uploadComicAction(formData: FormData): Promise<AdminFormState> {
    const titleValue = formData.get("title");
    const fileValue = formData.get("file");

    if (!titleValue || typeof titleValue !== "string") {
        return handleAdminError({ message: "タイトルを入力してください", status: 400 });
    }
    if (titleValue.trim() === "") {
        return handleAdminError({ message: "タイトルを入力してください", status: 400 });
    }
    const title = titleValue.trim();

    if (!fileValue || !(fileValue instanceof File)) {
        return handleAdminError({ message: "ファイルを選択してください", status: 400 });
    }
    if (fileValue.size === 0) {
        return handleAdminError({ message: "有効なファイルを選択してください", status: 400 });
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
            const result = await db.insert(comics).values({
                title: title,
                order: sql`(SELECT COALESCE(MAX("order"), 0) + 1 FROM ${comics})`,
                imageUrl: fileName,
                updatedAt: new Date().toISOString(),
            }).returning();

            const comic: Comic = {
                id: result[0].id,
                title: result[0].title,
                order: result[0].order,
                imageUrl: result[0].imageUrl,
                updatedAt: result[0].updatedAt,
            };

            revalidatePath("/admin");
            return handleAdminSuccess(comic);
        } catch (dbError) {
            if (fileUploaded) {
                try {
                    await r2.delete(fileName);
                } catch (deleteError) {
                    console.error("Failed to cleanup uploaded file:", deleteError);
                }
            }

            const errorMessage = dbError instanceof Error ? dbError.message : "データベースエラーが発生しました";
            return handleAdminError({ message: `データベース操作に失敗しました: ${errorMessage}`, status: 500 });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "不明なエラー";
        if (errorMessage.includes("R2")) {
            return handleAdminError({ message: `ファイルアップロードに失敗しました: ${errorMessage}`, status: 500 });
        }
        return handleAdminError({ message: `アップロードに失敗しました: ${errorMessage}`, status: 500 });
    }
} 