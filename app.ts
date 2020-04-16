import Path from "path";

import Express, {NextFunction, Request, Response} from 'express';
import * as CodesController from './src/controllers/codesController'
import BodyParser from 'body-parser';
import AdminRoutes from "./src/routes/adminRoutes";
import ShopRoutes from "./src/routes/shopRoutes";
import {CONNECTION_URL, RequestWithUser} from "./src/utils";
import User from "./src/models/user";
import mongoose from "mongoose";
import AuthRoutes from "./src/routes/authRoutes";
import session from "express-session";
import csurf from "csurf";
import flash from 'connect-flash'
import {code500} from "./src/controllers/codesController";
const MongoDBStore = require("connect-mongodb-session")(session);

const app = Express();

const store = new MongoDBStore(
    {
        uri: CONNECTION_URL,
        collection: 'sessions'
    }
);

const csurfProtection = csurf();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(session({ secret: 'a secret', resave: false, saveUninitialized: false, store }));

app.use(BodyParser.urlencoded({extended: false}));

app.use(Express.static(Path.join(__dirname, "../", 'public')));    // Routing the public folder to grant access css to html

app.use((req: RequestWithUser, res: Response, next: NextFunction) => {
    if(req.session.user) {
        User.findById(req.session.user._id)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(error => {
                throw new Error(error)
            });
    } else {
        req.user = null;
        next();
    }
});

app.use(csurfProtection);
app.use(flash());

app.use((req: RequestWithUser, res: Response, next: NextFunction) => {
    res.locals.user = req.user;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/admin', AdminRoutes);
app.use(ShopRoutes);
app.use(AuthRoutes);

app.use(CodesController.code404);
app.use(CodesController.code500);

// Error handling middleware, it skips to this whenever you call next(error) in controller
app.use((error, req, res, next) => {
    console.log(error);
    code500(req,res,next);
});

mongoose.connect(CONNECTION_URL).then(() => app.listen(3000));
