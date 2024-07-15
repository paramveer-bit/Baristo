import ItemModel, { Item } from '@/models/item.model'
import CategoryModel from '@/models/category.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'


////------------------------Adding New Items---------------------------------

export async function POST(req: NextRequest) {
    await dbConnect()
    try {
        const { categoryId } = await req.json()

        const category = await CategoryModel.findById(categoryId)

        if (!category) { return NextResponse.json({ message: "Invalid category", success: false }, { status: 400 }) }

        const items = await ItemModel.aggregate([
            {
                $match: {
                    category: new mongoose.Types.ObjectId(categoryId)
                }
            }
        ])


        return NextResponse.json({ success: true, message: "Item Found", data: items }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while finding items" }, { status: 500 })

    }


}