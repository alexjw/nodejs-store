import {strict} from "assert";

import Path from 'path'
import Fs from 'fs'
const p = Path.join(Path.dirname(process.mainModule.filename), 'src', 'data', 'products.json');

class Product {
    id: string;
    constructor(public title: string, public imageUrl: string, public description: string, public price: number, id?: string) {
        if(id)
            this.id = id;
    }

    save(): void {
        let products = Product.fetchAll();
        if(this.id) {
            products = products.filter(product => product.id !== this.id);
        }
        else {
            this.id = Math.random().toString();
        }
        products.push(this);
        Fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
        })
    }

    static fetchAll(): Product[] {
        let data: Buffer;
        try {
            data = Fs.readFileSync(p);
        } catch (e) {
            return [];
        }
        let result: Product[] = [];
        (JSON.parse(data.toString()) as Product[]).forEach(product => result.push(new Product(product.title, product.imageUrl, product.description, product.price, product.id)))
        return result;
    }

    static findById(id: string): Product {
        const products = this.fetchAll();
        let result = products.find(product => product.id === id);
        return result;
    }

    static delete(id: string): void {
        let products = Product.fetchAll();
        products = products.filter(product => product.id !== id);
        Fs.writeFileSync(p, JSON.stringify(products));
    }
}

export default Product;
