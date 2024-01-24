import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Category() {
	const [products, setProducts] = useState([]);
	const { CATEGORY_NAME } = useParams();

	useEffect(() => {
		fetchProducts(CATEGORY_NAME);
	}, []);

	function fetchProducts(category) {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch(`/API/categories/${category}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setProducts(result);
				console.log(result);
			})
			.catch((error) => alert("Error:", error));
	}

	return (
		<>
			{products.map((product, index) => (
				<div key={index}>
					<img src={product.productImagePath} alt="product image" />
					<h1>Nazev: {product.productName}</h1>
					<h1>Popisek: {product.productDescription}</h1>
					<h1>Cena: {product.productPrice}</h1>
					<h1>Kategorie: {product.productCategory}</h1>
					<h1>Mnozstvi: {product.productQuantity}</h1>
					<a href={`/product/${product.productName}`}>Detail</a>	

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

export default Category;
