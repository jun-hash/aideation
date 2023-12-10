import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { $tasks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req:Request) {
  const { taskId } = await req.json();
  await db.delete($tasks).where(eq($tasks.id, parseInt(taskId)));
  return new NextResponse("ok", { status: 200 });
}