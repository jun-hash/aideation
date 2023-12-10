import { db } from "@/lib/db";
import { $tasks } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const { userId } = auth();
    if (!userId) {
        return new NextResponse("unauthorised", { status: 401 });
    }
    const task_ids = await db
    .insert($tasks)
    .values({
        title:'task',
        userId,
    })
    .returning({
        insertedId: $tasks.id,
    })

    console.log('Create Test', task_ids)

    return new NextResponse("ok", { status: 200 });
}

