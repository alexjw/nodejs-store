import Express from 'express';
import * as ProductsController from "../controllers/products";

const router = Express.Router();



// /admin/add-product

router.get('/add-product', ProductsController.addProductGet);

router.post('/add-product', ProductsController.addProductPost);

export default router;
