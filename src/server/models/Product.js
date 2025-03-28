import { Schema, model } from "mongoose";

const fields = {
    name:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    }
}

const options = {
    timestamp: true
}

const schema = new Schema(fields,options);
export default model('Product',schema);
