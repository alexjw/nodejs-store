import {NextFunction, Request, Response} from "express";
import Path from "path";

export const code404 = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).render('404', {title: "Not Found", path: ''});
};
