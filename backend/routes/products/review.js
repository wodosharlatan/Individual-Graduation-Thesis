const express = require("express");
const router = express.Router();
const User = require("../../models/user_model");
const Products = require("../../models/product_model");
const isNull = require("../../functions/is_empty");
const GenerateHash = require("../../functions/generate_hash");
const verify = require("../../functions/verify");

router.post("/", async (req, res) => {
	try {
		const stars = Math.ceil(req.body.stars);
		const message = req.body.message;
		const userToken = req.body.userToken;

		const user = await User.findOne({ VerificationCode: userToken });

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const productName = await Products.findOne({
			productName: req.body.productName,
		});

		if (!productName) {
			return res.status(400).json({ message: "Product not found" });
		}

		for (let i = 0; i < productName.productReviews.length; i++) {
			if (productName.productReviews[i].name == user.Name) {
				return res.status(400).json({ message: "User has already reviewed" });
			}
		}

		if (stars > 5 || stars < 1) {
			return res.status(400).json({ message: "Stars must be between 1-5" });
		}

		if (isNull(message) || message.length < 4) {
			return res
				.status(400)
				.json({ message: "Message must be at least 4 characters long" });
		}

		if (message.length > 100) {
			return res
				.status(400)
				.json({ message: "Message must be max 100 characters long" });
		}

		await Products.findOneAndUpdate(
			{ productName: req.body.productName },
			{
				$push: {
					productReviews: {
						message: message,
						stars: stars,
						name: user.Name,
						uniqueId: GenerateHash(),
					},
				},
			}
		);

		return res.status(200).json({ message: "Review Added" });
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
});

router.delete("/", async (req, res) => {
	try {
    const result = await verify(req.body.userToken);
    if (result !== true) {
      return res.status(400).json(result);
    } else {
      
      const queryResult = await Products.findOne({ productName: req.body.productName })

      if (!queryResult) {
        return res.status(400).json({ message: "Product not found" });
      }

      let reviewFound = false;
      for (let i = 0; i < queryResult.productReviews.length; i++) {
        if (queryResult.productReviews[i].uniqueId == req.body.uniqueId) {
          reviewFound = true;
          queryResult.productReviews.splice(i, 1);
          break;
        }
      }

      if (!reviewFound) {
        return res.status(400).json({ message: "Review not found" });
      }

      await Products.findOneAndUpdate
      (
        { productName: req.body.productName },
        {
          $set: {
            productReviews: queryResult.productReviews
          }
        }
      );


      return res.status(200).json({ message: "Review Deleted" });
    }


	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
});

router.post("/list-reviews", async (req, res) => {
	try {
		const product = await Products.findOne({
			productName: req.body.productName,
		});

		if (!product) {
			return res.status(400).json({ message: "Product not found" });
		}

		return res.status(200).json({ reviews: product.productReviews });

	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
});

module.exports = router;
