import Express from 'express';
import * as ShopController from "../controllers/shop";

const router = Express.Router();

// get = exact, use = not exact
router.get('/', ShopController.getIndex);
router.get('/products', ShopController.getProducts);
router.get('/cart', ShopController.getCart);
router.get('/checkout', ShopController.getCart);

export default router;
