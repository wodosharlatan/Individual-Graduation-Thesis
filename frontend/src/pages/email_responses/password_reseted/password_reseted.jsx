import React from "react";
import "./password_reseted.css";

function Password_reseted() {

	// remove hash from url and redirect to home page
	window.history.pushState("", "", "/");

	return (
		<>
			<div class="centered">
				<div class="center">
					<h1>Heslo úspěšne změněno</h1>
				</div>
				<div class="center">
					<i class="uil uil-check-circle icon"></i>
				</div>
			</div>
		</>
	);
}

export default Password_reseted;
