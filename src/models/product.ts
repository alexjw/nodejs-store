import {TheSequelize} from "../utils";
import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

// We need to declare an interface for our model that is basically what our class would be
interface Product extends Model {
    readonly id: number;
    title: string;
    price: number;
    imageUrl: string;
    description: string;
}

// Need to declare the static model so `findOne` etc. use correct types.
type ProductStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Product;
}


const TheProduct = <ProductStatic>TheSequelize.define('product',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: DataTypes.STRING,
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 5
        },
        imageUrl: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }
    });

export default TheProduct;

/*class Product {
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

export default Product;*/
