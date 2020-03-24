"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
const routes = require('./routes');
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});
app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});
app.use('/', (req, res, next) => {
    res.send('<h1>Hello froom Express</h1>');
    next();
});
app.listen(3000);
//# sourceMappingURL=app.js.map