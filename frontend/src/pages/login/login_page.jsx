import { useState } from "react";
import "./_mainstyle.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Password: password,
      Email: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/API/users/login", requestOptions)
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

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
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

          <a className="text_log" href="">
            Zapomenuté heslo
          </a>
          <a className="text2_log" href="">
            Registrovat
          </a>
        </div>
      </div>
    </>
  );
}
export default Login;
