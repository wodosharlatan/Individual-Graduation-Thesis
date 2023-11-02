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
    productImage: {
        type: String,
        required: true,
    },
    productQuantity: {
        type: Number,
        required: true,
    },
    productRating: {
        type: Number,
        required: true,
    },
    productReviews: {
        type: Array,
        required: true,
    },
    productStatus: {
        type: String,
        required: true,
    },



});

module.exports = mongoose.model("Products", ProductSchema);
