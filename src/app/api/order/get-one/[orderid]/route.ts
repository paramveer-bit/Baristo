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

        if (!mongoose.Types.ObjectId.isValid(orderid)) {
            return NextResponse.json({ success: false, message: "Invalid OrderId" }, { status: 401 })
        }


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

                },
            },
            {
                $unwind: '$orderItemDetails'
            },
            {
                $addFields: {
                    "orderItemDetails.quantity": "$items.quantity"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" }, // Assuming there's a single name per group
                    phoneNo: { $first: "$phoneNo" },
                    tableNo: { $first: "$tableNo" },
                    orderNo: { $first: "$orderNo" },
                    status: { $first: "$status" },
                    createdAt: { $first: "$createdAt" },
                    orderValue: { $first: "$orderValue" },
                    items: {
                        $push: "$orderItemDetails"
                    }

                }
            },
        ])
        if (!order) { return NextResponse.json({ message: "No order found", success: false }, { status: 400 }) }



        return NextResponse.json({ success: true, message: "Order Found", data: order[0] }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while fetching this order" }, { status: 500 })

    }


}