import Express from 'express';
import * as ShopController from "../controllers/shopController";

const router = Express.Router();

// get = exact, use = not exact
router.get('/', ShopController.indexGet);
router.get('/products', ShopController.productsGet);
router.get('/products/:id', ShopController.productGet);
router.post('/cart', ShopController.cartPost);
router.get('/cart', ShopController.cartGet);
router.get('/orders', ShopController.ordersGet);
router.get('/checkout', ShopController.cartGet);

export default router;
