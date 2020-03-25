import Express from 'express';
import Path from "path";

const router = Express.Router();

// /admin/add-product

router.get('/add-product', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.sendFile(Path.join(__dirname, '../', 'views', 'add-product.html'));
});

router.post('/add-product', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    console.log(req.body);
    res.redirect('/');
});

export default router;
