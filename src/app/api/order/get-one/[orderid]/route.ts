import ItemModel, { Item } from '@/models/item.model'
import OrderModel from '@/models/order.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'
import { pipeline } from 'stream'


////------------------------Adding New Items---------------------------------

export async function GET(req: NextRequest, { params }: { params: { orderid: string } }) {
    await dbConnect()
    try {
        const orderid = params.orderid;

        const order = await OrderModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(orderid)
                }
            },
            {
                $unwind: '$items'
            },
            {
                $lookup: {
                    from: "items",
                    localField: "items.orderItem",
                    foreignField: "_id",
                    as: "orderItemDetails"
                }
            },
            {
                $unwind: '$orderItemDetails'
            },
            {
                $group: {
                    _id: "$_id",
                    items: {
                        $push: {
                            item: "$orderItemDetails",
                            quantity: "$items.quantity"
                        }
                    }
                }
            }
        ])
        if (!order) { return NextResponse.json({ message: "No order found", success: false }, { status: 400 }) }



        return NextResponse.json({ success: true, message: "Order Found", data: order }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while fetching this order" }, { status: 500 })

    }


}