import {TheSequelize} from "../utils";
import {
    Model,
    DataTypes,
    BuildOptions,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasOneGetAssociationMixin
} from 'sequelize';
import ts from "typescript/lib/tsserverlibrary";
import Project = ts.server.Project;
import {Product} from "./product";
import {Cart} from "./cart";
import {Order} from "./order";

// We need to declare an interface for our model that is basically what our class would be
export interface User extends Model {
    readonly id: number;
    name: string;
    email: string;
    createProduct: HasManyCreateAssociationMixin<Product>;
    createOrder: HasManyCreateAssociationMixin<Order>;
    getProducts: HasManyGetAssociationsMixin<Product>;
    getOrders: HasManyGetAssociationsMixin<Order>;
    getCart: HasOneGetAssociationMixin<Cart>;
}

// Need to declare the static model so `findOne` etc. use correct types.
type ProductStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): User;
}


const TheUser = <ProductStatic>TheSequelize.define('user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            defaultValue: ''
        }
    });

export default TheUser;
