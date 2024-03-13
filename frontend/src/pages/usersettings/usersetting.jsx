import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./_mainstyle.scss";
import Footer from "../../components/footer/footer";


function Usersetting() {

	const [isDisabled, setDisabled] = useState([]);
	const [isDisabled2, setDisabled2] = useState([]);
	const [isDisabled3, setDisabled3] = useState([]);
	const [isDisabled4, setDisabled4] = useState([]);
	const [isDisabled5, setDisabled5] = useState([]);
	const [tel, setNewTel] = useState("");
	const [nameSur, setNewNameSur] = useState("");
	const [address, setNewAddress] = useState("");
	const [zipcodee, setNewZipcodee] = useState("");
	const [city, setNewCity] = useState("");
	const [getEmail, setEmail] = useState('');


	const handleChange = (event) => {
		if(event.target.clicked){
			console.log("Is Checkec!")
		}else {
			console.log("Is not Checked!")
			setDisabled(current => !current);
		}
	  };
	  const handleChange2 = (event) => {
		if(event.target.clicked){
			console.log("Is Checkec!")
		}else {
			console.log("Is not Checked!")
			setDisabled2(current => !current);
		}
	  };
	  const handleChange3 = (event) => {
		if(event.target.clicked){
			console.log("Is Checkec!")
		}else {
			console.log("Is not Checked!")
			setDisabled3(current => !current);
		}
	  };
	  const handleChange4 = (event) => {
		if(event.target.clicked){
			console.log("Is Checkec!")
		}else {
			console.log("Is not Checked!")
			setDisabled4(current => !current);
		}
	  };
	  const handleChange5 = (event) => {
		if(event.target.clicked){
			console.log("Is Checkec!")
		}else {
			console.log("Is not Checked!")
			setDisabled5(current => !current);
		}
	  };

	  useEffect(() => {
        const userToken = getCookie("UserToken");
        if (userToken) {
            getUserData(userToken)
                .then((email) => {
                    setEmail(userData.Email || '');
                    setNewTel(userData.Telephone || '');
                    setNewNameSur(userData.Name || '');
                    setNewAddress(userData.StreetNumber || '');
                    setNewZipcodee(userData.ZipCode || '');
                    setNewCity(userData.City || '');
                })
                .catch((error) => {
                    console.error("Error getting user data:", error);
                });
        }
    }, []); 




	  const handleSubmit = (event) => {
		event.preventDefault();

		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify({
			Name: nameSur,
            Telephone: tel,
            StreetNumber: address,
            ZipCode: zipcodee,
            City: city,
		});

		let requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch("/API/users/zmena-udaju", requestOptions)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => console.error("Error:", error));
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

	


	function getUserData(userToken){

		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		fetch(`/API/users/zmena-udaju/${userToken}`, requestOptions)
			.then((response) => {
				if(!response.ok){
					throw new Error("Network not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
				return data.Email;
			})
			.catch((error) => {
				console.error("Error:", error)
				return null;
			});
	}


	getUserData(getCookie("UserToken"))
    .then((email) => {
        if (email !== null) {
			setEmail(email);
        } else {
            console.log("Email not found or error occurred.");
        }
    })
    .catch((error) => {
        console.error("Error getting user data:", error);
    });

	return (
		<>
			<Navbar />

			<h1 className="nadpis">Nastavení uživatelského účtu</h1>
			<br></br>
			<div className="maindiv">
			<h2>Uživatelské údaje</h2>
			<br></br>
				<div className="itemdiv">
					<a>Jméno a příjmení</a>
					<p>Marek Hejral</p>
				</div>
				<br></br>
				<div className="itemdiv">
					<a>Datum narození</a>
					<p>18.7.2005</p>
				</div>
				<br></br>
				<div className="itemdiv">
					<a>Email</a>
					<input type="text" disabled value={getEmail} className="userInput"/>
					<i class="uil uil-pen"></i>
				</div>
				<br></br>
				<div className="itemdiv">
					<a>Tel. číslo</a>
					<input type="tel" onChange={(e) => setNewTel(e.target.value)} value={isDisabled ? "652 472 322" : tel} placeholder={isDisabled? "" : "Zadejte Tel. Číslo"} disabled={isDisabled} className="userInput"/>
					<i class="uil uil-pen" onClick={handleChange}></i>
				</div>
				<br></br>
				<div className="itemdiv">
					<a>Heslo</a>
					<p>*********</p>
					<i class="uil uil-pen" onClick={() => {window.location.href = "/password-reset"}}></i>
				</div>
				<hr></hr>
				<h2>Doručovací údaje</h2>
				<br></br>
				<div className="itemdiv">
					<a>Jméno a příjmení</a>
					<input type="text" onChange={(e) => setNewNameSur(e.target.value)} value={isDisabled2 ? "Marek Hejral" : nameSur} placeholder={isDisabled2? "" : "Zadejte Jméno a Příjmení"} disabled={isDisabled2} className="userInput"/>
					<i class="uil uil-pen" onClick={handleChange2}></i>
				</div>
				<br></br>
				<div className="itemdiv">
					<a>Ulice a Čp.</a>
					<input type="text" onChange={(e) => setNewAddress(e.target.value)} value={isDisabled3 ? "Mříčná 267" : address} placeholder={isDisabled3? "" : "Zadejte Ulici a Čp."} disabled={isDisabled3} className="userInput"/>
					<i class="uil uil-pen" onClick={handleChange3}></i>
				</div>
				<br></br>
				<div className="itemdiv">
					<a>PSČ</a>
					<input type="text" onChange={(e) => setNewZipcodee(e.target.value)} value={isDisabled4 ? "512 04" : zipcodee} placeholder={isDisabled4? "" : "Zadejte PSČ"} disabled={isDisabled4} className="userInput"/>
					<i class="uil uil-pen" onClick={handleChange4}></i>
				</div>
				<br></br>
				<div className="itemdiv">
					<a>Město</a>
					<input type="text" onChange={(e) => setNewCity(e.target.value)} value={isDisabled5 ? "Mříčná" : city} placeholder={isDisabled5? "" : "Zadejte Město"} disabled={isDisabled5} className="userInput"/>
					<i class="uil uil-pen" onClick={handleChange5}></i>
				</div>
				<hr></hr>
				<div onClick={handleSubmit} className="conbutton">
					<a>Uložit</a>
				</div>
				

			</div>

			<Footer />
		</>
	);
}

export default Usersetting;
