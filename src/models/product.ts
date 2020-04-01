import {getDb} from "../utils";

const COLLECTION = 'products';

class Product {
    public _id;

    constructor(public title: string,
                public price: number,
                public description: string,
                public imageUrl: string) { }

    save() {
        return getDb().collection(COLLECTION).insertOne(this);
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
