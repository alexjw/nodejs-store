import Express from "express";
import Product from "../models/product";
import Cart from "../models/cart";

export const productsGet = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const products = Product.fetchAll();
    res.render('shop/product-list', {
        products: products
    });
};

export const productGet = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const id = req.params.id as string;
    res.render('shop/product-detail', { product: Product.findById(id)});
};

export const indexGet = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const products = Product.fetchAll();
    res.render('shop/index', {
        products: products
    });
};

export const cartGet  = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.render('shop/cart');
};

export const cartPost  = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const id = req.body.id as string;
    const product = Product.findById(id);
    console.log('added to cart: ', id);
    Cart.addProduct(id, product.price);
    res.redirect('/cart');
};

export const ordersGet  = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.render('shop/orders');
};

export const checkoutGet = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.render('shop/checkout');
};