"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, TableProperties } from "lucide-react"
import itemImage from "@/assets/item-image.svg"

 
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

export type menuList = {
  name: string
  price : number
  quantity : number
  image : string
}

export const columns: ColumnDef<menuList>[] = [
    {
        header : "Items ",
        accessorKey : "image",
        cell: ({ row }) => {
            const amount = row.getValue("image") || " "
            const name:string = row.getValue("name")
            return  <div className="flex">
                        <img
                            src = {String(amount)} 
                            // alt = "profile_icon"
                            width = {24}
                            height = {24}
                            className = " h-12 w-12 rounded-md border"
                        />
                        <p className="px-2 text-lg">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
                    </div>
        },
    },
    {
        accessorKey : "name",
        header : "",
        cell: ({ row }) => {
            const amount = row.getValue("image") || " "
            const name:string = row.getValue("name")
            return  <div className="flex">
                    </div>
        },
    },
    {
        accessorKey: "quantity",
        header: "Qty",
        cell: ({ row }) => {
            const stock : number = row.getValue("quantity")
            return  <div className={stock<=0?"text-red-600":"text-green-700 text-lg font-semibold"}>
                        {stock} x
                    </div>
        },
    },
    {
        accessorKey : "price",
        header : "Price",
        cell: ({ row }) => {
            const amount : number = row.getValue("price")
            return  <div className="text-xl font-serif">
                        Rs. {amount}                       
                    </div>
        },

    },
    {
        header : "Total Price",
        cell: ({ row }) => {
            const price : number = row.getValue("price")
            const qty : number = row.getValue("quantity")
            const amount = price * qty
            return  <div className="text-xl font-serif">
                        Rs. {amount}                       
                    </div>
        },
    }
]


