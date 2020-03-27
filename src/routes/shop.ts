import Express from 'express';
import Path from "path";
import {rootDirectory} from "../utils";
import {products} from "./admin";

const router = Express.Router();

// get = exact, use = not exact
router.get('/', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    console.log('shop.js', products);
    //res.sendFile(Path.join(rootDirectory, 'views', 'shop.html'));
    res.render('shop', {
        products: products,
        title: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        active: true,
        productCSS: true
    });
});

export default router;
