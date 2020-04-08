import express from 'express';

import * as authController from '../controllers/authController';

const AuthRoutes = express.Router();

AuthRoutes.get('/login', authController.loginGet);
AuthRoutes.post('/login', authController.loginPost);
AuthRoutes.post('/logout', authController.logoutPost);
AuthRoutes.get('/signup', authController.signupGet);
AuthRoutes.post('/signup', authController.signupPost);

export default AuthRoutes;
