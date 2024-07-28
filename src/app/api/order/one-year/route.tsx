import ItemModel from '@/models/item.model'
import OrderModel from '@/models/order.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'


////------------------------Adding New Items---------------------------------

export async function GET(req: NextRequest) {
    await dbConnect()
    try {
        const currDate = new Date()
        const oneYearAgo = new Date(currDate.setFullYear(currDate.getFullYear() - 1))

        const revenue = await OrderModel.aggregate([

            {
                $match: {
                    createdAt: { $gte: oneYearAgo }
                }
            },
            {
                $project: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    orderValue: "$orderValue",
                }
            },
            {
                $group: {
                    _id: "$date", // Group by the formatted date string
                    totalRevenue: { $sum: "$orderValue" },
                    orderCount: { $sum: 1 }
                }
            },
            {
                $addFields: {
                    date: "$_id"
                }
            },
            {
                $project: {
                    _id: 0 // Exclude the _id field
                }
            },
            {
                $sort: {
                    date: 1 // Sort by createdAt in ascending order
                }
            },
        ])
        if (!revenue) {
            return NextResponse.json({ successs: false, message: "Error in finding revenue" }, { status: 400 })
        }

        return NextResponse.json({ success: true, data: revenue }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while fetching revenue" }, { status: 500 })

    }


}