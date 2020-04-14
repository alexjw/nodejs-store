import {CONNECTION_URL, RequestWithUser} from "../utils";
import mongoose from "mongoose";
import * as bcrypt from 'bcryptjs'
import User from "../models/user";
import {validationResult} from "express-validator";

interface SignUpBody {
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignInBody {
    email: string;
    password: string;
}

export const loginGet = (req, res, next) => {
    console.log(req.session.isLoggedIn)
    res.render('auth/login', {
        flashMessage: req.flash('flashMessage')
    });
};

export const loginPost = (req: RequestWithUser, res, next) => {
    const body: SignInBody = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422)
            .render('auth/login', {flashMessage: errors.array().map(error => error.msg), email: body.email, password: body.password});
    }
    User.findOne({email: body.email})
        .then(user => {
            if(!user) {
                //req.flash('flashMessage', 'Invalid email');
                return res.render('auth/login', {flashMessage: 'Invalid email', email: body.email, password: body.password});
            }
            bcrypt.compare(body.password, user.password)
                .then(matched => {
                    if(matched) {
                        req.session.user = user;
                        return req.session.save(() => res.redirect('/'));
                    }
                    else {
                        //req.flash('flashMessage', 'Invalid password');
                        return res.render('auth/login', {flashMessage: 'Invalid password', email: body.email, password: body.password});
                    }

                })
                .catch(ree => res.redirect('/login'))
        })
};

export const logoutPost = (req: RequestWithUser, res, next) => {
    req.session.destroy(() => res.redirect('/'));
};

export const signupGet = (req: RequestWithUser, res, next) => {
    res.render('auth/signup', {user: req.user, flashMessage: req.flash('flashMessage')})
};

export const signupPost = (req: RequestWithUser, res, next) => {
    const body: SignUpBody = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422)
            .render('auth/signup', {user: req.user, flashMessage: errors.array().map(error => error.msg), email: body.email, password: body.password, confirmPassword: body.confirmPassword});
    }
    bcrypt.hash(body.password, 12).then(password => {
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
    }).then( () => res.redirect('/login'));
};
