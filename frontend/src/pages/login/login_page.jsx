import { useState } from "react";
import "./_mainstyle.scss";
import { Helmet } from "react-helmet";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };






  const handleSubmit = (event) => {
    event.preventDefault();

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      Password: password,
      Email: email,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/API/users/login", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if(data.VerificationCode){
          setCookie("UserToken", data.VerificationCode, 7);
          //alert("Přihlášení proběhlo úspěšně");
          location.href = "/"
        }
        else{
          alert("Přihlášení se nezdařilo " + data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="keywords" content="Dárky, Pedigu, Pedig, Košík, Výrobek, Přírodní materiál, Ruční výroba, Malá dílnička"></meta>
		<meta name="author" content="Tomáš Bosák"></meta>
		<meta name="author" content="Marek Hejral"></meta>
        <title>Dárky z pedigu | Přihlášení</title>
        <meta
          name="description"
          content="Dárky z pedigu - Vlastnoruční výroba kvalitních produktů z pedigu z malé dílničky v podkrkonoší
   | Košíky | Dekorace | Figurky | Hrníčky | Hodiny | Podnosy"
        />
      </Helmet>
      <div className="body_log">
        <h1 className="Nadpis_Stranky1_log">Dárky z Pedigu</h1>
        <div className="Tabulka_1_log">
          <a className="Nadpis_Stranky2_log">Přihlášení</a>

          <div className="inputDuo_log">
            <a className="Nadpis_Stranky3_log">E-mail:</a> <br />
            <br />
            <input className="inputclass_log" id="email"
                  value={email}
                  type="text"
                  required
                  onChange={handleEmail} />
          </div>

          <div className="inputDuo_log">
            <a className="Nadpis_Stranky3_log">Heslo:</a>
            <br />
            <br />
            <input className="inputclass_log" id="password"
                  type="password"
                  required
                  value={password}
                  onChange={handlePassword} />
          </div>

          <div onClick={handleSubmit} className="loginbutton_log custom-btn_log btn-1_log">
            <a>Přihlásit se</a>
          </div>

          <a className="text_log" href="/password-reset">
            Zapomněli jste heslo?
          </a>
          <a className="text2_log" href="/registration">
            Registrovat
          </a>
        </div>
      </div>
    </>
  );
}
export default Login;
