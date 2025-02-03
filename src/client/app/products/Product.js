export default class Product {
    constructor({ id = null, name, price, stock, description }) {
        this.id = id ?? crypto.randomUUID();

        Object.assign(this, { name, price, stock, description });
    }

    toString() {
        return `${this.name}, ${this.price}, ${this.stock}, ${this.description}`;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            stock: this.stock,
            description: this.description,
        };
    }
}

