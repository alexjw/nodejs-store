import Express, {Request, Response, NextFunction} from "express";
import Product from "../models/product";
import {RequestWithUser} from "../utils";
import TheProduct from "../models/product";
import TheCartItem from "../models/cart-item";
import User from "../models/user";

export const productsGet = (req: Request, res: Response, next: NextFunction) => {
    Product.find().then((products) =>
        res.render('shop/product-list', { products: products })
    );
};

export const productGet = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    Product.findById(id).then((product) => {
        if(product)
            res.render('shop/product-detail', { product });
        else
            res.status(404).render('404');
    });
};

export const cartGet  = (req: RequestWithUser, res: Response, next: NextFunction) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {console.log(JSON.stringify(user));res.render('shop/cart', {cart: user.cart})})

};

export const createOrderPost  = (req: RequestWithUser, res: Response, next: NextFunction) => {

};

export const cartDeletePost  = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const id = req.body.id;
    req.user.removeFromCart(id).then(() => res.redirect('/cart'));
};

export const addToCartPost  = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const id = req.body.id as string;
    Product.findById(id).then(product => req.user.addToCart(product)).then(result => res.redirect('/cart'));
};

export const ordersGet  = (req: RequestWithUser, res: Response, next: NextFunction) => {

};

export const checkoutGet = (req: Request, res: Response, next: NextFunction) => {
    res.render('shop/checkout');
};