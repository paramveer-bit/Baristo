"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel
} from "@tanstack/react-table"

import { MoreHorizontal } from "lucide-react"



import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  code?: string
  accessorKey ?: string
}




export function DataTable<TData, TValue>({columns,data,code,accessorKey}: DataTableProps<TData, TValue>){

    
    
    React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])


    const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), 
    onColumnFiltersChange: setColumnFilters,  
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        columnFilters,
      }
    })

    useEffect(()=>{
      if (accessorKey) { // Only proceed if accessorKey is defined
        console.log(accessorKey);
        const column = table.getColumn(`${accessorKey}`);
        if (column) { // Handling null explicitly
          table.getColumn(`${accessorKey}`)?.setFilterValue(code);
        }
      }
    },[code,table,accessorKey])

  return (
    <div className="rounded-md border bg-white my-5">

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="font-bold text-lg">
                    {header.isPlaceholder
                      ? " "
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {/* param */}
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 py-4 px-10 border-t-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
