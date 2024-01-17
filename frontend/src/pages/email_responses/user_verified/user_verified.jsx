import React from "react";
import "./_mainstyle.scss";

function User_verified() {
  // window.history.pushState("", "", "/");

  function handleConfirmation() {
    window.location.href = "/";
  }

  return (
    <>
      <div className="body_log">
        <h1 className="Nadpis_Stranky1_log">Dárky z Pedigu</h1>
        <div className="Tabulka_1_log">
          <a className="Nadpis_Stranky2_log">Vaše ověření proběhlo úspěšně</a>

          <div className="success">
            <i className=" uil uil-check-circle"></i>
          </div>

          <div
            onClick={handleConfirmation}
            className="loginbutton_log custom-btn_log btn-1_log">
            <a>Dokončit</a>
          </div>

          <a className="text_log" href="">
            Přihlásit se
          </a>
        </div>
      </div>
    </>
  );
}

export default User_verified;
