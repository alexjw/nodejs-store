import Express from 'express';
import * as ShopController from "../controllers/shopController";

const router = Express.Router();
import * as Middlewares from "../middlewares";

// get = exact, use = not exact
router.get('/', ShopController.productsGet);
router.get('/products', ShopController.productsGet);
router.get('/products/:id', ShopController.productGet);
router.post('/cart', Middlewares.isAuth, ShopController.addToCartPost);
router.get('/cart', Middlewares.isAuth, ShopController.cartGet);
router.post('/create-order', Middlewares.isAuth, ShopController.createOrderPost);
router.post('/cart-delete-item', Middlewares.isAuth, ShopController.cartDeletePost);
router.get('/orders', Middlewares.isAuth, ShopController.ordersGet);
// router.get('/checkout', ShopController.cartGet);

export default router;
