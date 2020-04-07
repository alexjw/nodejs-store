import {CONNECTION_URL, RequestWithUser} from "../utils";
import mongoose from "mongoose";
import User from "../models/user";

export const loginGet = (req, res, next) => {
    console.log(req.session.isLoggedIn)
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login'
    });
};

export const loginPost = (req: RequestWithUser, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/');
};
