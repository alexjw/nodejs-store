import {RequestWithUser} from "./utils";
import {NextFunction, Response} from "express";

export const isAuth = (req: RequestWithUser, res: Response, next: NextFunction) => {
    if(!req.user)
        return res.redirect('/login');
    next();
};
