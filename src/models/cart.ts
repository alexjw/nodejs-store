import Fs from 'fs'
import Path from 'path'

const cartPath = Path.join(Path.dirname(process.mainModule.filename), 'src', 'data', 'cart.json');

export default class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        Fs.readFile(cartPath, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent.toString());
            }
            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(
                prod => prod.id === id
            );
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new product/ increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            Fs.writeFile(cartPath, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }
}