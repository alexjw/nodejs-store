import {Request, Response, NextFunction} from "express";
import {RequestWithUser} from "../utils";
import Product from "../models/product";

interface bookForm {
    title: string,
    imageUrl: string,
    price: number,
    description: string
}

export const addProductGet = (req: Request, res: Response, next: NextFunction) => {
    res.render( 'admin/edit-product', {
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

export const editProductGet = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const id = req.params.id;
    Product.findById(id).then(product => {
        if(product) {
            res.render( 'admin/edit-product', {
                product
            });
        } else
            res.status(404).render('404');
    });
};

export const editProductPost = (req: Request, res: Response, next: NextFunction) => {
    const form = req.body as bookForm;
    Product.findById(req.params.id).then((product) => {
        if(product) {
            product.title = form.title;
            product.price = form.price;
            product.imageUrl = form.imageUrl;
            product.description = form.description;
            product.save().then(() => res.render( 'shop/product-detail', {product}));
        } else
            res.status(404).render('404');
    });
};

export const deleteProductPost = (req: Request, res: Response, next: NextFunction) => {
    /*TheProduct.findByPk(req.body.id).then(product => product.destroy()).then(() => {
        TheProduct.findAll().then(products => res.render( 'admin/products', {products}))
    });*/
};


export const addProductPost = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const {title, imageUrl, description, price} = req.body as bookForm;
    let product = new Product(title, price, description, imageUrl);
    product.save().then(product => {console.log(product);res.redirect('admin/products')});
};

export const allProductsGet = (req: Request, res: Response, next: NextFunction) => {
    Product.fetchAll().then(products =>
        res.render('admin/products', { products: products })
    );
};
