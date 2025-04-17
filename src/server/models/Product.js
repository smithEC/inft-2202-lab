import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  description: String
}, { timestamps: false });

export default mongoose.model('Product', productSchema);
