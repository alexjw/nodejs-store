import {CONNECTION_URL, RequestWithUser} from "../utils";
import mongoose from "mongoose";
import * as bcrypt from 'bcryptjs'
import User from "../models/user";

interface SignUpBody {
    email: string;
    password: string;
    confirmPassword: string;
}

export const loginGet = (req, res, next) => {
    console.log(req.session.isLoggedIn)
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        user: req.user
    });
};

export const loginPost = (req: RequestWithUser, res, next) => {
    /*User.findOne().then(user => {
        if(user) {
            req.session.user = user;
            res.redirect('/');
        }
        else {
            let newUser = new User({password: 'aaa', email: 'aaa@gmail.com', cart: {total: 0, items: []}})
            newUser.save().then(() => {
                req.session.user = newUser;
                res.redirect('/');
            });
        }
    });*/
    res.redirect('/xxx');
};

export const logoutPost = (req: RequestWithUser, res, next) => {
    req.session.destroy(() => res.redirect('/'));
};

export const signupGet = (req: RequestWithUser, res, next) => {
    res.render('auth/signup', {user: req.user})
};

export const signupPost = (req: RequestWithUser, res, next) => {
    const body: SignUpBody = req.body;
    User.findOne({email: body.email})
        .then(user => {
            if(user)
                return res.redirect('/signup');
            return bcrypt.hash(body.password, 12).then(password => {
                const newUser = new User(
                    {
                        email: body.email,
                        password: password,
                        cart: {
                            total: 0,
                            items: []
                        }
                    }
                );
                return newUser.save();
            });
        })
        .then( () => res.redirect('/login'));
};
