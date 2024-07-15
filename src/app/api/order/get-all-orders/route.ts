import ItemModel from '@/models/item.model'
import OrderModel from '@/models/order.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'


////------------------------Adding New Items---------------------------------

export async function GET(req: NextRequest) {
    await dbConnect()
    try {
        const orders = await OrderModel.aggregate([
            {
                $sort: {
                    'order.createdAt': -1,
                }

            }
        ])
        if (!orders) {
            return NextResponse.json({ successs: false, message: "No orders are there" }, { status: 400 })
        }

        return NextResponse.json({ success: true, data: orders }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while fetching orders" }, { status: 500 })

    }


}