import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

//Table 생성
export const $notes = pgTable("notes", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    imageUrl: text("imageUrl"),
    userId: text("user_id").notNull(),
    editorState: text("editor_state"),
  });

  export type NoteType = {
    id: number,
    name: string,
    createdAt: Date,
    imageurl: string,
    userId: string,
    editorState: string,
  }

// drizzle-orm
// drizzle-kit