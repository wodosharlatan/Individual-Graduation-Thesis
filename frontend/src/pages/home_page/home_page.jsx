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
		setProducts([
			{
				_id: "65b017f15e8df60f1a1a46f7",
				productName: "e22",
				productDescription: "",
				productPrice: 132,
				productCategory: "3",
				productQuantity: 2,
				productRating: 2.5,
				productReviews: [
					{
						message: "Super Komentar 78",
						stars: 1,
						name: "Tomas Bosak",
						uniqueId:
							"6d240bc6808be3747577cb0a411650beaa59901eb954fc1551de6e87f641de66",
					},
					{
						message: "Super Komentar 7",
						stars: 4,
						name: "Marek Hejral",
						uniqueId:
							"e74d21caffe16a058db26f79a53566d143b9f248285646be9ef0e5c29a7575c9",
					},
				],
				productStatus: "dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707169289662-telephone.jpg",
				productFileName: "1707169289662-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65b018095e8df60f1a1a46fa",
				productName: "Ctenarsky Denik",
				productDescription: "obrazek",
				productPrice: 12,
				productCategory: "Knihy",
				productQuantity: 12,
				productRating: 0,
				productReviews: [],
				productStatus: "dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1706039305411-Obraz Doriana Graye.png",
				productFileName: "1706039305411-Obraz Doriana Graye.png",
				__v: 0,
			},
			{
				_id: "65b0379b3070f8420dae75d4",
				productName: "Zaklinac",
				productDescription: "obrazek 2",
				productPrice: 554,
				productCategory: "Knihy",
				productQuantity: 3,
				productRating: 0,
				productReviews: [],
				productStatus: "dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707573151382-MainPicture.png",
				productFileName: "1707573151382-MainPicture.png",
				__v: 0,
			},
			{
				_id: "65bacb9162c0fa8ba0933cdc",
				productName: "Košík výzdobní pedig",
				productDescription: "je to kosik proste z pedigu a je mega op rika mira",
				productPrice: 150,
				productCategory: "Tráva",
				productQuantity: 14,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupný",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707573058965-clipboard.svg",
				productFileName: "1707573058965-clipboard.svg",
				__v: 0,
			},
			{
				_id: "65bacb9f62c0fa8ba0933cdf",
				productName: "Košík výzdobní pedigdesf",
				productDescription: "je to kosik proste z pedigu a je mega op rika mira",
				productPrice: 150,
				productCategory: "Tráva",
				productQuantity: 14,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupný",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1706740639881-logo.png",
				productFileName: "1706740639881-logo.png",
				__v: 0,
			},
			{
				_id: "65bacba662c0fa8ba0933ce2",
				productName: "Košík výzdobní pedfd",
				productDescription: "je to kosik proste z pedigu a je mega op rika mira",
				productPrice: 150,
				productCategory: "Tráva",
				productQuantity: 14,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupný",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1706740646138-logo.png",
				productFileName: "1706740646138-logo.png",
				__v: 0,
			},
			{
				_id: "65bacbab62c0fa8ba0933ce5",
				productName: "Košík ne výzdobní pedfd",
				productDescription: "je to kosik proste z pedigu a je mega op rika mira",
				productPrice: 150,
				productCategory: "Tráva",
				productQuantity: 14,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupný",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1706740651378-logo.png",
				productFileName: "1706740651378-logo.png",
				__v: 0,
			},
			{
				_id: "65bacbb262c0fa8ba0933cea",
				productName: "Košík ne výzdobní pedfdfjd",
				productDescription: "je to kosik proste z pedigu a je mega op rika mira",
				productPrice: 150,
				productCategory: "okkhf",
				productQuantity: 14,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupný",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1706740658771-logo.png",
				productFileName: "1706740658771-logo.png",
				__v: 0,
			},
			{
				_id: "65bacbbd62c0fa8ba0933ced",
				productName: "Košík ne výzdobní pfffedfdfjd",
				productDescription: "je to kosik proste z pedigu a je mega op rika mira",
				productPrice: 150,
				productCategory: "kokos",
				productQuantity: 14,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupný",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1706740669582-logo.png",
				productFileName: "1706740669582-logo.png",
				__v: 0,
			},
			{
				_id: "65bacbc362c0fa8ba0933cf0",
				productName: "Košík ne vgfýzdobní pfffedfdfjd",
				productDescription: "je to kosik proste z pedigu a je mega op rika mira",
				productPrice: 150,
				productCategory: "tiggers",
				productQuantity: 14,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupný",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1706740675955-logo.png",
				productFileName: "1706740675955-logo.png",
				__v: 0,
			},
			{
				_id: "65c77997d5de5d6e2481d2b1",
				productName: "Main Picture",
				productDescription: "nevim co to je",
				productPrice: 125,
				productCategory: "Boruvky",
				productQuantity: 12,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707571607899-MainPicture.png",
				productFileName: "1707571607899-MainPicture.png",
				__v: 0,
			},
			{
				_id: "65cd1a2876384b446d600ceb",
				productName: "Telegraph Road",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707940392935-telephone.jpg",
				productFileName: "1707940392935-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1abd8f0c9a2ed6b4f3d0",
				productName: "Telegraph Road23",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707940541647-telephone.jpg",
				productFileName: "1707940541647-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1ad4218569a03e72f68d",
				productName: "Telegraph Road233",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707940564047-telephone.jpg",
				productFileName: "1707940564047-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1b3b10132a04936e8c4d",
				productName: "Roema And Julie",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707940667996-telephone.jpg",
				productFileName: "1707940667996-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1b82a04adb407cb3a993",
				productName: "Email Nefunguje",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707940738239-telephone.jpg",
				productFileName: "1707940738239-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1b958f39d72fc69f6383",
				productName: "Email Nefunguje2",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707940757832-telephone.jpg",
				productFileName: "1707940757832-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1bb8cb62dbc84af55dcf",
				productName: "Email Nefunguje22",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707940792592-telephone.jpg",
				productFileName: "1707940792592-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1bc959b36c9aa3dca389",
				productName: "Email Nefunguje222",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707940809380-telephone.jpg",
				productFileName: "1707940809380-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1c4e444d5711f7eb262e",
				productName: "Email funguje 25",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707940942519-telephone.jpg",
				productFileName: "1707940942519-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1c7556f3547ece086545",
				productName: "Email funguje 253",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707940981780-telephone.jpg",
				productFileName: "1707940981780-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1c962dd32c2a86c35f28",
				productName: "Email funguje 2532",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707941014060-telephone.jpg",
				productFileName: "1707941014060-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1cba48cf4fc425ecf898",
				productName: "Ahoj maro",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707941050570-telephone.jpg",
				productFileName: "1707941050570-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1d0fe994b4ab59c8db76",
				productName: "Ahoj maro2",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707941135926-telephone.jpg",
				productFileName: "1707941135926-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1da871a6311c1e86c936",
				productName: "Ahoj maro223",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707941288903-telephone.jpg",
				productFileName: "1707941288903-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1da871a6311c1e86c936",
				productName: "Ahoj maro223",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707941288903-telephone.jpg",
				productFileName: "1707941288903-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1da871a6311c1e86c936",
				productName: "Ahoj maro223",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707941288903-telephone.jpg",
				productFileName: "1707941288903-telephone.jpg",
				__v: 0,
			},
			{
				_id: "65cd1da871a6311c1e86c936",
				productName: "Ahoj maro223",
				productDescription: "Super Songa",
				productPrice: 12,
				productCategory: "CO TO JE ???",
				productQuantity: 5,
				productRating: 0,
				productReviews: [],
				productStatus: "Dostupne",
				productImagePath:
					"https://storage.cloud.google.com/image-server-bucket-24/1707941288903-telephone.jpg",
				productFileName: "1707941288903-telephone.jpg",
				__v: 0,
			},
		]);
	}, []);

	function fetchData(){}
	function fetchCategories(){}
	

	/*

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

	*/

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
					{products.map((product,index) => (
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
