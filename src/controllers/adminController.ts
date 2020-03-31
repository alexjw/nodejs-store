import Express from "express";
import TheProduct from "../models/product";

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
    TheProduct.findByPk(id).then(product => {
        if(product) {
            res.render( 'admin/edit-product', {
                product
            });
        } else
            res.status(404).render('404');
    });
};

export const editProductPost = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const form = req.body as bookForm;
    TheProduct.findByPk(req.params.id).then((value) => {
        const product = value;
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

export const deleteProductPost = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    TheProduct.findByPk(req.body.id).then(product => product.destroy()).then(() => {
        TheProduct.findAll().then(products => res.render( 'admin/products', {products}))
    });
};

export const addProductPost = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const {title, imageUrl, description, price} = req.body as bookForm;
    TheProduct.create({title, imageUrl, description, price}).then(result => res.redirect('admin/products'));
};

export const allProductsGet = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    TheProduct.findAll().then(products =>
        res.render('admin/products', { products: products })
    );
};
