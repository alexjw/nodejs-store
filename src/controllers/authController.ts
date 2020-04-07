import {CONNECTION_URL, RequestWithUser} from "../utils";
import mongoose from "mongoose";
import User from "../models/user";

export const loginGet = (req, res, next) => {
    console.log(req.session.isLoggedIn)
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        user: req.user
    });
};

export const loginPost = (req: RequestWithUser, res, next) => {
    User.findOne().then(user => {
        if(user) {
            req.session.user = user;
            res.redirect('/');
        }
        else {
            let newUser = new User({name: 'user', email: 'aaa@gmail.com', cart: {total: 0, items: []}})
            newUser.save().then(() => {
                req.session.user = newUser;
                res.redirect('/');
            });
        }
    });

};

export const logoutPost = (req: RequestWithUser, res, next) => {
    req.session.destroy(() => res.redirect('/'));
};
