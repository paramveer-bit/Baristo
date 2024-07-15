import ItemModel from '@/models/item.model'
import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import { NextRequest,NextResponse } from 'next/server'


////------------------------Adding New Items---------------------------------
 
export async function DELETE(req: NextRequest,{params}:{params:{itemid:string}}) {
    await dbConnect()
    try {
        const itemid = params.itemid
            console.log(itemid)
        const item = await ItemModel.findById({_id:itemid})

        if(!item){
            return NextResponse.json({message:"No item found",success:false},{status:400})
        }

        const deletedItem = await ItemModel.findByIdAndDelete(itemid)

        return NextResponse.json({success:true,message:"Item Deleted Successfully" },{status:200});

    } catch (error) {   
        return NextResponse.json({success:false,error:error,message:"Something went wrong while deleting item"},{status:500})
        
    }

    
}