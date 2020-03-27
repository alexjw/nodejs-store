import Express from "express";
import Product from "../models/product";

export const getProducts = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const products = Product.fetchAll();
    res.render('shop/product-list', {
        products: products,
        title: 'All Products',
        path: '/products'
    });
};

export const getIndex = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const products = Product.fetchAll();
    res.render('shop/index', {
        products: products,
        title: 'Shop',
        path: '/'
    });
};

export const getCart  = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.render('shop/cart', {
        title: 'Cart',
        path: '/cart'
    });
};

export const getCheckout = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.render('shop/checkout', {
        title: 'Checkout',
        path: '/checkout'
    });
};