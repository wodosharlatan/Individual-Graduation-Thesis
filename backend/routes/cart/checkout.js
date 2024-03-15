require("dotenv/config");

const express = require("express");
const router = express.Router();
const Product = require("../../models/product_model");
const User = require("../../models/user_model");
const Order = require("../../models/order_model");
const isNull = require("../../functions/is_empty");
const verify = require("../../functions/verify");
const GenerateHash = require("../../functions/generate_hash");

router.post("/", async (req, res) => {
	const validProducts = [];
	const TotalPrice = 0;

	try {
		let Email = req.body.Email;
		if (isNull(Email)) {
			const VerificationCode = req.body.verificationCode;
			if (isNull(VerificationCode)) {
				return res
					.status(400)
					.json({ message: "Email or verification code are required" });
			} else {
				const user = await User.findOne({ VerificationCode: VerificationCode });
				if (!user) {
					return res.status(404).json({ message: "User not found" });
				} else {
					Email = user.Email;
				}
			}
		}

		const CheckoutPlace = req.body.CheckoutPlace;
		if (isNull(CheckoutPlace)) {
			return res.status(400).json({ message: "Checkout place is required" });
		}
		const FormOFPayment = req.body.FormOFPayment;
		if (isNull(FormOFPayment)) {
			return res.status(400).json({ message: "Form of payment is required" });
		}

		const user = await User.findOne({ Email: req.body.Email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const requestedProducts = req.body.Products;
		if (isNull(requestedProducts)) {
			return res
				.status(400)
				.json({ message: "At least one product are required" });
		}

		for (let i = 0; i < requestedProducts.length; i++) {
			const product = await Product.findOne({
				productName: requestedProducts[i].productName,
			});
			if (!product) {
				return res.status(404).json({ message: "Product not found" });
			}
			if (requestedProducts[i].Quantity < 1) {
				return res.status(400).json({ message: "Quantity must be at least 1" });
			}
			product.ProductQuantity -= requestedProducts[i].Quantity;
			await Product.FindOneAndUpdate(
				{ productName: requestedProducts[i].productName },
				product
			);
			validProducts.push(product);
			TotalPrice += product.ProductPrice * requestedProducts[i].Quantity;
		}

		const OrderID = GenerateHash();
		const order = new Order({
			OrderProducts: validProducts,
			Email: Email,
			OrderID: OrderID,
			CheckoutPlace: CheckoutPlace,
			FormOFPayment: FormOFPayment,
			TotalPrice: TotalPrice,
		});

		await order.save();
		return res.status(200).json({ message: "Order placed successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
});


router.post("/get-all", async (req, res) => {
    try {

        const VerificationCode = req.body.VerificationCode;
        if (isNull(VerificationCode)) {
            return res.status(400).json({ message: "Verification code is required" });
        }

        console.log(await User.findOne({VerificationCode: VerificationCode}))

		const result = await verify(VerificationCode);
		if(result !== true) {
			return res.status(400).json(result);
		}

        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: error.toString() });
    }

});

router.post("/get-one/:ID", async (req, res) => {
    try {
        const VerificationCode = req.body.VerificationCode;
        if (isNull(VerificationCode)) {
            return res.status(400).json({ message: "Verification code is required" });
        }

        const user = await User.findOne({ VerificationCode: VerificationCode });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const order = await Order.findOne({ OrderID: req.params.ID });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.Email !== user.Email) {
            return res.status(403).json({ message: "You are not the owner of this order" });
        }


        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ message: error.toString() });
    }
});


module.exports = router;
