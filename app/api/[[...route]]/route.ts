import { comics, comments } from "@/db/schema";
import { sql, eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { randomUUID } from "crypto";

const app = new Hono().basePath("/api");

let memoizedDb: ReturnType<typeof drizzle> | null = null;

function getDatabase() {
    if (!memoizedDb) {
        memoizedDb = drizzle(
            (getCloudflareContext().env as any).DB as unknown as D1Database
        );
    }
    return memoizedDb;
}

app.get("/comics", async (c) => {
    try {
        const db = getDatabase();
        const comicsResponse = await db.select().from(comics);
        return c.json(comicsResponse);
    } catch (error) {
        console.error('DB not found in getComics', error);
        return c.json({ success: false, message: 'DB not found', error: error }, 500);
    }
});

app.get("/comics/:comicId/comments", async (c) => {
    const comicId = c.req.param('comicId');

    try {
        const db = getDatabase();
        const commentsResponse = await db.select()
            .from(comments)
            .where(eq(comments.comicId, comicId))
            .orderBy(desc(comments.createdAt));

        return c.json(commentsResponse);
    } catch (error) {
        console.error('Failed to fetch comments', error);
        return c.json({ success: false, message: 'Failed to fetch comments', error: error }, 500);
    }
});

app.post("/comics/:comicId/comments", async (c) => {
    const comicId = c.req.param('comicId');

    try {
        const { content } = await c.req.json();

        if (!content || content.trim() === '') {
            return c.json({ success: false, message: 'Content is required' }, 400);
        }

        const db = getDatabase();

        await db.insert(comments).values({
            id: randomUUID(),
            comicId: comicId,
            content: content.trim(),
            createdAt: new Date().toISOString(),
        });

        return c.json({ success: true, message: 'Comment posted successfully' });
    } catch (error) {
        console.error('Failed to post comment', error);
        return c.json({ success: false, message: 'Failed to post comment', error: error }, 500);
    }
});

app.get("/image/:filename", async (c) => {
    const filename = c.req.param('filename');

    if (!filename) {
        return c.text('No filename provided', 400);
    }

    try {
        const r2 = (getCloudflareContext().env as any).R2 as unknown as R2Bucket;
        const object = await r2.get(filename);

        if (!object) {
            return c.text('Not found', 404);
        }

        const headers = new Headers({
            'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
            'Cache-Control': 'public, max-age=31536000, immutable',
            'ETag': object.httpEtag || '',
        });

        const ifNoneMatch = c.req.header('If-None-Match');
        if (ifNoneMatch && ifNoneMatch === object.httpEtag) {
            return new Response(null, { status: 304, headers });
        }

        return new Response(object.body, { headers });
    } catch (error) {
        console.error('R2 fetch error', error);
        return c.text('R2 fetch error', 500);
    }
});

app.post("/upload", async (c) => {
    const formData = await c.req.formData();
    const title = formData.get('title');
    const fileData = formData.get('file');

    if (!fileData) {
        return c.json({ message: 'File not found' }, 400);
    }

    const file = fileData as File;
    const fileName = `${Date.now()}-${file.name}`;

    try {
        const r2 = (getCloudflareContext().env as any).R2 as unknown as R2Bucket;
        await r2.put(fileName, file);
    } catch (r2Error) {
        console.error('R2 not found in upload', r2Error);
        return c.json({ success: false, message: 'R2 not found', error: r2Error }, 500);
    }

    const db = getDatabase();

    const result = await db
        .select({ maxOrder: sql`MAX("order")` })
        .from(comics);

    const nextOrder = Number(result[0].maxOrder) + 1;

    try {
        await db.insert(comics).values({
            title: title as string,
            order: nextOrder,
            imageUrl: fileName,
            updatedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Comic uploaded failed', error);
        return c.json({ success: false, message: 'Comic uploaded failed' }, 500);
    }
    return c.json({ success: true, message: 'Comic uploaded successfully' });
});

export const GET = handle(app);
export const POST = handle(app);
