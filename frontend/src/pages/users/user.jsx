import React, { useState, useEffect } from "react";

function All_Users() {
	const [isAdmin, setIsAdmin] = useState(false);
	const [users, setUsers] = useState([]);

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
					fetchUsers();
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

	function fetchUsers() {
		const UserTokenValue = getCookie("UserToken");
		const requestOptions = {
			method: "POST",
			redirect: "follow",
		};

		fetch(`/API/users/get-all/${UserTokenValue}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setUsers(result);
				console.log(result);
			})
			.catch((error) => console.log("error", error));
	}

	function handleDelete(username) {
		const UserTokenValue = getCookie("UserToken");

		const requestOptions = {
			method: "DELETE",
			body: JSON.stringify({ userID: username }),
			headers: { "Content-Type": "application/json" },
		};

		fetch(`/API/users/${UserTokenValue}`, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				fetchUsers();
			})
			.catch((error) => {
				console.log("error", error);
			});
	}

	return (
		<>
			{users &&
				users.map((user) => (
					<div key={user.id}>
						<p>{user.Name}</p>
						<button onClick={() => (handleDelete(user.Name))}>Delete User</button>
					</div>
				))}
		</>
	);
}

export default All_Users;
