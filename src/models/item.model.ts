import mongoose,{Schema,Document,models,model} from "mongoose";
import { Category } from "./category.model";

export interface Item extends Document{
    code : string,
    name : string,
    image : string,
    stock : number,
    price : number,
    description : string,
    category : Category,
}

const itemSchema : Schema<Item> = new Schema({
    code : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required :true,
    },
    price : {
        type : Number,
        required : true
    },
    stock : {
        type : Number,
        default : 0
    },
    image : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    }
})

const ItemModel = (models.Item as mongoose.Model<Item>) || model<Item>('Item',itemSchema)
export default ItemModel
