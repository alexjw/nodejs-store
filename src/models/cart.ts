import fs from 'fs'
import Path from 'path'
import Product from "./product";

const p = Path.join(Path.dirname(process.mainModule.filename), 'src', 'data', 'cart.json');

interface cartDetail {
    id: string,
    qty: number
}

export default class Cart {

    constructor(public products: cartDetail[], public total: number) {

    }

    static decreaseProduct(id: string) {
        const cart = this.getCart();
        let cartDetail = cart.products.find(cartDetail => cartDetail.id === id);
        if(cartDetail.qty === 1)
            cart.products.filter(cartDetail => cartDetail.id === id);
        else
            cartDetail.qty--;
    }

    static increaseProduct(id: string) {
        const cart = this.getCart();
        let cartDetail = cart.products.find(cartDetail => cartDetail.id === id);
        if(cartDetail)
            cart.products.push({id: id, qty: 1});
        else
            cartDetail.qty++;
    }

    static deleteProduct(id: string) {
        const cart = this.getCart();
        cart.products.filter(cartDetail => cartDetail.id === id);
    }

    static getCart(): Cart {
        const fileContent = fs.readFileSync(p);
        const cartContent = JSON.parse(fileContent.toString()) as Cart;
        const cartProducts: cartDetail[] = [];
        cartContent.products.forEach(detail => cartProducts.push(detail));
        return new Cart(cartProducts, cartContent.total);
    }

    save(): void {
        let total = 0;
        this.products.forEach(cartDetail => total += Product.findById(cartDetail.id).price * cartDetail.qty);
        this.total = total;
        fs.writeFileSync(p, JSON.stringify(this));
    }
}