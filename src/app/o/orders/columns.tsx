"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, TableProperties } from "lucide-react"
import itemImage from "@/assets/item-image.svg"
import Router from "next/router" 

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"

export type menuList = {
  orderNo: string
  createdAt : Date
  name : string
  tableNo : number
  orderValue : number
  status : string
  _id : string
}

export const columns: ColumnDef<menuList>[] = [
    {
        accessorKey: "orderNo",
        header: "Order Id",
        cell: ({ row }) => {
            const code : string = row.getValue("orderNo") || " "
            return  <div className="text-lg pl-3">
                        # {code}                        
                    </div>
        },
    },
    {
        header : "Order Date",
        accessorKey : "createdAt",
    },
    {
        accessorKey : "name",
        header : "Coustomer Name",
    },
    {
        accessorKey: "tableNo",
        header: "Table No",
    },
    {
        accessorKey : "orderValue",
        header : "Amount",
        cell: ({ row }) => {
            const amount : number = row.getValue("orderValue")
            return  <div className="text-xl font-serif">
                        Rs. {amount}                       
                    </div>
        },

    },
    {
        accessorKey : "status",
        header : "Status",
        cell: ({ row }) => {
            const status : string = row.getValue("status")
            var color = "bg-blue-300"
            if(status == "Pending"){
                color = "bg-blue-300"
            }
            else if(status == "Completed"){
                color = "bg-green-300"
            }
            else if(status == "Cancelled"){
                color = "bg-red-400"
            }
            return  <div className="text-lg">
                        <h6 className={`${color} px-2 rounded-md text-center
                        `}>{status}    </h6>                    
                    </div>
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const { _id } = row.original; // Assuming `id` is directly under `row.original`
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="secondary" size="sm">
                            <MoreHorizontal size={20} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <button>Edit</button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <button><Link href={`/o/order/${_id}`}>View Details</Link></button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]


