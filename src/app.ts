const http = require('http');
const routes = require('./routes');
import Express from 'express';
import {Request, Response, NextFunction} from 'express';
import BodyParser from 'body-parser';
import AdminRoutes from "./routes/admin";
import ShopRoutes from "./routes/shop";

const app = Express();

app.use(BodyParser.urlencoded({extended: false}));

app.use('/admin', AdminRoutes);

app.use(ShopRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});

/*const server = http.createServer(app);
server.listen(3000);*/ // equals to
app.listen(3000);
