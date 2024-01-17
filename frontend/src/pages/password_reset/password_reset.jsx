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

    fetch("/API/password-reset", requestOptions)
      .then((response) => response.text())
      .then((result) => alert(result))
      .catch((error) => alert("error", error));
  };

  return (
    <>


<body class="body_res">
    <h1 class="Nadpis_Stranky1_res">Dárky z Pedigu</h1>
    <div class="Tabulka_1_res">
      <a class="Nadpis_Stranky2_res">Obnovení hesla</a>

      <div class="inputDuo_res">
        <a class="Nadpis_Stranky3_res">E-mail:</a> <br /><br />
        <input class="inputclass_res" type="text" />
      </div>

      <div class="inputDuo_res">
        <a class="Nadpis_Stranky3_res">Heslo:</a><br /><br />
        <input class="inputclass_res" type="password" />
      </div>

      <div class="loginbutton_res custom-btn_res btn-1_res">
        <a>Obnovit</a>
      </div>

      <a class="text_res" href="">Přihlásit se</a>
      <a class="text2_res" href="">Registrovat</a>
    </div>
  </body>


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

export default Password_reset;
