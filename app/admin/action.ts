"use server";

import { revalidatePath } from "next/cache";
import { uploadComic } from "@/lib/uploadComic";

export async function uploadComicAction(formData: FormData) {
    const title = formData.get("title") as string;
    const file = formData.get("file") as File;

    if (!title || !file) {
        return { error: "タイトルとファイルを入力してください" };
    }

    try {
        await uploadComic({ title, file });
        revalidatePath("/admin");
        console.log("Uploaded comic:", title);
        return { success: true };
    } catch (error) {
        console.error("Failed to upload comic:", error);
        return { error: "アップロードに失敗しました" };
    }
}