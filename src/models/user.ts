import mongoose, {Document, Schema} from 'mongoose'
import CartItemInterface from "./cart-item";
import CartInterface from "./cart";
import {ProductInterface} from "./product";

export interface UserInterface extends Document {
    name: string;
    email: string;
    cart: CartInterface;
    addToCart(product: ProductInterface, quantity?: number);
    removeFromCart(product: ProductInterface);
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

userSchema.methods.addToCart = function (product: ProductInterface, quantity?: number) {
    const thisUser = this as UserInterface;
    let itemFound: CartItemInterface;
    thisUser.cart.items.forEach((item) => {
        if(item.productId.toString() === product._id.toString())
            itemFound = item;
    });
    if(itemFound)
        itemFound.quantity++;
    else {
        if(quantity)
            thisUser.cart.items.push({productId: product, quantity});
        else
            thisUser.cart.items.push({productId: product, quantity: 1});
    }
    thisUser.cart.total += product.price * (quantity || 1);
    return thisUser.save();
};

userSchema.methods.removeFromCart = function (productId: any) {
    const thisUser = this as UserInterface;
    thisUser.cart.items = thisUser.cart.items.filter(item => item.productId.toString() !== productId.toString());
    return thisUser.save();
};

const User = mongoose.model<UserInterface>('User', userSchema);

export default User;
