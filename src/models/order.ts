import OrderItemInterface from "./order-item";
import mongoose, {Document, Schema} from "mongoose";
import {ProductInterface} from "./product";
import {UserInterface} from "./user";

export interface OrderInterface extends Document {
    total: number,
    userId: UserInterface | string,
    items: OrderItemInterface[]
}

export interface OrderInput {
    total: OrderInterface['total'];
    userId: OrderInterface['userId'];
    items?: OrderInterface['items'];
}

const orderSchema = new Schema(
    {
        total: Number,
        userId: {type: Schema.Types.ObjectId, ref: 'User'},
        items: [
            {
                product: {type: Object},
                price: Number,
                quantity: Number
            }]
    }
);

const Order = mongoose.model<OrderInterface>('Order', orderSchema);

export default Order;
