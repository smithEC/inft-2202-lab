import Product from './Product.js';

export default new ProductService();

function ProductService() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify([]));
    }
}

ProductService.prototype.listProducts = function(page = 1, perPage = 6) {
    const first = (page-1) * perPage;
    const last = first + perPage;

    const products = JSON.parse(localStorage.getItem('products'))
        .map(productParams => new Product(productParams))
        .slice(first, last);

    return products;
}

ProductService.prototype.getAllProducts = function() {
    return JSON.parse(localStorage.getItem('products'))
        .map(product => new Product(product));
}

ProductService.prototype.createProduct = function (productObject) {
    const products = this.getAllProducts();
    if (products.find(product => product.name === productObject.name)) {
        throw new Error('That product already exists!');
    }
    products.push(productObject);
    localStorage.setItem('products', JSON.stringify(products));
    return true;
}

ProductService.prototype.findProduct = function(productID) {
    const products = this.getAllProducts();

    const product = products.find(p => p.id == productID);

    if (!product) {
        throw new Error('That product doesn\'t exist!');
    }

    return product;
}

ProductService.prototype.updateProduct = function(product) {
    const products = this.getAllProducts();

    const idx = products.findIndex(p => p.id === product.id);

    if (idx === -1) {
        throw new Error('That product does not exist!');
    }

    products[idx] = product;

    localStorage.setItem('products', JSON.stringify(products));

    return true;
}

ProductService.prototype.deleteProduct = function(product) {
    const products = this.getAllProducts();

    const idx = products.findIndex(p => p.id === product.id);

    if (idx === -1) {
        throw new Error('That Product does not exist!');
    }

    products.splice(idx, 1);

    localStorage.setItem('products', JSON.stringify(products));

    return true;
}

ProductService.prototype.getProductCount = function() {
    return JSON.parse(localStorage.getItem('products'))
        .length;
}