import {getDb} from "../utils";
import {ObjectId} from "mongodb";
import Product from "./product";
import Cart from "./cart";

const COLLECTION = 'users';

class User {
    cart: Cart;

    constructor(public username: string, public email: string, public _id?: ObjectId, cart?: any) {
        if(cart) {
            this.cart = new Cart();
        }
        else
            this.cart = new Cart();
    }

    save() {
        if(this._id)
            return getDb().collection(COLLECTION).updateOne({_id: this._id}, {$set: this});
        return getDb().collection(COLLECTION).insertOne(this);
    }

    static findById(id: string) {
        return getDb().collection(COLLECTION)
            .findOne({_id: new ObjectId(id)})
            .then(user => new User(user.username, user.email, new ObjectId(id)))
    }
}

export default User;
