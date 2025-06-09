import { comics } from "@/db/schema";
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

export const GET = handle(app);
