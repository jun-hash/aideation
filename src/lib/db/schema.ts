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

export const $tasks = pgTable("tasks", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    status:text("status", { enum: ["Backlog", "Todo", "In Progress", "Done", "Canceled"] }),
    label: text("label"),
    priority: text("priority", { enum: ["Low", "Medium", "High"] }),
    userId: text("user_id").notNull(),
})

export type TaskType = {
  id: number,
  title: string,
  status: "Backlog"| "Todo"| "In Progress"| "Done"| "Canceled",
  label: string,
  priority: "Low"| "Medium"| "High",
  userId: string,
}

// drizzle-orm
// drizzle-kit