

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Single_Product() {
	const [products, setProducts] = useState([]);
	const { PRODUCT_NAME } = useParams();

	console.log(PRODUCT_NAME);

	useEffect(() => {
		fetchProduct(PRODUCT_NAME);
	}, []);

	function fetchProduct(product) {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch(`/API/products/${product}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setProducts(result);
				console.log(result);
			})
			.catch((error) => alert("Error:", error));
	}

	return (
		<>
			<h1>Product</h1>
			{products.map((product, index) => (
				<div key={index}>
					<img src={product.productImagePath} alt="product image" />
					<h1>Nazev: {product.productName}</h1>
					<h1>Popisek: {product.productDescription}</h1>
					<h1>Cena: {product.productPrice}</h1>
					<h1>Kategorie: {product.productCategory}</h1>
					<h1>Mnozstvi: {product.productQuantity}</h1>
						

					{product.productReviews && product.productReviews.length > 0 && (
						<>
							<h1>Hodnocení:</h1>
							{product.productReviews.map((rating, index) => (
								<div key={index}>
									<h1>
										Rating {index}: {rating}
									</h1>
								</div>
							))}
						</>
					)}

					<h1>Recenze: {product.productRating}</h1>
					<h1>Dostupnost: {product.productStatus}</h1>
				
					<hr />
				</div>
			))}
		</>
	);
}

export default Single_Product;