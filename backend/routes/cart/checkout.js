require("dotenv/config");

const express = require("express");
const router = express.Router();
const Product = require("../../models/product_model");
const User = require("../../models/user_model");
const Order = require("../../models/order_model");
const isNull = require("../../functions/is_empty");
const verify = require("../../functions/verify");
const GenerateHash = require("../../functions/generate_hash");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { SendEmailWithFile } = require("../../functions/send_email");

function generatePDF(fileName, orderedProducts, totalPrice) {
	const doc = new PDFDocument({ font: path.join(__dirname, "..", "..", "NotoSansSymbols-Regular.ttf") });
  doc.pipe(fs.createWriteStream(fileName));
  doc
    .fontSize(50)
    .text("Toto je souhrn vaší objednávky: ", { align: "center" })
    .moveDown();

  for (let i = 0; i < orderedProducts.length; i++) {
    doc
      .fontSize(30)
      .text(
        `Produkt ${i + 1}: ${orderedProducts[i].productName} - ${
          orderedProducts[i].productQuantity
        }x`,
        { align: "left" }
      )
      .moveDown();
  }

  doc
    .moveDown()
    .fontSize(40)
    .text("Celková cena činí: " + totalPrice, { align: "center" })
    .moveDown();
  doc.end();

  return fileName;
}

router.post("/", async (req, res) => {
  const validProducts = [];
  let TotalPrice = 0;

  try {
    let Email = req.body.Email;
    if (isNull(Email)) {
      const VerificationCode = req.body.VerificationCode;
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
      if (requestedProducts[i].productQuantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
      }

      if (requestedProducts[i].productQuantity > product.productQuantity) {
        return res.status(400).json({ message: "Not enough products" });
      }

      const availableProducts =
        product.productQuantity - requestedProducts[i].productQuantity;

      await Product.findOneAndUpdate(
        { productName: requestedProducts[i].productName },
        {
          $set: {
            productQuantity: availableProducts,
          },
        }
      );

      product.productQuantity = requestedProducts[i].productQuantity;

      TotalPrice += product.productPrice * requestedProducts[i].productQuantity;
      validProducts.push(product);
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

    const fileName = generatePDF(
      `Objednavka-${OrderID}.pdf`,
      validProducts,
      TotalPrice
    );
    const filePath = path.join(__dirname, "..", "..", fileName);
	SendEmailWithFile(
		Email,
		"Informace objednávce",
		"order",
		fileName,
		filePath
	  ).then(() => {
		fs.unlink(fileName, (err) => {
		  if (err) {
			console.error(err);
		  } else {
			console.log(`Order file ${fileName} was deleted.`);
		  }
		});
	  }).catch((error) => {
		console.error("Error sending email:", error);
	  });
	  

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

    const result = await verify(VerificationCode);
    if (result !== true) {
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
      return res
        .status(403)
        .json({ message: "You are not the owner of this order" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
});

module.exports = router;
