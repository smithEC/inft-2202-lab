function Product(id = null, name, price, stock, description) {
    this.id = id ?? crypto.randomUUID();
    
    Object.assign(this, { name, price, stock, description });
};

Product.prototype.toString = function() {
    return `${this.name}, ${this.price}, ${this.stock}, ${this.description}`;
};

Product.prototype.toJSON = function() {
    return {
        id: this.id,
        name: this.name,
        price: this.price,
        stock: this.stock,
        description: this.description,
    };
};

export default Product;