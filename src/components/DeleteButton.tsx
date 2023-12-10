'use client'
import React from 'react'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation"


type Props = {
    noteId: number;
  }

const DeleteButton = ({noteId}: Props) => {
    const router = useRouter()
    //Server State
    const deleteNoteMutation = useMutation({
    mutationFn: async () => {
        const response = await axios.post("/api/deleteNote", {
            noteId,
        })
        return response.data;
    },
    })

  
    const deleteNote = () => {
        const confirm = window.confirm(
            "Are you sure you wnat to delete this note?"
        )
        if(!confirm) return;
        deleteNoteMutation.mutate(undefined, {
            onSuccess: (data) => {
                router.push("/dashboard")
            },
            onError: (error) => {
                console.error(error)
            }
        })
    }
    return (
    <div className='flex'>
        <Button onClick={deleteNote} variant={"destructive"} disabled={deleteNoteMutation.isPending}>
            <Trash2 />
        </Button>
    </div>

    )
}

export default DeleteButton