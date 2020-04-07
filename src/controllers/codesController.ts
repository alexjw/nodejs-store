import {NextFunction, Request, Response} from "express";
import Path from "path";
import {RequestWithUser} from "../utils";

export const code404 = (req: RequestWithUser, res: Response, next: NextFunction) => {
    res.status(404).render('404', { user: req.user });
};
