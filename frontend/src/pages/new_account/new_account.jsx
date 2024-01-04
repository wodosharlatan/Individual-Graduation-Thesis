import React from "react";

function New_Account() {
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
    myHeaders.append("Content-Type", "application/json");

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

    fetch("api/users", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
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
      <form onSubmit={handleSubmit}>
        <label>Jméno a Příjmení</label>
        <input
          id="name_surname"
          type="text"
          value={name_surname}
          onChange={handlename_surname}
        ></input>
        <br></br>
        <br></br>

        <label>Datum narození</label>
        <input
          id="dateOfBirth"
          type="Date"
          value={dateOfBirth}
          onChange={handleDateOfBirth}
        ></input>
        <br></br>
        <br></br>

        <label>pohlaví</label>

        <select
          name="Pohlaví"
          id="gender"
          value={gender}
          onChange={handlegender}
        >
          <option value="Woman">Žena</option>
          <option value="Man">Muž</option>
          <option value="other">Jiné</option>
        </select>
        <br></br>
        <br></br>

        <label>email</label>
        <input
          id="email"
          type="text"
          required
          value={email}
          onChange={handleEmail}
        ></input>
        <br></br>
        <br></br>

        <label>Telefon</label>
        <input
          id="telephone"
          type="tel"
          required
          value={Telephone}
          onChange={handletelephone}
        ></input>
        <br></br>
        <br></br>

        <label>heslo</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={handlePassword}
        ></input>
        <br></br>
        <br></br>

        <label>heslo znovu</label>
        <input
          id="password_again"
          type="password"
          required
          value={password_again}
          onChange={handlePassword_again}
        ></input>
        <br></br>
        <br></br>

        <label>Ulice a Čp</label>
        <input
          id="street_number"
          type="text"
          required
          value={street_number}
          onChange={handlestreet_number}
        ></input>
        <br></br>
        <br></br>

        <label>PSČ</label>
        <input
          id="zipcode"
          type="text"
          required
          value={zipcode}
          onChange={handlezipcode}
        ></input>
        <br></br>
        <br></br>

        <label>Město</label>
        <input
          id="city"
          type="text"
          required
          value={city}
          onChange={handlecity}
        ></input>
        <br></br>
        <br></br>

        <button type="submit">Odeslat</button>

      </form>
    </>
  );
}

export default New_Account;
