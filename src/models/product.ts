import {strict} from "assert";

const products: Product[] = [];
import Path from 'path'
import Fs from 'fs'

class Product {
    constructor(public title: string) { }

    save(): void {
        //products.push(this);
        const products = Product.fetchAll();
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
        return JSON.parse(data.toString()) as Product[];
    }
}

export default Product;
