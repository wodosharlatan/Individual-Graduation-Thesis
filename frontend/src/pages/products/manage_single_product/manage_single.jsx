import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Manage_Single_Product() {
	const [file, setFile] = useState(null);
	const [product, setProduct] = useState([]);
	const { PRODUCT_NAME } = useParams();
	const [productName, setProductName] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productCategory, setProductCategory] = useState("");
	const [productQuantity, setProductQuantity] = useState("");
	const [productStatus, setProductStatus] = useState("");

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
					fetchProduct(PRODUCT_NAME);
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
	function fetchProduct(name) {
		
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch(`/API/products/${name}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setProduct(result);
			})
			.catch((error) => console.log("error", error));
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
		formData.append("productStatus", productStatus);

		const UserTokenValue = getCookie("UserToken");
		const requestOptions = {
			method: "PUT",
			body: formData,
			redirect: "follow",
		};

		fetch(`/API/products/${UserTokenValue}/${PRODUCT_NAME}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setProduct(result);
			})
			.catch((error) => console.log("error", error));
	};

	return (
		<>
			{product &&
				product.map((item, index) => {
					return (
					
							<form onSubmit={handleSubmit} key={index}>
								<input type="file" onChange={handleFile} />
								<br />

								<label>Product Name</label>
								<input
									type="text"
									onChange={handleProductNameChange}
									value={item.productName}
									required
								/>
								<br />
								<label>Product Description</label>
								<input
									id="productDesc"
									type="text"
									onChange={handleProductDescriptionChange}
									value={item.productDescription}
								/>
								<br />
								<label>Product Price</label>
								<input
									type="text"
									onChange={handleProductPriceChange}
									value={item.productPrice}
								/>
								<br />
								<label>Product Category</label>
								<input
									type="text"
									onChange={handleProductCategory}
									value={item.productCategory}
								/>
								<br />
								<label>Product Quantity</label>
								<input
									type="text"
									onChange={handleProductQuantityChange}
									value={item.productQuantity}
								/>
								<br />
								<label>Product Status</label>
								<input
									type="text"
									onChange={handleProductStatusChange}
									value={item.productStatus}
								/>

								<button type="submit">Save</button>
							</form>
						
					);
				})}
		</>
	);
}

export default Manage_Single_Product;
