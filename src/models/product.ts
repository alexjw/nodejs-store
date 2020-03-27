const products: Product[] = [];

class Product {
    constructor(public title: string) { }

    save(): void {
        products.push(this);
    }

    static fetchAll(): Product[] {
        return products;
    }
}

export default Product;
