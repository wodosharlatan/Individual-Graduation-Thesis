import React from "react";
import "./_mainstyle.scss";

function Registration() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [Telephone, settelephone] = React.useState("");
  const [password_again, setPassword_again] = React.useState("");
  const [dateOfBirth, setdateOfBirth] = React.useState("");
  const [name_surname, setname_surname] = React.useState("");
  const [gender, setgender] = React.useState("");
  const [street_number, setstreet_number] = React.useState("");
  const [zipcode, setzipcode] = React.useState("");
  const [city, setcity] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();

    var raw = JSON.stringify({
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
    });

    var requestOptions = {
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
        alert(data);
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

  return (
    <>
      <div className="body_reg">
        <h1 className="Nadpis_Stranky1_reg">Dárky z Pedigu</h1>

        <div className="Tabulka_1_reg">
          <a className="Nadpis_Stranky2_reg">Registrace</a>

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
          <div onClick={handleSubmit} className="loginbutton_reg custom-btn_reg btn-1_reg">
            <a>Registrovat</a>
          </div>
          <a className="text2_reg" href="">
            Přihlásit se
          </a>
        </div>
      </div>
    </>
  );
}

export default Registration;
