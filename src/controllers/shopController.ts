import Express, {Request, Response, NextFunction} from "express";
import Product from "../models/product";
import {RequestWithUser} from "../utils";
import TheProduct from "../models/product";
import TheCartItem from "../models/cart-item";

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

};

export const createOrderPost  = (req: RequestWithUser, res: Response, next: NextFunction) => {

};

export const cartDeletePost  = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const id = req.body.id;
};

export const addToCartPost  = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const id = req.body.id as string;

};

export const ordersGet  = (req: RequestWithUser, res: Response, next: NextFunction) => {

};

export const checkoutGet = (req: Request, res: Response, next: NextFunction) => {
    res.render('shop/checkout');
};