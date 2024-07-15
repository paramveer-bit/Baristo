import ItemModel from '@/models/item.model'
import OrderModel from '@/models/order.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'


////------------------------Adding New Items---------------------------------

export async function GET(req: NextRequest) {
    await dbConnect()
    try {
        const currMonth = new Date().getMonth() + 1
        const revenue = await OrderModel.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" },
                    orderValue: "$orderValue"
                }
            },
            {
                $group: {
                    _id: { month: "$month", year: "$year" }, // Group by both month and year
                    revenue: { $sum: "$orderValue" }, // Sum up all orderValues for each group
                    count: { $sum: 1 } // Count the number of orders in each group
                }
            }
        ])
        if (!revenue) {
            return NextResponse.json({ successs: false, message: "Error in finding revenue" }, { status: 400 })
        }

        return NextResponse.json({ success: true, data: revenue }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while fetching revenue" }, { status: 500 })

    }


}