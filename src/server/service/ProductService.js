
import Product from "../models/Product.js";

class ProductService{
    
    async retrieveProduct(productId) {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }
    
    async createProduct({name,price,stock,description}) {
        return await Product.create({name,price,stock,description});
    }
    async updateProduct(productId, updateData) {
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: productId },
            updateData,
            { new: true }
        );
        return updatedProduct;
    }

    async deleteProduct(productId) {
        const deletedProduct = await Product.findOneAndDelete({ _id: productId });
        return deletedProduct;
    }
    async searchProducts(page = 1, perPage = 3){

        const filters = {};
        const count = await Product.countDocuments(filters);
        const pages = Math.ceil(count / perPage);

        const  pagination = {
            perPage: parseInt(perPage),
            page:parseInt(page),
            count,
            pages
        };

        const fields = {
            __v: 0
        };
        const options = {
            skip: (page - 1) * perPage,
            limit: perPage,
            sort:{
                createAt:-1
            }
        };


        const records = await Product.find(filters, fields,options);
        return{pagination, records}
    }
}
export default new ProductService();