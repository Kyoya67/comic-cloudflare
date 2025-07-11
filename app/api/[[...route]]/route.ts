import { comics, comments } from "@/db/schema";
import { sql, eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { getCloudflareContext } from "@opennextjs/cloudflare";

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

export const GET = handle(app);
