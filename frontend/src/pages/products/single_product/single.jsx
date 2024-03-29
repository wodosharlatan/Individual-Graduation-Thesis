import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "..//../../components/footer/footer";
import { Helmet } from "react-helmet";

function Single_Product() {
	const [products, setProducts] = useState([]);
	const [review, setReview] = useState([]);
	const [stars, setStars] = useState([]);
	const { PRODUCT_NAME } = useParams();

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

	const handleReview = (event) => {
		setReview(event.target.value);
	};

	const handleStars = (event) => {
		setStars(event.target.value);
	};


	function setCookie(cname, cvalue, exMinutes) {
		const d = new Date();
		d.setTime(d.getTime() + (exMinutes * 60 * 1000));
		let expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	  
	function getCookie(name) {
		let cookieValue = null;
		if (document.cookie && document.cookie !== "") {
			const cookies = document.cookie.split(";");
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				if (cookie.substring(0, name.length + 1) === name + "=") {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}

	function setProductCookie(productName, productValue, exMinutes){
		setCookie(productName, productValue, exMinutes);
	}

	function handleSubmit() {
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify({
			stars: stars,
			productName: PRODUCT_NAME,
			message: review,
			userToken: getCookie("UserToken"),
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};


		fetch(`/API/reviews`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
			})
			.catch((error) => console.log(error));
	}


	return (
		<>
		<Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="keywords" content="Dárky, Pedigu, Pedig, Košík, Výrobek, Přírodní materiál, Ruční výroba, Malá dílnička"></meta>
		<meta name="author" content="Tomáš Bosák"></meta>
		<meta name="author" content="Marek Hejral"></meta>
        <title>"Produkt Name" | Dárky z pedigu</title>
        <meta
          name="description"
          content="Dárky z pedigu - Vlastnoruční výroba kvalitních produktů z pedigu z malé dílničky v podkrkonoší
   | Košíky | Dekorace | Figurky | Hrníčky | Hodiny | Podnosy"
        />
      </Helmet>
			<Navbar />

			{products &&
				products.map((product, index) => (
					<>
						<div className="divnav">
							<a className="textnav">
								Kategorie {" "}
							</a>
							<a
								href={"/category/" + product.productCategory}
								className="textnav"
							>
								{product.productCategory} 
							</a>
							<a href={"/product/" + product.productName} className="textnav">
								{product.productName}
							</a>
						</div>
						<div className="divproduct1" key={index}>
							<img
								className="productImg"
								src={product.productImagePath}
								alt="product image"
							/>
							<div className="productName">
								<p className="productNameText">{product.productName}</p>
							</div>
							<div className="productDesc">
								<p className="productDescText">
									{" "}
									{product.productDescription}
								</p>
							</div>

							<div className="productCat">
								<p className="productCatText">
									Kategorie: {product.productCategory}
								</p>
							</div>
							<div className="productPrice">
								<p className="productPriceText">{product.productPrice},- Kč</p>
							</div>
							<div className="productAmount">
								<p className="productAmountText">
									Skladem: {product.productQuantity}
								</p>
							</div>

							{product.productReviews && product.productReviews.length > 0 && (
								<>
									<div>Hodnocení:</div>
									{product.productReviews.map((rating, index) => (
										<div key={index}>
											<div>
												Rating {index}: {rating}
											</div>
										</div>
									))}
								</>
							)}

							<div className="productRating">
								<p className="productRatingText">
									Recenze {product.productReviews}
								</p>
								<p className="productRatingStarts">★★★★★</p>
							</div>
							<div onClick="toCart()" className="productToCart">
								<p className="addToCartText">Do košíku</p>
							</div>
						</div>
						<div className="divproductspage2"></div>

						<div className="divrecenze">
							<h2 className="h2recenze">Recenze</h2>
							<br></br>
						<form>
							<a className="arecenze">Napiš recenzi</a>
							<input
								onChange={handleStars}
								type="number"
								min={1}
								max={5}
							></input>
							<input
								onChange={handleReview}
								type="text"
								placeholder="Recenze"
								required
							></input>
							<button
								type="button"
								onClick={() => {
									handleSubmit();
								}}
							>
								Odeslat
							</button>
						</form>
						<hr></hr>
						</div>
						

						<h1 className="otherProductsText">Podobné produkty</h1>
						<div className="otherProducts">
							{products.map((product) => (
								<div className="otherProductsItem" key={product.id}>
									<div className="divproductsingle_img">
										<img className="imgs"
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
										<p>Podrobnosti</p>
									</div>
								</div>
							))}

							{products.map((product) => (
								<div className="otherProductsItem" key={product.id}>
									<div className="divproductsingle_img">
										<img className="imgs"
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

							{products.map((product) => (
								<div className="otherProductsItem" key={product.id}>
									<div className="divproductsingle_img">
										<img className="imgs"
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

							{products.map((product) => (
								<div className="otherProductsItem" key={product.id}>
									<div className="divproductsingle_img">
										<img className="imgs"
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
									<div className="divproduct_add" onClick={setProductCookie(`${product.productName}`, `${product.productPrice}`, 15)}>
										<p>Do košíku</p>
									</div>
								</div>
							))}
						</div>
						<Footer />
					</>
				))}
		</>
	);
}

export default Single_Product;
