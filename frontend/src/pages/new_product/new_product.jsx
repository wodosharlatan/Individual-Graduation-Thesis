import React, { useState } from "react";

function New_Product() {
    const [file, setFile] = useState(null);
    const [productName, setProductName] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productCategory, setProductCategory] = useState("");
	const [productQuantity, setProductQuantity] = useState("");
	const [productRating, setProductRating] = useState("");
	const [productReviews, setProductReviews] = useState("");
	const [productStatus, setProductStatus] = useState("");

    const handleFile = (event) => {
        setFile(event.target.files[0]);
    };

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

	const handleProductDescriptionChange = (event) => {
        setProductDescription(event.target.value);
    };

	const handleProductPriceChange = (event) => {
        setProductPrice(event.target.value);
    };

	const handleProductCategory = (event) => {
		setProductCategory(event.target.value);
	};

	const handleProductQuantityChange = (event) => {
		setProductQuantity(event.target.value);
	};

	const handleProductRatingChange = (event) => {
		setProductRating(event.target.value);
	};

	const handleProductReviewsChange = (event) => {
		setProductReviews(event.target.value);
	};

	const handleProductStatusChange = (event) => {
		setProductStatus(event.target.value);
	};

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!file) {
            console.log("No file selected");
            return;
        }

        const formData = new FormData();

        formData.append("image", file);
        formData.append("productName", productName);
		formData.append("productDescription", productDescription);
		formData.append("productPrice", productPrice);
		formData.append("productCategory", productCategory);
		formData.append("productQuantity", productQuantity);
		formData.append("productRating", productRating);
		formData.append("productReviews", productReviews);
		formData.append("productStatus", productStatus);

        const requestOptions = {
            method: "POST",
            body: formData,
            // Add headers
            redirect: "follow",
        };

        fetch("/API/products", requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.error("Error:", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Select File</label>
            <input id="image" type="file" onChange={handleFile} />
            <br />
            <label>Product Name</label>
            <input
                id="productName"
                type="text"
				required
                value={productName}
                onChange={handleProductNameChange}
            />
            <br />
			<label>Product Description</label>
            <input
                id="productName"
                type="text"
				required
                value={productDescription}
                onChange={handleProductDescriptionChange}
            />
            <br />
			<label>Product Price</label>
            <input
                id="productName"
                type="text"
				required
                value={productPrice}
                onChange={handleProductPriceChange}
            />
            <br />
			<label>Product Category</label>
            <input
                id="productName"
                type="text"
				required
                value={productCategory}
                onChange={handleProductCategory}
            />
            <br />
			<label>Product Quantity</label>
            <input
                id="productName"
                type="text"
				required
                value={productQuantity}
                onChange={handleProductQuantityChange }
            />
            <br />

			<label>Product Rating</label>
			<input
				id="productName"
				type="text"
				required
				value={productRating}
				onChange={handleProductRatingChange}
			/>
			<br />

			<label>Product Reviews</label>
			<input
				id="productName"
				type="text"
				required
				value={productReviews}
				onChange={handleProductReviewsChange}
			/>
			<br />

			<label>Product Status</label>
			<input
				id="productName"
				type="text"
				required
				value={productStatus}
				onChange={handleProductStatusChange}
			/>



            <br />
            <button type="submit">Upload</button>
        </form>
    );
}

export default New_Product;
