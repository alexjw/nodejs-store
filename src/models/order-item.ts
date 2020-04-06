import {ProductInterface} from "./product";
import {OrderInterface} from "./order";

interface OrderItemInterface {
    product: ProductInterface,
    price: number,
    quantity: number
}

export interface OrderItemInput {
    productId: OrderItemInterface['product'];
    price: OrderItemInterface['price'];
    quantity: OrderItemInterface['quantity'];
}

export default OrderItemInterface;
