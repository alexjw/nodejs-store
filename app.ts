import Path from "path";

import Express, {NextFunction, Request, Response} from 'express';
import * as CodesController from './src/controllers/codesController'
import BodyParser from 'body-parser';
import AdminRoutes from "./src/routes/adminRoutes";
import ShopRoutes from "./src/routes/shopRoutes";
import {getDb, mongoConnect, RequestWithUser} from "./src/utils";
import User from "./src/models/user";
import {ObjectId} from "mongodb";

const app = Express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use((req: RequestWithUser, res: Response, next: NextFunction) => {
    getDb().collection('users').findOne({})
        .then(user => {
            if(user) {
                req.user = user;
                next()
            }
            else {
                const newUser = new User('user', 'aaa@gmail.com');
                getDb().collection('users')
                    .insertOne(newUser)
                    .then(user => {
                        newUser._id = new ObjectId(user.insertedId.toString());
                        req.user = newUser;
                        next();
                    })
            }
        })
});

app.use(BodyParser.urlencoded({extended: false}));

app.use(Express.static(Path.join(__dirname, "../", 'public')));    // Routing the public folder to grant access css to html

app.use('/admin', AdminRoutes);
app.use(ShopRoutes);

app.use(CodesController.code404);

mongoConnect().then(() => app.listen(3000));

/*const server = http.createServer(app);
server.listen(3000);*/ // equals to
//app.listen(3000);
