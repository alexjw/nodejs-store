import {strict} from "assert";
import {DB} from "../utils";
import {Statement} from "sqlite3";


class Product {
    id: string;
    constructor(public title: string, public imageUrl: string, public description: string, public price: number, id?: string) {
        if(id)
            this.id = id;
    }

    save(): Promise<any> {
        return new Promise<Product[]>(resolve => {
            const sql = `INSERT INTO products (title, price, description, imageUrl) VALUES ('${this.title}', ${this.price}, '${this.description}', '${this.imageUrl}')`;
            console.log(sql);
            DB.exec(sql, (err) => {
                console.log(err);
                resolve();
            });
        });
    }

    static fetchAll(): Promise<Product[]> {
        return new Promise<Product[]>(resolve => {
            let result: Product[] = [];
            const x = DB.all('SELECT * FROM products', [], (err, rows) => {
                rows.forEach(row => {
                    result.push(new Product(row.title, row.imageUrl, row.description, row.price, row.id));
                });
                resolve(result);
            });
        });

    }

    static findById(id: string): Promise<Product> {
        return new Promise<Product>(resolve => {
            DB.get(`SELECT * FROM products where products.id = ${id}`, (err, row) => {
                if(row)
                    resolve(new Product(row.title, row.imageUrl, row.description, row.price, row.id));
                else
                    resolve(null);
            })
        })
    }

    static delete(id: string): Promise<any> {
        return new Promise<Product>(resolve => {
            DB.exec(`DELETE FROM products WHERE products.id = 5 = ${id}`, (err) => {
                    resolve();
            })
        })
    }
}

export default Product;
