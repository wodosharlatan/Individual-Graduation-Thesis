import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function Manage_Single_Product() {
	const [file, setFile] = useState(null);
	const [product, setProduct] = useState([]);
	const { PRODUCT_NAME } = useParams();
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

				const productData = result[0];
				setProductName(productData.productName);
				setProductDescription(productData.productDescription);
				setProductPrice(productData.productPrice);
				setProductCategory(productData.productCategory);
				setProductQuantity(productData.productQuantity);
			})
			.catch((error) => console.log("error", error));
	}

	const handleFile = (event) => {
		setFile(event.target.files[0]);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const formData = new FormData();

		formData.append("image", file);
		formData.append("productNameNew", productName);
		formData.append("productNameOld", PRODUCT_NAME);
		formData.append("productDescription", productDescription);
		formData.append("productPrice", productPrice);
		formData.append("productCategory", productCategory);
		formData.append("productQuantity", productQuantity);

		const UserTokenValue = getCookie("UserToken");
		const requestOptions = {
			method: "PUT",
			body: formData,
			redirect: "follow",
		};

		fetch(`/API/products/${UserTokenValue}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				// window.location.href = "/manage/products";
			})
			.catch((error) => console.log("error", error));
	};

	return (
		<>
		<Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="keywords" content="Dárky, Pedigu, Pedig, Košík, Výrobek, Přírodní materiál, Ruční výroba, Malá dílnička"></meta>
		<meta name="author" content="Tomáš Bosák"></meta>
		<meta name="author" content="Marek Hejral"></meta>
        <title>Upravení produktu | Dárky z pedigu</title>
        <meta
          name="description"
          content="Dárky z pedigu - Vlastnoruční výroba kvalitních produktů z pedigu z malé dílničky v podkrkonoší
   | Košíky | Dekorace | Figurky | Hrníčky | Hodiny | Podnosy"
        />
      </Helmet>
			<form onSubmit={handleSubmit}>
				<input type="file" onChange={handleFile} />
				<br />

				<label>Product Name</label>
				<input
					type="text"
					onChange={(e) => setProductName(e.target.value)}
					value={productName}
					required
				/>
				<br />
				<label>Product Description</label>
				<input
					id="productDesc"
					type="text"
					onChange={(e) => setProductDescription(e.target.value)}
					value={productDescription}
				/>
				<br />
				<label>Product Price</label>
				<input
					type="text"
					onChange={(e) => setProductPrice(e.target.value)}
					value={productPrice}
				/>
				<br />
				<label>Product Category</label>
				<input
					type="text"
					onChange={(e) => setProductCategory(e.target.value)}
					value={productCategory}
				/>
				<br />
				<label>Product Quantity</label>
				<input
					type="text"
					onChange={(e) => setProductQuantity(e.target.value)}
					value={productQuantity}
				/>
				<br />


				<button type="submit">Save</button>
			</form>
		</>
	);
}

export default Manage_Single_Product;
