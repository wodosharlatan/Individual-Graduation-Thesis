import { useState } from "react";
import "./_mainstyle.scss";

function Registration() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [Telephone, settelephone] = useState("");
	const [password_again, setPassword_again] = useState("");
	const [dateOfBirth, setdateOfBirth] = useState("");
	const [name_surname, setname_surname] = useState("");
	const [gender, setgender] = useState("");
	const [street_number, setstreet_number] = useState("");
	const [zipcode, setzipcode] = useState("");
	const [city, setcity] = useState("");
	const [newsletter, setnewsletter] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify({
			Password: password,
			Verification: password_again,
			Email: email,
			Name: name_surname,
			Telephone: Telephone,
			StreetNumber: street_number,
			ZipCode: zipcode,
			City: city,
			BirthDate: dateOfBirth,
			Gender: gender,
			Newsletter: newsletter,
		});

		let requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch("/API/users", requestOptions)
			.then((response) => {
				return response.text();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => console.error("Error:", error));
	};

	const handleEmail = (event) => {
		setEmail(event.target.value);
	};

	const handlestreet_number = (event) => {
		setstreet_number(event.target.value);
	};

	const handlegender = (event) => {
		setgender(event.target.value);
	};

	const handletelephone = (event) => {
		settelephone(event.target.value);
	};

	const handlePassword = (event) => {
		setPassword(event.target.value);
	};

	const handlePassword_again = (event) => {
		setPassword_again(event.target.value);
	};

	const handleDateOfBirth = (event) => {
		setdateOfBirth(event.target.value);
	};

	const handlename_surname = (event) => {
		setname_surname(event.target.value);
	};

	const handlezipcode = (event) => {
		setzipcode(event.target.value);
	};

	const handlecity = (event) => {
		setcity(event.target.value);
	};

	const handlenewsletter = (event) => {
		setnewsletter(event.target.value);
	};

	return (
		<>
			<div className="body_reg">
				<h1 className="Nadpis_Stranky1_reg">Dárky z Pedigu</h1>

				<div className="ttabulka_1_reg">
					<a className="nnadpis_Stranky2_reg">Registrace</a>

					<div className="divok2_reg">
						<div className="divok_reg">
							<div className="inputDuo_reg">
								<a className="Nadpis_Stranky3_reg">Jméno a Příjmení:</a> <br />
								<br />
								<input
									className="inputclass_reg"
									id="name_surname"
									type="text"
									value={name_surname}
									onChange={handlename_surname}
								/>
							</div>

							<div className="inputDuo_reg">
								<a className="Nadpis_Stranky3_reg">Datum narození</a>
								<br />
								<br />
								<input
									className="inputclass_reg"
									id="dateOfBirth"
									type="Date"
									value={dateOfBirth}
									onChange={handleDateOfBirth}
								/>
							</div>

							<div className="inputDuo_reg">
								<a className="Nadpis_Stranky3_reg">Tel. číslo:</a>
								<br />
								<br />
								<input
									className="inputclass_reg"
									id="telephone"
									type="tel"
									required
									value={Telephone}
									onChange={handletelephone}
								/>
							</div>

							<div className="inputDuo_reg">
								<a className="Nadpis_Stranky3_reg">Heslo znovu:</a>
								<br />
								<br />
								<input
									className="inputclass_reg"
									id="password_again"
									type="password"
									required
									value={password_again}
									onChange={handlePassword_again}
								/>
							</div>

							<div className="inputDuo_reg">
								<a className="Nadpis_Stranky3_reg">PSČ:</a>
								<br />
								<br />
								<input
									className="inputclass_reg"
									id="zipcode"
									type="text"
									required
									value={zipcode}
									onChange={handlezipcode}
								/>
							</div>
						</div>
						<div className="divok_reg">
							<div className="inputDuo_reg">
								<a className="Nadpis_Stranky3_reg">Pohlaví</a>
								<br />
								<br />
								<select
									className="inputclass_reg"
									name="Pohlaví"
									id="gender"
									value={gender}
									onChange={handlegender}
								>
									<option value="Woman">Žena</option>
									<option value="Man">Muž</option>
									<option value="other">Jiné</option>{" "}
								</select>
							</div>

							<div className="inputDuo_reg">
								<a className="Nadpis_Stranky3_reg">E-mail:</a>
								<br />
								<br />
								<input
									className="inputclass_reg"
									id="email"
									value={email}
									type="text"
									required
									onChange={handleEmail}
								></input>
							</div>

							<div className="inputDuo_reg">
								<a className="Nadpis_Stranky3_reg">Heslo:</a>
								<br />
								<br />
								<input
									className="inputclass_reg"
									id="password"
									type="password"
									required
									value={password}
									onChange={handlePassword}
								/>
							</div>

							<div className="inputDuo_reg">
								<a className="Nadpis_Stranky3_reg">Ulice a Čp:</a>
								<br />
								<br />
								<input
									className="inputclass_reg"
									id="street_number"
									type="text"
									required
									value={street_number}
									onChange={handlestreet_number}
								/>
							</div>

							<div className="inputDuo_reg">
								<a className="Nadpis_Stranky3_reg">Město:</a>
								<br />
								<br />
								<input
									className="inputclass_reg"
									id="city"
									type="text"
									required
									value={city}
									onChange={handlecity}
								/>
							</div>
						</div>
					</div>

          <div className="inputDuo_reg inputcheck">
                <a className="Nadpis_Stranky4_reg">Souhlasím se zasíláním newsletters:</a>
                <input
                className="check"
                  id="newsletter"
                  type="checkbox"
                  required
                  value={newsletter}
                  onChange={handlenewsletter}
                />
                </div>



					<div
						onClick={handleSubmit}
						className="loginbuttonn_reg custom-btn_reg btn-1_reg"
					>
						<a>Registrovat</a>
					</div>
					<a className="text2_reg" href="/login">
						Přihlásit se
					</a>
				</div>
			</div>
		</>
	);
}

export default Registration;
