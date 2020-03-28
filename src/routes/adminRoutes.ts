import Express from 'express';
import * as AdminController from "../controllers/adminController";

const router = Express.Router();



// /admin/add-product

router.get('/add-product', AdminController.addProductGet);
router.get('/products', AdminController.getProducts);

router.post('/add-product', AdminController.addProductPost);

export default router;
