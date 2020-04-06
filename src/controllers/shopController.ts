import Express, {Request, Response, NextFunction} from "express";
import Product, {ProductInterface} from "../models/product";
import {RequestWithUser} from "../utils";
import Order, {OrderInput, OrderInterface} from "../models/order";
import OrderItemInterface from "../models/order-item";

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
        .then(user => res.render('shop/cart', {cart: user.cart}))

};

export const createOrderPost  = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const order = new Order(
        {
            userId: req.user,
            total: 0,
            items: []
        } as OrderInput
    );
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            let orderItems: OrderItemInterface[] = [];
            user.cart.items.forEach(item => {
                const product = (item.productId as any)._doc as ProductInterface;
                const orderItem = {product: product, price: item.productId.price, quantity: item.quantity} as OrderItemInterface;
                orderItems.push(orderItem);
            });
            order.items = orderItems;
            order.total = user.cart.total;
            user.cart.items = [];
            user.cart.total = 0;
            return order.save().then(() => user.save());

        })
        .then(() => res.redirect('/orders'))
        .catch(e => console.log(e));
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
    let orders: OrderInterface[] = [];
    Order.find({"userId": req.user._id})
        .then(orders => res.render('shop/orders', {orders}));
};

export const checkoutGet = (req: Request, res: Response, next: NextFunction) => {
    res.render('shop/checkout');
};