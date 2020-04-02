import Product from "./product";

class CartItem {
    quantity: number;

    constructor(public product: Product, quantity?: number) {
        if(quantity)
            this.quantity = quantity;
        else
            this.quantity = 1;
    }
}

export default CartItem;
