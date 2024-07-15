import ItemModel from '@/models/item.model'
import OrderModel from '@/models/order.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'


////------------------------Adding New Items---------------------------------

export async function POST(req: NextRequest) {
    await dbConnect()
    try {
        const { name, phoneNo, tableNo, orderNo, status, items, orderValue } = await req.json()
        console.log(items)
        const newOrder = new OrderModel({
            name,
            phoneNo,
            tableNo,
            orderNo,
            status,
            items,
            orderValue,
            // createdAt: new Date()
        })

        await newOrder.save();
        return NextResponse.json({ success: true, data: newOrder }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong which creating new item" }, { status: 500 })

    }


}