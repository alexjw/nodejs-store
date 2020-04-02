import mongoose, {Document, Schema} from 'mongoose'
import CartItem, {CartItemInterface} from "./cart-item";
import Cart, {CartInterface, CartSchema} from "./cart";
import {ProductInterface} from "./product";

export interface UserInterface extends Document {
    name: string;
    email: string;
    //cart: CartInterface;
    cart: {total: number, items: {productId: ProductInterface, quantity: number}[]}
}

export interface UserInput {
    name: UserInterface['name'];
    email: UserInterface['email'];
    //cart: UserInterface['cart'];

}

const userSchema = new Schema(
    {
        name: String,
        email: String,
        cart: {
            total: Number,
            items: [
                {
                    productId: {type: Schema.Types.ObjectId, ref: 'Product'},
                    quantity: Number
                }]
        }
    }
);

const User = mongoose.model<UserInterface>('user', userSchema);

export default User;
