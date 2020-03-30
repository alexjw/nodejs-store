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

    decreaseProduct(id: string) {
        let cartDetail = this.products.find(cartDetail => cartDetail.id === id);
        if(cartDetail.qty === 1)
            this.products = this.products.filter(cartDetail => cartDetail.id !== id);
        else
            cartDetail.qty--;
    }

    increaseProduct(id: string) {
        let cartDetail = this.products.find(cartDetail => cartDetail.id === id);
        if (cartDetail) {
            cartDetail.qty++;
        } else {
            this.products.push({id: id, qty: 1});
        }
    }

    deleteProduct(id: string) {
        this.products = this.products.filter(cartDetail => cartDetail.id !== id);
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