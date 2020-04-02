import mongoose, {Schema, Document} from 'mongoose'
import {ObjectId} from 'mongodb'

export interface productInterface extends Document {
    title: string,
    price: number,
    description: string,
    imageUrl: string
}

export interface CreateProductInput {
    title: productInterface['title'];
    price: productInterface['price'];
    description: productInterface['description'];
    imageUrl: productInterface['imageUrl'];
}

const productSchema = new Schema(
    {
        title: String,
        price: Number,
        description: String,
        imageUrl: String
    });

const COLLECTION = 'products';

const Product = mongoose.model<productInterface>('Product', productSchema);

export default Product;
