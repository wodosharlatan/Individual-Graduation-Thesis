import React, { useState, useEffect } from "react";
import HomeComponent from "./homecomponent";

function Home() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/API/products");
				const result = await response.json();

				setProducts(result);
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
					<HomeComponent src={product.productImagePath} />
				</div>
			))}
		</>
	);
}

export default Home;
