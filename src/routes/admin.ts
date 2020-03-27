import Express from 'express';
import Path from "path";
import {rootDirectory} from "../utils";

const router = Express.Router();

export const products = [];

// /admin/add-product

router.get('/add-product', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.render( 'add-product', {
        title: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
});

router.post('/add-product', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    products.push({title: req.body.title})
    res.redirect('/');
});

export default router;
