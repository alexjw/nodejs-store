import {TheSequelize} from "../utils";
import {
    Model,
    DataTypes,
    BuildOptions,
    HasManyGetAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyAddAssociationMixin
} from 'sequelize';
import {Product} from "./product";
import {CartItem} from "./cart-item";

// We need to declare an interface for our model that is basically what our class would be
export interface Cart extends Model {
    readonly id: number;
    getProducts: HasManyGetAssociationsMixin<Product>
    addProduct: HasManyAddAssociationMixin<Product, number>
    getItems: HasManyGetAssociationsMixin<CartItem>
}

// Need to declare the static model so `findOne` etc. use correct types.
type CartStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Cart;
}


const TheCart = <CartStatic>TheSequelize.define('cart',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    });

export default TheCart;
