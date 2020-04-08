import Express from 'express';
import * as AdminController from "../controllers/adminController";
import * as Middlewares from "../middlewares";

const router = Express.Router();

// /admin

router.get('/add-product', Middlewares.isAuth, AdminController.addProductGet);
router.post('/add-product', Middlewares.isAuth, AdminController.addProductPost);
router.get('/edit-product/:id', Middlewares.isAuth, AdminController.editProductGet);
router.post('/edit-product/:id', Middlewares.isAuth, AdminController.editProductPost);
router.post('/delete-product', Middlewares.isAuth, AdminController.deleteProductPost);
router.get('/products', Middlewares.isAuth, AdminController.allProductsGet);


export default router;
