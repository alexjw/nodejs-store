import mongoose, {Document, Schema} from 'mongoose'
import CartItem, {CartItemInterface, CartItemSchema} from "./cart-item";

export interface CartInterface extends Document {
    total: number;
    items: CartItemInterface[];
}

export interface CartInput {
    title: CartInterface['total'];
    items: CartInterface['items'];
}

export const CartSchema = new Schema(
    {
        total: Number,
        items: [CartItemSchema]
    }
);

const Cart = mongoose.model<CartItemInterface>('cart', CartSchema);

export default Cart;
