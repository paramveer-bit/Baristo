import ItemModel, { Item } from '@/models/item.model'
import CategoryModel from '@/models/category.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'


////------------------------Adding New Items---------------------------------

export async function POST(req: NextRequest) {
    await dbConnect()
    try {
        const { name, image } = await req.json()

        const category = await CategoryModel.findOne({ name: name })
        console.log(category)

        if (category) { return NextResponse.json({ message: "Category name should be unique", success: false }, { status: 400 }) }

        const newCategory = await CategoryModel.create({ name, image })



        return NextResponse.json({ success: true, message: "New Category created", data: newCategory }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while creating Category" }, { status: 500 })

    }


}