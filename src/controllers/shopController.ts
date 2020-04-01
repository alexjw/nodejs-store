import Express, {Request, Response, NextFunction} from "express";
import Product from "../models/product";
import TheCart, {Cart} from "../models/cart";
import {RequestWithUser} from "../utils";
import TheProduct from "../models/product";
import TheCartItem from "../models/cart-item";
import TheOrder, {Order} from "../models/order";
import TheOrderItem, {OrderItem} from "../models/order-item";

export const productsGet = (req: Request, res: Response, next: NextFunction) => {
    Product.fetchAll().then((products) =>
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
    req.user.getCart({include: [{model: TheCartItem, as: 'cartItems', include: [ {model: Product, as: 'product'} ]}]})
        .then(cart => {
            res.render('shop/cart', {cart})
        });
};

export const createOrderPost  = (req: RequestWithUser, res: Response, next: NextFunction) => {
    let order: Order;
    let cart: Cart;
    req.user.createOrder()
        .then(orderf => order = orderf)
        .then(() => req.user.getCart())
        .then(cartf => {
            cart = cartf;
            return cart.getCartItems();
        })
        .then(cartItems => {
            cartItems.map(item => { return TheOrderItem.create({productId: item.productId, quantity: item.quantity, orderId: order.id}); });
        })
        .then(() => {
            cart.setCartItems(null);
            res.render('shop/orders')
        });
};

export const cartDeletePost  = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const id = req.body.id;
    TheCartItem.destroy({where: {id}}).then(() => res.redirect('/cart'));
};

export const addToCartPost  = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const id = req.body.id as string;
    let cart: Cart;
    req.user.getCart()
        .then(cartFetched => {
            cart = cartFetched;
            return cart.getProducts({where: { id: id }})
        })
        .then(products => {
            if(!products.length)
                return Product.findByPk(id).then(product => cart.addProduct(product));
            let product = products.find(product => product.id.toString() === id);
            if(product) {
                TheCartItem.findOne({where: {productId: id, cartId: cart.id}})
                    .then(cartItem => {
                        cartItem.quantity++;
                        return cartItem.save();
                    })
            } else
                return Product.findByPk(id).then(product => cart.addProduct(product));
        }).then((x) => res.redirect('/cart'))
};

export const ordersGet  = (req: RequestWithUser, res: Response, next: NextFunction) => {
    req.user.getOrders({include: [{model: TheOrderItem, as: 'orderItems', include: [{model: TheProduct, as: 'product'}]}]})
        .then(orders => res.render('shop/orders', {orders}));
};

export const checkoutGet = (req: Request, res: Response, next: NextFunction) => {
    res.render('shop/checkout');
};