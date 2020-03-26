import Path from "path";

const http = require('http');
const routes = require('./routes');
import Express from 'express';
import {Request, Response, NextFunction} from 'express';
import BodyParser from 'body-parser';
import AdminRoutes from "./routes/admin";
import ShopRoutes from "./routes/shop";

const app = Express();

app.use(BodyParser.urlencoded({extended: false}));

app.use(Express.static(Path.join(__dirname, "../", 'public')));    // Routing the public folder to grant access css to html

app.use('/admin', AdminRoutes);
app.use(ShopRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).sendFile(Path.join(__dirname, 'views', '404.html'));
});

/*const server = http.createServer(app);
server.listen(3000);*/ // equals to
app.listen(3000);
