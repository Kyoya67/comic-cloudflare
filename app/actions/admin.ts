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
    const title = formData.get("title") as string;
    const file = formData.get("file") as File;

    if (!title || !file) {
        return { error: "タイトルとファイルを入力してください" };
    }

    try {
        const fileName = `${Date.now()}-${file.name}`;
        const r2 = (getCloudflareContext().env as any).R2 as unknown as R2Bucket;
        await r2.put(fileName, file);


        const db = getDatabase();
        const result = await db
            .select({ maxOrder: sql`MAX("order")` })
            .from(comics);
        const nextOrder = Number(result[0].maxOrder) + 1;

        await db.insert(comics).values({
            title: title,
            order: nextOrder,
            imageUrl: fileName,
            updatedAt: new Date().toISOString(),
        });

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        return { error: "アップロードに失敗しました" };
    }
}