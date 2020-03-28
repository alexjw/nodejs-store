import Express from 'express';
import * as ShopController from "../controllers/shopController";

const router = Express.Router();

// get = exact, use = not exact
router.get('/', ShopController.getIndex);
router.get('/products', ShopController.getProducts);
router.get('/products/:id', ShopController.getProduct);
router.post('/cart', ShopController.postCart);
router.get('/cart', ShopController.getCart);
router.get('/orders', ShopController.getOrders);
router.get('/checkout', ShopController.getCart);

export default router;
