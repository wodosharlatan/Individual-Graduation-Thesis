const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({

    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    productQuantity: {
        type: Number,
        required: true,
    },    


    
    // System generated
    productRating: {
        type: Number,
        default: 0,
    },
    productReviews: {
        type: Array,
        default: [],
    },
    productStatus: {
        type: String,
        required: false,
    },
    productImagePath: {
        type: String,
        required: true,
    },
    productFileName: {
        type: String,
        required: true,
    },


});

module.exports = mongoose.model("Products", ProductSchema);
