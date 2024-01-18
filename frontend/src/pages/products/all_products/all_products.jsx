import React, { useState, useEffect } from "react";

function All_Products() {
	const [isAdmin, setIsAdmin] = useState(false);
	const [products, setProducts] = useState([]);

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
				if (data.message == "true") {
					setIsAdmin(true);
					fetchProducts();
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

	function fetchProducts() {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch("/API/products", requestOptions)
			.then((response) => response.json())
			.then((result) => setProducts(result))
			.catch((error) => alert("Error:", error));
	}

	return (
		<>
			{" "}
			{isAdmin &&
				products.map((product) => (
					<div key={product.id}>
                        <img src={product.productImagePath} alt="product image" />
						<h1>Nazev: {product.productName}</h1>
						<h1>Popisek: {product.productDescription}</h1>
						<h1>Cena: {product.productPrice}</h1>
						<h1>Kategorie: {product.productCategory}</h1>
						<h1>Mnozstvi: {product.productQuantity}</h1>
						<h1>Hodnoceni: {product.productRating}</h1>
						<h1>Recenze: {product.productReviews}</h1>
						<h1>Dostupnost: {product.productStatus}</h1>
						
					</div>
				))}
		</>
	);
}

export default All_Products;