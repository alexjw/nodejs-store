import Path from "path";

import Express, {NextFunction, Request, Response} from 'express';
import * as CodesController from './src/controllers/codesController'
import BodyParser from 'body-parser';
import AdminRoutes from "./src/routes/adminRoutes";
import ShopRoutes from "./src/routes/shopRoutes";
import {RequestWithUser, TheSequelize} from "./src/utils";
import TheProduct from "./src/models/product";
import TheUser, {User} from "./src/models/user";
import TheCart from "./src/models/cart";
import TheCartItem from "./src/models/cart-item";

// Asociations
TheProduct.belongsTo(TheUser, { constraints: true, onDelete: 'CASCADE' });
TheUser.hasMany(TheProduct);
TheUser.hasOne(TheCart);
TheCart.belongsTo(TheUser);
TheCart.hasMany(TheCartItem , { as: 'cartItems' })
TheCart.belongsToMany(TheProduct, {through: TheCartItem});
TheProduct.belongsToMany(TheCart, {through: TheCartItem});
//TheProduct.hasMany(TheCartItem);
TheCartItem.belongsTo(TheProduct);

const app = Express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use((req: RequestWithUser, res: Response, next: NextFunction) => {
    TheUser.findByPk(1).then(user => {req.user = user; next()})
});

app.use(BodyParser.urlencoded({extended: false}));

app.use(Express.static(Path.join(__dirname, "../", 'public')));    // Routing the public folder to grant access css to html

app.use('/admin', AdminRoutes);
app.use(ShopRoutes);

app.use(CodesController.code404);

/*const server = http.createServer(app);
server.listen(3000);*/ // equals to
//app.listen(3000);
TheSequelize.sync()
    .then(() => TheUser.findByPk(1))
    .then(user => user ? user : TheUser.create({name: 'Alex', email: 'abel.oalex@gmail.com', id: 1}))
    .then(user => user.getCart())
    .then(cart => cart ? cart : TheCart.create({userId: 1}))
    .then(() => app.listen(3000));
