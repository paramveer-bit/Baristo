import ItemModel, { Item } from '@/models/item.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'


////------------------------Adding New Items---------------------------------

export async function GET(req: NextRequest, { params }: { params: { itemid: string } }) {
    await dbConnect()
    try {
        const itemid = params.itemid;

        const item = await ItemModel.findById(itemid)

        if (!item) { return NextResponse.json({ message: "No item found", success: false }, { status: 400 }) }



        return NextResponse.json({ success: true, message: "Item Found", data: item }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong while deleting item" }, { status: 500 })

    }


}