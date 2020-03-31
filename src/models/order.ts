import {TheSequelize} from "../utils";
import {
    Model,
    DataTypes,
    BuildOptions,
    HasManyGetAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyAddAssociationMixin
} from 'sequelize';

// We need to declare an interface for our model that is basically what our class would be
export interface Order extends Model {
    readonly id: number;
}

// Need to declare the static model so `findOne` etc. use correct types.
type OrderStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Order;
}


const TheOrder = <OrderStatic>TheSequelize.define('order',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    });

export default TheOrder;
