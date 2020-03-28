import {strict} from "assert";

const products: Product[] = [];
import Path from 'path'
import Fs from 'fs'

class Product {
    id: string;
    constructor(public title: string, public imageUrl: string, public description: string, public price: number) { }

    save(): void {
        this.id = Math.random().toString();
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

    static findById(id: string): Product {
        const products = this.fetchAll();
        let result = products.find(product => product.id === id);
        return result;
    }
}

export default Product;
