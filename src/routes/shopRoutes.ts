import Express from 'express';
import * as ShopController from "../controllers/shopController";

const router = Express.Router();

// get = exact, use = not exact
// router.get('/', ShopController.productsGet);
// router.get('/products', ShopController.productsGet);
// router.get('/products/:id', ShopController.productGet);
// router.post('/cart', ShopController.addToCartPost);
// router.get('/cart', ShopController.cartGet);
// router.post('/create-order', ShopController.createOrderPost);
// router.post('/cart-delete-item', ShopController.cartDeletePost);
// router.get('/orders', ShopController.ordersGet);
// router.get('/checkout', ShopController.cartGet);

export default router;
