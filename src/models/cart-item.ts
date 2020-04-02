import mongoose, {Schema, Document} from 'mongoose'
import Product, {ProductInterface} from "./product";

export const CartItemSchema = new Schema(
    {
        product: Schema.Types.ObjectId,
        quantity: Number
    }
);

export interface CartItemInterface extends Document {
    product: ProductInterface['_id'],
    quantity: number
}

export interface CartItemInput {
    product: CartItemInterface['product'];
    quantity: CartItemInterface['quantity'];
}

const CartItem = mongoose.model<CartItemInterface>('cart-item', CartItemSchema);

export default CartItem;
