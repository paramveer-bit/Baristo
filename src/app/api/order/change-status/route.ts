import ItemModel from '@/models/item.model'
import OrderModel from '@/models/order.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'


////------------------------Adding New Items---------------------------------

export async function PATCH(req: NextRequest) {
    await dbConnect()
    try {
        const { orderId, status } = await req.json()
        console.log(orderId, status)
        const order = await OrderModel.findById(orderId)
        if (!order) {
            return NextResponse.json({ successs: false, message: "No orders Found " }, { status: 400 })
        }
        order.status = status
        await order.save({ validateBeforeSave: true })
        return NextResponse.json({ success: true, message: "Order status Success Fully changes" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while fetching orders" }, { status: 500 })

    }


}