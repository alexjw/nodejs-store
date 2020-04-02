import mongoose, {Schema, Document} from 'mongoose'
import {ObjectId} from 'mongodb'
import {UserInterface} from "./user";

export interface ProductInterface extends Document {
    title: string;
    price: number;
    description: string;
    imageUrl: string;
    userId: UserInterface;
}

export interface ProductInput {
    title: ProductInterface['title'];
    price: ProductInterface['price'];
    description: ProductInterface['description'];
    imageUrl: ProductInterface['imageUrl'];
    userId: ProductInterface['userId'];
}

const productSchema = new Schema(
    {
        title: String,
        price: Number,
        description: String,
        imageUrl: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    });

const Product = mongoose.model<ProductInterface>('Product', productSchema);

export default Product;
