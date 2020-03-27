import Path from "path";

import Express from 'express';
import * as CodesController from './src/controllers/codes'
import BodyParser from 'body-parser';
import AdminRoutes from "./src/routes/admin";
import ShopRoutes from "./src/routes/shop";

const app = Express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(BodyParser.urlencoded({extended: false}));

app.use(Express.static(Path.join(__dirname, "../", 'public')));    // Routing the public folder to grant access css to html

app.use('/admin', AdminRoutes);
app.use(ShopRoutes);

app.use(CodesController.code404);

/*const server = http.createServer(app);
server.listen(3000);*/ // equals to
app.listen(3000);
