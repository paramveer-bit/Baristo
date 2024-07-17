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
  code: string
  name: string
  stock: number
  price : number
  image : string
}

export const columns: ColumnDef<menuList>[] = [
    {
        accessorKey: "code",
        header: "Code",
        cell: ({ row }) => {
            const code : string = row.getValue("code") || " "
            return  <div className="text-lg pl-3">
                        # {code}                        
                    </div>
        },
    },
    {
        
        // header: () => <div className="text-right"></div>,
        header : "Item ",
        accessorKey : "image",
        cell: ({ row }) => {
            const amount = row.getValue("image") || " "
            const name:string = row.getValue("name")
            // const formatted = new Intl.NumberFormat("en-US", {
            //     style: "currency",
            //     currency: "USD",
            // }).format(amount)
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
            // const formatted = new Intl.NumberFormat("en-US", {
            //     style: "currency",
            //     currency: "USD",
            // }).format(amount)
            return  <div className="flex">
                        {/* <img
                            src = {String(amount)} 
                            // alt = "profile_icon"
                            width = {24}
                            height = {24}
                            className = "h-20 w-20"
                        />
                        {name} */}
                        
                    </div>
        },
    },
    {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => {
            const stock : number = row.getValue("stock")
            // const formatted = new Intl.NumberFormat("en-US", {
            //     style: "currency",
            //     currency: "USD",
            // }).format(amount)
            return  <div className={stock<=0?"text-red-600":"text-green-700 text-lg font-semibold"}>
                        {stock}
                    </div>
        },
    },
    {
        accessorKey : "price",
        header : "Price",
        cell: ({ row }) => {
            const amount : number = row.getValue("price")
            return  <div className="text-lg">
                        Rs. {amount}                       
                    </div>
        },

    },
]


