import Express from 'express';
import * as AdminController from "../controllers/adminController";

const router = Express.Router();



// /admin/add-product

router.get('/add-product', AdminController.addProductGet);
router.get('/edit-product/:id', AdminController.editProductGet);
router.post('/edit-product/:id', AdminController.editProductPost);
router.get('/products', AdminController.allProductsGet);

router.post('/add-product', AdminController.addProductPost);

export default router;
