import React, { useState, useEffect } from "react";

function New_Product() {
	const [isAdmin, setIsAdmin] = useState(false);
	const [file, setFile] = useState(null);
	const [productName, setProductName] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productCategory, setProductCategory] = useState("");
	const [productQuantity, setProductQuantity] = useState("");

	useEffect(() => {
		handleAccess();
	}, []);
	

	function handleAccess() {
		const UserTokenValue = getCookie("UserToken");
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		};

		const path = `/API/verify/${UserTokenValue}`;

		fetch(path, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				if (data == true) {
					setIsAdmin(true);
				} else {
					alert("Nemáte přístup k této stránce");
					window.location.href = "/";
				}
			})
			.catch((error) => {
				alert("Nemáte přístup k této stránce");
				window.location.href = "/";
			});
	}

	function getCookie(name) {
		let cookieValue = null;
		if (document.cookie && document.cookie !== "") {
			const cookies = document.cookie.split(";");
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === name + "=") {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}

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

		const requestOptions = {
			method: "POST",
			body: formData,
			// Add headers
			redirect: "follow",
		};

		fetch("/API/products", requestOptions)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => alert("Error:", error));
	};

	return (
		<>

			{isAdmin && (
				<form onSubmit={handleSubmit}>
					<label>Select File</label>
					<input id="image" type="file" onChange={handleFile} />
					<br />
					<label>Product Name</label>
					<input
						 
						type="text"
						required
						value={productName}
						onChange={handleProductNameChange}
					/>
					<br />
					<label>Product Description</label>
					<input
						 
						type="text"
						required
						value={productDescription}
						onChange={handleProductDescriptionChange}
					/>
					<br />
					<label>Product Price</label>
					<input
						 
						type="text"
						required
						value={productPrice}
						onChange={handleProductPriceChange}
					/>
					<br />
					<label>Product Category</label>
					<input
						 
						type="text"
						required
						value={productCategory}
						onChange={handleProductCategory}
					/>
					<br />
					<label>Product Quantity</label>
					<input
						 
						type="text"
						required
						value={productQuantity}
						onChange={handleProductQuantityChange}
					/>

					<br />
					<button type="submit">Upload</button>
				</form>
			)}
		</>
	);
}

export default New_Product;
