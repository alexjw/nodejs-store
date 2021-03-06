import {Request, Response, NextFunction} from "express";
import {RequestWithUser} from "../utils";
import Product, {ProductInput} from "../models/product";
import {code404, code500} from "./codesController";

interface bookForm {
    title: string,
    imageUrl: string,
    price: number,
    description: string
}

export const addProductGet = (req: RequestWithUser, res: Response, next: NextFunction) => {
    res.render( 'admin/edit-product', {
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        user: req.user
    });
};

export const editProductGet = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const id = req.params.id;
    Product.findById(id).then(product => {
        if(product) {
            res.render( 'admin/edit-product', {
                product,
                user: req.user
            });
        } else
            code404(req,res,next);
    }).catch(e => code404(req,res,next));
};

export const editProductPost = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const form = req.body as bookForm;
    Product.findById(req.params.id).then((product) => {
        if(product) {
            if(product.userId.toString() !== req.user._id.toString()) {
                return res.redirect('/');
            }
            product.title = form.title;
            product.price = form.price;
            product.imageUrl = form.imageUrl;
            product.description = form.description;
            product.save().then(() => res.render( 'shop/product-detail', {product, user: req.user}));
        } else
            code404(req,res,next);
    }).catch(e => code404(req,res,next));
};

export const deleteProductDelete = (req: RequestWithUser, res: Response, next: NextFunction) => {

    Product.deleteOne({_id: req.params.id, userId: req.user._id}).then(() => {
        res.status(200).json({message: "success"})
    }).catch(e => res.status(500).json({message: e.toString()}));
};


export const addProductPost = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const {title, imageUrl, description, price} = req.body as bookForm;
    let product = new Product({title, price, description, imageUrl, userId: req.user.id});
    product.save().then(product => res.redirect('/admin/products')).catch(e => code500(req,res,next));
};

export const allProductsGet = (req: RequestWithUser, res: Response, next: NextFunction) => {
    Product.find().then(products =>
        res.render('admin/products', { products: products, user: req.user })
    ).catch(e => code500(req,res,next));
};
