"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { labels } from "./data"
// import { $tasks } from "@/lib/db/schema"
import axios from 'axios'
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
  }


export function DataTableRowActions<TData>({
    row,
  }: DataTableRowActionsProps<TData>) {
    const task = row.original
    const router = useRouter()

    // Server State
    const deleteTaskMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post("/api/deleteTask", {
                taskId: task.id
            })
            return response.data;
        },
        })
    
    const updateTaskMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post("/api/updateTask", {
                taskId: task.id,
                status: "Todo",
                label: "feature",
                priority: "Low",
            })
            return response.data;
        },
        })    
    // Event Handler

    const updateTask = () => {
        updateTaskMutation.mutate(undefined, {
            onSuccess: () => {
                router.refresh()
            },
            onError: (error) => {
                console.error(error)
            }
        })

    }

    const deleteTask = () => {
        deleteTaskMutation.mutate(undefined, {
            onSuccess: () => {
                router.refresh()
            },
            onError: (error) => {
                console.error(error)
            }
        })
    }


  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={updateTask}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(task.title)}>Copy Title</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={task.label}>
                {labels.map((label) => (
                  <DropdownMenuRadioItem key={label.value} value={label.value}>
                    {label.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={deleteTask}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}
