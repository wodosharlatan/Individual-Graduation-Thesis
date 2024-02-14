import React, { useState, useEffect } from "react";
import "./_mainstyle.scss";

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
				if (data == true) {
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
			.then((result) => {
				setProducts(result);
				console.log(result);
			})
			.catch((error) => alert("Error:", error));
	}

	function HandleDelete(productName) {
		const requestOptions = {
			method: "DELETE",
			body: JSON.stringify({productName: productName}),
			redirect: "follow"
		};

		const userCookieValue = getCookie("UserToken");

		fetch(`/API/products/${userCookieValue}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				fetchProducts();
			})
			.catch((error) => alert("Error:", error.toString()));
	}

	return (
		<>
			<div className="divproductspage23">
				{isAdmin &&
					products.map((product, index) => (
						<div className="divproduct2" key={index}>
							<img
								className="imgs"
								src={product.productImagePath}
								alt="product image"
							/>
							<h1>Název: {product.productName}</h1>
							<h1>Popisek: {product.productDescription}</h1>
							<h1>Cena: {product.productPrice}</h1>
							<h1>Kategorie: {product.productCategory}</h1>
							<h1>Množství: {product.productQuantity}</h1>
							<button onClick={() => HandleDelete(product.productName)}>
								Smazat
							</button>

							<a href={`/manage/product/${product.productName}`}>Editovat</a>

							<h1>Recenze:</h1>
							{product.productReviews.map((rating, index) => (
								<div key={index}>
									<h1>
										Rating {index}: {rating.message}
									</h1>
									<p>
										{" "}
										{rating.Name}, {rating.stars}⭐{" "}
									</p>
								</div>
							))}

							<h1>Hodnocení: {product.productRating}</h1>
							<h1>Dostupnost: {product.productStatus}</h1>
							<hr />
						</div>
					))}
			</div>
		</>
	);
}

export default All_Products;
