const http = require('http');
const routes = require('./routes');
import Express from 'express';
import bodyParser from 'body-parser';

const app = Express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

app.post('/product', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.send('<h1>Hello froom Express</h1>');
    next();
});


/*const server = http.createServer(app);

server.listen(3000);*/ // equals to

app.listen(3000);
