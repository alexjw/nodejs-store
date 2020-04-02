import Path from "path";

import Express, {NextFunction, Request, Response} from 'express';
import * as CodesController from './src/controllers/codesController'
import BodyParser from 'body-parser';
import AdminRoutes from "./src/routes/adminRoutes";
import ShopRoutes from "./src/routes/shopRoutes";
import {RequestWithUser} from "./src/utils";
import User from "./src/models/user";
import Cart from "./src/models/cart";
import {ObjectId} from "mongodb";
import mongoose from "mongoose";

const app = Express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

const CONNECTION_URL = 'mongodb+srv://user:nF6ouPL9lcB8jZ5x@freecodecamp-w89rl.gcp.mongodb.net/node-schwarzmuller-course?retryWrites=true&w=majority';

app.use((req: RequestWithUser, res: Response, next: NextFunction) => {
    mongoose.connect(CONNECTION_URL)
        .then(result => {
            User.findOne().then(user => {
                if(user) {
                    req.user = user;
                    next();
                }
                else {
                    let newUser = new User({name: 'user', email: 'aaa@gmail.com', cart: {total: 0, items: []}})
                    newUser.save().then(() => {
                        req.user = newUser;
                        next();
                    });
                }
            })
        })
});

app.use(BodyParser.urlencoded({extended: false}));

app.use(Express.static(Path.join(__dirname, "../", 'public')));    // Routing the public folder to grant access css to html

app.use('/admin', AdminRoutes);
app.use(ShopRoutes);

app.use(CodesController.code404);

mongoose.connect(CONNECTION_URL).then(() => app.listen(3000));
