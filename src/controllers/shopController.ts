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

export const getProduct = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const id = req.params.id as string;
    res.render('shop/product-detail', { product: Product.findById(id), title: 'Product Details', path: '/products'});
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

export const postCart  = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const id = req.body.id as string;
    console.log('added to cart: ', id);
    res.redirect('/cart');
};

export const getOrders  = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.render('shop/orders', {
        title: 'Orders',
        path: '/orders'
    });
};

export const getCheckout = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.render('shop/checkout', {
        title: 'Checkout',
        path: '/checkout'
    });
};