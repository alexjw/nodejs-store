import CartItem from "./cart-item";
import Product from "./product";

class Cart {
    total: number;
    items: CartItem[];

    constructor(cartItems?: any[], total?: any) {
        if(total)
            this.total = total
        else
            this.total = 0;
        if(cartItems)
            this.items = cartItems;
        else
            this.items = [];
    }

    addItem(product: Product, quantity?: number) {
        let itemFound: CartItem;
        this.items.forEach((item) => {
            if(item.product._id === product._id)
                itemFound = item;
        });
        if(itemFound)
            itemFound.quantity++;
        else {
            this.items.push(new CartItem(product, quantity));
        }
        this.updateTotal();
    }

    updateTotal() {
        this.total = this.items
            .map(item => item.product.price*item.quantity)
            .reduce((previousValue, currentValue) => previousValue + currentValue)
    }
}

export default Cart;
