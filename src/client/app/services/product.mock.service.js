/*
    Name: Connor Smith
    filename: product.service.js
    Course: INFT 2202
    Date: February 21, 2025
    Description: This is the Product Mock Service script
*/

import Product from "../models/Product.js";

class ProductService {
    constructor() {
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify([]));
        }
    }

    listProducts(page = 1, perPage = 6) {
        const first = (page-1) * perPage;
        const last = first + perPage;
        
        const products = JSON.parse(localStorage.getItem('products'))
            .map(p => new Product(p.id, p.name, p.price, p.stock, p.description))
            .slice(first, last);
        console.log(products);
        return products;
    }

    getAllProducts() {
        return JSON.parse(localStorage.getItem('products'))
            .map(p => new Product(p.id, p.name, p.price, p.stock, p.description));
    }

    createProduct(productObject) {
        const products = this.getAllProducts();
        if (products.find(product => product.name === productObject.name)) {
            throw new Error('That product already exists!');
        }
        products.push(productObject);
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    }

    findProduct(productID) {
        const products = this.getAllProducts();

        const product = products.find(p => p.id == productID);

        if (!product) {
            throw new Error('That product doesn\'t exist!');
        }

        return product;
    }

    updateProduct(product) {
        const products = this.getAllProducts();

        const idx = products.findIndex(p => p.id === product.id);

        if (idx === -1) {
            throw new Error('That product does not exist!');
        }

        products[idx] = product;

        localStorage.setItem('products', JSON.stringify(products));

        return true;
    }

    deleteProduct(product) {
        const products = this.getAllProducts();

        const idx = products.findIndex(p => p.id === product.id);

        if (idx === -1) {
            throw new Error('That Product does not exist!');
        }

        products.splice(idx, 1);

        localStorage.setItem('products', JSON.stringify(products));

        return true;
    }

    getProductCount() {
        return JSON.parse(localStorage.getItem('products'))
            .length;
    }
}
export default new ProductService();