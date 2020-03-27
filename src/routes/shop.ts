import Express from 'express';
import * as ProductsController from "../controllers/products";

const router = Express.Router();

// get = exact, use = not exact
router.get('/', ProductsController.getProducts);

export default router;
