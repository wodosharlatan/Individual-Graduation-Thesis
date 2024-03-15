const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({

    OrderProducts: {
        type: Array,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    OrderID: {
        type: String,
        required: true,
    },
    CheckoutPlace: {
        type: String,
        required: true,
    },
    FormOFPayment: {
        type: String,
        required: true,
    },
    TotalPrice: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Orders", OrderSchema);
