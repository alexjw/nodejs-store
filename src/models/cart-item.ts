import Document from 'mongoose'
import {ProductInterface} from "./product";

interface CartItemInterface {
    productId: ProductInterface,
    quantity: number
}

export default CartItemInterface;
