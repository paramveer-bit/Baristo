import mongoose, { Schema, Document, models, model } from "mongoose";
import { Item } from "./item.model";

export interface OrderItem extends Document {
    orderItem: Item,
    quantity: Number
}



const orderItem: Schema<OrderItem> = new Schema({
    orderItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
    },
    quantity: {
        type: Number,
        require: true
    }
})

export interface Order extends Document {
    name: string,
    phoneNo: number,
    tableNo: number,
    orderNo: number,
    status: string,
    items: OrderItem[],
    createdAt: Date,
    orderValue: number
}

const orderSchema: Schema<Order> = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    tableNo: {
        type: Number,
    },
    orderNo: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["Pending", "Cancelled", "Completed"],
        default: "Pending",
    },
    items: {
        type: [orderItem],
    },
    orderValue: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

const OrderModel = (models.Order as mongoose.Model<Order>) || model<Order>('Order', orderSchema)
export default OrderModel
