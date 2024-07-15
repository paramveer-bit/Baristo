import CategoryModel from '@/models/category.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'


////------------------------Adding New Items---------------------------------

export async function GET(req: NextRequest) {
    await dbConnect()
    try {
        const categories = await CategoryModel.find()

        if (!categories) { return NextResponse.json({ message: "No Categories are there", success: false }, { status: 400 }) }



        return NextResponse.json({ success: true, message: "Categories feched succesfully", data: categories }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while fetching categories" }, { status: 500 })

    }


}