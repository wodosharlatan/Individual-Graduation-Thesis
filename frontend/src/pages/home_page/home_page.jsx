import React, { useState, useEffect } from "react";

function Home() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/API/products");
				const result = await response.json();

				setProducts(result);
				console.log(result);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			{products.map((product) => (
				<div key={product._id}>
					<h1>{product.productName}</h1>
					<img
						src={product.productImagePath}
						alt={`Image for ${product.productName}`}
					/>
				</div>
			))}
		</>
	);
}

export default Home;
