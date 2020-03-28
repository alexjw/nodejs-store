import {strict} from "assert";

import Path from 'path'
import Fs from 'fs'

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
        const p = Path.join(Path.dirname(process.mainModule.filename), 'src', 'data', 'products.json');
        Fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
        })
    }

    static fetchAll(): Product[] {
        const p = Path.join(Path.dirname(process.mainModule.filename), 'src', 'data', 'products.json');
        let data: Buffer;
        try {
            data = Fs.readFileSync(p);
        } catch (e) {
            return [];
        }
        let result: Product[] = [];
        (JSON.parse(data.toString()) as Product[]).forEach(product => result.push(new Product(product.title, product.imageUrl, product.description, product.price, product.id)))
        return result;    // may need conversion to object Product
    }

    static findById(id: string): Product {
        const products = this.fetchAll();
        let result = products.find(product => product.id === id);
        //return new Product(result.title, result.imageUrl, result.description, result.price);
        return result;
    }
}

export default Product;
