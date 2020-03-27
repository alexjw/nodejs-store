import Express from "express";
import Product from "../models/product";

interface bookForm {
    title: string,
    imageUrl: string,
    price: number,
    description: string
}

export const addProductGet = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.render( 'admin/add-product', {
        title: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

export const addProductPost = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const form = req.body as bookForm;
    const product = new Product(form.title, form.imageUrl, form.description, form.price);
    product.save();
    res.redirect('/');
};
export const getIndex = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const products = Product.fetchAll();
    res.render('shop/index', {
        products: products,
        title: 'Shop',
        path: '/'
    });
};

export const getProducts = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const products = Product.fetchAll();
    res.render('admin/products', {
        products: products,
        title: 'Products',
        path: '/admin/products'
    });
};
