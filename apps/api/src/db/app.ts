import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const guestVisit = sqliteTable("guest_visit", {
  id: text("id").primaryKey(),
  guestId: text("guest_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
