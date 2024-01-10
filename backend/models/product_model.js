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
    productRating: {
        type: Number,
        default: 0,
    },
    productReviews: {
        type: Array,
        default: [],
    },


    // System generated
    productStatus: {
        type: String,
        required: true,
    },
    productImage: {
        type: Buffer,
        required: true,
    },


});

module.exports = mongoose.model("Products", ProductSchema);
