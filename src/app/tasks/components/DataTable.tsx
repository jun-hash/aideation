"use client"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./DataTableViewOptions"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { DataTablePagination } from "./DataTablePagination"
import { DataTableFacetedFilter } from "./DataTableFacetedFilter"
import { priorities, statuses } from "./data"
import { Plus } from "lucide-react"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation"
import axios from 'axios'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const isFiltered = table.getState().columnFilters.length > 0

  // Server State
  const addTaskMutation = useMutation({
    mutationFn: async () => {
        const response = await axios.post("/api/createTask")
        return response.data;
    },
    })

  const addTask = () => {
    addTaskMutation.mutate(undefined, {
      onSuccess: () => {
          console.log('ADD')
          router.refresh()
      },
      onError: (error) => {
          console.error(error)
      }
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter tasks..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          )}
          {table.getColumn("priority") && (
            <DataTableFacetedFilter
              column={table.getColumn("priority")}
              title="Priority"
              options={priorities}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <DataTableViewOptions table={table} />
      </div>

      <div className="rounded-md border">
          <Table>
              <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                      return (
                      <TableHead key={header.id}>
                          {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                              )}
                      </TableHead>
                      )
                  })}
                  </TableRow>
              ))}
              </TableHeader>
              <TableBody>
              {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                  <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                  >
                      {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                      ))}
                  </TableRow>
                  ))
              ) : (
                  <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                      No results.
                  </TableCell>
                  </TableRow>
              )}
                <TableRow>
                  <TableCell colSpan={columns.length} onClick={addTask} className="cursor-pointer">
                    <div className="flex items-center">
                      <Plus className="w-6 h-6" strokeWidth={1} />
                      <div className="text-muted-foreground">New Task</div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
          </Table>
      </div>
      <div className="h-5"></div>
      <DataTablePagination table={table} />
    </div>
  )
}
