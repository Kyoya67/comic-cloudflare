import { comics } from "@/db/schema";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const app = new Hono().basePath("/api");

app.get("/comics", async (c) => {
    const db = drizzle(
        (getCloudflareContext().env as any).DB as unknown as D1Database
    );
    const comicsResponse = await db.select().from(comics);
    return c.json(comicsResponse);
});

app.post("/upload", async (c) => {
    const formData = await c.req.formData();
    const title = formData.get('title');
    const file = formData.get('file') as File;

    try {
        const db = drizzle(
            (getCloudflareContext().env as any).DB as unknown as D1Database
        );

        const result = await db
            .select({ maxOrder: sql`MAX("order")` })
            .from(comics);
        const nextOrder = Number(result[0].maxOrder) + 1;

        await db.insert(comics).values({
            title: title as string,
            order: nextOrder,
            imageUrl: file.name as string,
            updatedAt: new Date().toISOString(),
        });
    } catch (error) {
        return c.json({ message: 'Comic uploaded failed' }, 500);
    }
    return c.json({ message: 'Comic uploaded successfully' });
});

export const GET = handle(app);
export const POST = handle(app);
