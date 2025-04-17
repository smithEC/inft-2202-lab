/*
    Name: Connor Smith
    filename: Product.service.js
    Course: INFT 2202
    Date: February 21, 2025
    Description: This is the Product Service script
*/

import Product from "../models/Product.js";

class ProductService {
    constructor() {
        this.host = 'http://localhost:3000';
        //this.apikey = '4f3937b2-5cea-45ac-bac8-d0509585c07c';
    }

    async listProducts(page = 1, perPage = 6) {
        const url = new URL('/products', this.host);
        url.search = new URLSearchParams({ page, perPage });

        const headers = new Headers({
            'content-type': 'application/json' 
            //'apikey': this.apikey
        });

        const options = {
            headers,
            method: 'GET'
        };

        const request = new Request(url, options);

        try {
            await new Promise((resolve, reject) => setTimeout(resolve, 1000));
            const response = await fetch(request);
            const { pagination, records } = await response.json();
            console.log(records);
            return {
                pagination,
                records: records.map(p => new Product(p._id, p.name, p.price, p.stock, p.description))
            }
        }
        catch (error) {
            console.log("Error: ", error);
            throw error;
        }
    }

    async getAllProducts() {
        const url = new URL('/products', this.host);
        const page = 1;
        const perPage = Infinity;
        url.search = new URLSearchParams({ page, perPage });
        
        const headers = new Headers({
            'content-type': 'application/json'
            //'apikey': this.apikey
        });

        const options = {
            headers,
            method: 'GET'
        };
        const request = new Request(url, options);

        try {
            const response = await fetch(request);
            const { pagination, records } = await response.json();

            return {
                pagination,
                records: records.map(p => new Product(p._id, p.name, p.price, p.stock, p.description))
            }
        }
        catch (error) {
            console.log("Ahhh", error);
            throw error;
        }
    }

    async createProduct(productObject) {
        const url = new URL('/products', this.host);

        const headers = new Headers({
            'Content-Type': 'application/json'
            //'apikey': this.apikey
        });

        const options = {
            headers,
            method: 'POST',
            body: JSON.stringify(productObject)
        };

        try {
            const response = await fetch(url, options);

            const createdProduct = await response.json();
            return new Product(createdProduct._id, createdProduct.name, createdProduct.price, createdProduct.stock, createdProduct.description);
        } catch (error) {
            console.error("Ahhh", error);
            throw error;
        }
    }

    async findProduct(productID) {
        if (!productID) {
            throw new Error("Product ID is required");
        }
    
        const url = new URL(`/products/${productID}`, this.host);
    
        const headers = new Headers({
            'Content-Type': 'application/json'
            //'apikey': this.apikey
        });
    
        const options = {
            headers,
            method: 'GET'
        };
    
        try {
            const response = await fetch(url, options);
    
            const newProduct = await response.json();
            return new Product(newProduct._id, newProduct.name, newProduct.price, newProduct.stock, newProduct.description);
        } catch (error) {
            console.error("Ahhh", error);
            throw error;
        }
    }

    async updateProduct(productObject) {
        const url = new URL(`/products/${productObject._id}`, this.host);

        const headers = new Headers({
            'Content-Type': 'application/json'
            //'apikey': this.apikey
        });

        const options = {
            headers,
            method: 'PUT',
            body: JSON.stringify(productObject)
        };

        try {
            const response = await fetch(url, options);

            const updatedProduct = await response.json();
            return new Product(updatedProduct._id, updatedProduct.name, updatedProduct.price, updatedProduct.stock, updatedProduct.description);
        } catch (error) {
            console.error("Ahhh", error);
            throw error;
        }
    }

    async deleteProduct(productObject) {
        const url = new URL(`/products/${productObject._id}`, this.host);

        const headers = new Headers({
            'Content-Type': 'application/json'
            //'apikey': this.apikey
        });

        const options = {
            headers,
            method: 'DELETE'
        };

        try {
            const response = await fetch(url, options);

            return response;
        } catch (error) {
            console.error("Ahhh", error);
            throw error;
        }
    }

    waitTho(timeout) {
        return new Promise((resolve, reject) => setTimeout(resolve, timeout));
    }
}

export default new ProductService();