import {getDb} from "../utils";
import {ObjectId} from 'mongodb'

const COLLECTION = 'products';

class Product {

    constructor(public title: string,
                public price: number,
                public description: string,
                public imageUrl: string,
                public _id?: string) { }

    save() {
        if(this._id)
            return getDb().collection(COLLECTION).insertOne(this);
        return getDb().collection(COLLECTION).updateOne({_id: new ObjectId(this._id)}, {$set: this});
    }

    static fetchAll() {
        return getDb().collection(COLLECTION).find().toArray();
    }

    static findById(id: string) {
        return getDb().collection(COLLECTION).find({_id: new ObjectId(id)}).next().then(product => new Product(product.title, product.price, product.description, product.imageUrl, id))
    }
}

export default Product;

/*export interface Product extends Model {
    readonly id: number;
    title: string;
    price: number;
    imageUrl: string;
    description: string;
}

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

export default TheProduct;*/
