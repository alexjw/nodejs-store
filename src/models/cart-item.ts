import {TheSequelize} from "../utils";
import { Model, DataTypes, BuildOptions } from 'sequelize';

// We need to declare an interface for our model that is basically what our class would be
export interface CartItem extends Model {
    readonly id: number;
}

// Need to declare the static model so `findOne` etc. use correct types.
type CartItemStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): CartItem;
}


const TheCartItem = <CartItemStatic>TheSequelize.define('cart-item',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

export default TheCartItem;
