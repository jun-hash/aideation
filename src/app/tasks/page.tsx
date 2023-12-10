import React from 'react'
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { UserButton, auth  } from '@clerk/nextjs'

type Props = {}

const TasksPage = (props: Props) => {
    const { userId } = auth()
    return (
    <div>page {userId}</div>
    )
}



export default TasksPage