import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/navbar";
import "./_mainstyle.scss";

function Single_Product() {
	const [products, setProducts] = useState([]);
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

	return (
		<>
			<Navbar />

			{products &&
				products.map((product, index) => (
					<>
						<div className="divnav">
							<a href="/category" className="textnav">
								Kategorie -{" "}
							</a>
							<a
								href={"/category/" + product.productCategory}
								className="textnav"
							>
								{product.productCategory} -
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
								<a className="productNameText">{product.productName}</a>
							</div>
							<div className="productDesc">
								<a className="productDescText">
									An alternative syntax that alloction, which value of 0 is
									used, meaning e the next event cycle. Note that in either
									case, the actualdelay may be longer than intended; see Reasons
									for d elays longer than specified below.{" "}
									{product.productDescription}
								</a>
							</div>

							<div className="productCat">
								<a className="productCatText">
									Kategorie: {product.productCategory}
								</a>
							</div>
							<div className="productPrice">
								<a className="productPriceText">{product.productPrice},- Kč</a>
							</div>
							<div className="productAmount">
								<a className="productAmountText">
									Skladem: {product.productQuantity}
								</a>
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
								<a className="productRatingText">
									Recenze {product.productRating}
								</a>
								<a className="productRatingStarts">★★★★★</a>
							</div>
							<div onClick="toCart()" className="productToCart">
								<a className="addToCartText">Do košíku</a>
							</div>
						</div>
						<div className="divproductspage2">


				</div>
				<h1 className="otherProductsText">Podobné produkty</h1>
				<div className="otherProducts">

				{products.map((product) => (
						<div className="otherProductsItem" key={product.id}>
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
							<div  className="divproduct_add">
								<p>Do košíku</p>
							</div>
						</div>
					))}

{products.map((product) => (
						<div className="otherProductsItem" key={product.id}>
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
							<div  className="divproduct_add">
								<p>Do košíku</p>
							</div>
						</div>
					))}

{products.map((product) => (
						<div className="otherProductsItem" key={product.id}>
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
							<div  className="divproduct_add">
								<p>Do košíku</p>
							</div>
						</div>
					))}

{products.map((product) => (
						<div className="otherProductsItem" key={product.id}>
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
							<div  className="divproduct_add">
								<p>Do košíku</p>
							</div>
						</div>
					))}
				</div>
					</>
				))}
		</>
	);
}

export default Single_Product;
