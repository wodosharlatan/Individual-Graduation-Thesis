import "./App.css";
import React from "react";

function PasswordReset() {
  const [email, setEmail] = React.useState("");
  const [newpassword, setnewpassword] = React.useState("");
  const [newpassword_again, setnewpassword_again] = React.useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlenewpassword = (event) => {
    setnewpassword(event.target.value);
  };

  const handlenewpassword_again = (event) => {
    setnewpassword_again(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Email: email,
      Password: newpassword,
      VerificationPassword: newpassword_again,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://imp.up.railway.app/password-reset", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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

        <label>Nové heslo</label>
        <input
          id="newpassword"
          type="password"
          required
          value={newpassword}
          onChange={handlenewpassword}
        ></input>
        <br></br>
        <br></br>

        <label>Nové heslo znovu</label>
        <input
          id="newpassword_again"
          type="password"
          required
          value={newpassword_again}
          onChange={handlenewpassword_again}
        ></input>
        <br></br>
        <br></br>

        <button type="submit">Odeslat</button>
      </form>
    </>
  );
}

export default PasswordReset;
