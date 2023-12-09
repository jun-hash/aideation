'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import axios from 'axios'
import { Loader2, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { getSystemErrorName } from 'util'
import { Button } from './ui/button'
import { useToast } from "@/components/ui/use-toast"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation"

type NameState = string

export default function CreateNoteDialog() {
  //Set up
  const router = useRouter()
  const { toast } = useToast()

  //Local state
  const [name, setName] = React.useState<NameState>('')

  // Blocking AI Modal
  const [showToast, setShowToast] = React.useState(false)
  if (showToast) {
    toast({
      title: "AI is Creating Note Image",
    });
  }
  
  //Server State
  const createNotebook = useMutation({
    mutationFn: async () => {
        const response = await axios.post("/api/createNoteBook", {
            name:name
        })
        return response.data;
    },
  })
  console.log(createNotebook) 

  const uploadToFirebase = useMutation({
    mutationFn: async (noteId: string) => {
      const response = await axios.post("/api/uploadToFirebase", {
        noteId,
      });
      return response.data;
    },
  });

  //Event Handler
  const resetHandler = () => {
    setName("")
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Validation
    if (name === "") {
        toast({
            variant: "destructive",
            title: "Please Enter a name",
          })

    }
    //react-queruy mutation
    createNotebook.mutate(undefined, {
        onSuccess:({ note_id }) => {
          console.log(createNotebook)
            toast({
                title: "Note Created",
                description: `${note_id} created`,
              })
              // hit another endpoint to uplod the temp dalle url to permanent firebase url
              uploadToFirebase.mutate(note_id);
              router.push(`/notebook/${note_id}`);
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Note Failed",
                description: error.message
              })
        }
    })
  }

  return (
    <Dialog>
    <DialogTrigger className="border-dashed border-2 flex border-green-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
        <Plus className="w-6 h-6 text-green-600" strokeWidth={3} />
        <h2 className='font-semibold text-green-600 sm:mt-2'>
            New note Book
        </h2>
    </DialogTrigger>

    <DialogContent>
        <DialogHeader>
            <DialogTitle className="text-center">New note Book</DialogTitle>
            <DialogDescription className="text-center">
                You can create a new note by clicking the button below.
            </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <Input 
                value={name}
                onChange = { (e) => setName(e.target.value)}
                placeholder='Name...' 
            />
            <div className='h-4'></div>
            <div className='flex items-center gap-2'>
                <Button type="reset" onClick={resetHandler} variant={"secondary"}>Cancel</Button>
                {!createNotebook.isPending && (
                  <Button type="submit" className='bg-green-600'>
                    Create
                  </Button>
                )}
                {createNotebook.isPending && (
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                )}
            </div>
        </form>
    </DialogContent>
    </Dialog>
  );
}
