import Express from "express";

export const products = [];

export const addProductGet = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.render( 'add-product', {
        title: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

export const addProductPost = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    products.push({title: req.body.title});
    res.redirect('/');
};

export const getProducts = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    console.log('shop.js', products);
    res.render('shop', {
        products: products,
        title: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        active: true,
        productCSS: true
    });
};
