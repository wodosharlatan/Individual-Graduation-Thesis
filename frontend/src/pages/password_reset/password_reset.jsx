import React from "react";
import "./_mainstyle.scss";

function Password_reset() {
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

    fetch("/API/password-reseted", requestOptions)
      .then((response) => response.text())
      .then((result) => alert(result))
      .catch((error) => alert("error", error));
  };

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="keywords" content="Dárky, Pedigu, Pedig, Košík, Výrobek, Přírodní materiál, Ruční výroba, Malá dílnička"></meta>
		<meta name="author" content="Tomáš Bosák"></meta>
		<meta name="author" content="Marek Hejral"></meta>
        <title>Dárky z pedigu | Změna hesla</title>
        <meta
          name="description"
          content="Dárky z pedigu - Vlastnoruční výroba kvalitních produktů z pedigu z malé dílničky v podkrkonoší
   | Košíky | Dekorace | Figurky | Hrníčky | Hodiny | Podnosy"
        />
      </Helmet>
      <div className="body_res">
        <h1 className="Nadpis_Stranky1_res">Dárky z Pedigu</h1>
        <div className="Tabulka_1_res">
          <a className="Nadpis_Stranky2_res">Obnovení hesla</a>

          <div className="inputDuo_res">
            <a className="Nadpis_Stranky3_res">E-mail:</a> <br />
            <br />
            <input
              className="inputclass_res"
              id="email"
              type="text"
              required
              value={email}
              onChange={handleEmail}
            />
          </div>

          <div className="inputDuo_res">
            <a className="Nadpis_Stranky3_res">Nové heslo:</a>
            <br />
            <br />
            <input
              className="inputclass_res"
              id="newpassword"
              type="password"
              required
              value={newpassword}
              onChange={handlenewpassword}
            />
          </div>

          <div className="inputDuo_res">
            <a className="Nadpis_Stranky3_res">Heslo znovu:</a>
            <br />
            <br />
            <input
              className="inputclass_res"
              id="newpassword_again"
              type="password"
              required
              value={newpassword_again}
              onChange={handlenewpassword_again}
            />
          </div>

          <div
            onClick={handleSubmit}
            className="loginbutton_res custom-btn_res btn-1_res"
          >
            <a>Obnovit</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Password_reset;
