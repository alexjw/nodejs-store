import express from 'express';

import * as authController from '../controllers/authController';
import {body, check} from "express-validator";
import User from "../models/user";

const AuthRoutes = express.Router();

AuthRoutes.get('/login', authController.loginGet);
AuthRoutes.post('/login', authController.loginPost);
AuthRoutes.post('/logout', authController.logoutPost);
AuthRoutes.get('/signup', authController.signupGet);
AuthRoutes.post('/signup',
    check('email').isEmail().withMessage('Invalid Email')
        .custom((value, body) => {
            return User.findOne({email: body.req.body.email})
                .then(user => {
                    if (user) {
                        return Promise.reject('Email already exists')
                    }
                })
        }),
    body('password', 'Please enter a longer password').isLength({min: 6}),
    body('confirmPassword').custom((value, body) => {
        if(value === body.req.password)
            return true;
        throw new Error('Passwords must match');
    }),
    authController.signupPost
);

export default AuthRoutes;
