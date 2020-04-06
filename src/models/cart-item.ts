import {ProductInterface} from "./product";

interface CartItemInterface {
    productId: ProductInterface,
    price: number,
    quantity: number
}

export default CartItemInterface;
