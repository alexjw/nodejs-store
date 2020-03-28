import Express from "express";
import Product from "../models/product";

interface bookForm {
    title: string,
    imageUrl: string,
    price: number,
    description: string
}

export const addProductGet = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.render( 'admin/edit-product', {
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

export const editProductGet = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const id = req.params.id;
    const product = Product.findById(id);
    if(product) {
        res.render( 'admin/edit-product', {
            product
        });
    } else
        res.status(404).render('404');
};

export const editProductPost = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const form = req.body as bookForm;
    const product = Product.findById(req.params.id);
    product.title = form.title;
    product.price = form.price;
    product.imageUrl = form.imageUrl;
    product.description = form.description;
    product.save();
    if(product) {
        res.render( 'shop/product-detail', {product});
    } else
        res.status(404).render('404');
};

export const deleteProductPost = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    Product.delete(req.body.id);
    const products = Product.fetchAll();
    res.render( 'admin/products', {products});
};

export const addProductPost = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const form = req.body as bookForm;
    const product = new Product(form.title, form.imageUrl, form.description, form.price);
    product.save();
    res.redirect('/');
};

export const allProductsGet = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const products = Product.fetchAll();
    res.render('admin/products', {
        products: products
    });
};
