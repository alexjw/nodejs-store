import Express from "express";
import Product from "../models/product";
import Cart from "../models/cart";

export const productsGet = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    Product.findAll().then((products) =>
        res.render('shop/product-list', { products: products })
    );
};

export const productGet = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const id = req.params.id as string;
    Product.findByPk(id).then((product) => {
        if(product)
            res.render('shop/product-detail', { product });
        else
            res.status(404).render('404');
    });
};

export const indexGet = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    Product.findAll().then((products) =>  res.render('shop/index', { products: products }) );
};

export const cartGet  = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const cart = Cart.getCart();
};

export const cartDeletePost  = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const id = req.body.id;
    const cart = Cart.getCart();
    cart.deleteProduct(id);
    cart.save();
    res.redirect('/cart');
};

export const addToCartPost  = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const id = req.body.id as string;
    const cart = Cart.getCart();
    const product = Product.findByPk(id);
    cart.increaseProduct(id);
    cart.save();
    res.redirect('/cart');
};

export const ordersGet  = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.render('shop/orders');
};

export const checkoutGet = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.render('shop/checkout');
};