import Express from 'express';
import Path from "path";

const router = Express.Router();

// get = exact, use = not exact
router.get('/', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.sendFile(Path.join(__dirname, '../', 'views', 'shop.html'));
});

export default router;
