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
import { useMutation } from "@tanstack/react-query";

export default function CreateNoteDialog() {
  const [name, setName] = React.useState('')

  const createNotebook = useMutation({
    mutationFn: async () => {
        const response = await axios.post("/api/createNoteBook", {
            name:name
        })
        return response.data;
    },
  }) 

  const resetHandler = () => {
    setName("")
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Validation
    if (name === "") {
        window.alert("Please enter a name for your notebook")
        return;

    }
    //react-queruy mutation
    createNotebook.mutate(undefined, {
        onSuccess:() => {
            console.log("created new note:")
        },
        onError: (error) => {
            console.error(error)
            window.alert("Failed to create new notebook")
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
                <Button type="submit" className='bg-green-600'>Create</Button>
            </div>
        </form>
    </DialogContent>
    </Dialog>
  );
}
