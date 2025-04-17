/*
    Name: Connor Smith
    filename: Product.js
    Course: INFT 2202
    Date: February 21, 2025
    Description: This is the Product object script
*/

function Product(id = null, name, price, stock, description, owner = null) {
    this.id = id ?? crypto.randomUUID();
    
    Object.assign(this, { name, price, stock, description, owner });
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
        owner: this.owner
    };
};

export default Product;