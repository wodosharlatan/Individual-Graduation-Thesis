import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";

function Home() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetchData();
		fetchCategories();
	}, []);

	




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

	const fetchCategories = async () => {
		try {
			const response = await fetch("/API/categories");
			const result = await response.json();

			console.log(result);

			setCategories(result);
		} catch (error) {
			console.error(error);
		}
	};


	return (
		<>
			<Navbar categories={categories} />

			<div className="divhome">
				<div className="divcat">
					<aside className="kategorie">
						<h1 className="nadpis">Kategorie</h1>
						{categories.map((Category, index) => (
							<div key={index}>
								<a className="text1_kat" href={`/category/${Category}`}>
									{Category}
								</a>
								<br></br>
							</div>
						))}
						<br></br>
					</aside>
				</div>

				<div className="div_products_page2">
					{products.map((product, index) => (
						<div className="divproduct" key={index}>
							<div className="divproduct_img">
								<img
									src={product.productImagePath}
									alt={`Image for ${product.productName}`}
								/>
							</div>

							<div className="divproduct_rating">
								<p>{product.productRating}</p>
							</div>
							<div className="divproduct_name">
								<p>{product.productName}</p>
							</div>
							<div className="divproduct_price">
								<p>{product.productPrice},- Kč</p>
							</div>
							<div className="divproduct_add">
								<p>Do košíku</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<Footer />
		</>
	);
}

export default Home;
