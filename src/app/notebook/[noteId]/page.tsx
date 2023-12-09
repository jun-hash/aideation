import React from 'react'
import { auth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { clerk } from "@/lib/clerk-server";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import TiptapEditer from '@/components/TiptapEditer';

type Props = {
    params: {
        noteId: string
    }
}

const NotebookPage  = async ({params: {noteId}} : Props) => {
  // Server State
  const { userId } = await auth()
  const user = await clerk.users.getUser(userId)
  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)))
  const note = notes[0]

  /*Helper function*/
  if(!userId) {
      return redirect("/dashboard")
  }
  if(notes.length !=1) {
    return redirect("/dashboard")
  }

  

  return (
    <div className="min-h-screen grainy p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button className="bg-green-600" size="sm">
              Back
            </Button>
          </Link>
            <div className="w-3"></div>
            <span className='font-semibold'>
              {user.firstName} {user.lastName}
            </span>
            <span className="inline-block mx-1 ">/</span>
            <span className = "text-stone-500 font-semibold">
              {note.name}
            </span>
            <div className="ml-auto">
              <Button variant="destructive" size="sm">Delete</Button>
            </div>
        </div>

        {/* TipTab Editor */}
        <div className='border shadow-xl border-stone-200 rounded-lg px-16 py-8 w-full'>
          <TiptapEditer note={note}></TiptapEditer>
        </div>
      </div>
    </div>
    
  )
}

export default NotebookPage;