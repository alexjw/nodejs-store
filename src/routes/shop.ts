import Express from 'express';
import Path from "path";
import {rootDirectory} from "../utils";

const router = Express.Router();

// get = exact, use = not exact
router.get('/', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.sendFile(Path.join(rootDirectory, 'views', 'shop.html'));
});

export default router;
