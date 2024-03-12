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

	function handleDirect(productName) {
		window.location.href = `/product/${productName}`;
	}

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
				<div className="divtext">
					<div className="texthomepage">
						<h1>Ahoj, my jsme Dárky z pedigu!</h1><br></br>
						<h4>U nás si vybere každý. Produkty jsou určené jak pro muže tak pro ženy.</h4>
						<h4>Chcete svým nejbližším udělat radost, nebo si jen vydekorovat byt? Zde najdete to co hledáte.</h4>
						<h4>Všechny produkty jsou ručně vyrobené v malé dílničce v podkrkonoší mnou, Bárou.</h4>
					</div>
					<br></br><br></br>
					<div className="akcetext">
						<h1>Termíny akcí, kde mě a mé výrobky můžete potkat.</h1><br></br>
						<h4>14.3. - Kino 70 Nové Město nad Metují velikonoční jarmark</h4>
						<h4>16.3. - Dolní Bousov Josefský trh</h4>
						<h4>17.3. - Hronov Velikonoční trhy</h4>
						<h4>23.3. - Zámek Sychrov</h4>
						<h4>24.3. - Zámek Sychrov</h4>
						<h4>27.3. - Hradec Králové škola velikonoční trh</h4>
						<h4>29.3. - Poděbrady</h4>
						<h4>30.3. - Poděbrady</h4>
						<h4>31.3. - Poděbrady</h4>
						
					</div>
				</div>
					{products.map((product, index) => (
						<div className="divproduct" key={index}>
							<div className="divproduct_img">
								<img
									className="imgh"
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
							<div
								onClick={() => {
									handleDirect(product.productName);
								}}
								className="divproduct_add"
							>
								<p className="textadd">Podrobnosti</p>
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
