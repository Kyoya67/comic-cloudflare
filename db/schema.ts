import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { randomUUID } from "crypto";

export const comics = sqliteTable("comics", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    title: text("title").notNull(),
    imageUrl: text("imageUrl").notNull(),
    order: integer("order").notNull(),
    updatedAt: text("updatedAt")
        .notNull()
        .$defaultFn(() => new Date().toISOString()),
});
