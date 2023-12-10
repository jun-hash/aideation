import React from 'react'
import { db } from "@/lib/db";
import { $tasks, TaskType } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { UserButton, auth  } from '@clerk/nextjs'
import { columns } from "./components/columns"
import { DataTable } from "./components/DataTable"



const TasksPage  =  async () => {
    const { userId } = auth()
    const tasks :TaskType[] = await db
    .select()
    .from($tasks)
    .where(eq($tasks.userId, userId!));

    
    return (
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Tasks!</h2>
                    <p className="text-muted-foreground">
                    Here&apos;s a list of your tasks for this month!
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <UserButton />
                </div>
            </div>
            <DataTable data={tasks} columns={columns} />
        </div>
    )
}



export default TasksPage