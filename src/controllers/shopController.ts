import Express, {Request, Response, NextFunction} from "express";
import Product from "../models/product";
import Cart from "../models/cart";
import {RequestWithUser} from "../utils";
import TheProduct from "../models/product";

export const productsGet = (req: Request, res: Response, next: NextFunction) => {
    Product.findAll().then((products) =>
        res.render('shop/product-list', { products: products })
    );
};

export const productGet = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    Product.findByPk(id).then((product) => {
        if(product)
            res.render('shop/product-detail', { product });
        else
            res.status(404).render('404');
    });
};

export const indexGet = (req: Request, res: Response, next: NextFunction) => {
    Product.findAll().then((products) =>  res.render('shop/index', { products: products }) );
};

export const cartGet  = (req: RequestWithUser, res: Response, next: NextFunction) => {
    req.user.getCart().then(cart => res.render('shop/cart', {cart}));
};

export const cartDeletePost  = (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    const cart = Cart.getCart();
    cart.deleteProduct(id);
    cart.save();
    res.redirect('/cart');
};

export const addToCartPost  = (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id as string;
    const cart = Cart.getCart();
    const product = Product.findByPk(id);
    cart.increaseProduct(id);
    cart.save();
    res.redirect('/cart');
};

export const ordersGet  = (req: Request, res: Response, next: NextFunction) => {
    res.render('shop/orders');
};

export const checkoutGet = (req: Request, res: Response, next: NextFunction) => {
    res.render('shop/checkout');
};