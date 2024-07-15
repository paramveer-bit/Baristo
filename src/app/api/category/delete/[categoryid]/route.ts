import CategoryModel from '@/models/category.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'


////------------------------Adding New Items---------------------------------

export async function DELETE(req: NextRequest, { params }: { params: { categoryid: string } }) {
    await dbConnect()
    try {
        const categoryid = params.categoryid;

        const category = await CategoryModel.findById(categoryid)

        if (!category) { return NextResponse.json({ message: "No Category found", success: false }, { status: 400 }) }

        await CategoryModel.findByIdAndDelete(categoryid)

        return NextResponse.json({ success: true, message: "Category delete Successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while deleting Category" }, { status: 500 })

    }


}