import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";

function Category() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const { CATEGORY_NAME } = useParams();

	useEffect(() => {
		fetchProducts(CATEGORY_NAME);
		fetchCategories();
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
			<Navbar />

			<div className="divcategorypage">
				<div className="divcat_categorypage">
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

				<div className="divproductspage2_categorypage">
					{products.map((product) => (
						<div className="divproduct_categorypage" key={product.id}>
							<div className="divproduct_img_categorypage">
								<img className="imgc"
									src={product.productImagePath}
									alt={`Image for ${product.productName}`}
								/>
							</div>

							<div className="divproduct_rating_categorypage">
								<p>{product.productRating}</p>
							</div>
							<div className="divproduct_name_categorypage">
								<p>{product.productName}</p>
							</div>
							<div className="divproduct_price_categorypage">
								<p>{product.productPrice},- Kč</p>
							</div>
							<div
								onClick={() => {
									handleDirect(product.productName);
								}}
								className="divproduct_add_categorypage"
							>
								<p className="textadd_categorypage">Podrobnosti</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default Category;
