import {TheSequelize} from "../utils";
import {Model, DataTypes, BuildOptions, HasOneGetAssociationMixin} from 'sequelize';
import {Product} from "./product";

// We need to declare an interface for our model that is basically what our class would be
export interface OrderItem extends Model {
    readonly id: number;
    quantity: number;
    getProduct: HasOneGetAssociationMixin<Product>;
    productId: HasOneGetAssociationMixin<Product>;
}

// Need to declare the static model so `findOne` etc. use correct types.
type OrderItemStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): OrderItem;
}


const TheOrderItem = <OrderItemStatic>TheSequelize.define('order-item',
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
            defaultValue: 1
        }
    });

export default TheOrderItem;
