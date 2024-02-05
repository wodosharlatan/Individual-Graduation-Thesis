import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Manage_Single_Product() {
	const [isAdmin, setIsAdmin] = useState(false);
	const [product, setProduct] = useState([]);
	const { PRODUCT_NAME } = useParams();

	useEffect(() => {
		handleAccess();
	}, []);

	function handleAccess() {
		const UserTokenValue = getCookie("UserToken");
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		};

		const path = `/API/verify/${UserTokenValue}`;

		fetch(path, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				if (data == true) {
					setIsAdmin(true);
					fetchProduct(PRODUCT_NAME);
				} else {
					alert("Nemáte přístup k této stránce");
					window.location.href = "/";
				}
			})
			.catch((error) => {
				alert("Nemáte přístup k této stránce");
				window.location.href = "/";
			});
	}

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

	function fetchProduct(name) {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch(`/API/products/${name}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
                console.log(result);
				setProduct(result);
			})
			.catch((error) => console.log("error", error));
	}

	return (
		<>
			{product &&
				product.map((item, index) => {
					return (
						<div key={index}>

                            <input type="file" />
                            <br/>

                            <label>Product Name</label>
                            <input type="text" value={item.productName} />
                            <br/>
                            <label>Product Description</label>
                            <input type="text" value={item.productDescription} />
                            <br/>
                            <label>Product Price</label>
                            <input type="text" value={item.productPrice} />
                            <br/>
                            <label>Product Category</label>
                            <input type="text" value={item.productCategory} />
                            <br/>
                            <label>Product Quantity</label>
                            <input type="text" value={item.productQuantity} />
                            <br/>
                            <label>Product Status</label>
                            <input type="text" value={item.productStatus} />
                            
                            <button>Save</button>

							
						</div>
					);
				})}
		</>
	);
}

export default Manage_Single_Product;
