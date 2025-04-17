/*
    Name: Connor Smith
    filename: Product.js
    Course: INFT 2202
    Date: February 21, 2025
    Description: This is the Product object script
*/

function Product(id = null, name, price, stock, description) {
    this._id = id;
    
    Object.assign(this, { name, price, stock, description});
};

Product.prototype.toString = function() {
    return `${this.name}, ${this.price}, ${this.stock}, ${this.description}`;
};

Product.prototype.toJSON = function() {
    return {
        _id: this._id,
        name: this.name,
        price: this.price,
        stock: this.stock,
        description: this.description,
    };
};

export default Product;