import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { $tasks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req:Request) {
    try {
        const body =await req.json()
        let {taskId, status, label, priority } = body
        taskId = parseInt(taskId)
        const tasks = await db.select().from($tasks).where(eq($tasks.id, taskId))
        if(tasks.length !=1) {
            return new NextResponse('failed to update', {status:500})
        }

        const task = tasks[0]
        await db.update($tasks).set({taskId, status, label, priority }).where(eq($tasks.id, taskId))

        return NextResponse.json(
            {
              success: true,
            },
            { status: 200 }
          );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
          {
            success: false,
          },
          { status: 500 }
        );
        
    }
}