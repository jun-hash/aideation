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
  
import { Loader2, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { getSystemErrorName } from 'util'
import { Button } from './ui/button'

export default function CreateNoteDialog() {
  const [name, setName] = React.useState('')
  const handleSubmit = () => {
    e.preventDefault();
    console.log('제출했습니다.')
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
                <Button type="reset" variant={"secondary"}>Cancel</Button>
                <Button type="submit" className='bg-green-600'>Create</Button>
            </div>
        </form>
    </DialogContent>
    </Dialog>
  );
}
