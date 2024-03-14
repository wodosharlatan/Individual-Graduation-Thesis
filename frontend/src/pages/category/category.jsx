import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";

function Category() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const { CATEGORY_NAME } = useParams();

	useEffect(() => {
		fetchProducts(CATEGORY_NAME);
		fetchCategories();
	}, []);

	function handleDirect(productName) {
		window.location.href = `/product/${productName}`;
	}


	function fetchProducts(category) {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch(`/API/categories/${category}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setProducts(result);
			})
			.catch((error) => alert("Error:", error));
	}

	
	const fetchCategories = async () => {
		try {
			const response = await fetch("/API/categories");
			const result = await response.json();



			setCategories(result);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
		<Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="keywords" content="Dárky, Pedigu, Pedig, Košík, Výrobek, Přírodní materiál, Ruční výroba, Malá dílnička"></meta>
		<meta name="author" content="Tomáš Bosák"></meta>
		<meta name="author" content="Marek Hejral"></meta>
        <title>Dárky z pedigu | Kategorie</title>
        <meta
          name="description"
          content="Dárky z pedigu - Vlastnoruční výroba kvalitních produktů z pedigu z malé dílničky v podkrkonoší
   | Košíky | Dekorace | Figurky | Hrníčky | Hodiny | Podnosy"
        />
      </Helmet>
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
								<img
									className="imgc"
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
			<Footer />
		</>
	);
}

export default Category;
