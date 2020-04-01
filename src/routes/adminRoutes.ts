import Express from 'express';
import * as AdminController from "../controllers/adminController";

const router = Express.Router();



// /admin/add-product

router.get('/add-product', AdminController.addProductGet);
router.post('/add-product', AdminController.addProductPost);
router.get('/edit-product/:id', AdminController.editProductGet);
router.post('/edit-product/:id', AdminController.editProductPost);
router.post('/delete-product', AdminController.deleteProductPost);
router.get('/products', AdminController.allProductsGet);


export default router;
