import Product from "./Product.js";

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
            .map(productParams => new Product(productParams.id, productParams.name, productParams.price, productParams.stock, productParams.description))
            .slice(first, last);
        console.log(products);
        return products;
    }

    getAllProducts() {
        return JSON.parse(localStorage.getItem('products'))
            .map(product => new Product(product));
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