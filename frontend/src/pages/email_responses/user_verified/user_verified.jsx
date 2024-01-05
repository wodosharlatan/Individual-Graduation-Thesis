import React from "react";
import "./user_verified.css";

function User_verified() {

	setTimeout(function () {
		window.history.pushState("", "", "/");
	}, 50);

	return (
		<>
			<div class="centered">
				<div class="center">
					<h1>Vaše ověření proběhlo úspěšně</h1>
				</div>
				<div class="center">
					<i class="uil uil-check-circle icon"></i>
				</div>
			</div>
		</>
	);
}

export default User_verified;
