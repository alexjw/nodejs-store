import {TheSequelize} from "../utils";
import { Model, DataTypes, BuildOptions } from 'sequelize';

// We need to declare an interface for our model that is basically what our class would be
interface User extends Model {
    readonly id: number;
    name: string;
    email: string;
}

// Need to declare the static model so `findOne` etc. use correct types.
type ProductStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): User;
}


const theUser = <ProductStatic>TheSequelize.define('user',
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

export default theUser;
