import ItemModel from '@/models/item.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'


////------------------------Adding New Items---------------------------------

export async function POST(req: NextRequest) {
    await dbConnect()
    try {
        const { code, name, image, price, stock, description, category } = await req.json()

        const item = await ItemModel.findOne({ code })

        if (item) {
            return NextResponse.json({ message: "Item with this code already exists", success: false }, { status: 400 })
        }

        const newItem = new ItemModel({
            code,
            name,
            image,
            stock,
            price,
            description,
            category,
        })

        await newItem.save();
        return NextResponse.json({ success: true, data: newItem, message: "Item created successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong which creating new item" }, { status: 500 })

    }


}