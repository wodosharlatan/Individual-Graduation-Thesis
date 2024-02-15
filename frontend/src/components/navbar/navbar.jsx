import "./_mainstyle.scss";
import { useState, useEffect } from "react";

function Navbar() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetchCategories();
	}, []);

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
			<nav class="navbar navbar-expand-lg ">
				<div class="container-fluid">
					<img className="img-logo" src="./logo.png"></img>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<li class="nav-item">
								<a class="nav-link active" aria-current="page" href="/">
									Domů
								</a>
							</li>
							
						</ul>
						<form class="d-flex" role="search">
							<input
								class="form-control me-2"
								type="search"
								placeholder="Hledání..."
								aria-label="Search"
							/>
							<button class="btn btn-outline-success" type="submit">
								Hledat
							</button>
						</form>
						<i className="uil uil-user-circle"></i>
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						{categories.length > 0 &&
								categories.map((Category, index) => (
									<li class="nav-item nav-item-hidden" key={index}>
										<a
											class="nav-link active"
											aria-current="page"
											href={`/category/${Category}`}
										>
											{Category}
										</a>
									</li>
								))}
								</ul>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
